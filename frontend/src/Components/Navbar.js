import { useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AuthContext } from "../Contexts/AuthContext";
import "../App.css";

function Header({ cart }) {
    const quantity = cart.reduce((total, item) => total + item.quantity, 0);
    const { isLoggedIn, logout } = useContext(AuthContext);
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
                <Link to="/" className="header__link" onClick={logout}>
                  <div className="header__option">
                    <span className="header__optionLineOne">Hello, User</span>
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
              <Link to = "/" className = "header__link">
                  <div className = "header__option">
                      <span className = "header__optionLineOne"> Returns </span>
                      <span className = "header__optionLineTwo">& Orders</span>
                  </div>
              </Link>

              {/*Basket Icon with number*/}
              <Link to = "/checkout" className = "header__link"> 
                  <div className = "header__optionBasket">
                      <ShoppingCartIcon/>
                      {/*Number of items in basket */}
                      <span className = 'header_optionLineTwo header__basketCount' >{quantity}</span>
                  </div>
              </Link>
            </div>
        </nav>
      )
    }

export default Header;
