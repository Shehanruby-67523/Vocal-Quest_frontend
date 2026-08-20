import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../api/authService';
import './signup.css'; 

const DEFAULT_GOOGLE_ACCOUNTS = [
  { name: 'Alex Vocal', email: 'alex.vocal@gmail.com' },
  { name: 'Jordan Quest', email: 'jordan.quest@gmail.com' },
  { name: 'Taylor Tone', email: 'taylor.tone@gmail.com' }
];

const DEFAULT_FB_ACCOUNTS = [
  { name: 'Alex Vocal (Facebook)', email: 'alex.vocal@facebook.com' },
  { name: 'Jordan Quest (Facebook)', email: 'jordan.quest@facebook.com' }
];

const DEFAULT_LINKEDIN_ACCOUNTS = [
  { name: 'Alex Vocal (LinkedIn)', email: 'alex.vocal@linkedin.com' },
  { name: 'Taylor Tone (LinkedIn)', email: 'taylor.tone@linkedin.com' }
];

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Social Account Chooser Modal State
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState('Google');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await authService.register(name, email, password);
      console.log('Backend registration successful:', res);
      navigate('/whispering-woods');
    } catch (err) {
      console.error('Signup error:', err);
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialClick = (platform) => {
    setSocialPlatform(platform);
    setShowCustomInput(false);
    setCustomName('');
    setCustomEmail('');
    setShowSocialModal(true);
  };

  const handleSelectSocialAccount = async (account) => {
    setLoading(true);
    setShowSocialModal(false);
    setErrorMessage('');

    const socialPassword = `Social_${socialPlatform}_${account.email}_2026!`;

    try {
      let res = await authService.register(account.name, account.email, socialPassword).catch(() => null);
      if (!res) {
        res = await authService.login(account.email, socialPassword).catch(() => null);
      }

      const userSession = {
        name: account.name,
        username: account.name,
        email: account.email,
        provider: socialPlatform,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };

      if (res && res.token) {
        localStorage.setItem('vocal_quest_token', res.token);
        localStorage.setItem('vocal_quest_user', JSON.stringify(res.user || userSession));
      } else {
        localStorage.setItem('vocal_quest_user', JSON.stringify(userSession));
      }

      navigate('/whispering-woods');
    } catch (err) {
      console.error('Social signup error:', err);
      setErrorMessage(`Failed to sign up via ${socialPlatform}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomAccountSubmit = (e) => {
    e.preventDefault();
    if (!customEmail) return;
    const nameToUse = customName || customEmail.split('@')[0];
    handleSelectSocialAccount({ name: nameToUse, email: customEmail });
  };

  const getPlatformAccounts = () => {
    if (socialPlatform === 'Google') return DEFAULT_GOOGLE_ACCOUNTS;
    if (socialPlatform === 'Facebook') return DEFAULT_FB_ACCOUNTS;
    return DEFAULT_LINKEDIN_ACCOUNTS;
  };

  return (
    <div className="signup-page-container">
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
        <div className="signup-card">
          <div className="card-header">
            <h2>Sign up</h2>
            <p className="subtitle">Create Account now !</p>
          </div>

          {errorMessage && (
            <div className="p-3 mb-4 text-sm text-red-300 bg-red-900/40 border border-red-500/50 rounded-lg text-center">
              {errorMessage}
            </div>
          )}

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
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <div className="social-login-section">
            <p className="social-divider">Or Via Social Media</p>
            <div className="social-icons">
              <button type="button" className="social-btn google" onClick={() => handleSocialClick('Google')}>
                <span className="platform-symbol">G</span>
              </button>
              <button type="button" className="social-btn facebook" onClick={() => handleSocialClick('Facebook')}>
                <span className="platform-symbol">f</span>
              </button>
              <button type="button" className="social-btn linkedin" onClick={() => handleSocialClick('LinkedIn')}>
                <span className="platform-symbol">in</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Social Account Selector Modal */}
      {showSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0B2239] border border-[#D9B74F]/50 rounded-2xl p-6 w-full max-w-md shadow-2xl text-slate-100 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowSocialModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold p-1 rounded-full hover:bg-slate-800"
            >
              &times;
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D9B74F]/20 text-[#D9B74F] font-bold text-xl mb-3">
                {socialPlatform === 'Google' ? 'G' : socialPlatform === 'Facebook' ? 'f' : 'in'}
              </div>
              <h3 className="text-xl font-bold text-white">Choose a {socialPlatform} Account</h3>
              <p className="text-xs text-slate-400 mt-1">Select an account to sign up to Vocal Quest</p>
            </div>

            {!showCustomInput ? (
              <div className="space-y-3">
                {getPlatformAccounts().map((acc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSocialAccount(acc)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-[#D9B74F] hover:bg-slate-800/80 transition text-left group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#00132B] flex items-center justify-center border border-[#D9B74F]/30 font-bold text-[#D9B74F]">
                      {acc.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-slate-200 group-hover:text-white truncate">{acc.name}</div>
                      <div className="text-xs text-slate-400 truncate">{acc.email}</div>
                    </div>
                  </button>
                ))}

                <button
                  onClick={() => setShowCustomInput(true)}
                  className="w-full p-3 rounded-xl border border-dashed border-slate-600 text-slate-300 hover:text-white hover:border-[#D9B74F] transition text-sm font-medium flex items-center justify-center gap-2 mt-4"
                >
                  <span>+ Use another {socialPlatform} account</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomAccountSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Connor"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#D9B74F] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your {socialPlatform} Email</label>
                  <input
                    type="email"
                    placeholder={`name@${socialPlatform.toLowerCase()}.com`}
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#D9B74F] text-sm"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#D9B74F] text-slate-950 font-bold hover:bg-[#e0c465] transition text-sm"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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

export default Signup;
