const express = require("express");
const { createUser, loginUser, refresh, logout, profile } = require("../controllers/UserController");

const router = express.Router();
const isAuthenticated = require("../middleware/authMiddleware");

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/refresh", refresh);
router.post("/logout", logout);
router.get("/profile", isAuthenticated, profile)

module.exports = router;
