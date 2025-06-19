import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config.js";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Floating animation for background elements
  useEffect(() => {
    const moveElements = (e) => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        const speed = particle.getAttribute('data-speed');
        const x = (e.clientX * speed) / 100;
        const y = (e.clientY * speed) / 100;
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    window.addEventListener('mousemove', moveElements);
    return () => window.removeEventListener('mousemove', moveElements);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div className="login-container">
      {/* Animated background elements */}
      <div className="particle particle-1" data-speed="5"></div>
      <div className="particle particle-2" data-speed="10"></div>
      <div className="particle particle-3" data-speed="15"></div>
      <div className="particle particle-4" data-speed="20"></div>

      <div className="login-box">
        <div className="login-header">
          <div className="logo-wrapper">
            <div className="logo-circle"></div>
            <h1>BONUS <span>LIFE</span></h1>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue your fitness journey</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group floating-input">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
          </div>

          <div className="form-group floating-input">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <span>Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M10 17l5-5-5-5v10z"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <a href="#forgot" onClick={handleForgotPasswordClick}>
            Forgot password?
          </a>
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;