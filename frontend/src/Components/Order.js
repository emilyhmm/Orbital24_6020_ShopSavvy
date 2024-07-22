import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";
import "../App.css";

function Order() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, [isLoggedIn, navigate]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/order/view`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const clearOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/order/cancel`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders([]);
    } catch (error) {
      console.error("Error clearing orders:", error);
    }
  };

  return (
    <div className="order-container">
      <h1 className="order-heading">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders-message">You have no orders.</p>
      ) : (
        <ul className="order-list">
          <button className="clear-orders-button" onClick={clearOrders}>
            Clear all orders
          </button>
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <p className="order-date">
                Date: {new Date(order.date).toLocaleString()}
              </p>
              <p className="order-total">Total: S${order.total.toFixed(2)}</p>
              <ul className="order-item-list">
                {order.items.map((item) => (
                  <li key={item._id} className="order-item-details">
                    <span className="item-title">
                      {item.title} - Quantity: {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Order;
