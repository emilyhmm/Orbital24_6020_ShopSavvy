const express = require('express');
const { createUser, loginUser, refresh } = require('../controllers/UserController');
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get("/refresh", refresh);

module.exports = router;