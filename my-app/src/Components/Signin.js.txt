import React from "react";
import { useState } from "react";

function Signin({ toggleForm }) {
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Sign in to your account</div>
          <div className="underline"></div>
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="signup">Sign in </div>
      <div className="forgot">
        <u>Forgot password?</u>
      </div>
      <div className="signin">
        <p>
          Don't have an account?
          <button onClick={() => toggleForm("Signup")}>Sign up</button>
        </p>
      </div>
    </>
  );
}

export default Signin;
