const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name should be atleast 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name should be atleast 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color should be atleast 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate should be atleast 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity should be atleast 1"],
    },
    vehicleType: {
      type: String,
      enum: ["car", "motorcycle", "auto"],
      required: true,
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Captain = mongoose.model("Captain", captainSchema);

module.exports = Captain;
