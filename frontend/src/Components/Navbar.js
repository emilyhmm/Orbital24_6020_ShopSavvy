import React from 'react'
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../App.css'

function Header() {
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
            <Link to = "/login" className = "header__link">
                <div className = "header__option">
                    <span className = "header__optionLineOne"> Hello, </span>
                    <span className = "header__optionLineTwo">Sign In or Sign Out</span>
                </div>
            </Link>
        
            {/*2nd link */}
            <Link to = "/" className = "header__link">
                <div className = "header__option">
                    <span className = "header__optionLineOne"> Returns </span>
                    <span className = "header__optionLineTwo">& Orders</span>
                </div>
            </Link>

            {/*3rd link */}
            <Link to = "/" className = "header__link">
                <div className = "header__option">
                    <span className = "header__optionLineOne"> You </span>
                    <span className = "header__optionLineTwo">Prime</span>
                </div>
            </Link>
            </div>

            {/*Basket Icon with number*/}
            <Link to = "/checkout" className = "header__link"> 
                <div className = "header__optionBasket">
                    <ShoppingCartIcon/>
                    {/*Number of items in basket */}
                    <span className = 'header_optionLineTwo header__basketCount' >2</span>
                </div>
            </Link>
        </nav>
    );
};

export default Header;