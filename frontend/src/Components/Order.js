import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import axios from 'axios';

function Order() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/order/view`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setOrders(response.data);
        console.log('data',response.data)
        console.log('da order',orders)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const clearOrders = async() => {
    const token = localStorage.getItem("token");
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/order/cancel`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    setOrders([])
  }

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        // clear order for testing purposes
        <ul>
          <button onClick={clearOrders}>Clear all orders</button> 
          {orders.map(order => (
            <li>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
              <p>Total: S${order.total.toFixed(2)}</p>
              <ul>
                {order.items.map(item => (
                  <li key={item._id}>
                    <span>{item.title} - Quantity: {item.quantity}</span>
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
