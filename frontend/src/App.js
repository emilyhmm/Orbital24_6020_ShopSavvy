import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Loginpage';
import Home from './pages/Homepage';
import Checkout from './pages/Checkoutpage';
import Resultpage from './pages/Resultpage';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Resultpage setCart={setCart}/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;