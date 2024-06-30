import React, { useState } from "react";
import Signup from "../Components/signup/Signup2.js";
import Login from "../Components/login/Login2.js";

function Loginpage() {
  const [currentForm, setCurrentForm] = useState("Login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="Loginpage">
      {currentForm === "Login" ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Signup toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default Loginpage;
