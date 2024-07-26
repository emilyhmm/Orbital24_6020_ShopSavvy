import Checkout from "../Components/Checkout/Checkout";

function Paymentpage({ cart, setCart }) {
  return (
    <div>
      <Checkout cart={cart} setCart={setCart} />
    </div>
  );
}

export default Paymentpage;
