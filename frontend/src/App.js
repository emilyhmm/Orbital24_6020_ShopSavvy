import React from "react";
import { useState } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  const [currentForm, setCurrentForm] = useState("Signup");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <>
      <div className="App">
        {currentForm === "Signup" ? (
          <Signup toggleForm={toggleForm} />
        ) : (
          <Login toggleForm={toggleForm} />
        )}
      </div>
    </>
  );
}

export default App;