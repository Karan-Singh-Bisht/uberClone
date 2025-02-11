const jwt = require("jsonwebtoken");
const BlackListToken = require("../models/blackListToken.model");

const verfyJwtToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "You are not authorized" });
  }

  const isBlackListed = await BlackListToken.findOne({ token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        }
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = verfyJwtToken;
