import React, { useEffect } from "react";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";

function Cart({ cart, setCart }) {
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/cart/view`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCart(response.data);
      } catch (error) {
        console.error(
          "Error fetching cart:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchCart();
  }, [setCart]);

  const updateCartItem = async (title, quantity) => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(quantity);
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/cart/update/${encodedTitle}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      setCart(response.data);
    } catch (error) {
      console.error(
        "Error removing from cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart && cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <h2>{item.title}</h2>
              <p>{item.price}</p>
              <img src={item.image} alt={item.title} />
              <div>
                <button
                  onClick={() => updateCartItem(item.title, item.quantity + 1)}
                >
                  +
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateCartItem(item.title, item.quantity - 1)}
                >
                  -
                </button>
                <button onClick={() => removeFromCart(item.title)}>
                  Remove <FaRegTrashCan />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
}

export default Cart;
