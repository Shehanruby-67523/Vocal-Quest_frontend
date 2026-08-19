import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Volume2, 
  Mic, 
  MessageSquare, 
  Eye, 
  ShieldCheck, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  Sliders, 
  RotateCcw 
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Settings() {
  const navigate = useNavigate();

  // Settings State
  const [masterVolume, setMasterVolume] = useState(80);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [autoSpeech, setAutoSpeech] = useState(true);
  const [micSensitivity, setMicSensitivity] = useState(75);
  const [highContrast, setHighContrast] = useState(false);
  const [soundWaveAnim, setSoundWaveAnim] = useState(true);
  const [subtitles, setSubtitles] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Set Document Title
  useEffect(() => {
    document.title = 'Settings - Vocal Quest';
  }, []);

  // Save Settings
  const handleSave = () => {
    const settings = {
      masterVolume,
      speechRate,
      autoSpeech,
      micSensitivity,
      highContrast,
      soundWaveAnim,
      subtitles,
    };
    localStorage.setItem('vocal_quest_settings', JSON.stringify(settings));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Reset to Defaults
  const handleReset = () => {
    setMasterVolume(80);
    setSpeechRate(1.0);
    setAutoSpeech(true);
    setMicSensitivity(75);
    setHighContrast(false);
    setSoundWaveAnim(true);
    setSubtitles(true);
  };

  return (
    <div className="min-h-screen bg-[#001F3F] text-slate-100 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#0f3458]/50">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 bg-[#041628] hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
              title="Go Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
                <Sliders className="text-[#d9b74f]" size={28} />
                Game Settings
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Customize audio announcements, microphone controls, and visual accessibility.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw size={14} />
              Reset Defaults
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-gradient-to-r from-[#d9b74f] to-amber-500 hover:from-amber-400 hover:to-[#d9b74f] text-[#031220] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(217,183,79,0.3)] transition transform active:scale-95 cursor-pointer"
            >
              <Save size={14} />
              Save Settings
            </button>
          </div>
        </div>

        {/* Save Success Banner */}
        {savedSuccess && (
          <div className="mb-6 p-4 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 size={18} className="text-emerald-400" />
            Settings saved successfully!
          </div>
        )}

        {/* Settings Sections Grid */}
        <div className="space-y-6">

          {/* SECTION 1: Audio & Voice Controls */}
          <section className="bg-[#041628]/60 border border-[#0f3458]/50 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <h2 className="text-[#d9b74f] text-sm font-extrabold uppercase tracking-wider mb-5 flex items-center gap-2">
              <Volume2 size={18} />
              Audio & Speech Controls
            </h2>

            <div className="space-y-6">
              {/* Master Volume */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-200">Master Audio Volume</label>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{masterVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={masterVolume}
                  onChange={(e) => setMasterVolume(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#d9b74f]"
                />
              </div>

              {/* Text-to-Speech Speed */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-200">Speech Announcement Speed</label>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{speechRate}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Auto Read Questions Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-[#0f3458]/40">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Auto-Announce Questions</p>
                  <p className="text-xs text-slate-400">Automatically speak questions aloud when entering a level.</p>
                </div>
                <button
                  onClick={() => setAutoSpeech(!autoSpeech)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    autoSpeech ? 'bg-[#d9b74f]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-[#031220] absolute top-1 transition-all ${
                      autoSpeech ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 2: Microphone & Input Calibration */}
          <section className="bg-[#041628]/60 border border-[#0f3458]/50 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <h2 className="text-cyan-400 text-sm font-extrabold uppercase tracking-wider mb-5 flex items-center gap-2">
              <Mic size={18} />
              Microphone & Voice Input
            </h2>

            <div className="space-y-6">
              {/* Mic Sensitivity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-200">Microphone Input Sensitivity</label>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{micSensitivity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={micSensitivity}
                  onChange={(e) => setMicSensitivity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Shortcut to Voice Print */}
              <div className="flex items-center justify-between p-4 bg-[#031220]/70 rounded-xl border border-cyan-500/20">
                <div>
                  <p className="text-sm font-bold text-slate-200">Voice Print Profile</p>
                  <p className="text-xs text-slate-400">Calibrate your voice biometric signature for accuracy.</p>
                </div>
                <Link
                  to="/voice-print"
                  className="px-4 py-2 bg-cyan-600/20 border border-cyan-400/50 hover:bg-cyan-600/40 text-cyan-300 text-xs font-bold rounded-lg transition"
                >
                  Manage Voice Print
                </Link>
              </div>
            </div>
          </section>

          {/* SECTION 3: Visual & Accessibility */}
          <section className="bg-[#041628]/60 border border-[#0f3458]/50 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <h2 className="text-emerald-400 text-sm font-extrabold uppercase tracking-wider mb-5 flex items-center gap-2">
              <Eye size={18} />
              Visual & Accessibility
            </h2>

            <div className="space-y-4">
              {/* Subtitles */}
              <div className="flex items-center justify-between pb-3 border-b border-[#0f3458]/40">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Display Subtitles & Captions</p>
                  <p className="text-xs text-slate-400">Show on-screen transcriptions for spoken voice prompts.</p>
                </div>
                <button
                  onClick={() => setSubtitles(!subtitles)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    subtitles ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-[#031220] absolute top-1 transition-all ${
                      subtitles ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Sound Wave Animations */}
              <div className="flex items-center justify-between pb-3 border-b border-[#0f3458]/40">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Equalizer Wave Animations</p>
                  <p className="text-xs text-slate-400">Enable pulsing soundwave graphics when microphone is active.</p>
                </div>
                <button
                  onClick={() => setSoundWaveAnim(!soundWaveAnim)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    soundWaveAnim ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-[#031220] absolute top-1 transition-all ${
                      soundWaveAnim ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-200">High Contrast UI Mode</p>
                  <p className="text-xs text-slate-400">Increase text and button contrast for improved readability.</p>
                </div>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    highContrast ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-[#031220] absolute top-1 transition-all ${
                      highContrast ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
