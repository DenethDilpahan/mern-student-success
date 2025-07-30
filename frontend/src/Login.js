import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.userId);
        setMessage("");

        // Show Success Overlay
        setShowSuccessOverlay(true);

        // After 2 seconds, navigate to homepage
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login fetch error:", error);
      setMessage("Login failed due to network error");
    }
  };

  return (
    <>
      {showSuccessOverlay && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="checkmark">&#10004;</div>
            <p>Login Successful!</p>
          </div>
        </div>
      )}

      <div className="login-page">
        <div className="login-card">
          <h2>Login</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /></div>
            <div>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /></div>
            <div className="button-and-register">
            <div><button type="submit">Login</button></div>
            <div className="register">Don't have an account? <a href="/register">Register here</a></div></div>
          </form>
          {message && <p className="login-message">{message}</p>}
        </div>
      </div>
    </>
  );
}
