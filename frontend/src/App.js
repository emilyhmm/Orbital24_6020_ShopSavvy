import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Loginpage";
import Home from "./pages/Homepage";
import Checkout from "./pages/Checkoutpage";
import Resultpage from "./pages/Resultpage";
import Paymentpage from "./pages/Paymentpage";
import Orderpage from "./pages/Orderpage";
import Productdetailpage from "./pages/Productdetailpage";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home cart={cart} />} />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} setCart={setCart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={<Resultpage cart={cart} setCart={setCart} />}
          />
          <Route
            path="/payment"
            element={<Paymentpage cart={cart} setCart={setCart} />}
          />
          <Route path="/order" element={<Orderpage cart={cart} />} />
          <Route
            path="/product/:title"
            element={<Productdetailpage cart={cart} setCart={setCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
