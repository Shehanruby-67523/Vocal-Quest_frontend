import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import authService from '../api/authService';
import './forgotpassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!token) {
      setIsError(true);
      setMessage('Invalid or missing password reset token.');
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setIsError(true);
      setMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await authService.resetPassword(token, password);
      console.log('Reset password response:', res);
      setMessage(res.message || 'Password updated successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Reset password error:', err);
      setIsError(true);
      setMessage(err.message || 'Failed to reset password. The link may have expired.');
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
            <h2>Reset Password</h2>
            <p className="subtitle">Enter your new password below</p>
          </div>

          {message && (
            <div className={`p-3 mb-4 text-sm rounded-lg text-center border ${isError ? 'bg-red-900/40 text-red-300 border-red-500/50' : 'bg-emerald-900/40 text-emerald-300 border-emerald-500/50'}`}>
              {message}
            </div>
          )}

          <form className="forgot-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="send-btn" disabled={loading}>
              {loading ? 'Updating Password...' : 'Reset Password'}
            </button>
          </form>

          <div className="back-to-login">
            <Link to="/login" className="login-link">Back to Login</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
