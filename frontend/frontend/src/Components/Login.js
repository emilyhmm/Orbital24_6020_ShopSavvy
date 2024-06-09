import React from "react";
import { useState } from "react";
import LoginValidation from "./LoginValidation";

function Login({ toggleForm }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(LoginValidation(values));
  };
  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Login to your account</div>
          <div className="underline"></div>
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput}
          />
          {errors.email && <p className="textdanger">{errors.email}</p>}
        </div>
        <div className="input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />
          {errors.password && <p className="textdanger">{errors.password}</p>}
        </div>
      </div>
      <div className="signup">
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>{" "}
      </div>
      <div className="login">
        <p>Don't have an account?</p>
        <p>
          <button onClick={() => toggleForm("Signup")}>Sign up</button>
        </p>
      </div>
    </>
  );
}

export default Login;
