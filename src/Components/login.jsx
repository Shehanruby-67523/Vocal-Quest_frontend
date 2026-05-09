import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
  };

  return (
    <div className="login-page">
      {/* Top Logo Section */}
      <header className="header-logo">
        <div className="logo-container">
          <span className="mic-icon">🎤</span>
          <h1>Vocal <span>Quest</span></h1>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="login-card-container">
        <div className="login-card">
          <h2>Log In</h2>
          <p className="subtitle">Log in to your account and seamlessly play game</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input 
                type="text" 
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#forgot" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <div className="card-footer">
            <p>Don't have an account ? <a href="#signup" className="signup-link">Sign up</a></p>
            <div className="social-divider">
              <span>Or Via Social Media</span>
            </div>
            <div className="social-icons">
              <button className="social-icon google">G</button>
              <button className="social-icon facebook">f</button>
              <button className="social-icon linkedin">in</button>
            </div>
          </div>
        </div>
      </main>

      {/* Site Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-container small">
              <span className="mic-icon">🎤</span>
              <h3>Vocal <span>Quest</span></h3>
            </div>
            <p>“Enhance your speaking and learning through interactive quizzes.”</p>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>Quick Links</h4>
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/leaderboard">Leader Board</a>
              <a href="/contact">Contact Us</a>
            </div>
            <div className="link-column">
              <h4>Features</h4>
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/leaderboard">Leader Board</a>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;