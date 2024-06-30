import React, { useState } from "react";
import Signup from "../Components/signup/signup2.js";
import Login from "../Components/login/Login2.js";
import Header from "../Components/Navbar";

function Loginpage() {
  const [currentForm, setCurrentForm] = useState("Login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="Loginpage">
      <Header />
      {currentForm === "Login" ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Signup toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default Loginpage;
