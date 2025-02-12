const jwt = require("jsonwebtoken");
const Captain = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password, vehicle } = req.body;

    const existingCaptain = await Captain.findOne({ email });

    if (existingCaptain) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const captain = await captainService.createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password,
      color: vehicle.color,
      capacity: vehicle.capacity,
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType,
    });

    const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000), // 24 hours
      httpOnly: true,
    });

    if (!captain) {
      return res.status(400).json({ message: "Failed to register captain" });
    }

    const { password: excluded, ...newCaptain } = captain._doc;

    return res
      .status(201)
      .json({ token, message: "Captain registered successfully", newCaptain });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
