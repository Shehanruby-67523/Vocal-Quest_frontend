import React from "react";
import { User, Mic } from "lucide-react";
import { Link } from "react-router-dom";
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
      <div className="flex flex-col gap-2 mt-6 w-full px-4">
        <button
          className="w-full py-2.5 rounded-lg font-bold text-xs tracking-wide cursor-pointer transition-all hover:opacity-90"
          style={{ backgroundColor: colors.gold, color: colors.panelDark }}
        >
          EDIT PROFILE
        </button>
        <Link
          to="/voice-print"
          className="w-full py-2.5 rounded-lg font-bold text-xs tracking-wide border border-[#EFB034]/40 hover:border-[#EFB034] hover:bg-[#EFB034]/5 text-[#EFB034] hover:text-white transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Mic size={14} />
          MANAGE VOICE PRINT
        </Link>
      </div>
    </aside>
  );
}