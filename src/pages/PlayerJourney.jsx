import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoBrand from '../assets/logo_brand.png';
import { getUserAvatar } from '../utils/userAvatar';
import { 
  Settings, 
  Bell, 
  Sparkles, 
  TrendingUp, 
  Swords, 
  Key, 
  Shield, 
  Map, 
  Briefcase, 
  BookOpen, 
  Play, 
  MapPin, 
  X,
  Volume2,
  VolumeX,
  Type,
  Sun,
  Moon,
  Info
} from 'lucide-react';

export default function PlayerJourney() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userAvatarUrl, setUserAvatarUrl] = useState(() => getUserAvatar());

  useEffect(() => {
    const handleAvatarChange = () => {
      setUserAvatarUrl(getUserAvatar());
    };
    window.addEventListener('vocal_quest_avatar_changed', handleAvatarChange);
    return () => window.removeEventListener('vocal_quest_avatar_changed', handleAvatarChange);
  }, []);
  
  // Interactive Modal States
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showLore, setShowLore] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Accessibility Settings (Shared with Global Settings)
  const [soundOn, setSoundOn] = useState(true);
  const [fontSize, setFontSize] = useState('S');
  const [theme, setTheme] = useState('dark');

  // Trigger smooth progress bar animation on mount
  useEffect(() => {
    document.title = "Player Journey Dashboard - Vocal Quest";
    const timer = setTimeout(() => {
      setProgress(75);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync font size changes
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

  // Sync theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme-accessibility');
      root.style.backgroundColor = '#f8fafc';
      root.style.color = '#0f172a';
    } else {
      root.classList.remove('light-theme-accessibility');
      root.style.backgroundColor = '#020b16';
      root.style.color = '#f1f5f9';
    }
  }, [theme]);

  // Sample data for modals
  const inventoryItems = [
    { name: "Ancient Relic Key", desc: "A heavy brass key found near the Iron Gate.", rarity: "Rare" },
    { name: "Forest Shrine Seal", desc: "Obtained from the Guardian after proving respect.", rarity: "Epic" },
    { name: "Vocal Tuning Fork", desc: "Allows precision casting at 880Hz.", rarity: "Uncommon" },
    { name: "Whispering Moss", desc: "Glows faintly in the presence of spirits.", rarity: "Common" }
  ];

  const loreCodexEntries = [
    { title: "The Whispering Sands", desc: "A vast desert realm of shifting dunes and hidden ruins. Legend speaks of an ancient library buried beneath the sands." },
    { title: "Guardian of the Forest Shrine", desc: "A mighty spirit that tests the vocals of adventurers. Only those with steady tone may pass." },
    { title: "The Vault of Iron Gate", desc: "A long-abandoned dwarven vault sealed with a key of high frequency resonance." }
  ];

  const notifications = [
    { id: 1, text: "Achievement unlocked: Vault Breaker!", time: "2 hours ago" },
    { id: 2, text: "New campaign area open: Whispering Sands", time: "1 day ago" },
    { id: 3, text: "Weekly challenge quiz updated.", time: "3 days ago" }
  ];

  return (
    <div className="min-h-screen bg-[#001F3F] text-slate-100 font-sans flex flex-col justify-between selection:bg-[#EFB034]/30 selection:text-[#EFB034]">
      {/* Embedded CSS for custom premium styles and animations */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(239, 176, 52, 0.4), inset 0 0 10px rgba(239, 176, 52, 0.2); 
            border-color: rgba(239, 176, 52, 0.8);
          }
          50% { 
            box-shadow: 0 0 25px rgba(239, 176, 52, 0.8), inset 0 0 15px rgba(239, 176, 52, 0.4); 
            border-color: rgba(255, 218, 125, 1);
          }
        }
        @keyframes floatEffect {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .glow-pulse {
          animation: pulseGlow 3s infinite ease-in-out;
        }
        .float-animate {
          animation: floatEffect 4s infinite ease-in-out;
        }
        .progress-bar-transition {
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* TOP HEADER */}
      <header className="h-16 px-6 md:px-12 flex items-center justify-between border-b border-slate-900 bg-[#0B263F]/80 backdrop-blur-md sticky top-0 z-50">
        {/* Left Side: Logo */}
        <div className="flex items-center cursor-pointer group" onClick={() => navigate('/player-journey')}>
          {/* Logo Brand Image */}
          <div className="h-12 w-auto transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
            <img src={LogoBrand} alt="Vocal Quest Brand Logo" className="h-full w-auto object-contain" />
          </div>
        </div>

        {/* Right Side: Navigation Buttons & Profile */}
        <div className="flex items-center gap-4">
          {/* Settings Button */}
          <button 
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#071324] border border-slate-800 text-[#EFB034] hover:bg-[#0c223c] hover:border-slate-700 transition-all duration-200"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>

          {/* Bell Button */}
          <button 
            onClick={() => setShowNotifications(true)}
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#071324] border border-slate-800 text-[#EFB034] hover:bg-[#0c223c] hover:border-slate-700 transition-all duration-200 relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
          </button>

          {/* Profile Picture */}
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full overflow-hidden border border-[#EFB034] hover:border-yellow-300 transition-all duration-200 bg-slate-800 p-0.5 cursor-pointer"
            aria-label="User Profile"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-700">
              <img
                src={userAvatarUrl}
                alt="User Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = getUserAvatar();
                }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT FLOOR */}
      <main className="flex-1 flex flex-col justify-start max-w-7xl w-full mx-auto px-6 md:px-12 py-6 space-y-6">
        
        {/* HERO SECTION / ACTIVE CAMPAIGN BANNER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          {/* Left Block */}
          <div className="flex items-center gap-4">
            {/* Avatar container */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-[#EFB034]/50 shadow-md flex-shrink-0">
              <img
                src={userAvatarUrl}
                alt="Hero Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = getUserAvatar();
                }}
              />
            </div>
            
            {/* Campaign Name */}
            <div>
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#EFB034] uppercase">
                Active Campaign
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide text-white leading-tight mt-0.5">
                PLAYER JOURNEY
              </h1>
            </div>
          </div>

          {/* Right Block */}
          <div className="md:text-right flex flex-col justify-center">
            <span className="text-sm md:text-base font-bold text-[#EFB034] tracking-wide">
              Level 45 Hero
            </span>
            <span className="text-xs md:text-sm text-slate-400 font-medium">
              Realm of the Whispering Sands
            </span>
          </div>
        </div>

        {/* OVERALL COMPLETION CARD */}
        <section className="bg-[#0b1726] rounded-xl border border-slate-800 border-l-4 border-l-[#EFB034] p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#EFB034] font-semibold text-xs tracking-wider">
              <Sparkles size={14} className="animate-spin-slow" />
              <span>OVERALL COMPLETION</span>
            </div>
            <span className="text-3xl font-black text-[#EFB034] tracking-wide">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-4 bg-[#132237] rounded-full overflow-hidden relative shadow-inner">
            {/* Animated Progress Bar Fill */}
            <div 
              className="h-full bg-gradient-to-r from-[#EFB034] to-[#f4c870] rounded-full progress-bar-transition"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Requirement prompt */}
          <p className="text-[11px] text-slate-400 font-medium mt-3.5 tracking-wide">
            Requirement for "Master Historian" status: 90% completion
          </p>
        </section>

        {/* QUEST MILESTONES SECTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-[#EFB034] font-bold text-xs tracking-wider uppercase">
            <TrendingUp size={14} />
            <span>Quest Milestones</span>
          </div>

          {/* Timeline Grid container */}
          <div className="relative">
            {/* Connecting Line (desktop only) */}
            <div className="absolute top-10 left-12 right-12 h-0.5 bg-slate-800/80 hidden md:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* Milestone 1: Guardian's Respect */}
              <div 
                className="flex flex-col items-center text-center cursor-pointer group"
                onClick={() => setSelectedMilestone({
                  title: "GUARDIAN'S RESPECT",
                  type: "ACHIEVEMENT",
                  state: "Saved State: Forest Shrine",
                  details: "Unlocked after completing the voice-narrative choice nodes and demonstrating maximum respect to the woodland guardian. Your resonance was rated highly stabilized at 98% coherence."
                })}
              >
                {/* Badge Circle */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-black border-2 border-[#EFB034] glow-pulse cursor-pointer transition-transform duration-300 group-hover:scale-105 mb-4 relative z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#071324] border border-[#EFB034]/40">
                    <Swords size={26} className="text-[#EFB034]" />
                  </div>
                </div>

                {/* Milestone Info Card */}
                <div className="bg-[#0b1726] border border-slate-800/80 rounded-xl p-5 w-full shadow-lg transition-all duration-200 group-hover:border-slate-700">
                  <span className="text-[9px] font-bold text-[#EFB034] tracking-widest uppercase">
                    Achievement
                  </span>
                  <h3 className="text-sm font-extrabold text-white uppercase mt-1 tracking-wide">
                    Guardian's Respect
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">
                    Saved State: Forest Shrine
                  </p>
                </div>
              </div>

              {/* Milestone 2: Vault Breaker */}
              <div 
                className="flex flex-col items-center text-center cursor-pointer group"
                onClick={() => setSelectedMilestone({
                  title: "VAULT BREAKER",
                  type: "ACHIEVEMENT",
                  state: "Saved State: Iron Gate",
                  details: "Granted for opening the Vault of the Iron Gate using a combination of pitch shifting voice keys. Sound level exceeded 85 dB at exactly the target frequency grid."
                })}
              >
                {/* Badge Circle */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-black border-2 border-[#EFB034] glow-pulse cursor-pointer transition-transform duration-300 group-hover:scale-105 mb-4 relative z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#071324] border border-[#EFB034]/40">
                    <Key size={26} className="text-[#EFB034] -rotate-45" />
                  </div>
                </div>

                {/* Milestone Info Card */}
                <div className="bg-[#0b1726] border border-slate-800/80 rounded-xl p-5 w-full shadow-lg transition-all duration-200 group-hover:border-slate-700">
                  <span className="text-[9px] font-bold text-[#EFB034] tracking-widest uppercase">
                    Achievement
                  </span>
                  <h3 className="text-sm font-extrabold text-white uppercase mt-1 tracking-wide">
                    Vault Breaker
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">
                    Saved State: Iron Gate
                  </p>
                </div>
              </div>

              {/* Milestone 3: Master Historian */}
              <div 
                className="flex flex-col items-center text-center cursor-pointer group"
                onClick={() => setSelectedMilestone({
                  title: "MASTER HISTORIAN",
                  type: "IN PROGRESS",
                  state: "Current: Ancient Library",
                  details: "The final challenge of the Realm of Whispering Sands. Unlock by solving all 50 lore questions in the Library archives. You must maintain 90% accuracy."
                })}
              >
                {/* Badge Circle */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#06111f] border-2 border-slate-800 cursor-pointer transition-transform duration-300 group-hover:scale-105 mb-4 relative z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#030b15] border border-slate-800/60">
                    <Shield size={26} className="text-slate-600" />
                  </div>
                </div>

                {/* Milestone Info Card */}
                <div className="bg-[#0b1726]/40 border border-slate-900 rounded-xl p-5 w-full shadow-md transition-all duration-200 group-hover:border-slate-800">
                  <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                    In Progress
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-400 uppercase mt-1 tracking-wide">
                    Master Historian
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-2 font-medium">
                    Current: Ancient Library
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* BOTTOM NAV BAR & ACTIONS */}
        <section className="flex flex-col lg:flex-row justify-between gap-6 pt-4">
          {/* Left Cards Block (3 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            
            {/* World Map button */}
            <button 
              onClick={() => setShowMap(true)}
              className="flex items-center gap-4 bg-[#0b1726] border border-slate-800 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:border-[#EFB034]/50 group"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#071324] border border-slate-800 text-[#EFB034] group-hover:text-yellow-300 transition duration-200">
                <Map size={18} />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-black text-white tracking-wide">WORLD MAP</h4>
                <p className="text-[9px] text-[#EFB034] font-bold tracking-wider mt-0.5">NAVIGATE REALMS</p>
              </div>
            </button>

            {/* Inventory button */}
            <button 
              onClick={() => setShowInventory(true)}
              className="flex items-center gap-4 bg-[#0b1726] border border-slate-800 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:border-[#EFB034]/50 group"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#071324] border border-slate-800 text-[#EFB034] group-hover:text-yellow-300 transition duration-200">
                <Briefcase size={18} />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-black text-white tracking-wide">INVENTORY</h4>
                <p className="text-[9px] text-[#EFB034] font-bold tracking-wider mt-0.5">GEAR & ARTIFACTS</p>
              </div>
            </button>

            {/* Lore Codex button */}
            <button 
              onClick={() => setShowLore(true)}
              className="flex items-center gap-4 bg-[#0b1726] border border-slate-800 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:border-[#EFB034]/50 group"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#071324] border border-slate-800 text-[#EFB034] group-hover:text-yellow-300 transition duration-200">
                <BookOpen size={18} />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-black text-white tracking-wide">LORE CODEX</h4>
                <p className="text-[9px] text-[#EFB034] font-bold tracking-wider mt-0.5">DISCOVERED MYTHOS</p>
              </div>
            </button>

          </div>

          {/* Right Button: Continue (Large Yellow) */}
          <button 
            onClick={() => navigate('/whispering-woods')}
            className="flex items-center justify-center gap-3.5 bg-[#EFB034] hover:bg-yellow-400 text-[#020b16] font-extrabold text-sm tracking-widest uppercase rounded-xl py-5 px-10 shadow-lg shadow-[#EFB034]/15 transition-all duration-300 hover:scale-[1.02] active:scale-95 group shrink-0 min-w-[240px]"
          >
            <div className="w-6 h-6 rounded-full bg-[#020b16] flex items-center justify-center text-[#EFB034] group-hover:scale-115 transition-all duration-300">
              <Play size={10} fill="currentColor" className="ml-0.5" />
            </div>
            <span>CONTINUE</span>
          </button>
        </section>

      </main>

      {/* BOTTOM FOOTER STATUS BAR */}
      <footer className="h-10 px-6 md:px-12 flex items-center justify-between border-t border-slate-900 bg-[#020710] text-[10px] tracking-widest font-semibold text-slate-500">
        {/* Left Side Location */}
        <div className="flex items-center gap-1.5 text-[#EFB034] uppercase font-sans font-bold">
          <MapPin size={11} className="text-[#EFB034]" />
          <span>THE WHISPERING SANDS</span>
        </div>

        {/* Right Side Server Status & Version */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SERVER STABLE</span>
          </div>
          <span className="text-slate-600">V.2.4.5</span>
        </div>
      </footer>


      {/* --- INTERACTIVE MODALS --- */}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0b1726] border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition"
            >
              <X size={16} />
            </button>
            <h3 className="text-md font-bold text-[#EFB034] tracking-wide mb-6 uppercase font-sans">Settings</h3>
            
            <div className="space-y-5 text-sm">
              {/* Volume toggle */}
              <div className="flex items-center justify-between">
                <span>Sound FX</span>
                <button 
                  onClick={() => setSoundOn(!soundOn)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                    soundOn ? 'border-[#EFB034]/40 bg-[#EFB034]/10 text-[#EFB034]' : 'border-slate-800 bg-slate-900 text-slate-500'
                  }`}
                >
                  {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  <span>{soundOn ? 'Enabled' : 'Muted'}</span>
                </button>
              </div>

              {/* Text accessibility */}
              <div className="flex items-center justify-between">
                <span>Accessibility Font</span>
                <div className="flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg">
                  <button 
                    onClick={() => setFontSize('S')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                      fontSize === 'S' ? 'bg-[#EFB034] text-[#020b16]' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Standard
                  </button>
                  <button 
                    onClick={() => setFontSize('L')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                      fontSize === 'L' ? 'bg-[#EFB034] text-[#020b16]' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Large (18px)
                  </button>
                </div>
              </div>

              {/* Contrast theme */}
              <div className="flex items-center justify-between">
                <span>Contrast Theme</span>
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:border-slate-700 transition text-slate-300"
                >
                  {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                  <span>{theme === 'dark' ? 'High Contrast Dark' : 'High Contrast Light'}</span>
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => setShowSettings(false)}
              className="mt-8 w-full py-2 bg-[#EFB034] hover:bg-yellow-400 text-[#020b16] font-bold text-xs uppercase rounded-lg tracking-wider transition"
            >
              Apply & Close
            </button>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0b1726] border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowNotifications(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition"
            >
              <X size={16} />
            </button>
            <h3 className="text-md font-bold text-[#EFB034] tracking-wide mb-4 uppercase font-sans">Notifications</h3>
            
            <div className="divide-y divide-slate-800">
              {notifications.map(n => (
                <div key={n.id} className="py-3.5">
                  <p className="text-xs font-semibold text-slate-200">{n.text}</p>
                  <span className="text-[9px] text-slate-500 mt-1 block">{n.time}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowNotifications(false)}
              className="mt-6 w-full py-2 bg-[#071324] hover:bg-[#0c223c] text-[#EFB034] border border-[#EFB034]/20 font-bold text-xs uppercase rounded-lg tracking-wider transition"
            >
              Clear All & Close
            </button>
          </div>
        </div>
      )}

      {/* Inventory Modal */}
      {showInventory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0b1726] border border-slate-800 rounded-xl p-6 max-w-lg w-full shadow-2xl relative">
            <button 
              onClick={() => setShowInventory(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={18} className="text-[#EFB034]" />
              <h3 className="text-md font-bold text-[#EFB034] tracking-wide uppercase font-sans">Your Inventory</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inventoryItems.map((item, idx) => (
                <div key={idx} className="bg-[#071324] border border-slate-800 p-4 rounded-lg relative overflow-hidden group hover:border-[#EFB034]/40 transition">
                  <span className="absolute top-2 right-2 text-[8px] font-bold px-2 py-0.5 rounded-full bg-[#EFB034]/10 text-[#EFB034] border border-[#EFB034]/20 uppercase">
                    {item.rarity}
                  </span>
                  <h4 className="text-xs font-bold text-white uppercase group-hover:text-[#EFB034] transition">{item.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowInventory(false)}
              className="mt-8 w-full py-2.5 bg-[#EFB034] hover:bg-yellow-400 text-[#020b16] font-bold text-xs uppercase rounded-lg tracking-wider transition"
            >
              Close Bag
            </button>
          </div>
        </div>
      )}

      {/* Lore Codex Modal */}
      {showLore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0b1726] border border-slate-800 rounded-xl p-6 max-w-lg w-full shadow-2xl relative">
            <button 
              onClick={() => setShowLore(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={18} className="text-[#EFB034]" />
              <h3 className="text-md font-bold text-[#EFB034] tracking-wide uppercase font-sans">Lore Codex</h3>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {loreCodexEntries.map((entry, idx) => (
                <div key={idx} className="bg-[#071324] border border-slate-800/80 p-4 rounded-lg">
                  <h4 className="text-xs font-extrabold text-[#EFB034] uppercase tracking-wide">{entry.title}</h4>
                  <p className="text-[10px] text-slate-300 mt-2 leading-relaxed font-sans">{entry.desc}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowLore(false)}
              className="mt-6 w-full py-2.5 bg-[#EFB034] hover:bg-yellow-400 text-[#020b16] font-bold text-xs uppercase rounded-lg tracking-wider transition"
            >
              Close Codex
            </button>
          </div>
        </div>
      )}

      {/* World Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0b1726] border border-slate-800 rounded-xl p-6 max-w-2xl w-full shadow-2xl relative">
            <button 
              onClick={() => setShowMap(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center gap-2 mb-6">
              <Map size={18} className="text-[#EFB034]" />
              <h3 className="text-md font-bold text-[#EFB034] tracking-wide uppercase font-sans">Realm Navigator Map</h3>
            </div>

            {/* Simulated Interactive Map */}
            <div className="w-full h-[320px] rounded-lg border border-slate-800 bg-[#040e1b] overflow-hidden relative flex items-center justify-center">
              <img 
                src="public/map_presence.jpg" 
                alt="Vocal Quest World Map" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-lighten pointer-events-none"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              
              {/* Map Hotspots */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Hotspot 1: Whispering Woods */}
                <div className="absolute top-1/4 left-1/4 group cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-[#EFB034] border border-black animate-pulse flex items-center justify-center shadow-lg shadow-[#EFB034]/40" />
                  <div className="absolute left-1/2 -translate-x-1/2 mt-1.5 bg-[#0b1726] border border-slate-800 px-2 py-1 rounded text-[8px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    The Whispering Woods (Completed)
                  </div>
                </div>

                {/* Hotspot 2: Ancient Library */}
                <div className="absolute top-1/2 left-2/3 group cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-cyan-400 border border-black animate-ping absolute" />
                  <div className="w-4 h-4 rounded-full bg-cyan-400 border border-black flex items-center justify-center shadow-lg shadow-cyan-400/40 relative" />
                  <div className="absolute left-1/2 -translate-x-1/2 mt-1.5 bg-[#0b1726] border border-slate-800 px-2 py-1 rounded text-[8px] text-cyan-400 font-bold opacity-100 group-hover:opacity-100 transition whitespace-nowrap shadow-md">
                    Ancient Library (Current Quest)
                  </div>
                </div>
              </div>

              <div className="relative text-center max-w-sm px-4 bg-slate-950/80 p-4 rounded-lg border border-slate-800/80 backdrop-blur-sm">
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Use your voice commands <span className="text-[#EFB034] font-mono">"Open Map"</span> or click coordinates to fast travel between unlocked sanctuaries.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowMap(false)}
              className="mt-6 w-full py-2.5 bg-[#EFB034] hover:bg-yellow-400 text-[#020b16] font-bold text-xs uppercase rounded-lg tracking-wider transition"
            >
              Close Map
            </button>
          </div>
        </div>
      )}

      {/* Milestone Details Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0b1726] border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <Info size={16} className="text-[#EFB034]" />
              <span className="text-[10px] font-bold text-[#EFB034] tracking-widest uppercase font-sans">
                {selectedMilestone.type}
              </span>
            </div>

            <h3 className="text-md font-black text-white uppercase tracking-wide font-sans">{selectedMilestone.title}</h3>
            <span className="text-[10px] text-slate-400 font-semibold block mt-1.5 font-sans">{selectedMilestone.state}</span>
            
            <p className="text-xs text-slate-300 font-sans mt-4 leading-relaxed bg-[#071324] border border-slate-800 p-4 rounded-lg">
              {selectedMilestone.details}
            </p>

            <button 
              onClick={() => setSelectedMilestone(null)}
              className="mt-6 w-full py-2.5 bg-[#EFB034] hover:bg-yellow-400 text-[#020b16] font-bold text-xs uppercase rounded-lg tracking-wider transition"
            >
              Accept & Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
