import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
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

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${role} with:`, formData);

    // Perform authentication logic here...

    // Post-authentication routing logic:
    if (role === 'admin') {
      navigate('/admin'); // Redirect to Admin Panel/Command Center
    } else {
      navigate('/whispering-woods'); // Redirect to Whispering Woods level
    }
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
    <div className="login-page">
      <header className="header-logo">
        <div className="logo-container flex justify-center items-center">
          <img
            src="/pvmT4-removebg-preview.png"
            alt="Vocal Quest Logo"
            className="w-[280px] sm:w-[380px] md:w-[436px] max-h-[229px] h-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_15px_rgba(217,183,79,0.4)]"
            onError={(e) => {
              e.target.src = "/src/assets/logo_brand.png";
            }}
          />
        </div>
      </header>

      <main className="login-card-container">
        <div className="login-card">
          <h2>Log In</h2>
          <p className="subtitle">Log in to your account and seamlessly play game</p>

          {/* Role Selection Tabs */}
          <div className="role-selection">
            <button
              type="button"
              className={`role-btn ${role === 'user' ? 'active' : ''}`}
              onClick={() => handleRoleChange('user')}
            >
              Login as User
            </button>
            <button
              type="button"
              className={`role-btn ${role === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleChange('admin')}
            >
              Login as Admin
            </button>
          </div>

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
              <Link to="/forgotpassword" title="Reset your password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-btn">
              Login as {role === 'admin' ? 'Admin' : 'User'}
            </button>
          </form>

          <div className="card-footer">
            <p>Don't have an account ?
              <Link to="/signup" className="signup-link"> Sign up</Link>
            </p>
            <div className="social-divider">
              <span>Or Via Social Media</span>
            </div>
            <div className="social-icons">
              <button type="button" onClick={() => handleSocialLogin('Google')} className="social-icon google" title="Login via Google">G</button>
              <button type="button" onClick={() => handleSocialLogin('Facebook')} className="social-icon facebook" title="Login via Facebook">f</button>
              <button type="button" onClick={() => handleSocialLogin('LinkedIn')} className="social-icon linkedin" title="Login via LinkedIn">in</button>
            </div>
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
            <p>“Enhance your speaking and learning through interactive quizzes.”</p>
          </div>

          <div className="footer-links">
            <div className="link-column">
              <h4>Quick Links</h4>
              <Link to="/login">Home</Link>
              <Link to="#">About Us</Link>
              <Link to="#">Leader Board</Link>
              <Link to="#">Contact Us</Link>
            </div>
            <div className="link-column">
              <h4>Features</h4>
              <Link to="/login">Home</Link>
              <Link to="#">About Us</Link>
              <Link to="#">Leader Board</Link>
              <Link to="#">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;