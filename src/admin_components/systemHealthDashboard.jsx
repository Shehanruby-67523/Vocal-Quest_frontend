import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Mic, 
  BarChart3, 
  ShieldAlert, 
  Settings, 
  Search, 
  Bell, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  RefreshCw,
  History,
  Layers
} from 'lucide-react';

export default function SystemHealthDashboard() {
  return (
    <div className="flex min-h-screen bg-[#0b132b] text-slate-200 font-sans antialiased selection:bg-amber-500/30">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0d1b2a] border-r border-slate-800/60 flex flex-col justify-between p-4">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 px-3 py-4 mb-6">
            <div className="text-amber-400 font-extrabold text-xl tracking-tight flex items-center gap-1">
              <span className="text-2xl">☝</span> VOCAL QUEST
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold mt-1">
              Admin Suite
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <a href="#dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition">
              <LayoutDashboard size={18} />
              Dashboard
            </a>
            <a href="#users" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition">
              <Users size={18} />
              User Management
            </a>
            <a href="#engine" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition">
              <Mic size={18} />
              Speech Engine
            </a>
            <a href="#analytics" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition">
              <BarChart3 size={18} />
              Analytics
            </a>
            <a href="#health" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-amber-400 bg-amber-500/10 border-l-2 border-amber-500 rounded-r-lg transition">
              <ShieldAlert size={18} />
              System Health
            </a>
            <a href="#settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition">
              <Settings size={18} />
              Settings
            </a>
          </nav>
        </div>

        {/* Sidebar Footer Action */}
        <button className="w-full bg-amber-400 hover:bg-amber-500 text-[#0b132b] font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors shadow-lg shadow-amber-400/10">
          <Download size={16} />
          Export Audit
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* TOP BAR HEADER */}
        <header className="h-16 border-b border-slate-800/60 flex items-center justify-between px-8 bg-[#0b132b]/80 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-100">System Health & Compliance</h1>
            <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Status: Nominal
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search system logs..." 
                className="w-full bg-[#1c2a4a]/50 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-slate-700 text-slate-300"
              />
            </div>
            {/* Notification & User profile mock */}
            <button className="p-1.5 text-slate-400 hover:text-slate-200 relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 border border-slate-700 overflow-hidden flex items-center justify-center text-slate-900 font-bold text-xs cursor-pointer">
              U
            </div>
          </div>
        </header>

        {/* DASHBOARD GRID CONTAINER */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* TOP THREE STATUS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Global Speech Accuracy */}
            <div className="bg-[#10223b] border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between min-h-[140px]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Global Speech Accuracy</p>
                  <p className="text-3xl font-extrabold text-white tracking-tight mt-2">92.4%</p>
                </div>
                <span className="text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                  Nominal
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs">
                <span className="text-emerald-400 font-bold">+2.1%</span>
                <span className="text-slate-500 font-medium">TARGET: &gt;85%</span>
              </div>
            </div>

            {/* Card 2: Active TTS Instances */}
            <div className="bg-[#10223b] border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between min-h-[140px]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Active TTS Instances</p>
                  <p className="text-3xl font-extrabold text-white tracking-tight mt-2">14 <span className="text-lg text-slate-500 font-medium">/ 15</span></p>
                </div>
                <Layers className="text-amber-400" size={20} />
              </div>
              {/* Custom Linear Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: '93.3%' }}></div>
              </div>
            </div>

            {/* Card 3: Last Full Audit */}
            <div className="bg-[#10223b] border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between min-h-[140px]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Last Full Audit</p>
                  <p className="text-2xl font-bold text-white tracking-tight mt-3">Oct 24, 2023</p>
                </div>
                <div className="p-1.5 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20">
                  <ShieldAlert size={18} />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs">
                <span className="text-rose-400 font-bold">-2 days</span>
                <span className="text-slate-500 font-medium">NEXT DUE: NOV 01</span>
              </div>
            </div>

          </div>

          {/* MIDDLE SECTION - CHARTS AND COMPLIANCE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Box: Web Speech API Accuracy Logs */}
            <div className="lg:col-span-5 bg-[#10223b] border border-slate-800/80 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Web Speech API Accuracy Logs</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mb-4">Real-time recognition fidelity monitoring</p>
                
                {/* Target Indicators */}
                <div className="flex items-center gap-4 text-[11px] font-medium mb-6">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="text-slate-400">ACCURACY</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/40 border border-dashed border-rose-400"></span>
                    <span className="text-slate-500">85% THRESHOLD</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart Container */}
              <div className="relative">
                {/* Dashed Threshold Line at roughly 85% height */}
                <div className="absolute left-0 right-0 top-[35%] border-b border-dashed border-rose-500/40 z-0"></div>
                
                <div className="flex items-end justify-between h-40 relative z-10 px-2">
                  {[
                    { label: 'MON', val: '65%' },
                    { label: 'TUE', val: '72%' },
                    { label: 'WED', val: '50%', alert: true }, // Alert bar matching design dip
                    { label: 'THU', val: '75%' },
                    { label: 'FRI', val: '68%' },
                    { label: 'SAT', val: '80%' },
                    { label: 'SUN', val: '78%' },
                    { label: 'TODAY', val: '92.4%', current: true },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 group">
                      {bar.current && (
                        <span className="text-[10px] font-bold text-amber-400 mb-1">{bar.val}</span>
                      )}
                      {bar.alert && (
                        <span className="text-[10px] font-bold text-rose-400 mb-1">82%</span>
                      )}
                      <div className="w-7 bg-slate-800 rounded-t relative overflow-hidden" style={{ height: bar.current ? '110px' : '90px' }}>
                        <div 
                          className={`absolute bottom-0 left-0 right-0 rounded-t transition-all duration-500 ${
                            bar.current ? 'bg-amber-400' : bar.alert ? 'bg-rose-500/20 border border-rose-500/40' : 'bg-emerald-600/30 border-t-2 border-emerald-500/60'
                          }`} 
                          style={{ height: bar.val }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold mt-2 tracking-wider">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Compliance Score Ring Chart */}
            <div className="lg:col-span-7 bg-[#10223b] border border-slate-800/80 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Compliance Score</h3>
                <p className="text-xs text-slate-400">WCAG 2.1 AA Standards</p>
              </div>

              {/* Radial Score Indicator */}
              <div className="flex justify-center items-center py-6">
                <div className="relative flex items-center justify-center">
                  <svg className="w-36 h-36 transform -rotate-90">
                    <circle cx="72" cy="72" r="60" stroke="#1e293b" strokeWidth="10" fill="transparent" />
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="60" 
                      stroke="#fbbf24" 
                      strokeWidth="10" 
                      fill="transparent" 
                      strokeDasharray={376.8}
                      strokeDashoffset={376.8 - (376.8 * 90) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-extrabold text-white tracking-tight">90%</span>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Passed</span>
                  </div>
                </div>
              </div>

              {/* Mini status breakdowns */}
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-[#0b132b]/60 border border-slate-800/60 rounded-lg px-4 py-2.5 text-xs">
                  <span className="text-slate-300 font-medium">Text Contrast</span>
                  <span className="font-bold text-emerald-400 tracking-wide">PASS</span>
                </div>
                <div className="flex justify-between items-center bg-[#0b132b]/60 border border-slate-800/60 rounded-lg px-4 py-2.5 text-xs">
                  <span className="text-slate-300 font-medium">ARIA Labels</span>
                  <span className="font-bold text-amber-400 tracking-wide">2 WARNINGS</span>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: DETAILED AUDIT LOGS & ACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Audit Details */}
            <div className="bg-[#10223b] border border-slate-800/80 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">🚹</span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Accessibility Audit Details</h3>
                </div>
                <button className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1">
                  <RefreshCw size={12} /> Re-scan UI
                </button>
              </div>

              <div className="space-y-4">
                {/* Detail Item 1 */}
                <div className="flex gap-4 p-3 bg-[#0b132b]/30 border border-slate-800/40 rounded-xl">
                  <div className="mt-0.5 p-1.5 bg-rose-500/10 text-rose-400 rounded-lg h-fit border border-rose-500/20">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-200">Voice Login Button</h4>
                      <span className="text-[9px] font-extrabold bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded tracking-wide border border-rose-500/20 uppercase">Critical</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Missing ARIA labels for screen readers. User cannot identify login method verbally.
                    </p>
                  </div>
                </div>

                {/* Detail Item 2 */}
                <div className="flex gap-4 p-3 bg-[#0b132b]/30 border border-slate-800/40 rounded-xl">
                  <div className="mt-0.5 p-1.5 bg-amber-500/10 text-amber-400 rounded-lg h-fit border border-amber-500/20">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-200">Tertiary Dashboard Text</h4>
                      <span className="text-[9px] font-extrabold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded tracking-wide border border-amber-500/20 uppercase">2 Warnings</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Insufficient contrast ratio (3.2:1) on sub-captions in dark mode. Target is 4.5:1.
                    </p>
                  </div>
                </div>

                {/* Detail Item 3 */}
                <div className="flex gap-4 p-3 bg-[#0b132b]/30 border border-slate-800/40 rounded-xl">
                  <div className="mt-0.5 p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg h-fit border border-emerald-500/20">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-200">Navigation Sidebar</h4>
                      <span className="text-[9px] font-extrabold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded tracking-wide border border-emerald-500/20 uppercase">Status: Nominal</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Full keyboard navigation support and focus indicators verified.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Log Timeline */}
            <div className="bg-[#10223b] border border-slate-800/80 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <History className="text-amber-400" size={16} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Compliance Change Log</h3>
              </div>

              {/* Vertical Line Timeline container */}
              <div className="relative border-l border-slate-800 ml-2 pl-6 space-y-6">
                
                {/* Timeline Point 1 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-[#10223b]"></span>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-slate-200">Accessibility Fix Deployed</h4>
                    <span className="text-[10px] text-slate-500 font-medium">2H AGO</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    ARIA labels added to "Global Search" input and results list.
                  </p>
                </div>

                {/* Timeline Point 2 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-[#10223b]"></span>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-slate-200">Automated Audit Triggered</h4>
                    <span className="text-[10px] text-slate-500 font-medium">YESTERDAY</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Weekly system health check completed. No new high-risk vulnerabilities found.
                  </p>
                </div>

                {/* Timeline Point 3 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-slate-600 ring-4 ring-[#10223b]"></span>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-slate-400">Engine Instance Scaled</h4>
                    <span className="text-[10px] text-slate-500 font-medium">OCT 24</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    TTS Engine scaled to 15 instances to maintain accuracy during peak load.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* COMPLIANCE AND PROTOCOL REGULATORY FOOTER */}
        <footer className="mt-auto px-8 py-4 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-500 font-semibold tracking-wider uppercase bg-[#0b132b]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500/80">
              🛡️ Privacy Shield Certified
            </span>
            <span className="flex items-center gap-1 text-emerald-500/80">
              ⚖️ GDPR Compliant
            </span>
          </div>
          <div>
            © 2026 Vocal Quest. System Build v4.2.1-Gold
          </div>
        </footer>

      </main>
    </div>
  );
}