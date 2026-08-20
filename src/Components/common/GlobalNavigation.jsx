import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserAvatar } from '../../utils/userAvatar';
import { 
  Volume2, 
  VolumeX, 
  Search, 
  HelpCircle, 
  User, 
  Sun, 
  Moon, 
  Type 
} from 'lucide-react';

export default function GlobalNavigation({ 
  onToggleHelp, 
  showHelp, 
  onSearchChange,
  searchVal 
}) {
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState('S'); // 'S' or 'L'
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [soundOn, setSoundOn] = useState(true);

  // Apply font size accessibility globally
  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'L') {
      root.classList.add('text-lg-accessibility');
      root.style.fontSize = '18px';
    } else {
      root.classList.remove('text-lg-accessibility');
      root.style.fontSize = '16px';
    }
  }, [fontSize]);

  // Apply theme class globally
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme-accessibility');
      root.style.backgroundColor = '#f8fafc';
      root.style.color = '#0f172a';
    } else {
      root.classList.remove('light-theme-accessibility');
      root.style.backgroundColor = '#070b13';
      root.style.color = '#f1f5f9';
    }
  }, [theme]);

  const toggleFontSize = (size) => {
    setFontSize(size);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleSound = () => {
    setSoundOn(prev => !prev);
  };

  const [userAvatarUrl, setUserAvatarUrl] = useState(() => getUserAvatar());

  useEffect(() => {
    const handleAvatarChange = () => {
      setUserAvatarUrl(getUserAvatar());
    };
    window.addEventListener('vocal_quest_avatar_changed', handleAvatarChange);
    return () => window.removeEventListener('vocal_quest_avatar_changed', handleAvatarChange);
  }, []);

  return (
    <header className="h-16 bg-[#0B263F]/80 border-b border-slate-800/60 flex items-center justify-between px-6 sticky top-0 z-50 backdrop-blur-md select-none transition-colors duration-300">
      
      {/* Left section: Logo & Accessibility Controls */}
      <div className="flex items-center gap-6">
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('/whispering-woods')} 
          className="flex items-center gap-2.5 cursor-pointer group"
          title="Vocal Quest Home"
        >
          <img
            src="/pvmT4-removebg-preview.png"
            alt="Vocal Quest Logo"
            className="h-10 w-auto max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_10px_rgba(217,183,79,0.3)]"
            onError={(e) => {
              e.target.src = "/src/assets/logo_brand.png";
            }}
          />
        </div>

        {/* Font Size Accessibility Toggle */}
        <div className="flex items-center gap-1.5 bg-[#11192e] border border-slate-800/80 rounded-full p-0.5">
          <div className="text-[10px] text-slate-500 font-semibold px-2 flex items-center gap-0.5">
            <Type size={11} className="text-slate-400" />
          </div>
          <button
            onClick={() => toggleFontSize('S')}
            className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all duration-150 ${
              fontSize === 'S'
                ? 'bg-gold-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            S
          </button>
          <button
            onClick={() => toggleFontSize('L')}
            className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all duration-150 ${
              fontSize === 'L'
                ? 'bg-gold-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            L
          </button>
        </div>

        {/* Theme Contrast Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#11192e] border border-slate-800/80 text-slate-400 hover:text-gold-400 transition duration-150"
          title="Toggle Contrast Mode"
        >
          {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
        </button>

        {/* Sound FX Toggle */}
        <button
          onClick={toggleSound}
          className={`flex items-center justify-center w-8 h-8 rounded-full border transition duration-150 ${
            soundOn 
              ? 'bg-gold-400/10 border-gold-400/30 text-gold-400 hover:bg-gold-400/20' 
              : 'bg-[#11192e] border-slate-800/80 text-slate-500 hover:text-slate-300'
          }`}
          title={soundOn ? 'Sound On' : 'Sound Muted'}
        >
          {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>
      </div>

      {/* Center/Right section: Search & Actions */}
      <div className="flex items-center gap-4">
        {/* Search Commands input */}
        <div className="relative w-60">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search commands..."
            className="w-full bg-[#11192e] text-xs text-slate-300 pl-9 pr-4 py-2 rounded-full border border-slate-800/80 focus:outline-none focus:border-gold-400/50 transition duration-150"
          />
        </div>

        {/* HELP Action Toggle */}
        <button
          onClick={onToggleHelp}
          className={`text-xs font-semibold px-4 py-2 rounded-full border transition duration-150 flex items-center gap-1.5 ${
            showHelp
              ? 'bg-gold-400 text-slate-950 border-gold-400 shadow-md'
              : 'border-gold-400/50 text-gold-400 hover:bg-gold-400/10'
          }`}
        >
          <HelpCircle size={13} />
          <span>HELP</span>
        </button>

        {/* User Account Avatar */}
        <div 
          onClick={() => navigate('/profile')}
          className="w-8 h-8 rounded-full border border-gold-400/60 overflow-hidden bg-slate-800 p-0.5 cursor-pointer hover:border-gold-400 hover:scale-105 transition transform"
          title="View Profile"
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
            <img 
              src={userAvatarUrl} 
              alt="User Profile Avatar" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = getUserAvatar();
              }} 
            />
          </div>
        </div>
      </div>

    </header>
  );
}
