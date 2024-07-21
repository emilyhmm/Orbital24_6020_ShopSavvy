import React from "react";
import NavBar from "../Components/Navbar";
import ProductDetail from "../Components/ProductDetail/ProductDetail";

function Productdetailpage({ setCart }) {
  return (
    <div>
      <NavBar />
      <ProductDetail setCart={setCart} />
    </div>
  );
}

export default Productdetailpage;
