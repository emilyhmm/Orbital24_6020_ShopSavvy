const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const CartItem = mongoose.model('CartItem', CartItemSchema);
module.exports = CartItem;