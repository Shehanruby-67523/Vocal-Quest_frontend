function StatisticCard({ icon, value, label }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md text-center w-40">
      <div className="text-4xl mb-3">{icon}</div>

      <h2 className="text-xl font-bold">
        {value}
      </h2>

      <p className="text-sm text-gray-500">
        {label}
      </p>
    </div>
  );
}

export default StatisticCard;