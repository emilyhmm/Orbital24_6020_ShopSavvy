const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1min",
  }); //change this
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = { generateAccessToken, generateRefreshToken };
