import { useState, useEffect } from "react";
import axiosInstance from "../Utils/AxiosInstance";
function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/api/order/view`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Total: ${order.total}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.productId}>
                    <span>
                      {item.productName} - Quantity: {item.quantity}
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
