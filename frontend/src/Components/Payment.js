import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../Utils/AxiosInstance";

const PaymentForm = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(cart);
      await axiosInstance.post(`/api/order`, { items: cart });
      console.log("help");
      setCart([]); // Clear cart
      navigate("/");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <p>
        Card Number: <input type="text" />
      </p>
      <p>
        Expiry Date: <input type="text" />
      </p>
      <p>
        CVC: <input type="text" />
      </p>
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
