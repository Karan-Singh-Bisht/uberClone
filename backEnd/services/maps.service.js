// geoUtils.js
const axios = require("axios");
const Captain = require("../models/captain.model");

const getAddressCoordinate = async (address) => {
  if (!address) throw new Error("Address is required");

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status !== "OK") {
      throw new Error(`Google Maps error: ${data.status}`);
    }

    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};

const getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Both origin and destination addresses are required.");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status !== "OK") {
      throw new Error(`Google API error: ${data.status}`);
    }

    const element = data.rows[0].elements[0];
    if (element.status !== "OK") {
      throw new Error(`No route found: ${element.status}`);
    }

    const distance = element.distance.text;
    const duration = element.duration.text;

    return { distance, duration };
  } catch (error) {
    console.error("Error fetching distance/time:", error.message);
    throw error;
  }
};

const getAutoCompleteSuggestion = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status !== "OK") {
      throw new Error(`Google API error: ${data.status}`);
    }
    return response.data.predictions;
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error.message);
    throw error;
  }
};

const getCaptainsInTheRadius = async (lng, lat, radiusInKm) => {
  const radiusInMeters = radiusInKm * 1000;

  const nearbyCaptains = await Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radiusInMeters / 6378.1],
      },
    },
  });

  const captains = nearbyCaptains.map(({ _doc }) => {
    const { password, ...captainWithoutPassword } = _doc;
    return captainWithoutPassword;
  });

  if (!nearbyCaptains || nearbyCaptains.length === 0) {
    throw new Error("No captains found in the specified radius");
  }

  return captains;
};

module.exports = {
  getAddressCoordinate,
  getDistanceTime,
  getAutoCompleteSuggestion,
  getCaptainsInTheRadius,
};
