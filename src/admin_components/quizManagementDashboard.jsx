import React from 'react';
import { 
  SlidersHorizontal, 
  Users, 
  HelpCircle, 
  GitFork, 
  Search, 
  Bell, 
  PlusCircle, 
  Sliders, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export default function QuizManagementDashboard() {
  return (
    <div className="flex min-h-screen bg-[#071126] text-slate-200 font-sans antialiased">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0a1631] border-r border-slate-800/40 flex flex-col justify-between p-4">
        <div>
          {/* Brand Logo & Context */}
          <div className="flex flex-col px-3 py-4 mb-6">
            <div className="text-amber-400 font-black text-xl tracking-wider flex items-center gap-1.5">
              <span className="text-2xl">☝</span> VOCAL QUEST
            </div>
            <span className="text-[10px] uppercase tracking-widest text-amber-500/60 block font-bold mt-0.5 pl-1">
              Admin Dashboard
            </span>
          </div>

          {/* Sidebar Menu Links */}
          <nav className="space-y-1">
            <a href="#command" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 rounded-lg transition">
              <SlidersHorizontal size={18} />
              Command Center
            </a>
            <a href="#users" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 rounded-lg transition">
              <Users size={18} />
              User Management
            </a>
            <a href="#quiz" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-amber-400 bg-amber-500/10 border-l-2 border-amber-500 rounded-r-lg transition">
              <HelpCircle size={18} />
              Static Quiz Module
            </a>
            <a href="#story" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 rounded-lg transition">
              <GitFork size={18} />
              Story Logic
            </a>
          </nav>
        </div>

        {/* User Profile Footer section */}
        <div className="flex items-center gap-3 p-2 bg-[#071126]/40 border border-slate-800/30 rounded-xl">
          <div className="w-9 h-9 rounded-full bg-amber-400 text-[#071126] font-black flex items-center justify-center text-xs shadow-md shadow-amber-400/10">
            AD
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">Admin User</p>
            <p className="text-[10px] text-slate-500 font-medium">System Overseer</p>
          </div>
        </div>
      </aside>

      {/* MAIN VIEW CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* TOP BAR BANNER & SEARCH */}
        <header className="h-16 border-b border-slate-800/40 flex items-center justify-between px-8 bg-[#071126]/90 backdrop-blur sticky top-0 z-10">
          <h1 className="text-base font-bold text-slate-100 tracking-wide">Quiz Management</h1>

          <div className="flex items-center gap-4">
            {/* Contextual Global Search */}
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={15} />
              <input 
                type="text" 
                placeholder="Search questions..." 
                className="w-full bg-[#0d1e3d]/60 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-slate-700 text-slate-300 placeholder:text-slate-500"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-200 transition relative">
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* PAGE BODY HERO LAYOUT */}
        <div className="p-8 max-w-[1400px] w-full mx-auto space-y-6">
          
          {/* HEADER HERO MODULE: GLOBAL PASS GATE STATUS */}
          <div className="bg-[#0b1c3a] border border-slate-800/60 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-sm font-bold text-amber-400 tracking-wide">Global Pass Gate</h2>
                <p className="text-xs text-slate-400 mt-0.5">Define the minimum requirement for story advancement</p>
              </div>
              <div className="bg-[#071126]/60 border border-slate-800/60 rounded-lg px-4 py-2 text-right">
                <span className="text-xl font-black text-amber-400 tracking-tight">40</span>
                <span className="text-xs text-slate-500 font-bold ml-1">/ 50</span>
              </div>
            </div>

            {/* Linear Metric Slider Tracker */}
            <div className="w-full bg-[#071126] rounded-full h-2.5 overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
            </div>

            <div className="flex justify-between items-center mt-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              <span>Min Requirement (0)</span>
              <span>Max Questions (50)</span>
            </div>
          </div>

          {/* TWO-COLUMN CONFIGURATOR GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COLUMN 1: QUESTION COMPOSER CREATION SYSTEM */}
            <div className="lg:col-span-5 bg-[#0b1c3a] border border-slate-800/60 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800/40">
                <PlusCircle className="text-amber-400" size={18} />
                <h3 className="text-sm font-bold text-slate-200">Question Composer</h3>
              </div>

              {/* Form Input fields */}
              <div>
                <label className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1.5">Question Text</label>
                <textarea 
                  rows={3} 
                  placeholder="Type the question here..." 
                  className="w-full bg-[#071126]/60 border border-slate-800 rounded-lg p-3 text-xs focus:outline-none focus:border-slate-700 text-slate-300 resize-none placeholder:text-slate-600"
                />
              </div>

              {/* Option Blocks A-D */}
              {['A', 'B', 'C', 'D'].map((opt) => (
                <div key={opt}>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Option {opt}</label>
                  <input 
                    type="text"
                    className="w-full bg-[#071126]/60 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-slate-700 text-slate-300"
                  />
                </div>
              ))}

              {/* Selection Parameter Dropdowns */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1.5">Correct Answer</label>
                  <div className="relative">
                    <select className="w-full bg-[#071126]/60 border border-slate-800 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:border-slate-700 text-slate-300 appearance-none cursor-pointer">
                      <option>Option A</option>
                      <option>Option B</option>
                      <option>Option C</option>
                      <option>Option D</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Difficulty</label>
                  <div className="relative">
                    <select className="w-full bg-[#071126]/60 border border-slate-800 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:border-slate-700 text-slate-300 appearance-none cursor-pointer">
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Submission Control Button */}
              <button className="w-full bg-amber-400 hover:bg-amber-500 text-[#071126] font-bold py-2.5 px-4 rounded-lg text-xs tracking-wide transition shadow-lg shadow-amber-400/10 mt-2">
                Create Question
              </button>
            </div>

            {/* COLUMN 2: QUESTION INVENTORY LIST / TRACKER */}
            <div className="lg:col-span-7 bg-[#0b1c3a] border border-slate-800/60 rounded-xl p-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/40 mb-2">
                <h3 className="text-sm font-bold text-slate-200">Question Inventory</h3>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 bg-[#071126]/60 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition">
                    <Sliders size={14} />
                  </button>
                  <button className="p-1.5 bg-[#071126]/60 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition">
                    <Download size={14} />
                  </button>
                </div>
              </div>

              {/* Data Table Headers */}
              <div className="grid grid-cols-12 gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider py-2.5 px-2">
                <div className="col-span-7">Question</div>
                <div className="col-span-2 text-center">Correct</div>
                <div className="col-span-3 text-right">Difficulty</div>
              </div>

              {/* Table Body Item Entries */}
              <div className="divide-y divide-slate-800/40">
                
                {/* Entry Item 1 */}
                <div className="grid grid-cols-12 gap-4 items-center py-4 px-2 hover:bg-[#0d1e3d]/30 rounded-lg transition">
                  <div className="col-span-7 space-y-1.5">
                    <p className="text-xs font-semibold text-slate-200 truncate">What is the fundamental frequenc...</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="bg-[#071126] px-1.5 py-0.5 border border-slate-800 rounded">A: 440hz</span>
                      <span className="bg-[#071126] px-1.5 py-0.5 border border-slate-800 rounded">B: 432hz</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-xs font-black text-amber-400">A</div>
                  <div className="col-span-3 text-right">
                    <span className="text-[9px] font-extrabold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded tracking-wide uppercase border border-emerald-500/20">
                      Easy
                    </span>
                  </div>
                </div>

                {/* Entry Item 2 */}
                <div className="grid grid-cols-12 gap-4 items-center py-4 px-2 hover:bg-[#0d1e3d]/30 rounded-lg transition">
                  <div className="col-span-7 space-y-1.5">
                    <p className="text-xs font-semibold text-slate-200 truncate">Identify the correct placement for...</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="bg-[#071126] px-1.5 py-0.5 border border-slate-800 rounded">A: Larynx</span>
                      <span className="bg-[#071126] px-1.5 py-0.5 border border-slate-800 rounded">C: Sternum</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-xs font-black text-amber-400">C</div>
                  <div className="col-span-3 text-right">
                    <span className="text-[9px] font-extrabold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded tracking-wide uppercase border border-amber-500/20">
                      Medium
                    </span>
                  </div>
                </div>

                {/* Entry Item 3 */}
                <div className="grid grid-cols-12 gap-4 items-center py-4 px-2 hover:bg-[#0d1e3d]/30 rounded-lg transition">
                  <div className="col-span-7 space-y-1.5">
                    <p className="text-xs font-semibold text-slate-200 truncate">Which muscle is primarily...</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="bg-[#071126] px-1.5 py-0.5 border border-slate-800 rounded">B: C.W.Muscle</span>
                      <span className="bg-[#071126] px-1.5 py-0.5 border border-slate-800 rounded">D: T.A.Muscle</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-xs font-black text-amber-400">B</div>
                  <div className="col-span-3 text-right">
                    <span className="text-[9px] font-extrabold bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded tracking-wide uppercase border border-rose-500/20">
                      Hard
                    </span>
                  </div>
                </div>

              </div>

              {/* Data Table Pagination Footer Controls */}
              <div className="flex justify-between items-center pt-5 mt-4 border-t border-slate-800/40 text-xs">
                <span className="text-slate-500 font-bold tracking-wide uppercase text-[10px]">Showing 1-10 of 50</span>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-[#071126]/60 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-lg flex items-center gap-1 transition text-[11px] font-medium">
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <button className="px-3 py-1.5 bg-amber-400 text-[#071126] font-bold rounded-lg flex items-center gap-1 hover:bg-amber-500 transition text-[11px]">
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}