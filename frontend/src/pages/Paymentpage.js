import React from "react";
import Checkout from "../Components/Checkout/Checkout";

function Paymentpage({ cart, setCart }) {
  return (
    <div className="paymentpage">
      <header className="payment-header">
        <h1>Complete your purchase</h1>
        <Checkout cart={cart} setCart={setCart} />
      </header>
    </div>
  );
}

export default Paymentpage;
