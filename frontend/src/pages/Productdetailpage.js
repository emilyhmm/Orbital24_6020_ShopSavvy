import React from "react";
import NavBar from "../Components/Navbar";
import ProductDetail from "../Components/ProductDetail/ProductDetail";

function Productdetailpage({ cart, setCart }) {
  return (
    <div>
      <NavBar cart={cart} />
      <ProductDetail setCart={setCart} />
    </div>
  );
}

export default Productdetailpage;
