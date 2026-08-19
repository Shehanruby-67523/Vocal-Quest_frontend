import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Radio, 
  Users, 
  Trophy, 
  UserPlus, 
  AlertTriangle 
} from 'lucide-react';
import AdminSidebar from '../Components/common/AdminSidebar';

export default function CommandCenter() {
  const [timeframe, setTimeframe] = useState('Weekly');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Terminal logs state with live logging simulation
  const [logs, setLogs] = useState([
    { type: 'OK', time: '14:22:01', msg: 'User session initialized (ID: 4421x)' },
    { type: 'OK', time: '14:22:15', msg: "Story node 'Introduction' loaded (v2.1)" },
    { type: 'INFO', time: '14:23:44', msg: 'Database backup routine starting...' },
    { type: 'OK', time: '14:25:10', msg: 'Backup complete: quest_db_backup_202310.sql' },
    { type: 'INFO', time: '14:28:30', msg: 'Cache invalidated for logic tree: arc_1_main' },
    { type: 'DEBUG', time: '14:30:12', msg: 'API Response Time: 45ms' }
  ]);

  // Periodically add new simulation logs
  useEffect(() => {
    const mockLogs = [
      { type: 'OK', time: '14:31:05', msg: 'User session initialized (ID: 9812y)' },
      { type: 'DEBUG', time: '14:32:19', msg: 'API Response Time: 38ms' },
      { type: 'INFO', time: '14:34:02', msg: 'Cache hit rate at 94.2% for voice_assets' },
      { type: 'OK', time: '14:35:48', msg: "Story node 'The Siren\\'s Lute' loaded (v2.3)" },
      { type: 'DEBUG', time: '14:37:11', msg: 'Syncing player data for VQ-7721' },
      { type: 'INFO', time: '14:40:00', msg: 'Scheduled cleanup of temp game states completed' }
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < mockLogs.length) {
        setLogs(prev => [...prev.slice(1), mockLogs[index]]);
        index++;
      } else {
        index = 0; // Loop logs
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Filtered logs based on search query
  const filteredLogs = logs.filter(log => 
    log.msg.toLowerCase().includes(searchQuery.toLowerCase()) || 
    log.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#070b13] text-slate-100 font-sans antialiased overflow-x-hidden">
      {/* Sidebar navigation */}
      <AdminSidebar />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header bar */}
        <header className="h-20 bg-[#0a0f1d]/50 border-b border-slate-800/60 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-10">
          {/* Header left */}
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Command Center
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Status: Stable</span>
            </div>
          </div>

          {/* Header actions (Search, Notifications, settings, profile) */}
          <div className="flex items-center gap-5">
            <div className="relative w-64">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search system logs..."
                className="w-full bg-[#111726] text-xs text-slate-300 pl-10 pr-4 py-2.5 rounded-lg border border-slate-800/80 focus:outline-none focus:border-gold-400/50 focus:bg-[#151c2e] transition-all duration-200"
              />
            </div>
            
            <button className="p-2.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/40 border border-slate-800/50 hover:border-slate-700/60 transition relative">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-400" />
            </button>

            <button className="p-2.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/40 border border-slate-800/50 hover:border-slate-700/60 transition">
              <Settings size={16} />
            </button>

            {/* Admin Profile Icon */}
            <div 
              onClick={() => navigate('/admin/profile')}
              className="w-9 h-9 rounded-full border-2 border-gold-400 overflow-hidden bg-[#0A2E52] p-0.5 cursor-pointer hover:scale-105 transition flex items-center justify-center shadow-[0_0_10px_rgba(250,204,21,0.3)]"
              title="Admin Profile"
            >
              <span className="text-xs font-black text-gold-400">SA</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* Top Row: Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Total Active Players */}
            <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-semibold tracking-wide uppercase">
                    Total Active Players
                  </p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-bold tracking-tight text-white">
                      12,540
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
                      <TrendingUp size={12} className="inline" /> ~12%
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-gold-400/10 rounded-lg text-gold-400 border border-gold-400/20">
                  <Users size={20} />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-400 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
            </div>

            {/* Card 2: Avg Quiz Pass Rate */}
            <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-semibold tracking-wide uppercase">
                    Avg Quiz Pass Rate (40/50)
                  </p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-bold tracking-tight text-white">
                      82%
                    </span>
                    <span className="text-xs text-rose-500 font-semibold flex items-center gap-0.5">
                      <TrendingDown size={12} className="inline" /> ~2%
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-gold-400/10 rounded-lg text-gold-400 border border-gold-400/20">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Target threshold: 75% min
              </div>
            </div>

            {/* Card 3: System Uptime */}
            <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-semibold tracking-wide uppercase">
                    System Uptime
                  </p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-bold tracking-tight text-white">
                      99.99%
                    </span>
                    <span className="text-xs text-slate-400 font-medium ml-1">
                      Stable
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-gold-400/10 rounded-lg text-gold-400 border border-gold-400/20">
                  <Radio size={20} />
                </div>
              </div>
              
              {/* Uptime blocks */}
              <div className="flex justify-between items-center gap-1.5 mt-2">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-3 flex-1 bg-emerald-500 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.3)] hover:opacity-80 transition duration-150" 
                    title="Uptime: 100%" 
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Middle Section: User Registrations Chart */}
          <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">
                  User Registrations
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  New player acquisition over the last 30 days
                </p>
              </div>
              
              {/* Timeframe selector toggles */}
              <div className="flex bg-[#111726] border border-slate-800 rounded-lg p-1">
                {['Daily', 'Weekly', 'Monthly'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition duration-150 ${
                      timeframe === tf
                        ? 'bg-gold-400 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive SVG Line Chart */}
            <div className="relative w-full h-[320px] bg-[#080c16]/50 rounded-xl border border-slate-900 overflow-hidden px-4 py-6">
              
              {/* Chart Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-6 px-1 pointer-events-none opacity-20">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-full border-b border-dashed border-slate-600" />
                ))}
              </div>

              {/* Chart SVG */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 250" preserveAspectRatio="none">
                <defs>
                  {/* Under-curve gold gradient */}
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffd300" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#ffd300" stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* SVG path fill under the curve */}
                <path 
                  d="M 50,180 
                     C 150,180 200,160 280,130 
                     C 350,100 400,60 480,95 
                     C 550,130 630,120 720,70 
                     C 790,30 880,50 950,20 
                     L 950,230 
                     L 50,230 Z" 
                  fill="url(#goldGradient)" 
                />

                {/* SVG stroke path curve line */}
                <path 
                  d="M 50,180 
                     C 150,180 200,160 280,130 
                     C 350,100 400,60 480,95 
                     C 550,130 630,120 720,70 
                     C 790,30 880,50 950,20" 
                  fill="none" 
                  stroke="#ffd300" 
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="drop-shadow-[0_2px_8px_rgba(255,211,0,0.25)]"
                />

                {/* Interactive highlight data dots */}
                <circle cx="50" cy="180" r="5" fill="#ffd300" stroke="#080c16" strokeWidth="2" />
                <circle cx="280" cy="130" r="5" fill="#ffd300" stroke="#080c16" strokeWidth="2" />
                <circle cx="480" cy="95" r="5" fill="#ffd300" stroke="#080c16" strokeWidth="2" />
                <circle cx="720" cy="70" r="5" fill="#ffd300" stroke="#080c16" strokeWidth="2" />
                <circle cx="950" cy="20" r="6" fill="#ffd300" stroke="#080c16" strokeWidth="2" className="animate-pulse" />
              </svg>

              {/* X-Axis labels */}
              <div className="absolute bottom-2 left-6 right-6 flex justify-between text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
                <span className="text-gold-400">Today</span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Recent Milestones & Terminal Health Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Left Box: Recent Player Milestones (3/5 width on desktop) */}
            <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-6 lg:col-span-3 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-6">
                  Recent Player Milestones
                </h3>
                
                <div className="space-y-4">
                  
                  {/* Milestone 1: Siren's Lute */}
                  <div className="flex items-center justify-between p-3.5 bg-[#0f1526]/40 hover:bg-[#11192e]/60 rounded-xl border border-slate-800/40 transition duration-150">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                        <Trophy size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">
                          Alex J. completed "The Siren's Lute"
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Gold Tier Achieved • 2 mins ago
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert('Viewing details for Alex J.')}
                      className="text-xs font-bold text-slate-400 hover:text-gold-400 transition"
                    >
                      View
                    </button>
                  </div>

                  {/* Milestone 2: New Register */}
                  <div className="flex items-center justify-between p-3.5 bg-[#0f1526]/40 hover:bg-[#11192e]/60 rounded-xl border border-slate-800/40 transition duration-150">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400">
                        <UserPlus size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">
                          New User Registered: Harmony_99
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Verified via Spotify Auth • 15 mins ago
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert('Viewing details for Harmony_99')}
                      className="text-xs font-bold text-slate-400 hover:text-gold-400 transition"
                    >
                      View
                    </button>
                  </div>

                  {/* Milestone 3: Quiz failure warning */}
                  <div className="flex items-center justify-between p-3.5 bg-[#0f1526]/40 hover:bg-[#11192e]/60 rounded-xl border border-slate-800/40 transition duration-150">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                        <AlertTriangle size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">
                          Quiz Failure Spike: Logic Tree #4
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          40/50 Gate failed by 12 players • 1 hour ago
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert('Investigating failure logs for Logic Tree #4')}
                      className="text-xs font-bold text-rose-400 hover:text-rose-300 transition"
                    >
                      Investigate
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Box: System Health Logs (2/5 width on desktop) */}
            <div className="bg-[#0b101d] border border-slate-800/80 rounded-xl p-6 lg:col-span-2 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">
                  System Health Logs
                </h3>
                <span className="text-[10px] font-mono text-slate-500 bg-[#070b13] px-2.5 py-1 rounded border border-slate-900 uppercase">
                  TTY: /dev/quest01
                </span>
              </div>

              {/* Terminal window view */}
              <div className="flex-1 bg-[#05080f] rounded-lg p-4 font-mono text-[11px] leading-relaxed border border-slate-900 max-h-[220px] overflow-y-auto custom-scrollbar select-text">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log, i) => (
                    <div key={i} className="mb-2 last:mb-0 hover:bg-slate-900/40 py-0.5 px-1 rounded transition duration-75">
                      <span className={`font-bold mr-1.5 ${
                        log.type === 'OK' ? 'text-emerald-500' :
                        log.type === 'INFO' ? 'text-amber-500' : 'text-slate-400'
                      }`}>
                        [{log.type}]
                      </span>
                      <span className="text-slate-600 mr-2">{log.time} -</span>
                      <span className="text-slate-300">{log.msg}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-600 italic text-center py-4">No matching logs found</div>
                )}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
