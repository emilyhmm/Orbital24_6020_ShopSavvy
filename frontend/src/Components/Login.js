import React from "react";
import { useState } from "react";
import LoginValidation from "./LoginValidation";

function Login({ toggleForm }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(LoginValidation(values)); 
    if (Object.keys(errors).length === 0) { // Proceed only if there are no validation errors
      try {
            const response = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ values })
    })
        console.log('Login response:', response.data);
        // then redirects to products homepage
      } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
      }
    }
  };
  
  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
        <form onSubmit={handleSubmit}>
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
          <div className="signup">
            <button type="submit">Login</button>
          </div>
        </form>
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