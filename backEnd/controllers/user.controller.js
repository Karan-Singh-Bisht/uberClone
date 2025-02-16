const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const BlackListToken = require("../models/blackListToken.model");

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000), // 24 hours
      httpOnly: true,
    });

    const { password: excluded, ...newUser } = user._doc;

    return res.status(201).json({ token, newUser });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000), // 24 hours
      httpOnly: true,
    });

    const { password: excluded, ...userData } = user._doc;

    return res.status(200).json({ token, userData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (token) {
      await BlackListToken.create({ token });
    }
    return res.status(200).json({ message: "User logged out" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
