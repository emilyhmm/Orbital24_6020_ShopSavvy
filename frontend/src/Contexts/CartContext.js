import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from "./AuthContext";
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(0);
  const { isLoggedIn } = useContext(AuthContext);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (isLoggedIn && token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/cart/view`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cart = response.data;
        const quantity = cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
        setQuantity(quantity)
      } catch (error) {
        console.error(
          "Error fetching cart:", error.response ? error.response.data : error.message
        );
      }
    } else {
      setQuantity(0)
    }
  };
  
  useEffect(() => {
    fetchCart();
  }, [isLoggedIn]);

  return (
    <CartContext.Provider value={{ quantity, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

