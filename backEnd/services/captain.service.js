const Captain = require("../models/captain.model");

const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  capacity,
  plate,
  vehicleType,
}) => {
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !capacity ||
    !plate ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }
  const newCaptain = await Captain.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      color,
      capacity,
      plate,
      vehicleType,
    },
  });
  return newCaptain;
};

module.exports = {
  createCaptain,
};
