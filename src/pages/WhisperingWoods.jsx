import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useVoiceCommands } from '../hooks/useVoiceCommands'
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis'
import { useMemo } from 'react'

function WhisperingWoods() {
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)
  const [recognizedCommand, setRecognizedCommand] = useState('Choice One')
  const [narrationText, setNarrationText] = useState(
    'Ancient branches creak above you. The forest awaits your command. Speak clearly to the spirits within the mist.'
  )
  const [activeTab, setActiveTab] = useState('RESULTS') // Matches the mockup's yellow active tab
  const [activeBuffs, setActiveBuffs] = useState({ buff1: true, buff2: true })

  // Text-to-Speech hook
  const { speak, stop } = useSpeechSynthesis()

  // Trigger brief soundwave pulse when command changes
  const [wavePulse, setWavePulse] = useState(false)
  useEffect(() => {
    if (recognizedCommand) {
      setWavePulse(true)
      const timer = setTimeout(() => setWavePulse(false), 1200)
      return () => clearTimeout(timer)
    }
  }, [recognizedCommand])

  const handleAction = (actionText, commandCode) => {
    setRecognizedCommand(commandCode)

    if (commandCode === 'Demon Guardian') {
      navigate('/demon-guardian')
      return
    }

    // Update narration based on command
    if (commandCode === 'Inspect the shrine') {
      setNarrationText('You step toward the ancient stone shrine. A soft cyan light grows warmer, whispering forgotten runes.')
    } else if (commandCode === 'Cast light spell') {
      setNarrationText('Ancient branches creak above you. The forest awaits your command. Speak clearly to the spirits within the mist.')
    } else if (commandCode === 'Follow the trail') {
      setNarrationText('You venture down the mossy path. The shadows recede slightly, guiding you deeper into the Deepwood Sanctuary.')
    }
  }

  // 1. Define command map for voice recognition with Synonym, Fuzzy & Phonetic support
  const commandMap = useMemo(
    () => ({
      'inspect, shrine, look, check, examine, shrin, inspek': () => handleAction('Inspect shrine', 'Inspect the shrine'),
      'cast, light, spell, illuminate, shine, lit, kast': () => handleAction('Cast light', 'Cast light spell'),
      'follow, trail, path, walk, go, folow, tral': () => handleAction('Follow trail', 'Follow the trail'),
      'demon, damon, dimon, daemon, guardian, gate, challenge, next, continue, proceed, forward': () => handleAction('Demon Guardian', 'Demon Guardian'),
      'dashboard, journey, player journey': () => navigate('/player-journey'),
      'game hub, hub, main hub': () => navigate('/game-hub'),
      'achievements, achievement, badge, badges': () => navigate('/achievements'),
      'profile, account, user profile': () => navigate('/profile'),
      'voice print, voiceprint, voice': () => navigate('/voice-print'),
      'settings, options, config': () => navigate('/settings'),
    }),
    [navigate]
  )

  // 2. Connect voice commands hook
  const {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
  } = useVoiceCommands(commandMap)

  // Toggle Handler for Microphone & Voice Narration
  const toggleMicrophoneVoice = () => {
    if (isListening || !isMuted) {
      stop()
      stopListening()
      setIsMuted(true)
    } else {
      setIsMuted(false)
      if (narrationText) {
        speak(narrationText, () => {
          startListening()
        })
      } else {
        startListening()
      }
    }
  }

  // 3. Announce narration/question when text updates & handle mute state
  useEffect(() => {
    if (narrationText && !isMuted) {
      speak(narrationText, () => {
        if (!isMuted) {
          startListening()
        }
      })
    } else if (isMuted) {
      stop()
      stopListening()
    }
  }, [narrationText, isMuted, speak, stop, startListening, stopListening])

  return (
    <div className="min-h-screen bg-[#001F3F] text-slate-100 font-sans flex flex-col justify-between selection:bg-gold-500/30 selection:text-gold-300">
      {/* Embedded CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(34, 211, 238, 0.2); }
          50% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.5); }
        }
        @keyframes pulseGlowMuted {
          0%, 100% { box-shadow: 0 0 8px rgba(239, 68, 68, 0.1); }
          50% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); }
        }
        @keyframes eqBar1 {
          0%, 100% { height: 35%; }
          50% { height: 85%; }
        }
        @keyframes eqBar2 {
          0%, 100% { height: 50%; }
          50% { height: 95%; }
        }
        @keyframes eqBar3 {
          0%, 100% { height: 25%; }
          50% { height: 70%; }
        }
        @keyframes eqBar4 {
          0%, 100% { height: 40%; }
          50% { height: 90%; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .eq-bar-1 { animation: eqBar1 0.8s ease-in-out infinite; }
        .eq-bar-2 { animation: eqBar2 0.6s ease-in-out infinite; }
        .eq-bar-3 { animation: eqBar3 0.9s ease-in-out infinite; }
        .eq-bar-4 { animation: eqBar4 0.7s ease-in-out infinite; }
        .eq-bar-fast-1 { animation: eqBar1 0.3s ease-in-out infinite; }
        .eq-bar-fast-2 { animation: eqBar2 0.2s ease-in-out infinite; }
        .eq-bar-fast-3 { animation: eqBar3 0.4s ease-in-out infinite; }
        .eq-bar-fast-4 { animation: eqBar4 0.25s ease-in-out infinite; }
      `}</style>

      {/* HEADER */}
      <header className="border-b border-[#0f2d4a]/50 bg-[#0B263F]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">

          {/* Game Logo */}
          <Link to="/demon-guardian" className="flex items-center gap-3 group" title="Vocal Quest Home">
            <img
              src="/pvmT4-removebg-preview.png"
              alt="Vocal Quest Logo"
              className="h-12 w-auto max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_10px_rgba(217,183,79,0.3)]"
              onError={(e) => {
                e.target.src = "/src/assets/logo.png";
              }}
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: 'DASHBOARD', path: '/player-journey' },
              { name: 'GAME HUB', path: '/game-hub' },
              { name: 'ACHIEVEMENTS', path: '/achievements' },
              { name: 'VOICE PRINT', path: '/voice-print' },
              { name: 'SETTINGS', path: '/settings' },
            ].map((tab) => (
              <Link
                key={tab.name}
                to={tab.path}
                className="text-[11px] font-bold tracking-[0.2em] transition-all duration-200 cursor-pointer text-slate-400 hover:text-[#d9b74f] hover:drop-shadow-[0_0_8px_rgba(217,183,79,0.3)]"
              >
                {tab.name}
              </Link>
            ))}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-5">
            {/* Notification Bell */}
            <button className="relative p-1.5 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Notification Dot */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]"></span>
            </button>

            {/* Profile Avatar */}
            <Link to="/profile" className="relative group cursor-pointer" title="View Profile">
              <div className="w-8 h-8 rounded-full border border-slate-500/40 overflow-hidden bg-slate-800 group-hover:border-gold-300 transition-colors">
                <img
                  src="/user_avatar.jpg"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";
                  }}
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow mx-auto w-full max-w-7xl px-6 py-8 flex flex-col justify-center">

        {/* Title and Subtitle Info */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-white">
              The Whispering Woods
            </h1>
            <div className="mt-4 flex items-start">
              {/* Yellow Accent Bar */}
              <div className="w-1 self-stretch min-h-[40px] bg-[#d9b74f] rounded-full mr-4 shadow-[0_0_8px_rgba(217,183,79,0.5)]"></div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                {narrationText}
              </p>
            </div>
          </div>

          {/* Dedicated Redirect Button to Demon Guardian */}
          <button
            onClick={() => navigate('/demon-guardian')}
            className="flex flex-col items-center justify-center px-6 py-3.5 bg-gradient-to-r from-[#d9b74f] via-amber-400 to-[#d9b74f] hover:from-amber-400 hover:to-amber-500 text-[#031220] font-black text-sm uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(217,183,79,0.4)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer self-start md:self-auto group"
            title="Click or say 'demon' to redirect to Demon Guardian"
          >
            <div className="flex items-center gap-2">
              <span>Proceed to Demon Guardian ⚔️</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <span className="text-[10px] text-[#031220]/80 font-bold font-mono mt-0.5">
              🎙️ Say: "demon" or "proceed"
            </span>
          </button>
        </div>

        {/* Content Columns (Image + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT: Central Banner Image */}
          <div className="lg:col-span-9 relative rounded-2xl overflow-hidden border border-[#0f3458]/40 bg-[#041628]/45 shadow-[0_8px_32px_rgba(0,0,0,0.4)] aspect-[16/9] group">

            {/* Whispering Woods Background Image */}
            <img
              src="/whispering_woods_bg.jpg"
              alt="Whispering Woods Scene"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80";
              }}
            />

            {/* Dark vignette gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#031220]/80 via-transparent to-black/35 pointer-events-none" />

            {/* AVAILABLE ACTIONS PANEL */}
            <div className="absolute bottom-6 right-6 p-5 rounded-2xl bg-[#041628]/85 backdrop-blur-md border border-[#0f3458]/70 shadow-2xl w-[260px] transition-all hover:border-[#d9b74f]/30">
              <h2 className="text-[#d9b74f] text-[10px] tracking-[0.25em] font-extrabold mb-3.5 uppercase">
                Available Actions
              </h2>
              <ul className="space-y-2.5">
                {[
                  { text: 'Inspect the shrine', code: 'Inspect the shrine', voiceHint: 'inspect / shrine' },
                  { text: 'Cast light spell', code: 'Cast light spell', voiceHint: 'light / cast' },
                  { text: 'Follow the trail', code: 'Follow the trail', voiceHint: 'trail / follow' },
                  { text: "Challenge Demon's Gate", code: 'Demon Guardian', voiceHint: 'demon / next' }
                ].map((action, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleAction(action.text, action.code)}
                      className="w-full text-left flex flex-col gap-0.5 px-2.5 py-1.5 rounded-lg text-xs transition-all text-slate-200 hover:text-white hover:bg-slate-800/35 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {/* Cyan Bullet Point */}
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] flex-shrink-0" />
                        <span className="font-medium">"{action.text}"</span>
                      </div>
                      <span className="text-[10px] text-cyan-300/80 ml-3.5 italic font-mono">
                        🎙️ Say: "{action.voiceHint}"
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Sidebar Panels */}
          <div className="lg:col-span-3 flex flex-col gap-5 w-full">

            {/* MAP PRESENCE CARD */}
            <div className="p-4 rounded-2xl bg-[#041628]/50 backdrop-blur-sm border border-[#0f3458]/40 shadow-lg flex flex-col">
              <div className="flex items-center justify-between border-b border-[#0f3458]/35 pb-2.5 mb-3">
                <span className="text-[#d9b74f] text-[10px] tracking-[0.25em] font-bold uppercase flex items-center gap-1.5">
                  Map Presence
                </span>
                {/* Compass Icon */}
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              {/* Map Image container */}
              <div className="h-44 w-full rounded-xl overflow-hidden border border-[#0f3458]/30 bg-slate-900 relative group cursor-crosshair">
                <img
                  src="/map_presence.jpg"
                  alt="Deepwood Sanctuary Map"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=300&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-[#031220]/20 pointer-events-none" />

                {/* Simulated radar sweep animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none" />
              </div>

              {/* Location Text */}
              <div className="text-center mt-3.5">
                <span className="text-slate-500 text-[9px] uppercase tracking-[0.15em]">
                  Current Location
                </span>
                <span className="block text-white font-bold text-sm mt-0.5 tracking-wide">
                  Deepwood Sanctuary
                </span>
              </div>
            </div>

            {/* ACTIVE BUFFS CARD */}
            <div className="p-4 rounded-2xl bg-[#041628]/50 backdrop-blur-sm border border-[#0f3458]/40 shadow-lg flex flex-col">
              <div className="flex items-center justify-between border-b border-[#0f3458]/35 pb-2.5 mb-3.5">
                <span className="text-[#d9b74f] text-[10px] tracking-[0.25em] font-bold uppercase">
                  Active Buffs
                </span>
                {/* Lightning Bolt Icon */}
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              {/* Buff Items Grid */}
              <div className="flex items-center gap-3">
                {/* Buff 1 (Magic Wand) */}
                <button
                  onClick={() => setActiveBuffs(b => ({ ...b, buff1: !b.buff1 }))}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer ${activeBuffs.buff1
                    ? 'bg-[#d9b74f]/10 border border-[#d9b74f] text-[#d9b74f] shadow-[0_0_10px_rgba(217,183,79,0.15)]'
                    : 'bg-slate-900/60 border border-[#0f3458]/30 text-slate-500 hover:border-[#d9b74f]/40'
                    }`}
                  title="Arcane Insight - Active"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    {/* Stylized wand */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3M12 3v1.5M12 19.5V21M3.75 12h1.5m15 0h1.5M21 12c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.656 48.656 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7C6.13 14.453 6.116 14.23 6.1 14" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l-3 3m0 0l-1.5-1.5M6 18l1.5 1.5" />
                  </svg>
                </button>

                {/* Buff 2 (Clairvoyance Mind) */}
                <button
                  onClick={() => setActiveBuffs(b => ({ ...b, buff2: !b.buff2 }))}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer ${activeBuffs.buff2
                    ? 'bg-cyan-500/10 border border-cyan-500/80 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-900/60 border border-[#0f3458]/30 text-slate-500 hover:border-cyan-500/40'
                    }`}
                  title="Spiritual Connection - Active"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    {/* Stylized headset/eye/mind icon */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM VOICE DECK PANEL */}
        <div className="mt-10 flex items-center justify-center gap-6 bg-[#041628]/35 border border-[#0f3458]/30 p-5 rounded-2xl backdrop-blur-md shadow-inner">

          {/* CENTER: PILL CONTROLS */}
          <div className="flex items-center bg-[#031220]/80 border border-[#0f3458]/70 px-4 py-2.5 rounded-full shadow-2xl">

            {/* Microphone Toggle (Yellow pill) */}
            <button
              onClick={toggleMicrophoneVoice}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer ${!isMuted && isListening
                ? 'bg-[#d9b74f] text-[#031220] shadow-[0_0_12px_rgba(217,183,79,0.3)] hover:brightness-105'
                : 'bg-rose-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:bg-rose-700'
                }`}
              title={!isMuted && isListening ? 'Turn Off Microphone & Voice' : 'Activate Microphone & Voice'}
            >
              {!isMuted && isListening ? (
                /* Microphone On Icon */
                <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              ) : (
                /* Microphone Off/Slashed Icon */
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              )}
            </button>

            {/* Vertical Divider */}
            <div className="w-[1px] h-6 bg-[#0f3458]/70 mx-4" />

            {/* Pill secondary utilities */}
            <div className="flex items-center gap-2">

              {/* Settings / Panel Layout icon */}
              <button
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/35 transition-colors cursor-pointer"
                title="Toggle Dashboard view"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
              </button>

              {/* Help button */}
              <button
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/35 transition-colors cursor-pointer"
                title="Open voice command guide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* Mute/Unmute Speaker button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg hover:bg-slate-800/35 transition-all cursor-pointer ${isMuted ? 'text-rose-500' : 'text-slate-400 hover:text-white'
                  }`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>

            </div>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#0f2d4a]/30 mx-auto w-full max-w-7xl px-6 py-5 flex justify-between items-center text-[10px] text-slate-500 font-medium tracking-[0.15em]">
        <div className="flex gap-6">
          <button className="hover:text-slate-300 transition-colors uppercase cursor-pointer">
            System Log
          </button>
          <button className="hover:text-slate-300 transition-colors uppercase cursor-pointer">
            Voice Calibration
          </button>
        </div>
        <div className="uppercase select-none">
          VER 2.0.4.8 // FANTASY_ENGINE_01
        </div>
      </footer>
    </div>
  )
}

export default WhisperingWoods
