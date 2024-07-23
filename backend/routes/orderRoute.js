const express = require('express');
const router = express.Router();

const { createOrder, viewOrders, cancelOrder } = require('../controllers/OrderController');
const isAuthenticated = require('../middleware/authMiddleware'); 

router.post('/create', isAuthenticated, createOrder);
router.get('/view', isAuthenticated, viewOrders);
router.get('/cancel', isAuthenticated, cancelOrder);


module.exports = router;
