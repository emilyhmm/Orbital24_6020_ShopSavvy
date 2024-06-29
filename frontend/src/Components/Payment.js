import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "axios";

const stripePromise = loadStripe('your-publishable-key');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/payment/create-payment-intent`);

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage('Payment successful!');
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="card-element">
        <CardElement />
      </div>
      <button id="submit-button" type="submit" disabled={!stripe}>
        Pay
      </button>
      <div className="payment-message">{message}</div>
    </form>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentPage;
