import React from "react";
import { colors } from "../styles/colors";

function Badge({ from, to, children }) {
  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
      style={{ background: `radial-gradient(circle at 30% 30%, ${from}, ${to})` }}
    >
      {children}
    </div>
  );
}

export default function AchievementCard({ title, description, icon: Icon, badgeFrom, badgeTo }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col items-center text-center shadow-md"
      style={{ backgroundColor: colors.card }}
    >
      <Badge from={badgeFrom} to={badgeTo}>
        <Icon size={26} color="#ffffff" strokeWidth={2} />
      </Badge>
      <p className="font-bold text-sm" style={{ color: colors.panelDark }}>
        {title}
      </p>
      <p className="text-xs mt-1 leading-snug" style={{ color: colors.cardTextMuted }}>
        {description}
      </p>
    </div>
  );
}