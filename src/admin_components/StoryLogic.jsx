import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Workflow, 
  Database, 
  LineChart, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  ZoomIn, 
  ZoomOut, 
  Move, 
  MousePointer, 
  Trash2, 
  Play, 
  Volume2, 
  Check, 
  Sparkles, 
  ArrowRight,
  Trophy,
  Mic2,
  Lock,
  GripHorizontal
} from 'lucide-react';

export default function StoryLogic() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [zoomLevel, setZoomLevel] = useState(100);

  // DRAGGABLE NODES STATE WITH (X, Y) COORDS
  const [nodes, setNodes] = useState([
    {
      id: 'login',
      tag: 'Node #40 • Auth',
      title: '1. User Login / SSO',
      sub: 'Say: "start"',
      x: 40,
      y: 180,
      width: 200,
      height: 100
    },
    {
      id: 'whispering-woods',
      tag: 'Node #41 • Level 1',
      title: '2. Whispering Woods',
      sub: 'Say: "demon"',
      x: 320,
      y: 180,
      width: 220,
      height: 120
    },
    {
      id: 'demon-guardian',
      tag: 'Node #42 • Boss',
      title: '3. Demon Guardian',
      sub: 'Say: "challenge"',
      x: 620,
      y: 180,
      width: 220,
      height: 120
    },
    {
      id: 'rewards',
      tag: 'Node #43 • Rewards',
      title: '4. XP & Badges',
      sub: '+100 XP • Explorer Badge',
      x: 920,
      y: 180,
      width: 200,
      height: 100
    }
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState('whispering-woods');
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [narrationText, setNarrationText] = useState(
    'You step into The Whispering Woods. Ancient trees hum with voice magic. To reach the Demon\'s Castle, pronounce the command word "demon" into your microphone.'
  );
  const [requiredScore, setRequiredScore] = useState(80);
  const [choices, setChoices] = useState([
    { id: 1, text: 'demon', target: 'Node #42 (Demon Guardian Challenge)' },
    { id: 2, text: 'woods', target: 'Node #41 (Whispering Woods)' }
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 160));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 60));

  const handleTestAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(narrationText);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectNode = (nodeId) => {
    setSelectedNodeId(nodeId);
    if (nodeId === 'login') {
      setNarrationText('Welcome, Questmaster. Speak "start" or "login" to enter The Whispering Woods.');
      setRequiredScore(50);
      setChoices([{ id: 1, text: 'start', target: 'Node #41 (Whispering Woods)' }]);
    } else if (nodeId === 'whispering-woods') {
      setNarrationText('You step into The Whispering Woods. Ancient trees hum with voice magic. To reach the Demon\'s Castle, pronounce the command word "demon" into your microphone.');
      setRequiredScore(80);
      setChoices([
        { id: 1, text: 'demon', target: 'Node #42 (Demon Guardian Challenge)' },
        { id: 2, text: 'woods', target: 'Node #41 (Whispering Woods)' }
      ]);
    } else if (nodeId === 'demon-guardian') {
      setNarrationText('The Demon Guardian stands towering over the heavy iron gates. His eyes glow with hellfire as he raises a massive spiked mace. Speak "challenge" to answer the quiz or "retreat" to fallback.');
      setRequiredScore(85);
      setChoices([
        { id: 1, text: 'challenge', target: 'Node #43 (Demon\'s MCQ Quiz)' },
        { id: 2, text: 'retreat', target: 'Node #41 (Whispering Woods)' }
      ]);
    } else if (nodeId === 'rewards') {
      setNarrationText('Victory! You have defeated the Demon Guardian. +100 XP earned and "Voice Explorer" badge unlocked on your dashboard!');
      setRequiredScore(100);
      setChoices([{ id: 1, text: 'profile', target: 'Player Profile & Achievements' }]);
    }
  };

  // MOUSE DRAG AND DROP HANDLERS
  const handleMouseDownNode = (e, nodeId) => {
    e.stopPropagation();
    handleSelectNode(nodeId);
    setDraggingNodeId(nodeId);
    const targetNode = nodes.find(n => n.id === nodeId);
    if (targetNode) {
      setDragOffset({
        x: e.clientX - targetNode.x,
        y: e.clientY - targetNode.y
      });
    }
  };

  const handleMouseMoveCanvas = (e) => {
    if (!draggingNodeId) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    setNodes(prev => prev.map(node => node.id === draggingNodeId ? { ...node, x: Math.max(10, newX), y: Math.max(10, newY) } : node));
  };

  const handleMouseUpCanvas = () => {
    setDraggingNodeId(null);
  };

  const handleSaveNode = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Calculate coordinates for connection arrows
  const getNodeCenterRight = (id) => {
    const n = nodes.find(item => item.id === id);
    if (!n) return { x: 0, y: 0 };
    return { x: n.x + n.width, y: n.y + n.height / 2 };
  };

  const getNodeCenterLeft = (id) => {
    const n = nodes.find(item => item.id === id);
    if (!n) return { x: 0, y: 0 };
    return { x: n.x, y: n.y + n.height / 2 };
  };

  const connections = [
    { from: 'login', to: 'whispering-woods', label: '"start"' },
    { from: 'whispering-woods', to: 'demon-guardian', label: '"demon"' },
    { from: 'demon-guardian', to: 'rewards', label: 'Pass Gate' }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#070b13] text-slate-200 font-sans antialiased select-none overflow-x-hidden">
      
      {/* 1. HEADER - TOP NAV BAR */}
      <header className="h-[65px] bg-[#0F172A] border-b border-[#5F9EA0] flex items-center justify-between px-6 sticky top-0 z-50 shrink-0">
        <div 
          onClick={() => navigate('/admin/command-center')} 
          className="flex items-center gap-3 cursor-pointer group"
          title="Admin Command Center"
        >
          <img
            src="/pvmT4-removebg-preview.png"
            alt="Vocal Quest Logo"
            className="h-10 w-auto max-w-[160px] object-contain transition-transform group-hover:scale-105 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]"
          />
          <span className="text-xl font-black tracking-tight text-[#FFD700] uppercase">
            VOCAL QUEST ADMIN
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-sm text-[#94A3B8]">
          <span className="hover:text-slate-200 cursor-pointer">Campaigns</span>
          <span className="text-slate-600 text-xs">›</span>
          <span className="hover:text-slate-200 cursor-pointer">Vocal Quest Game Flow</span>
          <span className="text-slate-600 text-xs">›</span>
          <span className="font-semibold text-[#FFD700]">Story Logic Designer</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleTestAudio}
            className="w-10 h-10 bg-[#0A2E52] hover:bg-[#0c3763] text-slate-200 rounded-lg flex items-center justify-center transition border border-slate-700/60 cursor-pointer"
            title="Quick Audio Test"
          >
            <Volume2 size={18} className="text-[#FFD700]" />
          </button>
          <div 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full border border-[#FFD700] overflow-hidden bg-slate-800 p-0.5 cursor-pointer hover:scale-105 transition flex items-center justify-center"
          >
            <span className="text-xs font-bold text-[#FFD700]">VQ</span>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE FLOOR */}
      <div className="flex flex-1 w-full min-h-[calc(100vh-105px)] overflow-hidden">
        
        {/* ASIDE - SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-[#0F172A] border-r border-[#5F9EA0] p-4 flex flex-col justify-between shrink-0 select-none">
          <div className="space-y-6">
            <h3 className="px-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
              Main Menu
            </h3>

            <nav className="space-y-1">
              <button
                onClick={() => navigate('/admin/command-center')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#CBD5E1] hover:text-white hover:bg-slate-800/50 transition cursor-pointer"
              >
                <LayoutGrid size={16} />
                <span>Command Center</span>
              </button>

              <button
                onClick={() => navigate('/admin/story-logic')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#FFD700] bg-[#FFD700]/10 font-semibold transition cursor-pointer"
              >
                <Workflow size={16} className="text-[#FFD700]" />
                <span>Story Logic</span>
              </button>

              <button
                onClick={() => navigate('/admin/quiz-database')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#CBD5E1] hover:text-white hover:bg-slate-800/50 transition cursor-pointer"
              >
                <Database size={16} />
                <span>Quiz Database</span>
              </button>

              <button
                onClick={() => navigate('/admin/game-analytics')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#CBD5E1] hover:text-white hover:bg-slate-800/50 transition cursor-pointer"
              >
                <LineChart size={16} />
                <span>Game Analytics</span>
              </button>
            </nav>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => navigate('/whispering-woods')}
              className="w-full py-2.5 px-4 bg-[#FFD700] hover:bg-amber-400 text-[#000000] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Play size={14} fill="#000" />
              <span>Launch Game</span>
            </button>
          </div>
        </aside>

        {/* MAIN CANVAS VIEWPORT CONTAINER */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {/* MAIN MOVABLE DRAGGABLE VISUAL FLOWCHART CANVAS WITH SCROLLBARS */}
          <main 
            ref={canvasRef}
            onMouseMove={handleMouseMoveCanvas}
            onMouseUp={handleMouseUpCanvas}
          onMouseLeave={handleMouseUpCanvas}
          className="flex-1 bg-[radial-gradient(70.71%_70.71%_at_50%_50%,#5F9EA0_2.36%,rgba(95,158,160,0)_2.36%),#070b13] relative overflow-auto cursor-crosshair select-none [scrollbar-width:thin] [scrollbar-color:#FFD700_#0F172A]"
        >
          {/* Sticky Toolbar Controls */}
          <div className="sticky top-6 left-6 inline-flex items-center bg-[#0A2E52] border border-[#5F9EA0] rounded-xl p-1.5 gap-1 shadow-2xl backdrop-blur-md z-30 m-6 mb-0">
            <button className="p-2 bg-[#5F9EA0] text-white rounded-lg cursor-pointer" title="Select & Drag Tool">
              <MousePointer size={18} />
            </button>
            <button onClick={handleZoomIn} className="p-2 text-[#94A3B8] hover:text-white rounded-lg cursor-pointer" title="Zoom In">
              <ZoomIn size={18} />
            </button>
            <button onClick={handleZoomOut} className="p-2 text-[#94A3B8] hover:text-white rounded-lg cursor-pointer" title="Zoom Out">
              <ZoomOut size={18} />
            </button>
            <span className="text-[10px] font-mono font-bold text-[#FFD700] px-2">{zoomLevel}%</span>
          </div>

          {/* User Movable Nodes Canvas Container (2400px X 1600px) */}
          <div 
            className="w-[2400px] h-[1600px] relative transition-transform duration-75 p-10"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
          >
            {/* DYNAMIC SVG CONNECTING ARROWS */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <marker
                  id="yellow-arrow-sl"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#FFD700" />
                </marker>
              </defs>

              {connections.map((conn, idx) => {
                const p1 = getNodeCenterRight(conn.from);
                const p2 = getNodeCenterLeft(conn.to);
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;

                return (
                  <g key={idx}>
                    <path
                      d={`M ${p1.x} ${p1.y} C ${p1.x + 60} ${p1.y}, ${p2.x - 60} ${p2.y}, ${p2.x} ${p2.y}`}
                      stroke="#FFD700"
                      strokeWidth="3.5"
                      fill="none"
                      markerEnd="url(#yellow-arrow-sl)"
                      className="drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                    />
                    <rect
                      x={midX - 30}
                      y={midY - 12}
                      width="60"
                      height="20"
                      rx="10"
                      fill="#0A2E52"
                      stroke="#FFD700"
                      strokeWidth="1"
                    />
                    <text
                      x={midX}
                      y={midY + 2}
                      fill="#FFD700"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {conn.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* MOVABLE NODE CARDS */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isDragging = draggingNodeId === node.id;

              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => handleMouseDownNode(e, node.id)}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${node.width}px`
                  }}
                  className={`absolute p-4 rounded-xl border-2 transition-shadow cursor-grab active:cursor-grabbing z-10 ${
                    isDragging ? 'shadow-[0_0_30px_rgba(255,215,0,0.6)] z-30 scale-105' : 'shadow-xl'
                  } ${
                    isSelected ? 'border-[#FFD700] bg-[#0A2E52] shadow-[0_0_20px_rgba(255,215,0,0.4)]' : 'border-[#5F9EA0]/60 bg-[#0A2E52]/90 hover:border-[#5F9EA0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/50">
                    <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-wider">
                      {node.tag}
                    </span>
                    <GripHorizontal size={14} className="text-slate-400 hover:text-white" />
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug">{node.title}</h4>
                  
                  <div className="mt-2 text-[10px] text-slate-200 bg-slate-900/60 p-1.5 rounded font-mono border border-slate-700 flex justify-between items-center">
                    <span>{node.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Fixed Floating Bottom Legend Banner - Stays in exact same position when scrolling */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3 text-xs text-slate-300 bg-[#0A2E52]/90 backdrop-blur px-3.5 py-1.5 rounded-lg border border-[#5F9EA0]/60 shadow-xl z-30 pointer-events-none">
          <span className="text-slate-200 font-medium">💡 Tip: Click & Drag any node to move</span>
          <span className="text-slate-500">•</span>
          <span>Game Flow: <strong className="text-[#FFD700] font-bold">Movable Node Canvas Engine</strong></span>
        </div>
      </div>

        {/* ASIDE - RIGHT DETAIL SIDEBAR */}
        <aside className="w-80 bg-[#0F172A] border-l border-[#5F9EA0] p-6 flex flex-col justify-between shrink-0 select-none overflow-y-auto space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2 bg-[#FFD700]/10 rounded-lg text-[#FFD700]">
                <Workflow size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F1F5F9]">Node Story Logic</h3>
                <p className="text-xs text-[#94A3B8]">Movable Node Engine</p>
              </div>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <Check size={16} className="text-emerald-400" />
                Node layout saved successfully!
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                1. Spoken TTS Narration Text
              </label>
              <textarea
                rows="5"
                value={narrationText}
                onChange={(e) => setNarrationText(e.target.value)}
                className="w-full bg-[#0A2E52] border border-[#5F9EA0] rounded-xl p-3 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#FFD700] resize-none leading-relaxed"
              />
              <button
                onClick={handleTestAudio}
                className="text-xs font-medium text-[#FFD700] hover:underline flex items-center gap-1.5 cursor-pointer pt-1"
              >
                <Volume2 size={14} />
                <span>Test Narration Playback</span>
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                2. Target Voice Command Triggers
              </label>
              {choices.map((choice) => (
                <div key={choice.id} className="p-3 bg-[#0A2E52] border border-[#5F9EA0] rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-[#E2E8F0] font-mono">
                    <span>Voice Trigger: "{choice.text}"</span>
                  </div>
                  <span className="text-[11px] text-[#CBD5E1] block">➜ {choice.target}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#5F9EA0]/60 space-y-3">
              <label className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#FFD700]" />
                3. Gate Condition & Score Threshold
              </label>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#64748B]">Passing Score</span>
                <span className="text-xs font-bold text-[#FFD700] font-mono">{requiredScore}%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#5F9EA0] space-y-2">
            <button
              onClick={handleSaveNode}
              className="w-full py-3 bg-[#FFD700] hover:bg-amber-400 text-[#000000] font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition cursor-pointer"
            >
              SAVE STORY LOGIC
            </button>
            <button
              onClick={() => navigate('/whispering-woods')}
              className="w-full py-3 bg-[#0A2E52] hover:bg-[#0c3763] border border-[#5F9EA0] text-[#CBD5E1] font-semibold text-xs rounded-xl transition cursor-pointer"
            >
              TEST IN GAME ENGINE
            </button>
          </div>
        </aside>

      </div>

      {/* 3. FOOTER STATUS BAR */}
      <footer className="h-[40px] bg-[#0F172A] border-t border-[#5F9EA0] px-6 flex items-center justify-between text-xs text-[#64748B] shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span>Interactive Drag & Drop Engine Active</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>Active Nodes: 4</span>
          <span>•</span>
          <span>Zoom: {zoomLevel}%</span>
        </div>
      </footer>

    </div>
  );
}
