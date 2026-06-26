import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Mic2, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  MousePointer, 
  Move, 
  PlusSquare, 
  Link2, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Trash2, 
  Lock, 
  ChevronDown 
} from 'lucide-react';
import AdminSidebar from '../Components/common/AdminSidebar';

export default function VocalQuestAdmin() {
  const [activeTab, setActiveTab] = useState('Story Maps');

  return (
    <div className="flex h-screen w-screen bg-[#070b13] text-slate-300 font-sans select-none overflow-hidden">
      <AdminSidebar />

      {/* RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* 2. TOP HEADER */}
        <header className="h-16 bg-[#0a1931] border-b border-slate-800 flex items-center justify-between px-8 z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="hover:text-white cursor-pointer">Campaigns</span>
            <span className="text-slate-600">&gt;</span>
            <span className="hover:text-white cursor-pointer">The Shadow Realm</span>
            <span className="text-slate-600">&gt;</span>
            <span className="text-[#ffd300] font-medium">Narrative Logic Designer</span>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search nodes or assets..." 
                className="w-full bg-[#112240] text-sm text-slate-200 pl-9 pr-4 py-2 rounded-lg border border-slate-700/50 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-white rounded-lg bg-[#112240] hover:bg-slate-800 transition">
              <Bell size={18} />
            </button>
            <div className="w-8 h-8 rounded-full border border-[#ffd300] overflow-hidden bg-slate-700 cursor-pointer">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* 3. WORKSPACE CORE */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* CANVASES/NODE GRAPH FLOOR */}
          <main className="flex-1 relative bg-[#030e21] overflow-hidden">
            
            {/* Floating Nodes Toolbar */}
            <div className="absolute top-6 left-6 flex items-center bg-[#0d2347]/90 backdrop-blur border border-slate-700/60 rounded-lg p-1.5 shadow-xl space-x-1 z-20">
              <ToolbarButton icon={<MousePointer size={16} />} active />
              <ToolbarButton icon={<Move size={16} />} />
              <div className="w-[1px] h-4 bg-slate-700 mx-1"></div>
              <ToolbarButton icon={<PlusSquare size={16} />} />
              <ToolbarButton icon={<Link2 size={16} />} />
              <div className="w-[1px] h-4 bg-slate-700 mx-1"></div>
              <ToolbarButton icon={<ZoomIn size={16} />} />
              <ToolbarButton icon={<ZoomOut size={16} />} />
            </div>

            {/* Simulated Node Network Graph */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Connecting Curving Bezier Lines */}
              <path d="M 510 355 C 570 355, 610 210, 710 210" stroke="#164e63" strokeWidth="2" fill="none" />
              <path d="M 510 355 C 600 355, 620 460, 670 460" stroke="#164e63" strokeWidth="2" fill="none" />
            </svg>

            {/* Node 1: Narration Node */}
            <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 bg-[#0c2145] border border-slate-700 rounded-lg p-4 w-52 shadow-2xl z-10 cursor-pointer hover:border-slate-500 transition">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                <Mic2 size={11} className="text-blue-400" />
                <span>Narration</span>
              </div>
              <p className="text-xs text-slate-300 font-medium truncate">The forest grows dark...</p>
            </div>

            {/* Node 2: Quest Node (Partially Cut off on Right side) */}
            <div className="absolute top-1/2 right-0 transform translate-y-[-20px] bg-[#0c2145] border-2 border-[#ffd300] rounded-l-xl p-4 w-32 shadow-2xl z-10">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#ffd300] font-bold mb-1">
                <span>🛡️ Quest Node</span>
              </div>
              <h4 className="text-xs font-bold text-white leading-tight mb-4">Demon Guardian Gate</h4>
              <div className="text-[10px] text-slate-500 mb-1">Outputs</div>
              <div className="space-y-1">
                <div className="bg-[#112b54] text-[10px] px-2 py-1 rounded text-slate-300">Approach</div>
                <div className="bg-[#112b54] text-[10px] px-2 py-1 rounded text-slate-300">Sneak</div>
              </div>
            </div>

            {/* Tiny Node / Marker */}
            <div className="absolute bottom-1/3 left-1/2 w-5 h-7 bg-teal-800/40 border border-teal-500/30 rounded-full blur-[2px]"></div>

            {/* Shortcuts Bottom Footer Label */}
            <div className="absolute bottom-4 right-4 flex items-center gap-4 text-xs text-slate-500">
              <span className="hover:text-slate-400 cursor-pointer">⌨️ Shortcuts</span>
              <span>Layer: <strong className="text-slate-400 font-normal">Story Logic</strong></span>
            </div>
          </main>

          {/* 4. NODE DETAILS RIGHT PANEL */}
          <aside className="w-80 bg-[#0a1931] border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              
              {/* Section Header */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div className="text-[#ffd300]">⚡</div>
                <h3 className="text-sm font-bold text-white tracking-wide">Node Details</h3>
              </div>

              {/* Input Group: TTS Narration Text */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">TTS Narration Text</label>
                <div className="bg-[#040e21] border border-slate-800 rounded-lg p-3 text-xs text-slate-300 leading-relaxed max-h-36 overflow-y-auto">
                  The Demon Guardian stands towering over the heavy iron gates. His eyes glow with hellfire as he raises a massive spiked mace. "None shall pass the Shadow King's threshold," he booms.
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <button className="flex items-center gap-1.5 text-[#ffd300] hover:underline font-medium">
                    <Play size={12} fill="#ffd300" /> Preview Voice
                  </button>
                  <span className="text-slate-500 text-[11px]">Voice: Orc Warrior #04</span>
                </div>
              </div>

              {/* Input Group: Player Choices */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Player Choices</label>
                  <button className="text-[#ffd300] hover:text-yellow-400">+</button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 group">
                    <div className="flex-1 flex items-center justify-between bg-[#112240] px-3 py-2 rounded-lg border border-slate-700/60 text-xs text-slate-200">
                      <span>Approach</span>
                      <Link2 size={12} className="text-slate-500" />
                    </div>
                    <button className="text-slate-500 hover:text-red-400 p-1"><Trash2 size={14} /></button>
                  </div>

                  <div className="flex items-center gap-2 group">
                    <div className="flex-1 flex items-center justify-between bg-[#112240] px-3 py-2 rounded-lg border border-slate-700/60 text-xs text-slate-200">
                      <span>Sneak</span>
                      <Link2 size={12} className="text-slate-500" />
                    </div>
                    <button className="text-slate-500 hover:text-red-400 p-1"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>

              {/* Input Group: Narrative Gate Component */}
              <div className="space-y-3 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
                  <Lock size={12} className="text-[#ffd300]" />
                  <span>Narrative Gate</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">Module Link</label>
                  <div className="flex items-center justify-between bg-[#112240] px-3 py-2 rounded-lg border border-slate-700/60 text-xs text-slate-200 cursor-pointer">
                    <span>Demon's Challenge MCé Module</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between items-center gap-4 pt-1">
                  <label className="text-[11px] text-slate-400">Required Score</label>
                  <div className="flex items-center gap-1.5 text-xs">
                    <input 
                      type="number" 
                      defaultValue={40} 
                      className="w-12 bg-[#112240] text-center py-1 rounded border border-blue-500/70 text-[#ffd300] font-bold focus:outline-none"
                    />
                    <span className="text-slate-500">/ 50</span>
                  </div>
                </div>

                {/* Conditional Info Disclaimer Block */}
                <div className="bg-[#ffd300]/5 border border-[#ffd300]/20 rounded-lg p-3 text-[11px] text-amber-200/80 leading-relaxed">
                  If successful, leads to "Castle Courtyard Entrance". If failed, triggers "Guardian Retaliation" sequence.
                </div>
              </div>

            </div>

            {/* Bottom Panel Actions Container */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <button className="w-full bg-[#ffd300] hover:bg-[#e6be00] text-slate-950 font-bold py-2.5 rounded-lg text-xs transition duration-150">
                SAVE CHANGES
              </button>
              <button className="w-full bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white font-medium py-2 rounded-lg text-xs border border-slate-700 transition duration-150">
                Revert to Latest Draft
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

{/* REUSABLE SUB-COMPONENTS TO KEEP CLEAN */}
function SidebarLink({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
        active 
          ? 'bg-[#1a2f52] text-[#ffd300] border-l-2 border-[#ffd300] rounded-l-none' 
          : 'text-slate-400 hover:bg-[#112240] hover:text-slate-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ToolbarButton({ icon, active }) {
  return (
    <button 
      className={`p-1.5 rounded-md transition ${
        active 
          ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
    </button>
  );
}