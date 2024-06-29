import React from 'react';
import Payment from '../Components/Payment';

function Paymentpage() {
  return (
    <div className="paymentpage">
      <header className="payment-header">
        <h1>Complete your purchase</h1>
        <Payment />
      </header>
    </div>
  );
}

export default Paymentpage;
