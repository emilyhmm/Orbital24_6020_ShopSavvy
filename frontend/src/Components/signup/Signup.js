import React from "react";
import { useState } from "react";
import SignupValidation from "./SignupValidation";
import axios from "axios";

function Signup({ toggleForm }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await SignupValidation(values);
    setErrors(validationErrors);
    if (Object.keys(errors).length === 0) { // Proceed only if there are no validation errors
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/signup`, values); 
        console.log('Signup response:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
      }
    }
  };
  
  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput}
          />
          {errors.email && <p className="textdanger">{errors.email}</p>}
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />
          {errors.password && <p className="textdanger">{errors.password}</p>}
        </div>
        <div className="input-box">
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
        <div className="signup">
          <button type="submit">Sign up</button>
          {errors.general && <p>{errors.general}</p>}
        </div>
      </form>
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