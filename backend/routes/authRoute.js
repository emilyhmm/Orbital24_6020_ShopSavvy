const express = require("express");
const {
  createUser,
  loginUser,
  refresh,
  logout,
} = require("../controllers/UserController");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/refresh", refresh);
router.get("/logout", logout);

module.exports = router;
