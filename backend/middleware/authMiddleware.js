const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token == null) {
    return res.status(500).json("No token"); //unexpected error
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); //forbidden
    }
    req.user = user;
    next();
  });
});

module.exports = isAuthenticated;
