import React from "react";
import { Mic } from "lucide-react";
import { colors } from "../styles/colors";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Mic size={26} color={colors.gold} strokeWidth={2.2} />
      <div className="leading-tight">
        <p className="font-bold text-sm" style={{ color: colors.gold }}>
          Vocal
        </p>
        <p className="font-bold text-sm text-white -mt-1">Quest</p>
      </div>
    </div>
  );
}