const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  userProfile,
  logoutUser,
} = require("../controllers/user.controller");
const verfyJwtToken = require("../middlewares/verifyJwtToken");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  loginUser
);

router.get("/profile", verfyJwtToken, userProfile);

router.get("/logout", verfyJwtToken, logoutUser);

module.exports = router;
