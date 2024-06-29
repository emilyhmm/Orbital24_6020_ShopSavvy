const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }]
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;