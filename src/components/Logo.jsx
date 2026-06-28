import React from "react";
import { colors } from "../styles/colors";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center" style={{ color: colors.gold }}>
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="6" width="8" height="12" rx="4" />
          <path d="M9 12v2a7 7 0 0 0 14 0v-2" />
          <path d="M16 21v5M12 26h8" />
          <path d="M26 16a10 10 0 1 1-3.5-7.5" />
          <path d="M22 6h4v4" />
        </svg>
      </div>
      <div className="leading-[1.1] flex flex-col justify-center">
        <span className="text-[12px] font-black uppercase tracking-[0.18em]" style={{ color: colors.gold }}>
          Vocal
        </span>
        <span className="text-[12px] font-black uppercase tracking-[0.18em]" style={{ color: colors.gold }}>
          Quest
        </span>
      </div>
    </div>
  );
}