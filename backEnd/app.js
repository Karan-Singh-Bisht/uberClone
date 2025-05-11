require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
db();

app.use(cookieParser());
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user.routes");
const captainRouter = require("./routes/captain.routes");
const mapsRouter = require("./routes/maps.routes");
const rideRouter = require("./routes/ride.routes");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/captain", captainRouter);
app.use("/api/v1/maps", mapsRouter);
app.use("/api/v1/ride", rideRouter);

module.exports = app;
