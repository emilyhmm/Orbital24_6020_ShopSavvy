import React from "react";
import { useState } from "react";

function Signup({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <div className="header">
        <div className="text">Create an account</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <form>
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <input type="password" placeholder="Password" />
          </div>
          <div className="input">
            <input type="password" placeholder="Confirm password" />
          </div>
        </form>
      </div>
      <div className="signup">Sign up</div>
      <div className="signin">
        <p>
          Already have an account?
          <button onClick={() => toggleForm("Signin")}>Sign in</button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
