const Order = require('../models/orderModel');
const CartItem = require('../models/cartItemModel');

// Create a new order
const createOrder = async (req, res) => {
  const { items } = req.body;
  if (!items || items.length === 0) {
    res.status(400).json({ error: 'Invalid order data' });
    return;
  }
  const totalItems = await CartItem.find({ _id: { $in: items } });
  const total = items.reduce((sum, item) => { 
    let price = parseFloat(item.price.replace('S$', ''));
    return sum + price * item.quantity;
  }, 0);

  try {
    const order = new Order({
        user: req.user.user._id,
        items: totalItems,
        total: total,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// View orders on orders page
const viewOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.user._id }).populate('items');
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

// Cancel orders for testing purposes
const cancelOrder = async(req, res) => {
  await Order.deleteMany({ user: req.user.user._id });
  const orders = await Order.find({ user: req.user.user._id }).populate('items');
  res.status(200).json(orders);
}

module.exports = { createOrder, viewOrders, cancelOrder };
