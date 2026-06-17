import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import AchievementCard from "../components/AchievementCard";
import { achievements } from "../data/achievements";
import { footerLinks } from "../data/footerLinks";
import { colors } from "../styles/colors";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.page }}>
      <NavBar />

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-6">
          <h3 className="text-white font-bold mb-4">Achievement</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((a) => (
              <AchievementCard key={a.id} {...a} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}