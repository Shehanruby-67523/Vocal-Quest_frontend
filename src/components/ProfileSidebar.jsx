import React from "react";
import { User } from "lucide-react";
import { colors } from "../styles/colors";

export default function ProfileSidebar() {
  return (
    <aside
      className="w-full md:w-72 flex flex-col items-center px-6 py-10 text-center"
      style={{ backgroundColor: colors.sidebar }}
    >
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center mb-5 overflow-hidden"
        style={{ backgroundColor: colors.panelDark }}
      >
        {/* Swap this for an <img src="..." className="w-full h-full object-cover" /> with the real profile photo */}
        <User size={56} color="#ffffff" strokeWidth={1.5} />
      </div>
      <h2 className="text-white font-bold text-lg">Olivia Silva</h2>
      <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
        @oliviya2000
      </p>
      <p
        className="text-xs mt-3 leading-relaxed max-w-50"
        style={{ color: colors.textMuted }}
      >
        Speaks confidently, learns daily, and levels up one quiz at a time.
      </p>
      <button
        className="mt-6 px-6 py-2 rounded-lg font-bold text-xs tracking-wide"
        style={{ backgroundColor: colors.gold, color: colors.panelDark }}
      >
        EDIT PROFILE
      </button>
    </aside>
  );
}