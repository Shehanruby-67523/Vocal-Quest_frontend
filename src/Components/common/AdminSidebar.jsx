import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Users, 
  Workflow, 
  Database, 
  LineChart, 
  Rocket 
} from 'lucide-react';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: 'Command Center',
      path: '/admin/command-center',
      icon: <LayoutGrid size={18} />
    },
    {
      name: 'User Management',
      path: '/admin/users',
      icon: <Users size={18} />
    },
    {
      name: 'Story Logic',
      path: '/admin/story-logic',
      icon: <Workflow size={18} />
    },
    {
      name: 'Quiz Database',
      path: '/admin/quiz-database',
      icon: <Database size={18} />
    },
    {
      name: 'Game Analytics',
      path: '/admin/game-analytics',
      icon: <LineChart size={18} />
    }
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-slate-800/60 flex flex-col justify-between h-screen sticky top-0 py-6 select-none shrink-0 z-20">
      <div>
        {/* Brand Logo Header */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400 text-slate-950 font-black shadow-[0_0_15px_rgba(217,183,79,0.3)]">
            <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white uppercase leading-none">
              Vocal Quest
            </h1>
            <span className="text-[10px] font-bold text-gold-400 tracking-wider uppercase block mt-1">
              ADMIN PANEL
            </span>
          </div>
        </div>

        {/* Sidebar Links */}
        <nav className="space-y-1.5 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path === '/admin/command-center' && (location.pathname === '/admin' || location.pathname === '/admin/'));
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-semibold transition-all duration-200 relative group ${
                  isActive
                    ? 'bg-[#18233c] text-gold-400'
                    : 'text-slate-400 hover:bg-[#10192e] hover:text-slate-200'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold-400 rounded-r" />
                )}
                <span className={`transition-colors duration-200 ${isActive ? 'text-gold-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Launch Game Button */}
      <div className="px-4">
        <button
          onClick={() => window.open('/demon-guardian', '_blank')}
          className="w-full bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200 text-xs shadow-[0_4px_15px_rgba(217,183,79,0.15)]"
        >
          <Rocket size={14} />
          <span>Launch Game</span>
        </button>
      </div>
    </aside>
  );
}
