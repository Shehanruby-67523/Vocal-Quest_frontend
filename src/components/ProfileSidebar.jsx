function ProfileSidebar() {
  return (
    <div className="bg-slate-800 p-6 min-h-screen text-white">

      <img
        src="https://i.pravatar.cc/200"
        alt="profile"
        className="w-36 h-36 rounded-full border-4 border-blue-400 mx-auto"
      />

      <h2 className="text-2xl font-bold text-center mt-4">
        Oliviya Silva
      </h2>

      <p className="text-center text-gray-300">
        oliviya2000
      </p>

      <div className="mt-4 text-center">
        <p className="font-semibold text-yellow-400">
          Voice Explorer
        </p>

        <p className="text-sm">
          XP: 850 / 1000
        </p>
      </div>

      <button className="bg-yellow-400 text-black w-full py-2 rounded-lg mt-6 font-semibold">
        Edit Profile
      </button>

    </div>
  );
}

export default ProfileSidebar;