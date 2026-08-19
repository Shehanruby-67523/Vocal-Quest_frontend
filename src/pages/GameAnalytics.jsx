import React, { useState } from 'react';
import { 
  BarChart3, 
  Activity, 
  ShieldCheck, 
  Search, 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  Volume2, 
  Mic, 
  Calendar,
  Layers,
  ArrowUpRight,
  RefreshCw,
  FileText
} from 'lucide-react';
import AdminSidebar from '../Components/common/AdminSidebar';

export default function GameAnalytics() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Daily Speech Accuracy Chart Data (Mon - Sun)
  const chartData = [
    { day: 'MON', val: 88, status: 'ok' },
    { day: 'TUE', val: 92, status: 'ok' },
    { day: 'WED', val: 78, status: 'warn' }, // Below threshold
    { day: 'THU', val: 90, status: 'ok' },
    { day: 'FRI', val: 86, status: 'ok' },
    { day: 'SAT', val: 96, status: 'ok' },
    { day: 'SUN', val: 94, status: 'active' }
  ];

  return (
    <div className="flex min-h-screen bg-[#070b13] text-slate-100 font-sans antialiased select-none overflow-x-hidden">
      
      {/* 1. ASIDE - SIDE NAVBAR */}
      <AdminSidebar />

      {/* 2. MAIN CONTENT FLOOR */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#070B13] relative">
        
        {/* TOP HEADER BAR (background rgba(15, 23, 42, 0.8), backdrop blur) */}
        <header className="h-[69px] bg-[#0F172A]/80 border-b border-[#FACC15]/10 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight text-[#F1F5F9] flex items-center gap-3">
              <span>Game Analytics</span>
              <span className="text-[10px] font-bold text-[#FACC15] bg-[#FACC15]/10 border border-[#FACC15]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                ADMIN SUITE
              </span>
            </h1>
          </div>

          {/* Header Search & Actions */}
          <div className="flex items-center gap-4">
            {/* System Search Input */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search system logs..."
                className="w-full bg-[#0A2E52] text-xs text-slate-200 pl-9 pr-4 py-2 rounded-lg border border-slate-700/60 focus:outline-none focus:border-[#FACC15]/60 placeholder-slate-500 transition"
              />
            </div>

            {/* Notification Bell Icon */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:text-[#FACC15] transition relative cursor-pointer"
                title="System Alerts"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#0F172A]" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-64 bg-[#0B2239] border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-xs">
                  <div className="font-bold text-[#FACC15] border-b border-slate-700/60 pb-2 mb-2 uppercase tracking-wider text-[10px]">
                    System Notifications
                  </div>
                  <p className="text-slate-300 py-2">All Speech Recognition & TTS instances operating within optimal parameters.</p>
                </div>
              )}
            </div>

            {/* Admin Profile Icon */}
            <div 
              onClick={() => navigate('/admin/profile')}
              className="w-9 h-9 rounded-full border-2 border-[#FACC15] overflow-hidden bg-[#0A2E52] p-0.5 cursor-pointer hover:scale-105 transition flex items-center justify-center shadow-[0_0_10px_rgba(250,204,21,0.3)]"
              title="Admin Profile"
            >
              <span className="text-xs font-black text-[#FACC15]">SA</span>
            </div>
          </div>
        </header>

        {/* MAIN BODY WORKSPACE */}
        <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* SECTION 1: SYSTEM HEALTH OVERVIEW (3 Stat Cards) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Accuracy Card */}
            <div className="bg-[#1E293B]/40 border border-[#334155]/50 p-6 rounded-xl flex flex-col justify-between space-y-4 shadow-xl">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-[#94A3B8]">Speech Recognition Accuracy</span>
                <span className="px-2.5 py-0.5 bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] text-[10px] font-bold uppercase rounded-full tracking-wider">
                  ACTIVE
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#F1F5F9]">92.4%</h3>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="font-bold text-[#FACC15] flex items-center">
                    +2.4% <ArrowUpRight size={14} />
                  </span>
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">VS LAST WEEK</span>
                </div>
              </div>
            </div>

            {/* TTS Instances Card */}
            <div className="bg-[#1E293B]/40 border border-[#334155]/50 p-6 rounded-xl flex flex-col justify-between space-y-4 shadow-xl">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-[#94A3B8]">Active TTS Instances</span>
                <div className="p-1.5 bg-[#FACC15]/10 rounded-lg text-[#FACC15]">
                  <Volume2 size={16} />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#F1F5F9]">14 / 15</h3>
                {/* Progress bar */}
                <div className="w-full bg-[#1E293B] h-1.5 rounded-full overflow-hidden mt-3">
                  <div 
                    className="bg-[#FACC15] h-full rounded-full shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                    style={{ width: '93%' }}
                  />
                </div>
              </div>
            </div>

            {/* Audit Date Card */}
            <div className="bg-[#1E293B]/40 border border-[#334155]/50 p-6 rounded-xl flex flex-col justify-between space-y-4 shadow-xl">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-[#94A3B8]">Last Security Audit</span>
                <div className="p-1.5 bg-[#F87171]/10 rounded-lg text-[#F87171]">
                  <ShieldCheck size={16} />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#F1F5F9]">Oct 24, 2023</h3>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="font-bold text-[#F87171]">PASS</span>
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">WCAG 2.1 AA COMPLIANCE</span>
                </div>
              </div>
            </div>

          </section>

          {/* SECTION 2 & 3: WEB SPEECH API LOGS CHART & COMPLIANCE GAUGE */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* SECTION 2: Web Speech API Accuracy Logs Bar Chart (8 Columns) */}
            <div className="lg:col-span-8 bg-[#1E293B]/40 border border-[#334155]/50 p-6 rounded-xl space-y-6 shadow-xl flex flex-col justify-between">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#F1F5F9] flex items-center gap-2">
                    <Activity className="text-[#FACC15]" size={18} />
                    <span>Web Speech API Accuracy Logs</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Real-time speech recognition accuracy performance per daily cycle.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-bold text-[#94A3B8] uppercase">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FACC15]" />
                    <span>Speech Recognition</span>
                  </div>
                  <div className="flex items-center gap-1.5 border-l border-[#FACC15]/20 pl-3">
                    <span className="w-3 h-[1px] border-b border-dashed border-red-500" />
                    <span>Min Threshold (80%)</span>
                  </div>
                </div>
              </div>

              {/* BAR CHART GRAPH DISPLAY */}
              <div className="relative h-64 flex items-end justify-between px-4 pt-8">
                
                {/* Threshold Line at 80% */}
                <div className="absolute left-0 right-0 top-[35%] border-b border-dashed border-red-500/60 z-0 flex items-center justify-end pr-2">
                  <span className="text-[9px] font-mono text-red-400 font-bold bg-[#070B13]/80 px-1 rounded">
                    80% THRESHOLD
                  </span>
                </div>

                {/* Bars */}
                {chartData.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 z-10 flex-1 group">
                    <span className={`text-[10px] font-bold font-mono transition group-hover:scale-110 ${
                      item.status === 'warn' ? 'text-red-400' : item.status === 'active' ? 'text-[#FACC15]' : 'text-slate-300'
                    }`}>
                      {item.val}%
                    </span>
                    <div
                      className={`w-7 sm:w-9 rounded-t-md transition-all duration-300 ${
                        item.status === 'active'
                          ? 'bg-[#FACC15] shadow-[0_0_12px_rgba(250,204,21,0.5)]'
                          : item.status === 'warn'
                          ? 'bg-[#FACC15]/20 border border-red-400/60'
                          : 'bg-[#FACC15]/20 hover:bg-[#FACC15]/40'
                      }`}
                      style={{ height: `${(item.val / 100) * 200}px` }}
                    />
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mt-1">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* SECTION 3: Compliance Score Donut Gauge (4 Columns) */}
            <div className="lg:col-span-4 bg-[#1E293B]/40 border border-[#334155]/50 p-6 rounded-xl space-y-6 shadow-xl flex flex-col justify-between">
              
              <div>
                <h3 className="text-lg font-bold text-[#F1F5F9]">Compliance Score</h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">WCAG 2.1 AA Accessibility Standards</p>
              </div>

              {/* Donut Gauge Visual */}
              <div className="flex flex-col items-center justify-center my-4">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  
                  {/* SVG Circular Progress */}
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#FACC15"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="10" // 96% filled
                      strokeLinecap="round"
                      className="shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-all duration-1000"
                    />
                  </svg>

                  {/* Centered Score Number */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-[#F1F5F9]">96%</span>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">PASSED</span>
                  </div>

                </div>
              </div>

              {/* Detailed Breakdown Tags */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-[#10B981]/5 border border-[#10B981]/10">
                  <span className="text-[#CBD5E1]">Contrast Checks</span>
                  <span className="font-bold text-[#FACC15]">12 Passed</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#F59E0B]/5 border border-[#F59E0B]/10">
                  <span className="text-[#CBD5E1]">Keyboard Nav</span>
                  <span className="font-bold text-[#FB923C]">4 Verified</span>
                </div>
              </div>

            </div>

          </section>

          {/* SECTION 4 & 5: AUDIT REPORT & LIVE SYSTEM COMPLIANCE LOG */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Accessibility Audit Section (6 Columns) */}
            <div className="lg:col-span-6 bg-[#1E293B]/40 border border-[#334155]/50 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between">
              
              <div className="p-4 px-6 border-b border-[#FACC15]/10 flex items-center justify-between">
                <h3 className="text-base font-bold text-[#F1F5F9] flex items-center gap-2">
                  <ShieldCheck className="text-[#FACC15]" size={18} />
                  <span>Accessibility Audit Section</span>
                </h3>
                <button className="text-xs font-bold text-[#FACC15] hover:underline cursor-pointer">
                  Export PDF
                </button>
              </div>

              <div className="p-6 space-y-4 divide-y divide-[#FACC15]/10">
                
                {/* Audit Item 1 */}
                <div className="pt-3 first:pt-0 flex items-start gap-4">
                  <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#F1F5F9]">Voice Login Button</h4>
                      <span className="px-1.5 py-0.5 bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-bold rounded">
                        HIGH RISK
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      Missing ARIA labels for screen readers. User cannot identify login method verbally.
                    </p>
                  </div>
                </div>

                {/* Audit Item 2 */}
                <div className="pt-3 flex items-start gap-4">
                  <AlertTriangle className="text-[#FB923C] shrink-0 mt-0.5" size={18} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#F1F5F9]">Tertiary Dashboard Text</h4>
                      <span className="font-bold text-xs text-[#FB923C]">3.2 : 1 Ratio</span>
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      Insufficient contrast ratio (3.2:1) on sub-captions in dark mode. Target is 4.5:1.
                    </p>
                  </div>
                </div>

                {/* Audit Item 3 */}
                <div className="pt-3 flex items-start gap-4">
                  <CheckCircle2 className="text-[#FACC15] shrink-0 mt-0.5" size={18} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#F1F5F9]">Navigation Sidebar</h4>
                      <span className="px-2 py-0.5 bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] text-[10px] font-bold rounded-full uppercase">
                        VERIFIED
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      Full keyboard navigation support and focus indicators verified.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Live System Compliance Log (6 Columns) */}
            <div className="lg:col-span-6 bg-[#1E293B]/40 border border-[#334155]/50 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between">
              
              <div className="p-4 px-6 border-b border-[#FACC15]/10 flex items-center justify-between">
                <h3 className="text-base font-bold text-[#F1F5F9] flex items-center gap-2">
                  <FileText className="text-[#FACC15]" size={18} />
                  <span>Compliance Log Section</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-500">LIVE FEED</span>
              </div>

              <div className="p-6 relative space-y-6">
                
                {/* Timeline Vertical Line */}
                <div className="absolute left-[31px] top-6 bottom-6 w-[1px] bg-[#FACC15]/20" />

                {/* Log Item 1 */}
                <div className="relative pl-8 space-y-1">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#FACC15]/20 border-2 border-[#FACC15]" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#E2E8F0]">ARIA labels added</span>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Just now</span>
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    ARIA labels added to "Global Search" input and results list.
                  </p>
                </div>

                {/* Log Item 2 */}
                <div className="relative pl-8 space-y-1">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#FACC15]/20 border-2 border-[#FACC15]" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#E2E8F0]">System Health Check</span>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">2 hours ago</span>
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    Weekly system health check completed. No new high-risk vulnerabilities found.
                  </p>
                </div>

                {/* Log Item 3 */}
                <div className="relative pl-8 space-y-1 opacity-60">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-slate-700 border-2 border-slate-500" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#E2E8F0]">TTS Engine Scaled</span>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Yesterday</span>
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    TTS Engine scaled to 15 instances to maintain accuracy during peak load.
                  </p>
                </div>

              </div>

            </div>

          </section>

          {/* FOOTER COMPLIANCE BAR */}
          <footer className="bg-[#1E293B]/40 border border-[#334155]/50 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-6 text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-[#FACC15]" size={14} />
                <span className="font-bold text-[10px] uppercase tracking-wider">WCAG 2.1 AA COMPLIANT</span>
              </div>
              <div className="flex items-center gap-2">
                <Mic className="text-[#FACC15]" size={14} />
                <span className="font-bold text-[10px] uppercase tracking-wider">SPEECH RECOGNITION ACTIVE</span>
              </div>
            </div>

            <span className="text-[10px] text-[#64748B] font-mono">
              © 2023 Vocal Quest. System Build v4.2.1-Gold
            </span>
          </footer>

        </main>
      </div>

    </div>
  );
}
