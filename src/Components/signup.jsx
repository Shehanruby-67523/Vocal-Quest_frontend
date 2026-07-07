import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css'; 

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (event) => {
    event.preventDefault();
    // Logic for handling the sign-up process (e.g., API call)
    console.log('Signing up with:', { name, email, password });
    // Redirect to the demon guardian quiz page on successful signup
    navigate('/demon-guardian');
  };

  const handleSocialLogin = (platform) => {
    console.log(`Logging in via ${platform}`);
    // Implement social login logic
  };

  return (
    <div className="signup-page-container">
      {/* Top Header Section with Logo */}
      <header className="page-header">
        <div className="logo-container">
          {/* Logo representation - Replace with actual image in production */}
          <div className="logo-icon-wrapper">
            <span className="mic-icon">🎤</span>
            <div className="mic-circle"></div>
            <div className="arrow-line"></div>
          </div>
          <div className="logo-text">
            <span>Vocal</span><span>Quest</span>
          </div>
        </div>
      </header>

      {/* Main Sign-Up Form Card */}
      <main className="form-card-container">
        <div className="signup-card">
          <div className="card-header">
            <h2>Sign up</h2>
            <p className="subtitle">Create Account now !</p>
          </div>
          <form className="signup-form" onSubmit={handleSignUp}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Sign up</button>
          </form>

          <div className="social-login-section">
            <p className="social-divider">Or Via Social Media</p>
            <div className="social-icons">
              <button type="button" className="social-btn google" onClick={() => handleSocialLogin('Google')}>
                {/* Simplified placeholder, real project would use official logos */}
                <span className="platform-symbol">G</span>
              </button>
              <button type="button" className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
                <span className="platform-symbol">f</span>
              </button>
              <button type="button" className="social-btn linkedin" onClick={() => handleSocialLogin('LinkedIn')}>
                <span className="platform-symbol">in</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Main Page Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-container small">
              <div className="logo-icon-wrapper small">
                <span className="mic-icon small">🎤</span>
                <div className="mic-circle small"></div>
                <div className="arrow-line small"></div>
              </div>
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
                <li><a href="#" className="active-link">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Leader Board</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className="links-column">
              <h4>Features</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Leader Board</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Signup;