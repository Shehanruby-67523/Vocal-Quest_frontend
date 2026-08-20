import { useState, useEffect, useRef } from 'react';
import userService from '../api/userService';
import { getUserAvatar, saveUserAvatar } from '../utils/userAvatar';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Compass,
  Mic,
  Trophy,
  User,
  Flame,
  ArrowLeft,
  Settings,
  Pencil,
  Star,
  Calendar,
  Target,
  Lock,
  CheckSquare,
  Check,
  BarChart2,
  Clock,
  Award,
  Upload,
  Image as ImageIcon,
  X
} from 'lucide-react';

const PRESET_AVATARS = [
  { name: 'Vocal Knight', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Knight' },
  { name: 'Mystic Mage', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mage' },
  { name: 'Shadow Rogue', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Rogue' },
  { name: 'Quest Bot', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=QuestBot' },
  { name: 'Cyber Hero', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=CyberHero' },
  { name: 'Dragon Master', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Dragon' }
];

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarToast, setAvatarToast] = useState('');
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const [profileRes, statsRes] = await Promise.all([
          userService.getProfile().catch(() => null),
          userService.getStats().catch(() => null)
        ]);
        if (profileRes && profileRes.data?.user) {
          setUserData(profileRes.data.user);
        } else {
          const cached = localStorage.getItem('vocal_quest_user');
          if (cached) setUserData(JSON.parse(cached));
        }
        if (statsRes && statsRes.data) {
          setUserStats(statsRes.data);
        }
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfileData();
  }, []);

  const saveAvatar = (newAvatarUrl) => {
    const updatedUser = { ...userData, avatar: newAvatarUrl };
    setUserData(updatedUser);
    saveUserAvatar(newAvatarUrl);

    userService.updateProfile({ avatar: newAvatarUrl }).catch(() => null);

    setAvatarToast('Profile picture updated successfully!');
    setShowAvatarModal(false);
    setTimeout(() => setAvatarToast(''), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        saveAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#00132B] text-slate-100 font-sans flex flex-col lg:flex-row">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-full lg:w-72 bg-[#0B2239] border-b lg:border-b-0 lg:border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <Link to="/whispering-woods" className="flex items-center gap-3 mb-8 group" title="Vocal Quest Home">
            <img
              src="/pvmT4-removebg-preview.png"
              alt="Vocal Quest Logo"
              className="h-12 w-auto max-w-[180px] object-contain transition-transform group-hover:scale-105 drop-shadow-[0_0_10px_rgba(217,183,79,0.3)]"
              onError={(e) => {
                e.target.src = "/src/assets/logo_brand.png";
              }}
            />
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link
              to="/whispering-woods"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition font-medium text-sm"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>

            <Link
              to="/demon-guardian"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition font-medium text-sm"
            >
              <Compass size={18} />
              <span>Quests</span>
            </Link>

            <Link
              to="/voice-print"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition font-medium text-sm"
            >
              <Mic size={18} />
              <span>Practice</span>
            </Link>

            <Link
              to="/player-journey"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition font-medium text-sm"
            >
              <Trophy size={18} />
              <span>Leaderboard</span>
            </Link>

            {/* Active Profile Link styled with solid electric blue pill (#2563EB) */}
            <Link
              to="/profile"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-white bg-[#2563EB] shadow-lg shadow-blue-600/30 font-semibold text-sm transition"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Card: 7 Day Streak Progress */}
        <div className="mt-8 p-4 bg-[#05172A] border border-amber-500/20 rounded-2xl shadow-inner">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <Flame size={20} fill="#f59e0b" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">7 Day Streak</h4>
              <p className="text-[11px] text-slate-400">Keep it up!</p>
            </div>
          </div>

          {/* 5-Step Gold Progress Bar */}
          <div className="flex items-center justify-between gap-1.5 mt-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className="h-2 flex-1 rounded-full bg-gradient-to-r from-amber-400 to-[#d9b74f] shadow-[0_0_8px_rgba(217,183,79,0.4)]"
              />
            ))}
          </div>
        </div>
      </aside>

      {/* 2. MAIN PROFILE CONTENT */}
      <main className="flex-grow p-6 lg:p-10 max-w-6xl mx-auto w-full space-y-8">
        
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 bg-[#0B2239] hover:bg-slate-800 border border-slate-700/60 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
              title="Go Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-wide">Profile</h1>
              <p className="text-xs lg:text-sm text-slate-400 mt-0.5">Track your progress and achievements</p>
            </div>
          </div>

          {/* Settings Gear Icon Button */}
          <Link
            to="/settings"
            className="p-2.5 bg-[#0B2239] hover:bg-slate-800 border border-slate-700/60 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
            title="Open Settings"
          >
            <Settings size={20} />
          </Link>
        </header>

        {/* HERO CARD */}
        <section className="bg-[#0B2239] border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            {/* Hidden File Input for Device Image Upload */}
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />

            {/* Avatar with Gold Edit Pencil Badge */}
            <div 
              onClick={() => setShowAvatarModal(true)}
              className="relative group cursor-pointer"
              title="Click to Change Profile Picture"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#d9b74f] overflow-hidden bg-slate-800 shadow-[0_0_15px_rgba(217,183,79,0.3)]">
                <img
                  src={getUserAvatar(userData)}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData?.name || 'Player')}`;
                  }}
                />
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAvatarModal(true);
                }}
                className="absolute bottom-0 right-0 p-2 bg-[#d9b74f] hover:bg-amber-400 text-[#031220] rounded-full shadow-lg transition cursor-pointer"
                title="Change Profile Picture"
              >
                <Pencil size={14} strokeWidth={3} />
              </button>
            </div>

            {/* User Info & XP Details */}
            <div className="flex-1 text-center sm:text-left space-y-3 w-full">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h2 className="text-2xl font-extrabold text-white">
                  {userData?.name || userData?.username || (userData?.email ? userData.email.split('@')[0] : 'Explorer')}
                </h2>
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-full">
                  Level 5 Explorer
                </span>
                <span className="px-2.5 py-0.5 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[11px] font-bold rounded-md font-mono">
                  Lv.5
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {userData?.email || userData?.username || 'player@vocalquest.com'}
              </p>

              {/* XP Progress Bar */}
              <div className="space-y-1.5 max-w-lg">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">1250 / 2000 XP</span>
                  <span className="text-amber-400 font-medium">750 XP to reach Level 6</span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-[#d9b74f] to-amber-300 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(217,183,79,0.5)]"
                    style={{ width: '62.5%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-card Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-3.5 p-4 bg-[#05172A] rounded-2xl border border-slate-800">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                <Star size={22} fill="#f59e0b" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">1250</p>
                <p className="text-xs text-slate-400 font-medium">Total XP Earned</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 bg-[#05172A] rounded-2xl border border-slate-800">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                <Flame size={22} fill="#f59e0b" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">7 Days</p>
                <p className="text-xs text-slate-400 font-medium">Active Streak</p>
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="text-amber-400" size={20} />
              Achievements
            </h3>
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition cursor-pointer">
              View all
            </button>
          </div>

          {/* Horizontal Grid of 5 Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            
            {/* Card 1: First Quest */}
            <div className="bg-[#0B2239] border border-slate-800 p-4 rounded-2xl flex flex-col items-center text-center space-y-2.5 transition hover:border-amber-500/40">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <Trophy size={24} fill="#f59e0b" />
              </div>
              <h4 className="text-xs font-bold text-white">First Quest</h4>
              <p className="text-[10px] text-slate-400">Completed 1st Quiz</p>
            </div>

            {/* Card 2: Voice Explorer */}
            <div className="bg-[#0B2239] border border-slate-800 p-4 rounded-2xl flex flex-col items-center text-center space-y-2.5 transition hover:border-cyan-500/40">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                <Mic size={24} />
              </div>
              <h4 className="text-xs font-bold text-white">Voice Explorer</h4>
              <p className="text-[10px] text-slate-400">Used voice controls</p>
            </div>

            {/* Card 3: 5-Day Streak */}
            <div className="bg-[#0B2239] border border-slate-800 p-4 rounded-2xl flex flex-col items-center text-center space-y-2.5 transition hover:border-blue-500/40">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
                <Calendar size={24} />
              </div>
              <h4 className="text-xs font-bold text-white">5-Day Streak</h4>
              <p className="text-[10px] text-slate-400">Maintained streak</p>
            </div>

            {/* Card 4: Perfect Score */}
            <div className="bg-[#0B2239] border border-slate-800 p-4 rounded-2xl flex flex-col items-center text-center space-y-2.5 transition hover:border-emerald-500/40">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <Target size={24} />
              </div>
              <h4 className="text-xs font-bold text-white">Perfect Score</h4>
              <p className="text-[10px] text-slate-400">Scored 100% accuracy</p>
            </div>

            {/* Card 5: Coming Soon */}
            <div className="bg-[#0B2239]/50 border border-slate-800/60 p-4 rounded-2xl flex flex-col items-center text-center space-y-2.5 opacity-60">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500">
                <Lock size={24} />
              </div>
              <h4 className="text-xs font-bold text-slate-400">Coming Soon</h4>
              <p className="text-[10px] text-slate-500">Locked badge</p>
            </div>

          </div>
        </section>

        {/* STATISTICS GRID (4 Cards) */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white">Statistics</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1 */}
            <div className="bg-[#0B2239] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <CheckSquare size={22} />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">24</p>
                <p className="text-xs text-slate-400">Quizzes Completed</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0B2239] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Check size={22} strokeWidth={3} />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">85%</p>
                <p className="text-xs text-slate-400">Average Accuracy</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0B2239] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <BarChart2 size={22} />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">12</p>
                <p className="text-xs text-slate-400">Topics Explored</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0B2239] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">8h 30m</p>
                <p className="text-xs text-slate-400">Total Time Spent</p>
              </div>
            </div>

          </div>
        </section>

        {/* RECENT ACTIVITY LIST */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>

          <div className="bg-[#0B2239] border border-slate-800 rounded-2xl p-4 divide-y divide-slate-800/80">
            
            {/* Row 1 */}
            <div className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-semibold text-white">Completed "Pronunciation Basics"</h5>
                  <p className="text-[11px] text-slate-400">2 hours ago</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                +50 XP
              </span>
            </div>

            {/* Row 2 */}
            <div className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mic size={18} />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-semibold text-white">Earned "Voice Explorer"</h5>
                  <p className="text-[11px] text-slate-400">Yesterday</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                +100 XP
              </span>
            </div>

            {/* Row 3 */}
            <div className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Trophy size={18} />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-semibold text-white">Scored 90% in "Tense Mastery"</h5>
                  <p className="text-[11px] text-slate-400">2 days ago</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                +80 XP
              </span>
            </div>

          </div>
        </section>

        {/* FOOTER & ACTION */}
        <footer className="pt-6 border-t border-slate-800 space-y-6">
          {/* Full-width Blue Primary Button */}
          <button
            onClick={() => navigate('/settings')}
            className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Pencil size={16} />
            <span>Edit Profile</span>
          </button>

          {/* Centered Copyright Text */}
          <p className="text-center text-xs text-slate-500 font-mono">
            © 2024 Vocal Quest. WCAG compliant.
          </p>
        </footer>

      </main>

      {/* AVATAR CHOOSER & UPLOAD MODAL */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B2239] border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Change Profile Picture</h3>
                  <p className="text-xs text-slate-400">Upload a custom photo or choose a quest avatar</p>
                </div>
              </div>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Upload Custom Photo Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-[#d9b74f] hover:from-amber-400 hover:to-amber-500 text-[#031220] font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-3 transition cursor-pointer"
            >
              <Upload size={20} strokeWidth={2.5} />
              <span>Upload Photo from Device</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 text-xs text-slate-500 uppercase tracking-widest font-mono">
              <div className="h-[1px] bg-slate-800 flex-1" />
              <span>or choose preset avatar</span>
              <div className="h-[1px] bg-slate-800 flex-1" />
            </div>

            {/* Preset Avatars Grid */}
            <div className="grid grid-cols-3 gap-4">
              {PRESET_AVATARS.map((avatar, idx) => (
                <button
                  key={idx}
                  onClick={() => saveAvatar(avatar.url)}
                  className="p-3 bg-[#05172A] hover:bg-[#0A2E52] border border-slate-800 hover:border-amber-500/50 rounded-2xl flex flex-col items-center gap-2 group transition cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-amber-500/30 group-hover:scale-110 transition">
                    <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 group-hover:text-amber-300 truncate w-full text-center">
                    {avatar.name}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* TOAST FEEDBACK BANNER */}
      {avatarToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce font-bold text-xs">
          <Check size={18} />
          <span>{avatarToast}</span>
        </div>
      )}

    </div>
  );
}