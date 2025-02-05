const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem', required: true }],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  orderNumber: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
