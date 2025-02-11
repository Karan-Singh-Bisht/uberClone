const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Checking", errors: errors.array() });
    }
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).json({ token, newUser });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
