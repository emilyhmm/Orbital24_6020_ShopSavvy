import "./styles.css";
import React from "react";
import { useState } from "react";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";

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
          <Signin toggleForm={toggleForm} />
        )}
      </div>
    </>
  );
}

export default App;
