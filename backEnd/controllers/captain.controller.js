const jwt = require("jsonwebtoken");
const Captain = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const BlackListToken = require("../models/blackListToken.model");

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

module.exports.loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, captain.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000), // 24 hours
      httpOnly: true,
    });
    const { password: excluded, ...captainData } = captain._doc;
    return res.status(200).json({ token, captainData });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.captainProfile = async (req, res) => {
  try {
    const captainId = req.user.id;
    if (!captainId) {
      return res.status(400).json({ message: "Captain not found" });
    }
    const captain = await Captain.findById(captainId).select("-password");
    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }
    return res.status(200).json({ captain });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    await BlackListToken.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ message: "Captain logged out" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
