import React, { useState } from "react";
import Signup from "../Components/Auth/Signup";
import Login from "../Components/Auth/Login";
import Header from "../Components/Navbar";

function Loginpage() {
  const [currentForm, setCurrentForm] = useState("Signup");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
      <div className="Loginpage">
        <Header />
        {currentForm === "Signup" ? (
          <Signup toggleForm={toggleForm} />
        ) : (
          <Login toggleForm={toggleForm} />
        )}
      </div>
  );
}

export default Loginpage;