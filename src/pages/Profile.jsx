import React from "react";
import { Medal, Compass, ShieldCheck, Gem, CheckCircle2 } from "lucide-react";

import Navbar from "../Components/Navbar";
import ProfileSidebar from "../Components/ProfileSidebar";
import AchievementCard from "../Components/AchievementCard";
import StatisticCard from "../Components/StatisticCard";
import Footer from "../Components/Footer";
import { colors } from "../styles/colors";

const achievements = [
  {
    id: "recruit",
    title: "Recruit",
    description: "Complete First Quiz Level",
    icon: Medal,
    badgeFrom: "#F6CE5C",
    badgeTo: "#C24E1C",
  },
  {
    id: "explorer",
    title: "Explorer",
    description: "Complete Second Quiz Level",
    icon: Compass,
    badgeFrom: "#A9C4E4",
    badgeTo: "#2D4F76",
  },
  {
    id: "guardian",
    title: "Guardian",
    description: "Complete Third Quiz Level",
    icon: ShieldCheck,
    badgeFrom: "#A9C4E4",
    badgeTo: "#2D4F76",
  },
  {
    id: "precision",
    title: "Precision Castle",
    description: "Get 80% in Quiz",
    icon: Gem,
    badgeFrom: "#B7CCE6",
    badgeTo: "#34567E",
  },
];

function BellCurve() {
  return (
    <svg viewBox="0 0 80 44" className="w-16 h-9" fill="none">
      <path
        d="M2 36 C16 36, 22 6, 40 6 C58 6, 64 36, 78 36"
        stroke={colors.gold}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: colors.page }}>
      <Navbar />

      <div className="flex flex-1 flex-col md:flex-row">
        <ProfileSidebar />

        <main className="flex-1 px-6 md:px-10 py-8">
          <h3 className="text-white font-bold text-lg mb-4">Achievement</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {achievements.map((a) => (
              <AchievementCard key={a.id} {...a} />
            ))}
          </div>

          <h3 className="text-white font-bold text-lg mb-4">Statistic</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            <StatisticCard value="20" label="Quizzes are completed">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.gold }}
              >
                <CheckCircle2 size={28} color={colors.panelDark} />
              </div>
            </StatisticCard>
            <StatisticCard value="80%" label="Average Accuracy">
              <BellCurve />
            </StatisticCard>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}