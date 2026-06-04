function AchievementCard({ image, title, description }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md w-44 text-center">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 mx-auto object-contain"
      />

      <h3 className="font-bold mt-2">{title}</h3>

      <p className="text-xs text-gray-500 mt-1">
        {description}
      </p>
    </div>
  );
}

export default AchievementCard;