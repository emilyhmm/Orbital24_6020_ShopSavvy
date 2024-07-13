import React from "react";
import NavBar from "../Components/Navbar";
import Cart from "../Components/Cart/Cart2";

function Checkoutpage({ cart, setCart }) {
  return (
    <div>
      <NavBar />
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}

export default Checkoutpage;
