import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Award, Sparkles, ShieldCheck, Users, Code, Cpu, Target, Compass } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function AboutUs() {
  useEffect(() => {
    document.title = 'About Us - Vocal Quest';
  }, []);

  const teamMembers = [
    {
      name: 'Shehan',
      role: 'Lead Developer & Architect',
      bio: 'Pioneered the core Web Speech API integration and voice-driven level progression system.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      badge: 'Full-Stack Developer'
    },
    {
      name: 'Sajani',
      role: 'UI/UX & Frontend Engineer',
      bio: 'Designed the navy & gold dashboard aesthetics, player journey flows, and accessible component library.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      badge: 'Frontend Specialist'
    },
    {
      name: 'Vocal Quest Team',
      role: 'Capstone Project Team',
      bio: 'Collaborated on database architecture, backend Node.js microservices, and quiz node state engines.',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80',
      badge: 'Capstone AI Group'
    }
  ];

  return (
    <div className="min-h-screen bg-[#00132B] text-slate-100 font-sans flex flex-col justify-between selection:bg-gold-500/30 selection:text-gold-300">
      
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-12 space-y-16">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-full uppercase tracking-widest">
            <Sparkles size={14} className="text-amber-400" />
            Interactive Voice Education
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-wide leading-tight">
            Empowering Learning Through <span className="text-[#d9b74f]">Voice & AI</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Vocal Quest is an interactive voice-driven gaming platform created as a Capstone Development project. By fusing real-time Speech Recognition and Text-to-Speech narration, we transform traditional educational quizzes into hands-free, immersive narrative adventures.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/whispering-woods"
              className="px-6 py-3 bg-gradient-to-r from-[#d9b74f] to-amber-500 hover:from-amber-400 hover:to-[#d9b74f] text-[#031220] font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(217,183,79,0.3)] transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Compass size={16} />
              <span>Start Exploring</span>
            </Link>

            <Link
              to="/contactus"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
            >
              Contact Team
            </Link>
          </div>
        </section>

        {/* PROJECT FEATURES & MISSION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#0B2239] border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-amber-500/40 transition shadow-xl">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <Mic size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Voice-First Controls</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Play entirely hands-free using natural speech commands, fuzzy keyword matching, and normalized voice input algorithms.
            </p>
          </div>

          <div className="bg-[#0B2239] border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-cyan-500/40 transition shadow-xl">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit">
              <Cpu size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Auditory Narration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Questions and story lore are automatically spoken aloud via Web Speech API, creating an accessible auditory experience.
            </p>
          </div>

          <div className="bg-[#0B2239] border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-emerald-500/40 transition shadow-xl">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Gamified Mastery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track level progression, earn XP rewards, maintain daily streaks, and unlock hexagonal achievement badges.
            </p>
          </div>

        </section>

        {/* PEOPLE INVOLVED & TEAM SECTION */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Users size={16} /> Team & Collaborators
            </div>
            <h2 className="text-3xl font-extrabold text-white">People Involved With The Project</h2>
            <p className="text-xs text-slate-400">
              Meet the capstone developers and creators behind Vocal Quest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#0B2239] border border-slate-800 p-6 rounded-3xl text-center flex flex-col items-center space-y-4 shadow-2xl hover:border-amber-500/40 transition group"
              >
                <div className="w-24 h-24 rounded-full border-2 border-[#d9b74f] p-1 bg-slate-900 shadow-[0_0_15px_rgba(217,183,79,0.25)] overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-[#d9b74f] font-semibold mt-0.5">{member.role}</p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold rounded-full font-mono">
                    {member.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  "{member.bio}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK BADGES */}
        <section className="bg-[#041628]/60 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center justify-center gap-2">
            <Code size={18} className="text-[#d9b74f]" /> Built With Modern Web Technologies
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['React 19', 'Vite', 'Web Speech API', 'Tailwind CSS', 'Node.js', 'Express', 'Lucide React', 'WCAG 2.1'].map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 bg-[#05172A] border border-slate-700/60 rounded-xl text-xs font-mono font-semibold text-slate-300 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
