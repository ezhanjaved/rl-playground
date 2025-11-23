import React from "react";
import "../styling/style.css";
import robot from "../assets/robot.png";

export function Signup() {
  return (
    <div className="signup-wrapper">
      <div className="signup-inner">
        <div className="signup-left">
          <img
            src={robot}
            alt="robot"
            className="signup-robot"
          />
        </div>

        <div className="signup-right">
          <div className="signup-box">
            <h2 className="signup-title">Create Account</h2>

            <div className="signup-buttons">
              <button className="google-btn">Sign up with Google</button>
              <button className="google-btn">Sign up with Google</button>
            </div>

            <div className="or-line">— OR —</div>

            <div className="signup-fields">
              <input placeholder="Full Name" className="input-line" />
              <input placeholder="Email" className="input-line" />
              <input
                placeholder="Password"
                type="password"
                className="input-line"
              />
            </div>

            <button className="btn-create">Create Account</button>

            <p className="login-text">
              Already have an account? <a className="login-link">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
