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
          <span className="mic-icon" style={{fontSize: '2.5rem', color: '#fecb00'}}>🎤</span>
          <div className="logo-text">
            <span>Vocal</span><span>Quest</span>
          </div>
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
            <div className="logo-container small">
               <span className="mic-icon" style={{fontSize: '1.5rem', color: '#fecb00'}}>🎤</span>
               <div className="logo-text small">
                <span>Vocal</span><span>Quest</span>
              </div>
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