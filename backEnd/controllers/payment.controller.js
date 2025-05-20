const Razorpay = require("razorpay");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const Ride = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket"); // adjust path as needed
const User = require("../models/user.model");
const Captain = require("../models/captain.model");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const {
      amount,
      currency = "INR",
      receipt = `receipt_${Date.now()}`,
    } = req.body;

    const options = {
      amount,
      currency,
      receipt,
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};

module.exports.verifyOrder = async (req, res) => {
  try {
    const { rideId, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;

    // Step 1: Create a signature using HMAC SHA256
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    // Step 2: Compare the signature
    if (expectedSignature !== razorpaySignature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    // Step 3: Mark the ride as paid (update DB)
    const ride = await Ride.findByIdAndUpdate(
      rideId,
      {
        paymentId: razorpayPaymentId,
        orderId: razorpayOrderId,
        signature: razorpaySignature,
      },
      { new: true }
    );

    if (!ride) {
      return res
        .status(404)
        .json({ success: false, message: "Ride not found" });
    }

    // Step 4: Fetch user and captain socket IDs
    const user = await User.findById(ride.user);
    const captain = await Captain.findById(ride.captain);

    // Step 5: Emit "payment-verified" event to user
    if (user?.socketId) {
      sendMessageToSocketId(user.socketId, {
        event: "payment-verified",
        data: { rideId, message: "Payment verified, navigate to home" },
      });
    }

    // Step 6: Emit "payment-verified" event to captain
    if (captain?.socketId) {
      sendMessageToSocketId(captain.socketId, {
        event: "payment-verified",
        data: { rideId, message: "Payment verified, show popup" },
      });
    }

    // Step 7: Respond to frontend
    res.status(200).json({ success: true, message: "Payment verified", ride });
  } catch (error) {
    console.error("Payment Verification Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
