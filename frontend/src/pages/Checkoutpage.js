import React from 'react';
import NavBar from "../Components/Navbar";
import Cart from "../Components/Cart"

function Checkoutpage({ cart, setCart }) {
    return ( 
        <div>
            <NavBar />
            <Cart cart={cart} setCart={setCart} />
        </div>
     );
}

export default Checkoutpage;
