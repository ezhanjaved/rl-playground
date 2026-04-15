import React, { useState } from "react";
import "../styling/style.css";
import robot from "../assets/robot.png";
import { useAuthStore } from "../stores/useAuthStore";

export function Signup() {
  const { signUp, signIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", type: "" });


  const handleSubmit = async () => {
    setFeedback({ text: "", type: "" });
    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setFeedback({ text: error.message, type: "error" });
    } else {
      const { data, error } = await signUp(email, password, fullName);
      if (error) {
        setFeedback({ text: error.message, type: "error" });
      } else if (data?.user?.identities && data.user.identities.length === 0) {
        setFeedback({ text: "Account already exists! Please try logging in.", type: "error" });
      } else {
        setFeedback({ text: "We've sent you an email for confirmation. Please check your inbox!", type: "success" });
      }
    }
  };
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
            <h2 className="signup-title">{isLogin ? "Welcome Back" : "Create Account"}</h2>

            <div className="signup-buttons">
              <button className="google-btn">Sign up with Google</button>
              <button className="google-btn">Sign up with Google</button>
            </div>

            <div className="or-line">— OR —</div>

            {feedback.text && (
              <div style={{
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "14px",
                textAlign: "center",
                backgroundColor: feedback.type === "error" ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
                color: feedback.type === "error" ? "#ef4444" : "#22c55e",
                border: `1px solid ${feedback.type === "error" ? "rgba(239, 68, 68, 0.3)" : "rgba(34, 197, 94, 0.3)"}`
              }}>
                {feedback.text}
              </div>
            )}

            <div className="signup-fields">
              {!isLogin && (

                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="input-line"
                />
              )}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input-line"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="input-line"
              />
            </div>

            <button className="btn-create" onClick={handleSubmit}>
              {isLogin ? "Login" : "Create Account"}
            </button>

            <p className="login-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"} <a className="login-link" style={{ cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign up" : "Login"}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
