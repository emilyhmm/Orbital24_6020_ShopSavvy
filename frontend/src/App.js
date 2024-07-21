import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Loginpage";
import Home from "./pages/Homepage";
import Checkout from "./pages/Checkoutpage";
import Resultpage from "./pages/Resultpage";
import Paymentpage from "./pages/Paymentpage";
import Orderpage from "./pages/Orderpage";
import Productdetailpage from "./pages/Productdetailpage";
import Quizpage from "./pages/Quizpage";
import Settingspage from "./pages/Settingspage";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
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
            path="/product/:title"
            element={<Productdetailpage setCart={setCart} />}
          />
          <Route
            path="/payment"
            element={<Paymentpage cart={cart} setCart={setCart} />}
          />
          <Route path="/order" element={<Orderpage />} />
          <Route path="/quiz" element={<Quizpage />} />
          <Route path="/settings" element={<Settingspage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
