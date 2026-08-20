import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../api/authService';
import './forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetUrl, setResetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setResetUrl('');
    setIsError(false);
    setLoading(true);

    try {
      const res = await authService.forgotPassword(email);
      console.log('Forgot password API response:', res);
      setMessage(res.message || 'Reset link generated successfully.');
      if (res.resetUrl || res.resetToken) {
        setResetUrl(res.resetUrl || `/reset-password?token=${res.resetToken}`);
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setIsError(true);
      setMessage(err.message || 'Failed to request password reset. Please try again.');
    } finally {
      setLoading(false);
    }
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
              Enter your registered email to receive your password reset link
            </p>
          </div>

          {message && (
            <div className={`p-3 mb-4 text-sm rounded-lg text-center border ${isError ? 'bg-red-900/40 text-red-300 border-red-500/50' : 'bg-emerald-900/40 text-emerald-300 border-emerald-500/50'}`}>
              {message}
            </div>
          )}

          {resetUrl && (
            <div className="p-3 mb-4 bg-amber-950/60 border border-amber-500/50 rounded-lg text-center text-xs text-amber-200">
              <p className="font-semibold mb-1">🔗 Direct Password Reset Link:</p>
              <Link to={resetUrl} className="underline text-amber-300 hover:text-amber-100 break-all font-mono">
                Click here to reset your password
              </Link>
            </div>
          )}

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
            <button type="submit" className="send-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
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
              Enhance your speaking and learning through interactive quizzes.
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
