import React from 'react';

export default function StatisticCard({ value, label, icon }) {
  return (
    <div className="bg-[#D9D9D9] text-slate-900 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg w-full">
      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl mb-2">
        {icon}
      </div>
      <span className="text-2xl font-black text-slate-800">{value}</span>
      <p className="text-xs text-slate-600 font-semibold mt-1">{label}</p>
    </div>
  );
}