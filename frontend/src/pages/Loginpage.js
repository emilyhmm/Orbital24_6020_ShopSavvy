import React, { useState } from "react";
import Signup from "../Components/signup/Signup.js";
import Login from "../Components/login/Login.js";

function Loginpage() {
  const [currentForm, setCurrentForm] = useState("Signup");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="Loginpage">
      {currentForm === "Signup" ? (
        <Signup toggleForm={toggleForm} />
      ) : (
        <Login toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default Loginpage;
