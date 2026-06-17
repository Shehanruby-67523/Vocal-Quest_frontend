import { Bell, User, Mic } from "lucide-react";
import { colors } from "../styles/colors";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Mic size={26} color={colors.gold} />
      <div>
        <p className="font-bold text-sm" style={{ color: colors.gold }}>Vocal</p>
        <p className="font-bold text-sm text-white -mt-1">Quest</p>
      </div>
    </div>
  );
}

export default function NavBar() {
  const links = ["Dashboard", "Quizzes", "Leaderboard"];

  return (
    <header className="flex justify-between px-6 py-4" style={{ backgroundColor: colors.nav }}>
      <Logo />

      <nav className="hidden md:flex gap-8 text-white">
        {links.map((l) => (
          <a key={l} href="#" className="text-sm font-semibold">
            {l}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Bell color={colors.gold} />
        <div className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colors.sidebar }}>
          <User color="#fff" />
        </div>
      </div>
    </header>
  );
}