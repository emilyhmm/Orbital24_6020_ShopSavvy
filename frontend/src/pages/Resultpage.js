import React from 'react';
import NavBar from "../Components/Navbar";
import Productlist from "../Components/Productlist";

function Resultpage({ cart, setCart }) {
    return ( 
        <div>
            <NavBar cart={cart} />
            <Productlist setCart={setCart} />
        </div>
     );
}

export default Resultpage;