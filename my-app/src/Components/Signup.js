import React from "react";
import { useState } from "react";
import SignupValidation from "./SignupValidation";

function Signup({ toggleForm }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(SignupValidation(values));
  };
  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Create an account</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <form action="/signup" method="post">
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
          <div className="input">
            <input
              type="password"
              name="password2"
              placeholder="Confirm password"
              onChange={handleInput}
            />
            {errors.password2 && (
              <p className="textdanger">{errors.password2}</p>
            )}
          </div>
        </form>
      </div>
      <div className="signup">
        <button type="submit" onClick={handleSubmit}>
          Sign up
        </button>
      </div>
      <div className="login">
        <p>Already have an account?</p>
        <p>
          <button onClick={() => toggleForm("Login")}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
