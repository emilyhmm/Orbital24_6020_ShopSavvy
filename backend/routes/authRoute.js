const express = require('express');
const { createUser, createMerchant, loginUser, refresh, logout, loginMerchant } = require('../controllers/UserController');
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post("/admin-login", loginMerchant);
router.get("/refresh", refresh);
router.get("/logout", logout);

module.exports = router;