const Order = require('../models/orderModel');

// Create a new order
const createOrder = async (req, res) => {
  const { items } = req.body;
  console.log(req.body)

  if (!items || items.length === 0) {
    res.status(400).json({ error: 'Invalid order data' });
    return;
  }

  const total = items.reduce((sum, item) => { 
    let price = parseFloat(item.price.replace('S$', ''));
    return sum + price * item.quantity;
  }, 0);

  try {
    const order = new Order({
        user: req.user._id,
        items: items.map(item => ({
            productName: item.title,
            quantity: item.quantity,
            price: item.price,
        })),
        total: total,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const viewOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

module.exports = { createOrder, viewOrders };
