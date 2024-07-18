const express = require('express');
const { addToCart, getCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/CartController');

const router = express.Router();
const isAuthenticated = require("../middleware/authMiddleware");

router.get("/view", isAuthenticated, getCart);
router.post("/add", isAuthenticated, addToCart);
router.put("/update/:title", isAuthenticated, updateCartItem);
router.delete("/remove/:title", isAuthenticated, removeFromCart);
router.delete("/clear", isAuthenticated, clearCart)

module.exports = router;
