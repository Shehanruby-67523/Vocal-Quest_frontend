import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Inbox } from "lucide-react";
import Logo from "./Logo";
import { colors } from "../styles/colors";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([]);

  const links = [
    { name: "Dashboard", path: "/player-journey" },
    { name: "Game Hub", path: "/game-hub" },
  ];

  return (
    <header
      className="flex items-center justify-between px-6 md:px-10 py-4 backdrop-blur-md sticky top-0 z-50"
      style={{ backgroundColor: colors.nav }}
    >
      <Link to="/player-journey">
        <Logo />
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-white font-semibold text-sm hover:text-[#EFB034] transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4 relative">
        {/* Notification Bell Container */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="p-1.5 rounded-full hover:bg-slate-800/50 transition cursor-pointer text-slate-300 hover:text-white"
            title="Notifications"
          >
            <Bell size={20} color={colors.gold} />
          </button>

          {/* Notification Popover Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-64 bg-[#0B2239] border border-slate-700/80 rounded-2xl shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] text-slate-400 font-mono">0 New</span>
              </div>

              {notifications.length === 0 ? (
                <div className="py-6 text-center text-slate-400 space-y-2">
                  <Inbox className="mx-auto text-slate-500" size={24} />
                  <p className="text-xs font-medium text-slate-300">No notifications for now</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.map((n, idx) => (
                    <div key={idx} className="text-xs text-slate-200 p-2 bg-slate-800/40 rounded-lg">
                      {n}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <Link
          to="/profile"
          className="w-9 h-9 rounded-full flex items-center justify-center border-2 overflow-hidden hover:border-white transition"
          style={{ borderColor: colors.gold, backgroundColor: colors.sidebar }}
          title="View Profile"
        >
          <User size={16} color="#ffffff" />
        </Link>
      </div>
    </header>
  );
}