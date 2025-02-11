const User = require("../models/user.model");

const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    if (!firstName || !email || !password) {
      throw new Error("All fields are required");
    }
    const newUser = await User.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    });
    return newUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { createUser };
