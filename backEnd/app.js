require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const { exec } = require("child_process");

const db = require("./config/db");
db();

app.use(cookieParser());
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cron.schedule("*/5 * * * *", () => {
//   exec("curl https://quickryde.onrender.com");
//   console.log("Corn running....");
// });

const userRouter = require("./routes/user.routes");
const captainRouter = require("./routes/captain.routes");
const mapsRouter = require("./routes/maps.routes");
const rideRouter = require("./routes/ride.routes");
const paymentRouter = require("./routes/payment.routes");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/captain", captainRouter);
app.use("/api/v1/maps", mapsRouter);
app.use("/api/v1/ride", rideRouter);
app.use("/api/v1/payment", paymentRouter);

module.exports = app;
