const express = require('express');
const router = express.Router();
const { createOrder, viewOrders } = require('../controllers/OrderController');
const isAuthenticated = require('../middleware/authMiddleware'); 

router.post('/', isAuthenticated, createOrder);
router.get('/view', isAuthenticated, viewOrders);

module.exports = router;
