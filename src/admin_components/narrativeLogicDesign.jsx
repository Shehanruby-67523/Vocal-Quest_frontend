import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  MousePointer, 
  Move, 
  PlusSquare, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Trash2, 
  Lock, 
  ChevronDown,
  CheckCircle2,
  Mic2,
  Plus,
  RotateCcw,
  Sparkles,
  Trophy,
  GripHorizontal
} from 'lucide-react';
import AdminSidebar from '../Components/common/AdminSidebar';

export default function VocalQuestAdmin() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Canvas & Tools state
  const [activeTool, setActiveTool] = useState('select');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // DRAGGABLE NODES STATE WITH (X, Y) POSITIONS
  const [nodes, setNodes] = useState([
    {
      id: 'login',
      tag: 'Node #40 • Auth',
      title: '1. User Login',
      sub: 'Say: "start" / SSO',
      x: 40,
      y: 180,
      width: 200,
      height: 100,
      color: 'slate'
    },
    {
      id: 'whispering-woods',
      tag: 'Node #41 • Level 1',
      title: '2. Whispering Woods',
      sub: 'Say: "demon"',
      x: 320,
      y: 180,
      width: 220,
      height: 120,
      color: 'gold'
    },
    {
      id: 'demon-guardian',
      tag: 'Node #42 • Boss',
      title: '3. Demon Guardian',
      sub: 'Say: "challenge"',
      x: 620,
      y: 180,
      width: 220,
      height: 120,
      color: 'rose'
    },
    {
      id: 'rewards',
      tag: 'Node #43 • Rewards',
      title: '4. XP & Badges',
      sub: '+100 XP • Explorer Badge',
      x: 920,
      y: 180,
      width: 200,
      height: 100,
      color: 'emerald'
    }
  ]);

  // Selected Story Node ID
  const [selectedNodeId, setSelectedNodeId] = useState('whispering-woods');

  // Dragging State
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Story Details State
  const [narrationText, setNarrationText] = useState(
    'You step into The Whispering Woods. Ancient trees hum with voice magic. To reach the Demon\'s Castle, pronounce the command word "demon" into your microphone.'
  );
  const [requiredScore, setRequiredScore] = useState(80);
  const [choices, setChoices] = useState([
    { id: 1, text: 'demon', target: 'Node #42 (Demon Guardian Challenge)' },
    { id: 2, text: 'woods', target: 'Node #41 (Whispering Woods)' }
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Zoom Handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 160));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 60));

  // Audio Preview TTS
  const handlePreviewVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(narrationText);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Node Selection Handler
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

  const handleAddChoice = () => {
    const newId = choices.length + 1;
    setChoices(prev => [...prev, { id: newId, text: `voice_${newId}`, target: 'Node #44 (New Branch)' }]);
  };

  const handleDeleteChoice = (id) => {
    setChoices(prev => prev.filter(c => c.id !== id));
  };

  const handleSaveChanges = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Helper to calculate arrow start/end points between node edges
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
    <div className="flex h-screen w-screen bg-[#070b13] text-slate-300 font-sans select-none overflow-hidden">
      
      {/* Admin Sidebar Navigation */}
      <AdminSidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-[#0a1931] border-b border-slate-800 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span onClick={() => navigate('/admin/command-center')} className="hover:text-white cursor-pointer">Campaigns</span>
            <span className="text-slate-600">&gt;</span>
            <span onClick={() => navigate('/admin/story-logic')} className="hover:text-white cursor-pointer">Vocal Quest Game Flow</span>
            <span className="text-slate-600">&gt;</span>
            <span className="text-[#ffd300] font-medium uppercase tracking-wider">
              {selectedNodeId === 'whispering-woods' ? 'Whispering Woods Node' : selectedNodeId === 'demon-guardian' ? 'Demon Guardian Node' : 'Story Node'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nodes or voice triggers..." 
                className="w-full bg-[#112240] text-sm text-slate-200 pl-9 pr-4 py-2 rounded-lg border border-slate-700/50 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-[#112240] hover:bg-slate-800 transition cursor-pointer relative"
                title="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0c2145] border border-slate-700 rounded-xl p-4 shadow-2xl z-50 text-xs">
                  <span className="font-bold text-[#ffd300] uppercase tracking-wider block border-b border-slate-800 pb-2 mb-2">Drag & Drop Engine</span>
                  <p className="text-slate-300">Drag any node card anywhere on screen to customize layout.</p>
                </div>
              )}
            </div>

            <div 
              onClick={() => navigate('/profile')}
              className="w-8 h-8 rounded-full border border-[#ffd300] overflow-hidden bg-slate-700 cursor-pointer hover:scale-105 transition"
              title="View Profile"
            >
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* WORKSPACE CORE */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* CANVAS VIEWPORT CONTAINER */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            {/* DRAGGABLE VISUAL FLOWCHART GRAPH FLOOR WITH SCROLLBARS */}
            <main 
              ref={canvasRef}
              onMouseMove={handleMouseMoveCanvas}
            onMouseUp={handleMouseUpCanvas}
            onMouseLeave={handleMouseUpCanvas}
            className="flex-1 relative bg-[#030e21] overflow-auto select-none cursor-crosshair [scrollbar-width:thin] [scrollbar-color:#ffd300_#0a1931]"
          >
            
            {/* Sticky Toolbar Controls */}
            <div className="sticky top-6 left-6 inline-flex items-center bg-[#0d2347]/90 backdrop-blur border border-slate-700/60 rounded-lg p-1.5 shadow-xl space-x-1 z-30 m-6 mb-0">
              <ToolbarButton 
                icon={<MousePointer size={16} />} 
                active={activeTool === 'select'} 
                onClick={() => setActiveTool('select')}
                title="Select & Drag Tool"
              />
              <ToolbarButton 
                icon={<Move size={16} />} 
                active={activeTool === 'pan'} 
                onClick={() => setActiveTool('pan')}
                title="Pan Canvas"
              />
              <div className="w-[1px] h-4 bg-slate-700 mx-1"></div>
              <ToolbarButton 
                icon={<ZoomIn size={16} />} 
                onClick={handleZoomIn}
                title="Zoom In"
              />
              <ToolbarButton 
                icon={<ZoomOut size={16} />} 
                onClick={handleZoomOut}
                title="Zoom Out"
              />
              <span className="text-[10px] font-mono font-bold text-[#ffd300] px-2">
                {zoomLevel}%
              </span>
            </div>

            {/* EXPANSIVE SCROLLABLE CANVAS FLOOR (2400px X 1600px) */}
            <div 
              className="w-[2400px] h-[1600px] relative transition-transform duration-75 p-10"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
            >
              {/* DYNAMIC SVG CONNECTING ARROWS */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <marker
                    id="dynamic-yellow-arrow"
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
                      {/* Curving Dynamic Yellow Arrow Line */}
                      <path
                        d={`M ${p1.x} ${p1.y} C ${p1.x + 60} ${p1.y}, ${p2.x - 60} ${p2.y}, ${p2.x} ${p2.y}`}
                        stroke="#FFD700"
                        strokeWidth="3.5"
                        fill="none"
                        markerEnd="url(#dynamic-yellow-arrow)"
                        className="drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                      />
                      {/* Floating Voice Trigger Pill over Arrow */}
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

              {/* MOVABLE DRAGGABLE STORY NODE CARDS */}
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
                      isSelected ? 'border-[#ffd300] bg-[#0c2145] shadow-[0_0_20px_rgba(255,211,0,0.4)]' : 'border-slate-700 bg-[#0c2145]/90 hover:border-slate-500'
                    }`}
                  >
                    {/* Drag Handle Top Bar */}
                    <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/50">
                      <span className="text-[10px] font-bold text-[#ffd300] uppercase tracking-wider">
                        {node.tag}
                      </span>
                      <GripHorizontal size={14} className="text-slate-400 hover:text-white" />
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug">{node.title}</h4>
                    
                    <div className="mt-2 text-[10px] text-slate-200 bg-[#112b54] p-1.5 rounded font-mono border border-slate-700 flex justify-between items-center">
                      <span>{node.sub}</span>
                    </div>
                  </div>
                );
              })}

            </div>
          </main>

          {/* Fixed Floating Bottom Legend - Stays in exact same position when scrolling */}
          <div className="absolute bottom-4 right-4 flex items-center gap-3 text-xs text-slate-300 bg-[#0d2347]/90 backdrop-blur px-3.5 py-1.5 rounded-lg border border-slate-700/60 shadow-xl z-30 pointer-events-none">
            <span className="text-slate-300 font-medium">💡 Tip: Click & Drag any node to move</span>
            <span className="text-slate-600">•</span>
            <span>Game Flow: <strong className="text-[#ffd300] font-bold">Movable Node Canvas Engine</strong></span>
          </div>
        </div>

          {/* NODE DETAILS RIGHT PANEL */}
          <aside className="w-80 bg-[#0a1931] border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto shrink-0">
            <div className="space-y-6">
              
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div className="text-[#ffd300]">⚡</div>
                <h3 className="text-sm font-bold text-white tracking-wide">Node Story Properties</h3>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-lg text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  Node positions & logic saved!
                </div>
              )}

              {/* TTS Narration Text */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">1. TTS Question / Narration Text</label>
                <textarea
                  rows="4"
                  value={narrationText}
                  onChange={(e) => setNarrationText(e.target.value)}
                  className="w-full bg-[#040e21] border border-slate-800 rounded-lg p-3 text-xs text-slate-300 leading-relaxed focus:outline-none focus:border-blue-500 resize-none"
                />
                <button 
                  onClick={handlePreviewVoice}
                  className="flex items-center gap-1.5 text-[#ffd300] hover:underline text-xs font-medium cursor-pointer pt-1"
                >
                  <Play size={12} fill="#ffd300" /> Preview Spoken Audio
                </button>
              </div>

              {/* Player Voice Commands */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">2. Recognized Voice Commands</label>
                  <button 
                    onClick={handleAddChoice}
                    className="p-1 bg-[#ffd300]/10 text-[#ffd300] hover:bg-[#ffd300]/20 rounded transition cursor-pointer" 
                    title="Add Command"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {choices.map((choice) => (
                    <div key={choice.id} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={choice.text}
                        onChange={(e) => {
                          const val = e.target.value;
                          setChoices(prev => prev.map(c => c.id === choice.id ? { ...c, text: val } : c));
                        }}
                        className="flex-1 bg-[#112240] px-3 py-2 rounded-lg border border-slate-700/60 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                      />
                      <button 
                        onClick={() => handleDeleteChoice(choice.id)}
                        className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                        title="Remove Command"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Narrative Gate Component */}
              <div className="space-y-3 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
                  <Lock size={12} className="text-[#ffd300]" />
                  <span>3. Score Threshold</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="text-[11px] text-slate-400">Passing Score</label>
                  <div className="flex items-center gap-1.5 text-xs">
                    <input 
                      type="number" 
                      value={requiredScore} 
                      onChange={(e) => setRequiredScore(e.target.value)}
                      className="w-16 bg-[#112240] text-center py-1 rounded border border-blue-500/70 text-[#ffd300] font-bold focus:outline-none"
                    />
                    <span className="text-slate-500">%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <button 
                onClick={handleSaveChanges}
                className="w-full bg-[#ffd300] hover:bg-[#e6be00] text-slate-950 font-bold py-2.5 rounded-lg text-xs transition duration-150 cursor-pointer"
              >
                SAVE STORY LOGIC
              </button>
              <button 
                onClick={() => navigate('/whispering-woods')}
                className="w-full bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white font-medium py-2 rounded-lg text-xs border border-slate-700 transition duration-150 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Play size={12} fill="currentColor" />
                <span>Test Flow in Game Engine</span>
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

{/* Toolbar Button Subcomponent */}
function ToolbarButton({ icon, active, onClick, title }) {
  return (
    <button 
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-md transition cursor-pointer ${
        active 
          ? 'bg-blue-600/40 text-blue-400 border border-blue-500/60 shadow-inner' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
    </button>
  );
}