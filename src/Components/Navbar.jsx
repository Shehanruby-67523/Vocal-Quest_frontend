import React from "react";
import { Link } from "react-router-dom";
import { Bell, User } from "lucide-react";
import Logo from "./Logo";
import { colors } from "../styles/colors";

export default function Navbar() {
  const links = [
    { name: "Dashboard", path: "/player-journey" },
    { name: "Game Hub", path: "/game-hub" },
    { name: "Profile", path: "/profile" },
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
      <div className="flex items-center gap-4">
        <Bell size={20} color={colors.gold} className="cursor-pointer hover:opacity-80 transition" />
        <Link
          to="/profile"
          className="w-9 h-9 rounded-full flex items-center justify-center border-2 overflow-hidden hover:border-white transition"
          style={{ borderColor: colors.gold, backgroundColor: colors.sidebar }}
        >
          <User size={16} color="#ffffff" />
        </Link>
      </div>
    </header>
  );
}