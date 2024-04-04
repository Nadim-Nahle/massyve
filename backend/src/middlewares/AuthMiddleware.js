const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authorization token is missing or invalid");
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, TOKEN_SECRET);
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded._id);
    console.log("User:", user);

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.error("Authentication error:", e);
    res.status(401).send({ error: "Unauthorized access" });
  }
};

module.exports = auth;