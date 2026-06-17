import { User } from "lucide-react";
import { colors } from "../styles/colors";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-72 flex flex-col items-center p-6 text-center"
      style={{ backgroundColor: colors.sidebar }}>

      <div className="w-28 h-28 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: colors.panelDark }}>
        <User size={56} color="#fff" />
      </div>

      <h2 className="text-white font-bold">Olivia Silva</h2>
      <p className="text-sm" style={{ color: colors.textMuted }}>@oliviya2000</p>

      <p className="text-xs mt-3" style={{ color: colors.textMuted }}>
        Speaks confidently, learns daily, and levels up one quiz at a time.
      </p>

      <button className="mt-6 px-6 py-2 font-bold text-xs rounded-lg"
        style={{ backgroundColor: colors.gold, color: colors.panelDark }}>
        EDIT PROFILE
      </button>
    </aside>
  );
}