const rideModel = require("../models/ride.model");
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
    car: pricing.car.baseFare + distanceInKm * pricing.car.perKm,
    auto: pricing.auto.baseFare + distanceInKm * pricing.auto.perKm,
    motorcycle:
      pricing.motorcycle.baseFare + distanceInKm * pricing.motorcycle.perKm,
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
  });
  return ride;
};

module.exports = {
  createRide,
};
