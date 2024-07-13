import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AuthContext, UserContext } from "../Contexts/AuthContext";
import "../App.css";
import axios from 'axios';

function Header() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const { firstName } = useContext(UserContext);
    const [quantity, setQuantity] = useState(0);
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
        const cart = response.data;
        const quantity = cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
        setQuantity(quantity)
      } catch (error) {
        console.error(
          "Error fetching cart:", error.response ? error.response.data : error.message
        );
      }
    };
    useEffect(() => {
      if (isLoggedIn) {
          fetchCart();
      }
  }, [isLoggedIn]);
    
    const handleLogout = async () => {
      try {
        logout(); 
        localStorage.removeItem("token");
        window.location.href = '/';
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    return (
        <nav className="header">
            <Link to = "/">
                <img className = "header__logo" src = "/ShopSavvy_logo.png" alt = "ShopSavvy logo" />
            </Link>
            <div className = "header__search">
                <Searchbar/>
            </div>
            <div className = "header__nav">
              {/*1st link */}
              {isLoggedIn ? (
                <Link to="/" className="header__link" onClick={handleLogout}>
                  <div className="header__option">
                    <span className="header__optionLineOne">Hello, {firstName}</span>
                    <span className="header__optionLineTwo">Sign Out</span>
                  </div>
                </Link>
              ) : (
                <Link to="/login" className="header__link">
                  <div className="header__option">
                    <span className="header__optionLineOne">Hello,</span>
                    <span className="header__optionLineTwo">Sign In</span>
                  </div>
                </Link>
              )}
          
              {/*2nd link */}
              <Link to = "/order" className = "header__link">
                  <div className = "header__option">
                      <span className = "header__order"> Orders </span>
                  </div>
              </Link>

              {/*Basket Icon with number*/}
              <Link to = "/checkout" className = "header__link"> 
                  <div className = "header__optionBasket">
                      <ShoppingCartIcon/>
                      {/*Number of items in basket */}
                      <span className = 'header__basketCount' >{quantity}</span>
                  </div>
              </Link>
            </div>
        </nav>
      )
    }

export default Header;
