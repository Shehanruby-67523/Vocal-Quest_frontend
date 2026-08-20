import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  Users,
  Workflow,
  Database,
  LineChart,
  Rocket,
  User
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
    },
    {
      name: 'Admin Profile',
      path: '/admin/profile',
      icon: <User size={18} />
    }
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-slate-800/60 flex flex-col justify-between h-screen sticky top-0 py-6 select-none shrink-0 z-20">
      <div>
        {/* Brand Logo Header */}
        <div
          onClick={() => navigate('/admin/command-center')}
          className="px-6 mb-8 flex flex-col items-start cursor-pointer group"
          title="Admin Command Center"
        >
          <img
            src="/pvmT4-removebg-preview.png"
            alt="Vocal Quest Logo"
            className="w-full max-w-[180px] max-h-[90px] h-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(217,183,79,0.35)]"
            onError={(e) => {
              e.target.src = "/src/assets/logo_brand.png";
            }}
          />
          <span className="text-[10px] font-extrabold text-gold-400 tracking-widest uppercase block mt-1.5 px-2 py-0.5 bg-gold-400/10 border border-gold-400/20 rounded-md">
            ADMIN PANEL
          </span>
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
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-semibold transition-all duration-200 relative group ${isActive
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

      {/* Admin User Profile Card & Launch Game Button */}
      <div className="px-4 space-y-3">
        {/* Admin Profile Clickable Badge */}
        {(() => {
          let adminName = 'Admin';
          let avatarUrl = '';
          try {
            const perm = localStorage.getItem('vocal_quest_avatar_permanent');
            if (perm) avatarUrl = perm;

            const stored = localStorage.getItem('vocal_quest_user');
            if (stored) {
              const u = JSON.parse(stored);
              const nameStr = u.name || u.username || (u.email ? u.email.split('@')[0] : 'Admin');
              adminName = nameStr;
              if (!avatarUrl && u.avatar) avatarUrl = u.avatar;
            }
          } catch (e) { }

          if (!avatarUrl) {
            avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(adminName)}`;
          }

          return (
            <div
              onClick={() => navigate('/admin/profile')}
              className="p-2.5 bg-[#18233c] hover:bg-[#1f2e4e] border border-[#d9b74f]/30 rounded-xl flex items-center gap-3 cursor-pointer transition group"
              title="Click to view Admin Profile"
            >
              <div className="w-8 h-8 rounded-full border border-[#d9b74f] overflow-hidden bg-[#0A2E52] shrink-0 group-hover:scale-105 transition">
                <img src={avatarUrl} alt={adminName} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">{adminName} (Admin)</span>
                <span className="text-[10px] text-[#d9b74f] font-mono font-semibold">SUPER ADMIN</span>
              </div>
            </div>
          );
        })()}

        <button
          onClick={() => navigate('/whispering-woods')}
          className="w-full bg-gradient-to-r from-[#d9b74f] via-amber-400 to-[#d9b74f] hover:from-amber-400 hover:to-amber-500 text-[#031220] font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-200 text-xs shadow-[0_0_15px_rgba(217,183,79,0.35)] border border-[#d9b74f]/40 cursor-pointer transform active:scale-95"
        >
          <Rocket size={16} strokeWidth={2.5} />
          <span>Launch Game</span>
        </button>
      </div>
    </aside>
  );
}
