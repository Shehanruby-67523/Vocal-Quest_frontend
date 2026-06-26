import React, { useState } from 'react';
import { X, Mic, MicOff, MessageSquare } from 'lucide-react';
import GlobalNavigation from '../Components/common/GlobalNavigation';

export default function GameHub() {
  const [showHelp, setShowHelp] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const [micActive, setMicActive] = useState(true);

  // Command items in the voice command cards
  const initialCommands = [
    {
      phrase: '"Go Back"',
      action: 'Previous Screen'
    },
    {
      phrase: '"Repeat"',
      action: 'Replay Audio'
    },
    {
      phrase: '"Select [Option]"',
      action: 'Choose Item'
    },
    {
      phrase: '"Pause Game"',
      action: 'Open Menu'
    }
  ];

  // Filter commands based on search value
  const filteredCommands = initialCommands.filter(cmd => 
    cmd.phrase.toLowerCase().includes(searchVal.toLowerCase()) ||
    cmd.action.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#040e21] text-slate-200 font-sans flex flex-col transition-colors duration-300 relative select-none">
      
      {/* Top Global Navigation with Search bar and toggles */}
      <GlobalNavigation 
        onToggleHelp={() => setShowHelp(prev => !prev)}
        showHelp={showHelp}
        onSearchChange={setSearchVal}
        searchVal={searchVal}
      />

      {/* Main Workspace Floor */}
      <main className="flex-1 flex flex-col items-center justify-start py-10 px-6 max-w-4xl w-full mx-auto space-y-8 z-10">
        
        {/* Welcome Message Card */}
        <div className="bg-[#0b172a]/60 backdrop-blur border border-slate-800/80 rounded-xl p-8 w-full max-w-2xl shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-gold-400 mb-3 tracking-wide">
            Welcome back, Questmaster
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Your vocal journey continues. All systems are calibrated for high-fidelity voice recognition. 
            Use the utility bar above to customize your accessibility experience at any time during gameplay.
          </p>
        </div>

        {/* Voice Commands Help Overlay/Card */}
        {showHelp && (
          <div className="bg-[#080f1e] border-2 border-gold-400/40 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative transition-all duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-gold-400 transition duration-150"
              title="Close Voice Commands"
            >
              <X size={16} />
            </button>

            {/* Header Title with speaking silhouette icon */}
            <div className="flex items-center gap-3 text-gold-400 font-bold text-sm tracking-wide mb-6">
              <span className="p-2 bg-gold-400/10 rounded-lg border border-gold-400/20">
                <MessageSquare size={16} />
              </span>
              <span>Voice Commands</span>
            </div>

            {/* Commands List */}
            <div className="space-y-3.5">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center bg-[#0d162b] border border-slate-800/60 p-4 rounded-xl hover:border-gold-400/30 transition duration-150"
                  >
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {cmd.phrase}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-400/10 border border-gold-400/20 px-3 py-1.5 rounded-lg shadow-sm">
                      {cmd.action}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs italic">
                  No matching commands found.
                </div>
              )}
            </div>

            {/* Footer Prompt */}
            <div className="text-center mt-6 text-[10px] text-slate-500 font-semibold tracking-wide border-t border-slate-900 pt-4">
              Try saying "Help" at any time to see these commands.
            </div>
          </div>
        )}
      </main>

      {/* Floating MIC Status Badge bottom-right */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <button
          onClick={() => setMicActive(prev => !prev)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 shadow-lg text-[10px] font-bold tracking-widest uppercase ${
            micActive 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 shadow-emerald-500/5' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 shadow-rose-500/5'
          }`}
          title="Click to toggle mic status simulation"
        >
          <span className={`w-2 h-2 rounded-full ${micActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
          <span>{micActive ? 'MIC ACTIVE' : 'MIC MUTED'}</span>
        </button>
      </div>

    </div>
  );
}
