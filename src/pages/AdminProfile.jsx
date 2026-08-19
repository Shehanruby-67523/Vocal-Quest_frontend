import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  User, 
  Key, 
  Activity, 
  Database, 
  Users, 
  Clock, 
  Bell, 
  Search, 
  Edit3, 
  Lock, 
  FileText, 
  CheckCircle2, 
  ArrowUpRight, 
  Zap,
  Sliders,
  LogOut
} from 'lucide-react';
import AdminSidebar from '../Components/common/AdminSidebar';

export default function AdminProfile() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  // Admin User Profile Details
  const [adminDetails, setAdminDetails] = useState({
    name: 'Sajani (Admin)',
    email: 'admin@vocalquest.io',
    role: 'SUPER ADMINISTRATOR',
    accessLevel: 'Level 99 • Master Control',
    securityStatus: '2FA Active & SSO Verified',
    joinedDate: 'January 2023',
    department: 'Capstone Game Development'
  });

  const handleSaveProfile = () => {
    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false), 2500);
  };

  return (
    <div className="flex min-h-screen bg-[#070b13] text-slate-100 font-sans antialiased select-none overflow-x-hidden">
      
      {/* 1. ADMIN SIDEBAR NAVIGATION */}
      <AdminSidebar />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#070b13]">
        
        {/* HEADER BAR */}
        <header className="h-[69px] bg-[#0F172A]/80 border-b border-[#FACC15]/10 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
              <span>Admin Profile</span>
              <span className="text-[10px] font-bold text-[#FACC15] bg-[#FACC15]/10 border border-[#FACC15]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                SUPER ADMIN
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search admin logs..."
                className="w-full bg-[#0A2E52] text-xs text-slate-200 pl-9 pr-4 py-2 rounded-lg border border-slate-700/60 focus:outline-none focus:border-[#FACC15] placeholder-slate-500 transition"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:text-[#FACC15] transition relative cursor-pointer"
                title="Admin System Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#0F172A]" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-64 bg-[#0B2239] border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-xs">
                  <div className="font-bold text-[#FACC15] border-b border-slate-700/60 pb-2 mb-2 uppercase tracking-wider text-[10px]">
                    Admin Security Alerts
                  </div>
                  <p className="text-slate-300 py-1">Admin session active with full administrative privileges.</p>
                </div>
              )}
            </div>

            {/* Admin Avatar Header Icon */}
            <div 
              onClick={() => navigate('/admin/profile')}
              className="w-8 h-8 rounded-full border-2 border-[#FACC15] overflow-hidden bg-slate-800 p-0.5 cursor-pointer hover:scale-105 transition"
              title="Admin Profile"
            >
              <div className="w-full h-full rounded-full bg-[#0A2E52] flex items-center justify-center text-xs font-black text-[#FACC15]">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY WORKSPACE */}
        <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* SECTION 1: HERO ADMIN PROFILE CARD */}
          <section className="bg-gradient-to-r from-[#0F172A] via-[#0A2E52] to-[#0F172A] border border-[#FACC15]/20 p-8 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Background Glow Effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center gap-6 z-10">
              
              {/* Admin Avatar Circle */}
              <div className="w-24 h-24 rounded-full border-4 border-[#FACC15] p-1 bg-[#0F172A] shadow-[0_0_20px_rgba(250,204,21,0.3)] relative">
                <div className="w-full h-full rounded-full bg-[#0A2E52] flex items-center justify-center text-2xl font-black text-[#FACC15]">
                  SA
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0F172A]" title="Online" />
              </div>

              {/* Admin Info */}
              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h2 className="text-2xl font-black text-white">{adminDetails.name}</h2>
                  <span className="px-2.5 py-0.5 bg-[#FACC15]/10 border border-[#FACC15]/30 text-[#FACC15] text-[10px] font-bold uppercase rounded-full tracking-wider">
                    {adminDetails.role}
                  </span>
                </div>
                
                <p className="text-sm text-slate-300 font-mono">{adminDetails.email}</p>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-2">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <ShieldCheck size={14} className="text-[#FACC15]" />
                    {adminDetails.accessLevel}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Lock size={14} className="text-emerald-400" />
                    {adminDetails.securityStatus}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 z-10 w-full sm:w-auto">
              <button
                onClick={handleSaveProfile}
                className="py-2.5 px-5 bg-[#FACC15] hover:bg-amber-400 text-[#000000] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Edit3 size={14} fill="#000" />
                <span>Save Profile</span>
              </button>
              <button
                onClick={() => navigate('/login')}
                className="py-2.5 px-5 bg-[#0F172A] hover:bg-rose-950/60 border border-rose-500/40 text-rose-300 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut size={14} />
                <span>Admin Logout</span>
              </button>
            </div>

          </section>

          {/* Save Success Banner */}
          {editSuccess && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-xl">
              <CheckCircle2 size={18} className="text-emerald-400" />
              Admin profile preferences updated successfully!
            </div>
          )}

          {/* SECTION 2: ADMIN SYSTEM STATS CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#0B2239]/60 border border-slate-700/60 p-6 rounded-2xl space-y-3 shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Users Managed</span>
                <div className="p-2 bg-[#FACC15]/10 rounded-lg text-[#FACC15]">
                  <Users size={18} />
                </div>
              </div>
              <h3 className="text-3xl font-extrabold text-white">1,420</h3>
              <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <ArrowUpRight size={14} /> +12% this month
              </p>
            </div>

            <div className="bg-[#0B2239]/60 border border-slate-700/60 p-6 rounded-2xl space-y-3 shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Quiz Questions</span>
                <div className="p-2 bg-[#FACC15]/10 rounded-lg text-[#FACC15]">
                  <Database size={18} />
                </div>
              </div>
              <h3 className="text-3xl font-extrabold text-white">48 Active</h3>
              <p className="text-[11px] text-[#FACC15] font-bold">100% Calibrated</p>
            </div>

            <div className="bg-[#0B2239]/60 border border-slate-700/60 p-6 rounded-2xl space-y-3 shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Speech Accuracy</span>
                <div className="p-2 bg-[#FACC15]/10 rounded-lg text-[#FACC15]">
                  <Zap size={18} />
                </div>
              </div>
              <h3 className="text-3xl font-extrabold text-white">98.4%</h3>
              <p className="text-[11px] text-emerald-400 font-bold">Optimal Performance</p>
            </div>

            <div className="bg-[#0B2239]/60 border border-slate-700/60 p-6 rounded-2xl space-y-3 shadow-xl">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Security Audit</span>
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <ShieldCheck size={18} />
                </div>
              </div>
              <h3 className="text-3xl font-extrabold text-white">PASSED</h3>
              <p className="text-[11px] text-slate-400 font-mono">WCAG 2.1 AA Verified</p>
            </div>

          </section>

          {/* SECTION 3: ADMIN SETTINGS & AUDIT LOGS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Admin Account Details Form (7 Cols) */}
            <div className="lg:col-span-7 bg-[#0B2239]/60 border border-slate-700/60 rounded-2xl p-6 space-y-6 shadow-xl">
              
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="text-[#FACC15]" size={20} />
                  <span>Admin Credentials & Personal Details</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Configure admin display parameters and system notifications.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold uppercase tracking-wider">Admin Full Name</label>
                    <input
                      type="text"
                      value={adminDetails.name}
                      onChange={(e) => setAdminDetails({ ...adminDetails, name: e.target.value })}
                      className="w-full bg-[#0A2E52] border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-[#FACC15]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold uppercase tracking-wider">Admin Email</label>
                    <input
                      type="email"
                      value={adminDetails.email}
                      onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
                      className="w-full bg-[#0A2E52] border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-[#FACC15]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold uppercase tracking-wider">Role Title</label>
                    <input
                      type="text"
                      disabled
                      value={adminDetails.role}
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-slate-400 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold uppercase tracking-wider">Department</label>
                    <input
                      type="text"
                      value={adminDetails.department}
                      onChange={(e) => setAdminDetails({ ...adminDetails, department: e.target.value })}
                      className="w-full bg-[#0A2E52] border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-[#FACC15]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="py-3 px-6 bg-[#FACC15] hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest rounded-xl transition cursor-pointer shadow-lg"
                  >
                    Save Admin Account Changes
                  </button>
                </div>

              </form>

            </div>

            {/* Right Column: Recent Admin Audit Trail (5 Cols) */}
            <div className="lg:col-span-5 bg-[#0B2239]/60 border border-slate-700/60 rounded-2xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
              
              <div>
                <div className="border-b border-slate-800 pb-4 mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="text-[#FACC15]" size={20} />
                    <span>Admin Audit Trail</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400">REALTIME</span>
                </div>

                <div className="space-y-4">
                  
                  <div className="p-3 bg-[#0A2E52]/60 rounded-xl border border-slate-700/50 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="font-bold text-white">Updated Demon Guardian Quiz</span>
                      <span className="text-[10px] text-slate-500 font-mono">10 mins ago</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Changed voice recognition threshold to 80% accuracy.</p>
                  </div>

                  <div className="p-3 bg-[#0A2E52]/60 rounded-xl border border-slate-700/50 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="font-bold text-white">Invited User AlexVocal</span>
                      <span className="text-[10px] text-slate-500 font-mono">2 hours ago</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Granted admin management privileges to alex@vocalquest.io.</p>
                  </div>

                  <div className="p-3 bg-[#0A2E52]/60 rounded-xl border border-slate-700/50 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="font-bold text-white">Scaled TTS Audio Instances</span>
                      <span className="text-[10px] text-slate-500 font-mono">Yesterday</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Scaled active instances to 15/15 for optimal latency.</p>
                  </div>

                </div>
              </div>

              <button
                onClick={() => navigate('/admin/game-analytics')}
                className="w-full py-2.5 bg-[#0A2E52] hover:bg-[#0c3763] border border-slate-700 text-[#FACC15] font-bold text-xs rounded-xl transition cursor-pointer text-center"
              >
                View Full System Analytics Log
              </button>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}
