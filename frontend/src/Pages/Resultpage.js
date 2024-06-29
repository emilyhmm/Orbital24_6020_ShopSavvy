import React from 'react';
import NavBar from "../Components/Navbar";
import Productlist from "../Components/Productlist";

function Resultpage({ setCart }) {
    return ( 
        <div>
            <NavBar />
            <Productlist setCart={setCart} />
        </div>
     );
}

export default Resultpage;