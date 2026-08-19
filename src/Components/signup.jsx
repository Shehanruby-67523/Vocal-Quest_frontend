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
    // Redirect to whispering woods level on successful signup
    navigate('/whispering-woods');
  };

  const handleSocialLogin = (platform) => {
    const redirectUri = window.location.origin + '/whispering-woods';
    
    // Save user session details for social sign-in
    const userSession = {
      username: `${platform} User`,
      provider: platform,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('vocal_quest_user', JSON.stringify(userSession));

    if (platform === 'Google') {
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=1039828192-sample.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent('openid profile email')}`;
      try {
        window.location.href = googleAuthUrl;
      } catch (e) {
        navigate('/whispering-woods');
      }
    } else if (platform === 'Facebook') {
      const fbAuthUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=1234567890&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email,public_profile`;
      try {
        window.location.href = fbAuthUrl;
      } catch (e) {
        navigate('/whispering-woods');
      }
    } else if (platform === 'LinkedIn') {
      const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=1234567890&redirect_uri=${encodeURIComponent(redirectUri)}&scope=r_liteprofile%20r_emailaddress`;
      try {
        window.location.href = linkedinAuthUrl;
      } catch (e) {
        navigate('/whispering-woods');
      }
    } else {
      navigate('/whispering-woods');
    }
  };

  return (
    <div className="signup-page-container">
      {/* Top Header Section with Logo */}
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