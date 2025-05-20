const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  vehicleType: {
    type: String,
    enum: ["car", "auto", "motorcycle"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  paymentId: {
    type: String,
    select: false,
  },
  orderId: {
    type: String,
    select: false,
  },
  signature: {
    type: String,
    select: false,
  },
  otp: {
    type: String,
    select: false,
    required: true,
  },
});

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;
