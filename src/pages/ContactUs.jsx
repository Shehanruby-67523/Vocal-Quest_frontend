import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, ArrowLeft } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function ContactUs() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us - Vocal Quest';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact message submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#00132B] text-slate-100 font-sans flex flex-col justify-between selection:bg-gold-500/30 selection:text-gold-300">
      
      {/* Group 20 - Header Navbar */}
      <Navbar />

      {/* Main Auto Layout Container (padding 48px 160px responsive) */}
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-6 lg:px-40 max-w-7xl w-full mx-auto space-y-10">
        
        {/* Title & Subtitle */}
        <div className="text-center space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-full uppercase tracking-widest mb-2">
            <MessageSquare size={14} /> Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-wide">
            Contact <span className="text-[#d9b74f]">Vocal Quest</span>
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Have questions about our voice recognition gameplay, account settings, or feedback? Send us a message and our team will respond shortly.
          </p>
        </div>

        {/* Submission Success Banner */}
        {submitted && (
          <div className="w-full max-w-2xl p-4 bg-emerald-950/80 border border-emerald-500/60 rounded-2xl text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg animate-fade-in">
            <CheckCircle2 size={20} className="text-emerald-400" />
            Thank you! Your message has been received. We will get back to you soon.
          </div>
        )}

        {/* Content Layout Grid (Form + Contact Information Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          
          {/* Contact Information Cards (Left 5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-[#0B2239] border border-slate-800 p-6 rounded-2xl flex items-start gap-4 shadow-xl hover:border-amber-500/40 transition">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Email Support</h3>
                <p className="text-xs text-slate-400 mb-2">For general inquiries and player assistance:</p>
                <a href="mailto:support@vocalquest.com" className="text-xs font-semibold text-[#d9b74f] hover:underline">
                  support@vocalquest.com
                </a>
              </div>
            </div>

            <div className="bg-[#0B2239] border border-slate-800 p-6 rounded-2xl flex items-start gap-4 shadow-xl hover:border-cyan-500/40 transition">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Voice Helpline</h3>
                <p className="text-xs text-slate-400 mb-2">Mon - Fri, 9am - 6pm EST:</p>
                <p className="text-xs font-semibold text-cyan-300 font-mono">
                  +1 (800) 555-VOCAL
                </p>
              </div>
            </div>

            <div className="bg-[#0B2239] border border-slate-800 p-6 rounded-2xl flex items-start gap-4 shadow-xl hover:border-emerald-500/40 transition">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Headquarters</h3>
                <p className="text-xs text-slate-400">
                  100 Quest Sanctuary Way,<br />
                  Innovation Hub, CA 94107
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form Card (Right 7 Columns) */}
          <div className="lg:col-span-7 bg-[#0B2239] border border-slate-800 p-8 rounded-3xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-[#05172A] border border-slate-700/70 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d9b74f] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-[#05172A] border border-slate-700/70 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d9b74f] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message regarding?"
                  required
                  className="w-full bg-[#05172A] border border-slate-700/70 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d9b74f] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  className="w-full bg-[#05172A] border border-slate-700/70 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d9b74f] transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#d9b74f] via-amber-400 to-[#d9b74f] hover:from-amber-400 hover:to-amber-500 text-[#031220] font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(217,183,79,0.3)] transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>

      </main>

      {/* Footer styled with background: rgba(13, 22, 30, 0.43) */}
      <div className="w-full bg-[rgba(13,22,30,0.43)] backdrop-blur-md border-t border-slate-800/60">
        <Footer />
      </div>
    </div>
  );
}
