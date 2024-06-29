import React, { useState } from "react";
import Signup from "../Components/signup/signup2.js";
import Login from "../Components/login/Login2.js";
import Header from "../Components/Navbar";

function Loginpage() {
  const [currentForm, setCurrentForm] = useState("Signup");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="Loginpage">
      <NavBar />
      {currentForm === "Signup" ? (
        <Signup toggleForm={toggleForm} />
      ) : (
        <Login toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default Loginpage;
