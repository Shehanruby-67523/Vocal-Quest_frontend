import React from 'react';
// Importing the local image you saved in your assets folder
import ProfilePic from '../assets/ProfilePic.png'; 

export default function ProfileSidebar() {
  return (
    <aside className="w-full md:w-80 bg-[#0A2540] p-8 flex flex-col items-center text-center border-r border-slate-800 text-white">
      <div className="relative mb-4">
        <img 
          src={ProfilePic} 
          alt="Oliviya Silva" 
          className="w-32 h-32 rounded-full object-cover border-4 border-slate-700"
        />
      </div>
      <h2 className="text-xl font-bold">Oliviya Silva</h2>
      <p className="text-slate-400 text-sm mb-4">@oliviya2000</p>
      
      <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-[200px]">
        Passionate language learner practicing speaking and active learning through interactive quizzes.
      </p>

      <button className="w-full bg-amber-500 text-slate-900 font-semibold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors text-sm">
        EDIT PROFILE
      </button>
    </aside>
  );
}