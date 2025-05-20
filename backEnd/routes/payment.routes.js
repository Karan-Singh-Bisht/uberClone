const express = require("express");
const {
  createOrder,
  verifyOrder,
} = require("../controllers/payment.controller");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/create-order",
  body("amount").isNumeric(),
  body("currency").isString().isLength({ min: 3 }),
  body("receipt").isString().isLength({ min: 3 }),
  createOrder
);

router.post(
  "/verify-payment",
  body("rideId").isMongoId().withMessage("Invalid RideId"),
  body("razorpayOrderId").isString().withMessage("Invalid OrderId"),
  body("razorpayPaymentId").isString().withMessage("Invalid PaymentId"),
  body("razorpaySignature").isString().withMessage("Invalid Signature"),
  verifyOrder
);

module.exports = router;
