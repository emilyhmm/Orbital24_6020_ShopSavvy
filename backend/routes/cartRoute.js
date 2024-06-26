const express = require('express');
const { addToCart, getCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:title', updateCartItem);
router.delete('/:title', removeFromCart);

module.exports = router;
