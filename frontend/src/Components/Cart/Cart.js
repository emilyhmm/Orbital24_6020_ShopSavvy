import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material"
import "./Cart.css";
import "../../App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AuthContext } from "../../Contexts/AuthContext";
import { CartContext } from '../../Contexts/CartContext';

function Cart({ cart, setCart }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const { fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  if (!isLoggedIn) {
      navigate("/login");
    }

  useEffect(() => {
    const viewCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/cart/view`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        setCart(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Error fetching cart:",
          error.response ? error.response.data : error.message
        );
        setIsLoading(false);
      }
    };
    viewCart();
  }, []);

  const updateCartItem = async (title, quantity) => {
    const token = localStorage.getItem("token");
    try {
      if (quantity <= 0) {
        await removeFromCart(title); // Remove item if quantity is zero or less
        return;
      }
      const encodedTitle = encodeURIComponent(title);
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/cart/update/${encodedTitle}`,
        { title, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart()
      setCart(response.data);
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const removeFromCart = async (title) => {
    const token = localStorage.getItem("token");
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/cart/remove/${encodedTitle}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
      setCart(response.data);
    } catch (error) {
      console.error(
        "Error removing from cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const totalAmount = cart.reduce((total, item) => {
    let price = parseFloat(item.price.replace("S$", ""));
    return total + price * item.quantity;
  }, 0);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box className="cart__container" sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", minHeight: "100vh" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: 2, width: "100%" }}
      >
        <ShoppingCartIcon sx={{ marginRight: 1, fontSize: 40 }} />
        <Typography
          variant="h4"
          gutterBottom
          className="order-heading"
          style={{
            textAlign: "center",
            fontWeight: "500",
            marginTop: "10px",
            fontFamily: '"DM Serif Display", serif'
          }}
        >
          Your Shopping Cart
        </Typography>
      </Box>
      {isLoading ? (
        <p>Loading...</p>
      ) : cart.length > 0 ? (
        <Box sx={{ width: "100%", maxWidth: "1200px", marginBottom: 2 }}>
          <Box className="col-md-12 cart" sx={{ width: "100%", mb: 2 }}>
            <Box>
              {cart.map((item) => (
                <Box key={item.title} className="border-top border-bottom" sx={{ mb: 2 }}>
                  <Box className="cart__row main align-items-center" sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <Box className="col-2">
                      <img className="cart__img" src={item.image} alt={item.title} />
                    </Box>
                    <Box className="col">
                      <Box className="cart__row text-muted">{item.category}</Box>
                      <Box className="cart__row">{item.title}</Box>
                    </Box>
                    <Box className="col">
                      <button
                        className="border"
                        onClick={() => updateCartItem(item.title, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="border mx-2">{item.quantity}</span>
                      <button
                        className="border"
                        onClick={() => updateCartItem(item.title, item.quantity + 1)}
                      >
                        +
                      </button>
                    </Box>
                    <Box className="col">{item.price}</Box>
                    <Box className="col">
                      <FaRegTrashAlt className="close" onClick={() => removeFromCart(item.title)} />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box className="cart__row" sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography className="col gabarito-hello" sx={{ paddingLeft: 0 }}>TOTAL ITEMS:</Typography>
              <Typography className="col text-right gabarito-hello">{totalItems}</Typography>
            </Box>
            <Box className="cart__row" sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography className="col gabarito-hello">SHIPPING:</Typography>
              <Typography className="col text-right gabarito-hello">
                <select>
                  <option className="text-muted">Standard Delivery - Free</option>
                </select>
              </Typography>
            </Box>
            <Box className="cart__row " sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,.1)", py: 2 }}>
              <Typography className="col gabarito-hello">SUBTOTAL:</Typography>
              <Typography className="col text-right gabarito-hello">S$ {(totalAmount).toFixed(2)}</Typography>
            </Box>
            
            <Box className="back-to-shop" sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Link to="/">
                <ArrowBackIosIcon />
              </Link>
              <span className="text-muted" style={{ marginLeft: "8px" }}>Back to shop</span>
            </Box>

            <Link to="/payment">
              <button className="summarybutton__btn">CHECKOUT</button>
            </Link>
          </Box>
          <Box className="summary" sx={{ width: "100%", maxWidth: "300px", marginTop: 2 }}>
            
            
            
            
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" className="no-orders-message gabarito-hello">
          Your cart is empty.
        </Typography>
      )}
    </Box>
  );
}

export default Cart;
