import React from "react";
import { colors } from "../styles/colors";

export default function StatisticCard({ value, label, children }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col items-center text-center shadow-md"
      style={{ backgroundColor: colors.card }}
    >
      <div className="mb-3">{children}</div>
      <p className="font-bold text-lg" style={{ color: colors.panelDark }}>
        {value}
      </p>
      <p className="text-xs mt-1" style={{ color: colors.cardTextMuted }}>
        {label}
      </p>
    </div>
  );
}