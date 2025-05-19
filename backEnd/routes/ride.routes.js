const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const {
  createRide,
  getFare,
  confirmRide,
  startRide,
  endRide,
} = require("../controllers/ride.controller");
const verifyJwtToken = require("../middlewares/verifyJwtToken");

router.post(
  "/create",
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Pickup Address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Destination Address"),
  body("vehicleType")
    .isString()
    .isIn(["car", "auto", "motorcycle"])
    .withMessage("Invalid Vehicle Type"),
  verifyJwtToken,
  createRide
);

router.get(
  "/getFare",
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Pickup Length"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Destination Length"),
  verifyJwtToken,
  getFare
);

router.post(
  "/confirm",
  verifyJwtToken,
  body("rideId").isMongoId().withMessage("Invalid Ride ID"),
  confirmRide
);

router.get(
  "/start-ride",
  verifyJwtToken,
  query("rideId").isMongoId().withMessage("Invalid Ride ID"),
  query("otp")
    .isString()
    .isLength({ min: 4, max: 4 })
    .withMessage("Invalid OTP"),
  startRide
);

router.post(
  "/end-ride",
  verifyJwtToken,
  body("rideId").isMongoId().withMessage("Invalid Ride ID"),
  endRide
);

module.exports = router;
