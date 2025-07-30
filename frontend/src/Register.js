import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Register.css';

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://192.168.22.10:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("");
        setShowSuccessOverlay(true);

        // After 2 seconds, navigate to login page
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration fetch error:", error);
      setMessage("Registration failed due to network error");
    }
  };

  return (
    <>
      {showSuccessOverlay && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="checkmark">&#10004;</div>
            <p>Registration Successful! Redirecting to login...</p>
          </div>
        </div>
      )}

      <div className="register-page">
        <div className="register-card">
          <h2>Register</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="register-details">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /></div>

            <div className="register-details">
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            /></div>


            <div className="register-details">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            /></div>


            <div className="register-details">
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            /></div>

            <div className="register-button"><button type="submit">Register</button></div>
          </form>
          {message && <p className="register-message">{message}</p>}
        </div>
      </div>
    </>
  );
}
