const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" }); //change this
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "3d" });
  };
module.exports = { generateAccessToken };