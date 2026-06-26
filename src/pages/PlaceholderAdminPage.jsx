import React from 'react';
import AdminSidebar from '../Components/common/AdminSidebar';
import { Construction } from 'lucide-react';

export default function PlaceholderAdminPage({ title }) {
  return (
    <div className="flex min-h-screen bg-[#070b13] text-slate-100 font-sans antialiased overflow-x-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-[#0a0f1d]/50 border-b border-slate-800/60 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto space-y-6">
          <div className="p-4 bg-gold-400/10 rounded-full text-gold-400 border border-gold-400/20 animate-bounce">
            <Construction size={48} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Feature Under Construction</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The {title} dashboard is currently being integrated into the Vocal Quest admin core. Live telemetry, schemas, and analytics pipelines will be available in the next deployment sprint.
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/admin/command-center'}
            className="bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold py-2.5 px-6 rounded-lg text-xs transition duration-150 shadow-[0_4px_15px_rgba(217,183,79,0.15)]"
          >
            Return to Command Center
          </button>
        </main>
      </div>
    </div>
  );
}
