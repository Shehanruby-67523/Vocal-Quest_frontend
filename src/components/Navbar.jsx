import React from "react";
import { Bell, User } from "lucide-react";
import Logo from "./Logo";
import { colors } from "../styles/colors";

export default function Navbar() {
  const links = ["Dashboard", "Quizzes", "Leaderboard"];

  return (
    <header
      className="flex items-center justify-between px-6 md:px-10 py-4"
      style={{ backgroundColor: colors.nav }}
    >
      <Logo />
      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-white font-semibold text-sm hover:opacity-80"
          >
            {link}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Bell size={20} color={colors.gold} />
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center border-2 overflow-hidden"
          style={{ borderColor: colors.gold, backgroundColor: colors.sidebar }}
        >
          <User size={16} color="#ffffff" />
        </div>
      </div>
    </header>
  );
}