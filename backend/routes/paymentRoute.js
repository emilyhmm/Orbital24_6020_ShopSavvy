const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');

router.post('/create-payment-intent', paymentController.createPaymentIntent);

module.exports = router;
