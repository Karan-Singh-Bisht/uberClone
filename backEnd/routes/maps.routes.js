const express = require("express");
const router = express.Router();
const verifyJwtToken = require("../middlewares/verifyJwtToken");
const {
  getCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestion,
} = require("../controllers/map.controller");
const { query } = require("express-validator");

router.get(
  "/getAddressCoordinates",
  query("address").isString().isLength({ min: 3 }),
  verifyJwtToken,
  getCoordinates
);

router.get(
  "/getDistanceTime",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  verifyJwtToken,
  getDistanceTime
);

router.get(
  "/getAutoSuggestion",
  query("input").isString(),
  verifyJwtToken,
  getAutoCompleteSuggestion
);

module.exports = router;
