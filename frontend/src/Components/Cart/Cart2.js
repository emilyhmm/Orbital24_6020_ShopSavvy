import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AuthContext } from "../../Contexts/AuthContext";

function Cart({ cart, setCart }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (!isLoggedIn) {
      navigate("/login");
    }

  useEffect(() => {
    const fetchCart = async () => {
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
    fetchCart();
  }, [setCart]);

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

  const totalAmount = cart.reduce((total, item) => {
    let price = parseFloat(item.price.replace("S$", ""));
    return total + price * item.quantity;
  }, 0);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart__card">
      {isLoading ? (
        <p>Loading...</p>
      ) : cart.length > 0 ? (
        <div className="cart__row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="cart__row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {cart.length} items
                </div>
              </div>
            </div>
            <div class="cart__wrap">
              {cart.map((item) => (
                <div class="cart__wrap">
                  <div
                    key={item.title}
                    className="cart__row border-top border-bottom"
                  >
                    <div className="cart__row main align-items-center">
                      <div className="col-2">
                        <img
                          className="cart__img"
                          src={item.image}
                          alt={item.title}
                        />
                      </div>
                      <div className="col">
                        <div className="cart__row text-muted">
                          {item.category}
                        </div>
                        <div className="cart__row">{item.title}</div>
                      </div>
                      <div className="col">
                        <button
                          className="border"
                          onClick={() =>
                            updateCartItem(item.title, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="border mx-2">{item.quantity}</span>
                        <button
                          className="border"
                          onClick={() =>
                            updateCartItem(item.title, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="col"> {item.price}</div>
                      <div className="col">
                        <FaRegTrashAlt
                          className="close"
                          onClick={() => removeFromCart(item.title)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="back-to-shop">
              <Link to="/">
                <ArrowBackIosIcon />
              </Link>
              <span className="text-muted">Back to shop</span>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div className="cart__row">
              <div className="col" style={{ paddingLeft: 0 }}>
                TOTAL ITEMS: {totalItems}
              </div>
              <div className="col text-right">S$ {totalAmount.toFixed(2)}</div>
            </div>
            <form>
              <p>SHIPPING</p>
              <select>
                <option className="text-muted">
                  Standard-Delivery- S$ 5.00
                </option>
              </select>
            </form>
            <div
              className="cart__row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">
                S$ {(totalAmount + 5).toFixed(2)}
              </div>
            </div>
            <Link to="/payment">
              <button className="summarybutton__btn">Checkout</button>
            </Link>
          </div>
        </div>
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
}

export default Cart;
