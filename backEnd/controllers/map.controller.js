const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;
  try {
    const response = await mapService.getAddressCoordinate(address);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json("Error in map controller", err);
  }
};

module.exports.getDistanceTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;
  try {
    const value = await mapService.getDistanceTime(origin, destination);
    res.status(200).json(value);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

module.exports.getAutoCompleteSuggestion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    const suggestions = await mapService.getAutoCompleteSuggestion(input);

    res.status(200).json(suggestions);
  } catch (err) {
    res.status(500).json({ message: "Interval server error", err });
  }
};
