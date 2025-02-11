require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user.routes");

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
