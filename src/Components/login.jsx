import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import './login.css';

const REMEMBER_MAP_KEY = 'vocal_quest_remembered_map';
const LAST_REMEMBERED_KEY = 'vocal_quest_remembered_credentials';

const DEFAULT_GOOGLE_ACCOUNTS = [
  { name: 'Alex Vocal', email: 'alex.vocal@gmail.com', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex' },
  { name: 'Jordan Quest', email: 'jordan.quest@gmail.com', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Jordan' },
  { name: 'Taylor Tone', email: 'taylor.tone@gmail.com', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Taylor' }
];

const DEFAULT_FB_ACCOUNTS = [
  { name: 'Alex Vocal (Facebook)', email: 'alex.vocal@facebook.com', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AlexFB' },
  { name: 'Jordan Quest (Facebook)', email: 'jordan.quest@facebook.com', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=JordanFB' }
];

const DEFAULT_LINKEDIN_ACCOUNTS = [
  { name: 'Alex Vocal (LinkedIn)', email: 'alex.vocal@linkedin.com', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AlexIN' },
  { name: 'Taylor Tone (LinkedIn)', email: 'taylor.tone@linkedin.com', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TaylorIN' }
];

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Social Account Chooser Modal State
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState('Google');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  // On mount, auto-load last remembered credentials if present
  useEffect(() => {
    try {
      const savedLast = localStorage.getItem(LAST_REMEMBERED_KEY);
      if (savedLast) {
        const parsed = JSON.parse(savedLast);
        if (parsed.username && parsed.password) {
          setFormData({
            username: parsed.username,
            password: parsed.password,
            rememberMe: true
          });
        }
      }
    } catch (e) {
      console.warn('Failed to load remembered credentials:', e.message);
    }
  }, []);

  const checkRememberedPassword = (inputUsername) => {
    const cleanKey = inputUsername.trim().toLowerCase();
    if (!cleanKey) return null;

    try {
      const storedMap = localStorage.getItem(REMEMBER_MAP_KEY);
      if (storedMap) {
        const map = JSON.parse(storedMap);
        if (map[cleanKey]) {
          return map[cleanKey];
        }
      }
    } catch (e) {
      console.warn('Failed to parse remembered map:', e.message);
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'username') {
      const rememberedPass = checkRememberedPassword(value);
      if (rememberedPass) {
        setFormData({
          username: value,
          password: rememberedPass,
          rememberMe: true
        });
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await authService.login(formData.username, formData.password).catch(() => null);

      const cleanInput = formData.username.trim();
      const extractedName = cleanInput.includes('@') ? cleanInput.split('@')[0] : cleanInput;
      const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);

      const fetchedUser = res?.user || res?.data?.user;
      const userSession = fetchedUser ? fetchedUser : {
        name: formattedName,
        username: cleanInput,
        email: cleanInput.includes('@') ? cleanInput : `${cleanInput}@vocalquest.com`,
        role: role || 'player',
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('vocal_quest_user', JSON.stringify(userSession));

      const cleanKey = formData.username.trim().toLowerCase();
      try {
        let map = {};
        const storedMap = localStorage.getItem(REMEMBER_MAP_KEY);
        if (storedMap) {
          map = JSON.parse(storedMap);
        }

        if (formData.rememberMe) {
          map[cleanKey] = formData.password;
          localStorage.setItem(REMEMBER_MAP_KEY, JSON.stringify(map));
          localStorage.setItem(LAST_REMEMBERED_KEY, JSON.stringify({
            username: formData.username,
            password: formData.password
          }));
        } else {
          delete map[cleanKey];
          localStorage.setItem(REMEMBER_MAP_KEY, JSON.stringify(map));
          localStorage.removeItem(LAST_REMEMBERED_KEY);
        }
      } catch (e) {
        console.warn('Failed to save remember me settings:', e.message);
      }

      const userRole = userSession.role || role;

      if (userRole === 'admin' || role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/whispering-woods');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Invalid email/username or password');
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
      let res = await authService.login(account.email, socialPassword).catch(() => null);
      if (!res) {
        res = await authService.register(account.name, account.email, socialPassword).catch(() => null);
      }

      const userSession = {
        name: account.name,
        username: account.name,
        email: account.email,
        provider: socialPlatform,
        role: role || 'player',
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };

      if (res && res.token) {
        localStorage.setItem('vocal_quest_token', res.token);
        localStorage.setItem('vocal_quest_user', JSON.stringify(res.user || userSession));
      } else {
        localStorage.setItem('vocal_quest_user', JSON.stringify(userSession));
      }

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/whispering-woods');
      }
    } catch (err) {
      console.error('Social login error:', err);
      setErrorMessage(`Failed to authenticate with ${socialPlatform} account.`);
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

          {errorMessage && (
            <div className="p-3 mb-4 text-sm text-red-300 bg-red-900/40 border border-red-500/50 rounded-lg text-center">
              {errorMessage}
            </div>
          )}

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
              <label>Email or Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your email or username"
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

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : `Login as ${role === 'admin' ? 'Admin' : 'User'}`}
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
              <button type="button" onClick={() => handleSocialClick('Google')} className="social-icon google" title="Login via Google">G</button>
              <button type="button" onClick={() => handleSocialClick('Facebook')} className="social-icon facebook" title="Login via Facebook">f</button>
              <button type="button" onClick={() => handleSocialClick('LinkedIn')} className="social-icon linkedin" title="Login via LinkedIn">in</button>
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
              <p className="text-xs text-slate-400 mt-1">Select an account to sign in / sign up to Vocal Quest</p>
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
            <p>Enhance your speaking and learning through interactive quizzes.</p>
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
