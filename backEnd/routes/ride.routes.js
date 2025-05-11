const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { createRide } = require("../controllers/ride.controller");
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

module.exports = router;
