import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Loginpage";
import Home from "./Pages/Homepage";
import Checkout from "./Pages/Checkoutpage";
import Resultpage from "./Pages/Resultpage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Resultpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
