const Captain = require("../models/captain.model");
const rideModel = require("../models/ride.model");
const { sendMessageToSocketId, getSocketIds } = require("../socket");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  const distanceInKm = parseFloat(
    distanceTime.distance.replace("km", "").trim()
  );
  const pricing = {
    car: {
      baseFare: 50,
      perKm: 15,
    },
    auto: {
      baseFare: 30,
      perKm: 10,
    },
    motorcycle: {
      baseFare: 20,
      perKm: 7,
    },
  };

  // Calculate fares
  const fare = {
    car: Math.round(pricing.car.baseFare + distanceInKm * pricing.car.perKm),
    auto: Math.round(pricing.auto.baseFare + distanceInKm * pricing.auto.perKm),
    motorcycle: Math.round(
      pricing.motorcycle.baseFare + distanceInKm * pricing.motorcycle.perKm
    ),
  };

  return fare;
}

function getOTP(num) {
  if (num <= 0 || num > 10) {
    throw new Error("OTP length must be between 1 and 10 digits");
  }

  const max = Math.pow(10, num);
  const otp = crypto.randomInt(0, max);

  // Pad with leading zeros if needed
  return otp.toString().padStart(num, "0");
}

const createRide = async ({ userId, pickup, destination, vehicleType }) => {
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error("User, pickup, destination, and vehicleType are required");
  }
  const fare = await getFare(pickup, destination);
  const ride = rideModel.create({
    user: userId,
    pickup,
    destination,
    fare: fare[vehicleType],
    otp: getOTP(4),
    vehicleType,
  });
  return ride;
};

const confirmRide = async (captainId, rideId) => {
  if (!captainId || !rideId) {
    throw new Error("Captain ID and ride ID are required");
  }

  const ride = await rideModel.findById(rideId);
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "pending") {
    throw new Error("Ride is not available for confirmation");
  }

  const rideWithUser = await rideModel
    .findByIdAndUpdate(
      rideId,
      {
        status: "confirmed",
        captain: captainId,
      },
      { new: true }
    )
    .populate("captain")
    .populate("user")
    .select("+otp");

  return rideWithUser;
};

const startRide = async (rideId, otp, captainId) => {
  if (!rideId || !otp || !captainId) {
    throw new Error("Ride ID, OTP, and Captain ID are required");
  }

  // Update captain status
  await Captain.findByIdAndUpdate(captainId, {
    status: "active",
  });

  const ride = await rideModel
    .findById(rideId)
    .select("+otp")
    .populate("user")
    .populate("captain");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  // Update ride status
  await rideModel.findByIdAndUpdate(
    rideId,
    { status: "ongoing" },
    { new: true }
  );

  // Send socket message to user
  const passengerSocketIds = getSocketIds(ride.user._id.toString());
  passengerSocketIds.forEach((socketId) => {
    sendMessageToSocketId(socketId, {
      event: "ride-started",
      data: ride,
    });
  });

  return ride;
};

const endRide = async (rideId, captainId) => {
  try {
    if (!rideId || !captainId) {
      throw new Error("Ride ID and Captain ID are required");
    }

    const ride = await rideModel
      .findOne({ _id: rideId, captain: captainId })
      .populate("user")
      .populate("captain");

    if (!ride) {
      throw new Error("Ride not found");
    }

    await rideModel.findByIdAndUpdate(
      rideId,
      {
        status: "completed",
      },
      { new: true }
    );

    await Captain.findByIdAndUpdate(captainId, {
      status: "inactive",
    });

    const sockets = getSocketIds(ride.user._id.toString());
    sockets.forEach((socketId) => {
      sendMessageToSocketId(socketId, {
        event: "ride-completed",
        data: ride,
      });
    });

    return ride;
  } catch (err) {
    throw new Error("Error ending ride");
  }
};

module.exports = {
  confirmRide,
  createRide,
  getFare,
  startRide,
  endRide,
};
