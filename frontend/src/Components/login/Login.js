import React from "react";
import { useState } from "react";
import LoginValidation from "./LoginValidation";
import "./Login.css"
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { MdLogin } from "react-icons/md";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../App.css'

function Login({ toggleForm }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await LoginValidation(values);
    setErrors(validationErrors);  
    if (Object.keys(errors).length === 0) { // Proceed only if there are no validation errors
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/login`, values);
        const { accessToken } = response.data;
        localStorage.setItem('token', accessToken); // Store the token
        console.log('Logged in and token stored:', accessToken);
        navigate(`/`);
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
            /> 
            <MdOutlineMail className="icon" />
            {errors.email && <p className="textdanger">{errors.email}</p>}
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <MdLockOutline className="icon" />
            {errors.password && <p className="textdanger">{errors.password}</p>}
          </div>
          <div className="signup">
            <button type="submit">Login<MdLogin /></button>
            {errors.general && <p>{errors.general}</p>}
          </div>
        </form>
        <div className="login">
          <p>Don't have an account?</p>
          <p>
            <button onClick={() => toggleForm("Signup")}>Sign up</button>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login;