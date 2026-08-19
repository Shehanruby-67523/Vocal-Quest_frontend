import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset link requested for:', email);
  };

  return (
    <div className="forgot-page-container">
      <header className="page-header">
        <div className="logo-container">
          <img
            src="/pvmT4-removebg-preview.png"
            alt="Vocal Quest Logo"
            className="h-12 w-auto max-w-[200px] object-contain drop-shadow-[0_0_10px_rgba(217,183,79,0.3)]"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </header>

      <main className="form-card-container">
        <div className="forgot-card">
          <div className="card-header">
            <h2>Forgot Password?</h2>
            <p className="subtitle">
              Enter your email, then you can get <br /> reset email link
            </p>
          </div>

          <form className="forgot-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="send-btn">Send</button>
          </form>

          <div className="back-to-login">
            <Link to="/login" className="login-link">Back to Login</Link>
          </div>
        </div>
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-container small mb-3">
              <img
                src="/pvmT4-removebg-preview.png"
                alt="Vocal Quest Logo"
                className="w-[180px] sm:w-[220px] max-h-[110px] h-auto object-contain drop-shadow-[0_0_10px_rgba(217,183,79,0.3)]"
                onError={(e) => {
                  e.target.src = "/src/assets/logo_brand.png";
                }}
              />
            </div>
            <p className="footer-description">
              “Enhance your speaking and learning through interactive quizzes.”
            </p>
          </div>

          <div className="footer-links-wrapper">
            <div className="links-column">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/login">Home</Link></li>
                <li><Link to="#">About Us</Link></li>
                <li><Link to="#">Leader Board</Link></li>
                <li><Link to="#">Contact Us</Link></li>
              </ul>
            </div>
            <div className="links-column">
              <h4>Features</h4>
              <ul>
                <li><Link to="/login">Home</Link></li>
                <li><Link to="#">About Us</Link></li>
                <li><Link to="#">Leader Board</Link></li>
                <li><Link to="#">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPassword;