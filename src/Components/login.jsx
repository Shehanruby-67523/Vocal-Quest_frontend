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

  return (
    <div className="login-page">
      <header className="header-logo">
        <div className="logo-container">
          <span className="mic-icon">🎤</span>
          <h1>Vocal <span>Quest</span></h1>
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
              <button className="social-icon google">G</button>
              <button className="social-icon facebook">f</button>
              <button className="social-icon linkedin">in</button>
            </div>
          </div>
        </div>
      </main>

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