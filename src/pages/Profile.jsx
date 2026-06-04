import ProfileSidebar from "../components/ProfileSidebar";
import AchievementCard from "../components/AchievementCard";
import StatisticCard from "../components/StatisticCard";

function Profile() {
  const achievements = [
    {
      image: "/badges/recruit.png",
      title: "Recruit",
      description: "Complete First Quiz Level",
    },
    {
      image: "/badges/explorer.png",
      title: "Explorer",
      description: "Complete Second Quiz Level",
    },
    {
      image: "/badges/guardian.png",
      title: "Guardian",
      description: "Complete Third Quiz Level",
    },
    {
      image: "/badges/precision.png",
      title: "Precision Caster",
      description: "Get 80% Accuracy",
    },
  ];

  return (
    <div className="flex bg-[#002347] min-h-screen">

      <div className="w-80">
        <ProfileSidebar />
      </div>

      <div className="flex-1 p-10">

        <h1 className="text-white text-3xl font-bold mb-8">
          Achievements
        </h1>

        <div className="flex gap-6 flex-wrap">

          {achievements.map((item, index) => (
            <AchievementCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}

        </div>

        <h1 className="text-white text-3xl font-bold mt-12 mb-8">
          Statistics
        </h1>

        <div className="flex gap-6">

          <StatisticCard
            icon="✔️"
            value="20"
            label="Quizzes Completed"
          />

          <StatisticCard
            icon="📈"
            value="80%"
            label="Average Accuracy"
          />

        </div>

      </div>

    </div>
  );
}

export default Profile;