const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const Ride = require("../models/ride.model");
const { getSocketIds } = require("../socket");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.user.id;
    const { pickup, destination, vehicleType } = req.body;

    const ride = await rideService.createRide({
      userId,
      pickup,
      destination,
      vehicleType,
    });

    const rideWithUser = await Ride.findById(ride._id).populate("user");

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    const captainInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.lng,
      pickupCoordinates.lat,
      20
    );

    captainInRadius.forEach((captain) => {
      const sockets = getSocketIds(captain._id.toString());
      sockets.forEach((socketId) => {
        sendMessageToSocketId(socketId, {
          event: "new-ride",
          data: rideWithUser,
        });
      });
    });

    // ✅ Only send response once, at the end
    res.status(201).json({ ride });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination } = req.query;
    const fare = await rideService.getFare(pickup, destination);
    res.status(200).json({ fare });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rideId } = req.body;
    const captainId = req.user.id;

    // Confirm the ride (typically updates ride status and assigns captain)
    const ride = await rideService.confirmRide(captainId, rideId);

    // Get all socket IDs of the passenger
    const passengerSocketIds = getSocketIds(ride.user._id.toString());

    // Notify passenger about the confirmed ride
    passengerSocketIds.forEach((socketId) => {
      sendMessageToSocketId(socketId, {
        event: "ride-confirmed",
        data: ride,
      });
    });

    res.status(200).json({ ride });
  } catch (error) {
    console.error("Error in confirmRide:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { rideId, otp } = req.query;
    console.log(req.query);
    const captainId = req.user.id;
    const ride = await rideService.startRide(rideId, otp, captainId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.status(200).json({ ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { rideId } = req.body;
    const captainId = req.user.id;
    const ride = await rideService.endRide(rideId, captainId);
    const sockets = getSocketIds(ride.user._id.toString());
    sockets.forEach((socketId) => {
      sendMessageToSocketId(socketId, {
        event: "ride-ended",
        data: ride,
      });
    });
    res.status(200).json({ ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
