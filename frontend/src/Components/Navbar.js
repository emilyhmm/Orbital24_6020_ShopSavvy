import { useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AuthContext } from "../Contexts/AuthContext";
import "../App.css";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="/ShopSavvy_logo.png"
          alt="ShopSavvy logo"
        />
      </Link>
      <div className="header__search">
        <Searchbar />
      </div>
      <div className="header__nav">
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

        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
      </div>

      <Link to="/checkout" className="header__link">
        <div className="header__optionBasket">
          <ShoppingCartIcon />
          <span className="header_optionLineTwo header__basketCount"></span>
        </div>
      </Link>
    </nav>
  );
}

export default Header;
