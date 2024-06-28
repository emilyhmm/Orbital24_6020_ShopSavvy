const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');

// Helper function to get cart by userId
const getUserCart = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate('items');
  if (!cart) {
    cart = new Cart({ userId, items: [] });
    await cart.save();
  }
  return cart;
};

// Get Cart
const getCart = async (req, res) => {
  const userId = req.user.email; // assuming user ID is in the request
  const cart = await getUserCart(userId);
  res.json(cart.items);
};

// Add to Cart
const addToCart = async (req, res) => {
  const userId = req.user.email; // assuming user ID is in the request
  const { product } = req.body;
  const cart = await getUserCart(userId);

  const existingItem = cart.items.find(item => item.title === product.title);
  if (existingItem) {
    existingItem.quantity += 1;
    await existingItem.save();
  } else {
    const newItem = new CartItem({ ...product, quantity: 1 });
    await newItem.save();
    cart.items.push(newItem);
  }

  await cart.save();
  res.json(cart.items);
};

// Update Cart Item
const updateCartItem = async (req, res) => {
  const userId = req.user.email; // assuming user ID is in the request
  const { quantity } = req.body;
  const { title } = req.params;
  const cart = await getUserCart(userId);

  const item = cart.items.find(item => item.title === title);
  if (item) {
    item.quantity = quantity;
    await item.save();
  }

  await cart.save();
  res.json(cart.items);
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  const userId = req.user.email; // assuming user ID is in the request
  const { title } = req.params;
  const cart = await getUserCart(userId);

  const itemIndex = cart.items.findIndex(item => item.title === title);
  if (itemIndex > -1) {
    const [item] = cart.items.splice(itemIndex, 1);
    await CartItem.findByIdAndRemove(item.email);
  }

  await cart.save();
  res.json(cart.items);
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };
