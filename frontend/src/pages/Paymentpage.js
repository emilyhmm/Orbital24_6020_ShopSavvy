import React from 'react';
import Payment from '../Components/Payment';

function Paymentpage({ cart, setCart }) {
  return (
    <div className="paymentpage">
      <header className="payment-header">
        <h1>Complete your purchase</h1>
        <Payment cart={cart} setCart={setCart} />
      </header>
    </div>
  );
}

export default Paymentpage;
