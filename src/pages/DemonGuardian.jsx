import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lightbulb, Flag, Check, X, Trophy, ArrowRight, RotateCcw } from 'lucide-react'
import Logo from '../Components/Logo'

// Game Questions conforming to the Gatekeeper's Challenge Quiz
const QUESTIONS = [
  {
    question: "What is the true name of the silent flame?",
    stage: "GATEKEEPER'S QUIZ • STAGE IV",
    points: 8,
    hint: "In the tongue of the old world, the flame is 'Ignis' and silence is 'Tacitus'. Connect the two words.",
    options: [
      { key: 'A', label: 'SELECT A', text: 'Ignis Tacitus', isCorrect: true, theme: 'green' },
      { key: 'B', label: 'SELECT B', text: 'Flamina Rubra', isCorrect: false, theme: 'red' },
      { key: 'C', label: 'SELECT C', text: 'Aetheris Silentium', isCorrect: false, theme: 'blue' },
      { key: 'D', label: 'SELECT D', text: 'Sol Invictus', isCorrect: false, theme: 'yellow' },
    ]
  },
  {
    question: "Which resonance frequency shatters the crystal shield of the guardian?",
    stage: "GATEKEEPER'S QUIZ • STAGE V",
    points: 5,
    hint: "A standard pitch fork vibrates at A440. The resonant frequency is exactly the octave above.",
    options: [
      { key: 'A', label: 'SELECT A', text: '120 Hz Hum', isCorrect: false, theme: 'green' },
      { key: 'B', label: 'SELECT B', text: '440 Hz Tone', isCorrect: false, theme: 'red' },
      { key: 'C', label: 'SELECT C', text: '880 Hz Octave', isCorrect: true, theme: 'blue' },
      { key: 'D', label: 'SELECT D', text: '50 Hz Infrasound', isCorrect: false, theme: 'yellow' },
    ]
  },
  {
    question: "To bypass the Shadowed Gate, what vocal resonance must you maintain?",
    stage: "GATEKEEPER'S QUIZ • STAGE VI",
    points: 5,
    hint: "The gate rejects airy tones or vocal fry. It demands a centered and stable sound.",
    options: [
      { key: 'A', label: 'SELECT A', text: 'Airy Falsetto', isCorrect: false, theme: 'green' },
      { key: 'B', label: 'SELECT B', text: 'Gravelly Vocal Fry', isCorrect: false, theme: 'red' },
      { key: 'C', label: 'SELECT C', text: 'Steady Chest Voice', isCorrect: true, theme: 'blue' },
      { key: 'D', label: 'SELECT D', text: 'Guttural Growl', isCorrect: false, theme: 'yellow' },
    ]
  }
]

const hasSpeechSupport = typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition)

function DemonGuardian() {
  const navigate = useNavigate()
  
  // Encounter Flow: starts directly at 'QUIZ' to match the uploaded figma mockup exactly
  const [encounterState, setEncounterState] = useState('QUIZ')
  
  // Quiz & standing states
  const [score, setScore] = useState(32) // Starts at 32/50 as shown in screenshot
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedKey, setSelectedKey] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [hintsLeft, setHintsLeft] = useState(3)
  const [showHint, setShowHint] = useState(false)
  const [shakeCard, setShakeCard] = useState(false)
  
  // Voice integration states (listening in background)
  const [isListening, setIsListening] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [recognizedCommand, setRecognizedCommand] = useState('')
  const [wavePulse, setWavePulse] = useState(false)
  const [speechFeedback, setSpeechFeedback] = useState('')
  
  // Modal states
  const [showForfeitModal, setShowForfeitModal] = useState(false)

  const currentQuestion = QUESTIONS[currentIdx]
  const targetScoreToPass = 40

  // References for Web Speech API to keep state and handlers fresh
  const recognitionRef = useRef(null)
  const stateRef = useRef({ encounterState, currentIdx, isAnswered, hintsLeft, selectedKey, score, showForfeitModal })
  const voiceHandlerRef = useRef(null)

  // Keep stateRef fresh for speech recognition event handlers
  useEffect(() => {
    stateRef.current = { encounterState, currentIdx, isAnswered, hintsLeft, selectedKey, score, showForfeitModal }
  }, [encounterState, currentIdx, isAnswered, hintsLeft, selectedKey, score, showForfeitModal])

  // Set document title
  useEffect(() => {
    document.title = "Demon's Challenge Quiz - Vocal Quest"
  }, [])

  // Handle option selection
  const selectOption = (option) => {
    if (stateRef.current.isAnswered) return
    setSelectedKey(option.key)
    setIsAnswered(true)

    if (option.isCorrect) {
      const newScore = stateRef.current.score + QUESTIONS[stateRef.current.currentIdx].points
      setScore(newScore)
      setSpeechFeedback(`Correct! Option ${option.key} accepted.`)
    } else {
      setShakeCard(true)
      setSpeechFeedback(`Incorrect! Option ${option.key} rejected.`)
      setTimeout(() => setShakeCard(false), 500)
    }

    // Auto-advance to the next question regardless of correctness after 2 seconds
    setTimeout(() => {
      if (stateRef.current.currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1)
        setSelectedKey(null)
        setIsAnswered(false)
        setShowHint(false)
        setSpeechFeedback('')
        setRecognizedCommand('')
      } else {
        setEncounterState('COMPLETED')
      }
    }, 2000)
  }

  // Hint execution
  const handleUseHint = () => {
    if (stateRef.current.isAnswered) return
    if (stateRef.current.hintsLeft > 0 && !showHint) {
      setHintsLeft(prev => prev - 1)
      setShowHint(true)
      setSpeechFeedback("Glow of insight activated!")
      setTimeout(() => setSpeechFeedback(''), 2000)
    }
  }

  // Forfeit execution
  const handleForfeitConfirm = () => {
    setShowForfeitModal(false)
    navigate('/game-hub')
  }

  // Reset encounter
  const handleReset = () => {
    setEncounterState('QUIZ')
    setScore(32)
    setCurrentIdx(0)
    setSelectedKey(null)
    setIsAnswered(false)
    setHintsLeft(3)
    setShowHint(false)
    setSpeechFeedback('')
    setRecognizedCommand('')
  }

  // Voice Command routing
  const handleVoiceCommand = (transcript) => {
    const cleanTranscript = transcript.replace(/[.,#!?]/g, "").trim().toLowerCase();
    setSpeechFeedback(`Heard voice command: "${cleanTranscript}"`)
    setRecognizedCommand(cleanTranscript)
    
    // Trigger equalizer wave pulse directly on recognition
    setWavePulse(true)
    setTimeout(() => setWavePulse(false), 1200)

    const curState = stateRef.current.encounterState

    // 1. FORFEIT MODAL COMMANDS
    if (stateRef.current.showForfeitModal) {
      if (cleanTranscript.includes('forfeit') || cleanTranscript.includes('quit') || cleanTranscript.includes('give up') || cleanTranscript.includes('exit')) {
        handleForfeitConfirm()
      } else if (cleanTranscript.includes('stay') || cleanTranscript.includes('fight') || cleanTranscript.includes('cancel') || cleanTranscript.includes('no')) {
        setShowForfeitModal(false)
      }
      return
    }

    // 2. COMPLETED STATE COMMANDS
    if (curState === 'COMPLETED') {
      if (cleanTranscript.includes('retry') || cleanTranscript.includes('restart') || cleanTranscript.includes('play again')) {
        handleReset()
      } else if (cleanTranscript.includes('continue') || cleanTranscript.includes('next') || cleanTranscript.includes('go back')) {
        navigate('/game-hub')
      }
      return
    }

    // 3. QUIZ STATE COMMANDS
    if (curState === 'QUIZ') {
      const optionsList = QUESTIONS[stateRef.current.currentIdx].options
      
      // Broader and more error-tolerant transcript matching rules (removing punctuation first)
      const matchA = cleanTranscript === 'a' || 
                     cleanTranscript.includes('select a') || 
                     cleanTranscript.includes('option a') || 
                     cleanTranscript.includes('alpha') || 
                     cleanTranscript.includes('first') || 
                     cleanTranscript.includes('one') || 
                     cleanTranscript.includes('ignis') || 
                     cleanTranscript.includes('tacitus')
      
      const matchB = cleanTranscript === 'b' || 
                     cleanTranscript.includes('select b') || 
                     cleanTranscript.includes('option b') || 
                     cleanTranscript.includes('bravo') || 
                     cleanTranscript.includes('second') || 
                     cleanTranscript.includes('two') || 
                     cleanTranscript.includes('flamina') || 
                     cleanTranscript.includes('rubra')
      
      const matchC = cleanTranscript === 'c' || 
                     cleanTranscript.includes('select c') || 
                     cleanTranscript.includes('option c') || 
                     cleanTranscript.includes('charlie') || 
                     cleanTranscript.includes('third') || 
                     cleanTranscript.includes('three') || 
                     cleanTranscript.includes('aetheris') || 
                     cleanTranscript.includes('silentium')
      
      const matchD = cleanTranscript === 'd' || 
                     cleanTranscript.includes('select d') || 
                     cleanTranscript.includes('option d') || 
                     cleanTranscript.includes('delta') || 
                     cleanTranscript.includes('fourth') || 
                     cleanTranscript.includes('four') || 
                     cleanTranscript.includes('sol') || 
                     cleanTranscript.includes('invictus')
      
      if (matchA) {
        selectOption(optionsList[0])
      } else if (matchB) {
        selectOption(optionsList[1])
      } else if (matchC) {
        selectOption(optionsList[2])
      } else if (matchD) {
        selectOption(optionsList[3])
      } else if (cleanTranscript.includes('hint') || cleanTranscript.includes('clue') || cleanTranscript.includes('help')) {
        handleUseHint()
      } else if (cleanTranscript.includes('forfeit') || cleanTranscript.includes('give up') || cleanTranscript.includes('quit') || cleanTranscript.includes('exit')) {
        setShowForfeitModal(true)
      } else {
        // Clear unrecognized speech after 3 seconds
        setTimeout(() => setSpeechFeedback(''), 3000)
      }
    }
  }

  // Keep voice handler ref fresh
  useEffect(() => {
    voiceHandlerRef.current = handleVoiceCommand
  })

  // Web Speech API configuration (runs in background for voice activation)
  useEffect(() => {
    if (!hasSpeechSupport) {
      return
    }

    let active = true
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SpeechRecognition()
    rec.continuous = true // Keep listening continuously
    rec.interimResults = false
    rec.lang = 'en-US'

    rec.onresult = (event) => {
      if (!active) return
      // Get the latest result item index
      const resultIndex = event.resultIndex
      const transcript = event.results[resultIndex][0].transcript.trim()
      console.log('Voice Input Heard (raw):', transcript)
      if (voiceHandlerRef.current) {
        voiceHandlerRef.current(transcript)
      }
    }

    rec.onerror = (event) => {
      if (!active) return
      console.error('Speech recognition error:', event.error)
      if (event.error === 'not-allowed') {
        setSpeechFeedback('Mic blocked. Click the mic icon in your address bar and click "Allow".')
      } else if (event.error === 'aborted') {
        console.log('Speech recognition aborted silently.')
      } else {
        setSpeechFeedback(`Mic Error: ${event.error}`)
      }
    }

    rec.onend = () => {
      // Auto-restart with a safe timeout to prevent browser collision errors
      setTimeout(() => {
        if (active && isListening && !stateRef.current.showForfeitModal) {
          try {
            rec.start()
          } catch {
            // Ignore start conflicts
          }
        }
      }, 300)
    }

    recognitionRef.current = rec

    if (isListening && !showForfeitModal) {
      try {
        rec.start()
      } catch (e) {
        console.error('Failed to start speech recognition:', e)
      }
    }

    return () => {
      active = false
      rec.onresult = null
      rec.onerror = null
      rec.onend = null
      try {
        rec.stop()
      } catch {
        // Ignore stop issues
      }
    }
  }, [isListening, showForfeitModal])

  // Style helper tokens mapping exactly to the figma mockup's theme colors
  const borderColors = {
    green: 'border-[#00a877]/30 hover:border-[#00a877]/80',
    red: 'border-[#bd203a]/30 hover:border-[#bd203a]/80',
    blue: 'border-[#1c4e80]/30 hover:border-[#1c4e80]/80',
    yellow: 'border-[#c48f29]/30 hover:border-[#c48f29]/80'
  }

  const indicatorColors = {
    green: 'bg-[#00a877] text-white',
    red: 'bg-[#bd203a] text-white',
    blue: 'bg-[#1c4e80] text-white',
    yellow: 'bg-[#c48f29] text-white font-black'
  }

  const textLabelColors = {
    green: 'text-[#00a877]',
    red: 'text-[#bd203a]',
    blue: 'text-[#1c4e80]',
    yellow: 'text-[#c48f29]'
  }

  return (
    <div className="min-h-screen bg-[#001F3F] text-slate-100 font-sans flex flex-col justify-between selection:bg-[#cba33f]/30 selection:text-[#cba33f]">
      
      {/* CSS animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes pulseGold {
          0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 4px rgba(203, 163, 63, 0.4)); }
          50% { opacity: 1; filter: drop-shadow(0 0 12px rgba(203, 163, 63, 0.8)); }
        }
        .animate-pulse-gold {
          animation: pulseGold 2s infinite ease-in-out;
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
        .eq-bar-1 { animation: eqBar1 0.8s ease-in-out infinite; }
        .eq-bar-2 { animation: eqBar2 0.6s ease-in-out infinite; }
        .eq-bar-3 { animation: eqBar3 0.9s ease-in-out infinite; }
        .eq-bar-4 { animation: eqBar4 0.7s ease-in-out infinite; }
        .eq-bar-fast-1 { animation: eqBar1 0.3s ease-in-out infinite; }
        .eq-bar-fast-2 { animation: eqBar2 0.2s ease-in-out infinite; }
        .eq-bar-fast-3 { animation: eqBar3 0.4s ease-in-out infinite; }
        .eq-bar-fast-4 { animation: eqBar4 0.25s ease-in-out infinite; }
      `}</style>

      {/* HEADER - Clean and matches figma mockup exactly */}
      <header className="border-b border-[#0f2d4a]/50 bg-[#0B263F]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/game-hub" className="transition-transform hover:scale-102">
            <Logo />
          </Link>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow mx-auto w-full max-w-4xl px-6 py-6 md:py-10 flex flex-col justify-center">
        
        {/* SPEECH STATUS FEEDBACK */}
        {speechFeedback && (
          <div className="text-center py-2 px-4 mb-4 rounded-lg bg-slate-800/40 border border-slate-700/30 max-w-md mx-auto animate-pulse">
            <span className="text-xs text-[#cba33f] font-semibold">{speechFeedback}</span>
          </div>
        )}

        {encounterState === 'QUIZ' && (
          <div className="space-y-6 md:space-y-8">
            
            {/* CURRENT STANDING SECTION - Styled exactly as shown in figma mockup */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
              <div className="flex-1">
                <p className="text-[10px] font-black tracking-[0.25em] text-[#cba33f] uppercase">CURRENT STANDING</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-4xl font-extrabold text-white tracking-tight">Score: {score}/50</h2>
                  <span className="text-xs font-semibold text-[#8e9bb0]">{Math.round((score / 50) * 100)}% Mastery</span>
                </div>
                {/* Custom Progress Bar */}
                <div className="relative mt-4 h-3 w-full rounded-full bg-[#0c1a30] overflow-hidden border border-slate-800">
                  {/* Filled gold bar */}
                  <div 
                    className="h-full bg-gradient-to-r from-[#dcae3a] to-[#f4d16d] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(220,174,58,0.3)]" 
                    style={{ width: `${(score / 50) * 100}%` }}
                  />
                  {/* Requirement tick line at 80% */}
                  <div 
                    className="absolute top-0 bottom-0 w-[2px] bg-white opacity-80" 
                    style={{ left: '80%' }}
                    title="Required score to pass: 40 (80%)"
                  />
                </div>
              </div>
              
              {/* Requirement badge */}
              <div className="flex flex-col items-center sm:items-end flex-shrink-0 min-w-[120px]">
                <span className="text-[10px] uppercase tracking-wider text-[#8e9bb0] font-medium mb-1">Requirement</span>
                <div className="border border-[#cba33f]/60 bg-[#cba33f]/5 px-5 py-2.5 rounded-md text-center">
                  <p className="text-sm font-extrabold text-[#cba33f] uppercase tracking-wide leading-none">40 to Pass</p>
                </div>
              </div>
            </div>

            {/* QUESTION CARD - Deep blue background, gold top highlight, centered gold sparkles */}
            <div className="relative rounded-2xl border border-slate-700/40 bg-[#091b33] p-8 md:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden">
              {/* Gold gradient top highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cba33f] to-transparent" />
              
              {/* Sparkle icons */}
              <div className="flex justify-center mb-6">
                <svg className="w-8 h-8 text-[#cba33f] animate-pulse-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
                  <path d="M19 13l0.8 2.2L22 16l-2.2 0.8L19 19l-0.8-2.2L16 16l2.2-0.8z" opacity="0.8" />
                  <path d="M6 14l0.6 1.9L8.5 16.5l-1.9 0.6L6 19l-0.6-1.9L3.5 16.5l1.9-0.6z" opacity="0.8" />
                </svg>
              </div>

              {/* Question Text */}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-6 text-center leading-snug">
                {currentQuestion.question}
              </h1>

              {/* Quiz Tag */}
              <p className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-[#cba33f]/95">
                {currentQuestion.stage}
              </p>
            </div>

            {/* OPTIONS GRID - 2x2 grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${shakeCard ? 'animate-shake' : ''}`}>
              {currentQuestion.options.map((option) => {
                const isSelected = selectedKey === option.key
                const isCorrect = option.isCorrect
                
                let cardClass = borderColors[option.theme] + ' bg-[#0c1a30] hover:bg-[#0d2547] border'
                if (isSelected) {
                  if (isCorrect) {
                    cardClass = 'border-emerald-500 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.25)] border-2'
                  } else {
                    cardClass = 'border-rose-500 bg-rose-950/20 shadow-[0_0_15px_rgba(239,68,68,0.25)] border-2'
                  }
                }

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => selectOption(option)}
                    disabled={isAnswered}
                    className={`rounded-xl p-6 text-left transition-all duration-300 ${cardClass} relative flex flex-col justify-between min-h-[120px] cursor-pointer`}
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="flex items-center gap-2.5">
                        {/* Option pill badge */}
                        <span className={`flex h-5.5 w-5.5 items-center justify-center rounded text-[11px] font-black ${indicatorColors[option.theme]}`}>
                          {option.key}
                        </span>
                        {/* Option select action label */}
                        <span className={`text-[11px] font-black uppercase tracking-wider ${textLabelColors[option.theme]}`}>
                          {option.label}
                        </span>
                      </div>
                      
                      {/* Success / Error Icons */}
                      {isSelected && (
                        <span>
                          {isCorrect ? (
                            <Check className="w-4 h-4 text-emerald-400 font-bold" />
                          ) : (
                            <X className="w-4 h-4 text-rose-400 font-bold" />
                          )}
                        </span>
                      )}
                    </div>
                    {/* Option text */}
                    <p className="text-[17px] font-extrabold text-slate-100 mt-1">
                      {option.text}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* HINT AND TIP CONTAINER */}
            {showHint && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/35 text-amber-300 text-xs md:text-sm leading-relaxed flex gap-2.5 items-start animate-[fadeIn_0.3s_ease-out]">
                <Lightbulb className="w-5 h-5 text-[#cba33f] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold uppercase text-[10px] tracking-widest text-[#cba33f] block mb-1">Glow of insight</span>
                  {currentQuestion.hint}
                </div>
              </div>
            )}

            {/* BOTTOM ACTIONS - styled matching figma mockup exactly */}
            <footer className="flex items-center justify-between border-t border-slate-800/40 pt-6">
              {/* Hint Button */}
              <button
                type="button"
                onClick={handleUseHint}
                disabled={hintsLeft === 0 || showHint || isAnswered}
                className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-xs font-bold transition-all uppercase tracking-wider ${
                  hintsLeft === 0 || showHint || isAnswered
                    ? 'border-slate-800 text-slate-500 bg-slate-900/40 cursor-not-allowed'
                    : 'border-[#cba33f]/50 text-[#cba33f] bg-[#cba33f]/5 hover:bg-[#cba33f]/15 hover:border-[#cba33f] cursor-pointer'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                Use Hint ({hintsLeft} Left)
              </button>

              {/* Forfeit Button */}
              <button
                type="button"
                onClick={() => setShowForfeitModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#8e9bb0] hover:text-slate-200 transition-colors uppercase tracking-wider cursor-pointer"
              >
                <Flag className="w-4 h-4" />
                Forfeit Challenge
              </button>
            </footer>
          </div>
        )}

        {/* 4. COMPLETED STATE */}
        {encounterState === 'COMPLETED' && (
          <div className="rounded-2xl border border-slate-700/50 bg-[#091b33] p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.45)] max-w-xl mx-auto w-full space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-[#cba33f]/10 border border-[#cba33f]/30 text-[#cba33f] animate-bounce">
                <Trophy className="w-16 h-16" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-wide">Challenge Completed!</h1>
              <p className="text-gold-300 font-bold uppercase tracking-widest text-[11px] mt-2">Gatekeeper's Quiz • Stage IV-VI Passed</p>
            </div>
            
            <div className="py-6 px-4 rounded-xl bg-[#051327]/60 border border-slate-700/30">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Final Standing</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="text-5xl font-black text-white">{score}</span>
                <span className="text-2xl font-bold text-slate-500">/ 50</span>
              </div>
              <p className="text-emerald-400 text-sm font-semibold mt-2">
                {score >= targetScoreToPass ? "✓ Mastered & Passed" : "✗ Did not meet pass score"}
              </p>
            </div>

            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Your vocal power and knowledge have pierced the gate's ancient seals. The pathway deeper into the obsidian cavern is now open.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-600 hover:border-slate-400 text-sm font-semibold transition hover:bg-slate-800 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Retry Quiz
              </button>
              <Link
                to="/game-hub"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#cba33f] hover:bg-[#d9b74f] text-[#051327] font-black text-sm transition shadow-[0_4px_14px_rgba(203,163,63,0.25)]"
              >
                Continue Adventure
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* BOTTOM VOICE DECK PANEL - Reuses identical voice layout from WhisperingWoods */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 bg-[#041628]/35 border border-[#0f3458]/30 p-5 rounded-2xl backdrop-blur-md shadow-inner">
          
          {/* LEFT: VOICE STATUS BOX */}
          <div className="flex items-center gap-4">
            
            {/* Visual Equalizer Circle */}
            <div 
              onClick={() => setIsListening(!isListening)}
              className={`w-14 h-14 rounded-full flex items-center justify-center bg-[#031220] border-2 cursor-pointer transition-all duration-300 ${
                isListening 
                  ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:shadow-[0_0_20px_rgba(34,211,238,0.45)]' 
                  : 'border-rose-500/50 shadow-[0_0_10px_rgba(239,68,68,0.15)] hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]'
              }`}
              style={{
                animation: isListening 
                  ? 'pulseGlow 2.5s infinite ease-in-out' 
                  : 'pulseGlowMuted 3s infinite ease-in-out'
              }}
              title={isListening ? 'Microphone Active' : 'Microphone Inactive'}
            >
              {/* Equalizer Bars */}
              <div className="flex items-end justify-center gap-1.5 h-6 w-8">
                {isListening ? (
                  <>
                    <span className={`w-1 rounded-full bg-cyan-400 ${wavePulse ? 'eq-bar-fast-1' : 'eq-bar-1'}`} />
                    <span className={`w-1 rounded-full bg-cyan-400 ${wavePulse ? 'eq-bar-fast-2' : 'eq-bar-2'}`} />
                    <span className={`w-1 rounded-full bg-cyan-400 ${wavePulse ? 'eq-bar-fast-3' : 'eq-bar-3'}`} />
                    <span className={`w-1 rounded-full bg-cyan-400 ${wavePulse ? 'eq-bar-fast-4' : 'eq-bar-4'}`} />
                  </>
                ) : (
                  <>
                    <span className="w-1 h-[3px] rounded-full bg-rose-500/40" />
                    <span className="w-1 h-[3px] rounded-full bg-rose-500/40" />
                    <span className="w-1 h-[3px] rounded-full bg-rose-500/40" />
                    <span className="w-1 h-[3px] rounded-full bg-rose-500/40" />
                  </>
                )}
              </div>
            </div>

            {/* Status Information labels */}
            <div className="flex flex-col min-w-[180px]">
              <span className="text-slate-500 text-[9px] font-bold tracking-[0.2em] uppercase">
                Voice Status
              </span>
              <span className={`text-sm font-bold tracking-wide transition-colors duration-300 mt-0.5 flex items-center gap-1.5 ${
                isListening ? 'text-cyan-400' : 'text-slate-500'
              }`}>
                {isListening ? (
                  <>
                    Listening...
                    <span className="inline-flex gap-0.5">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_100ms]" />
                      <span className="w-1 h-1 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
                      <span className="w-1 h-1 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_300ms]" />
                    </span>
                  </>
                ) : (
                  'Offline'
                )}
              </span>
              
              <div className="text-[11px] text-slate-400 mt-1.5 flex flex-wrap items-center gap-1">
                <span>"Command Recognized:</span>
                <span className="text-[#cba33f] font-bold">
                  {recognizedCommand ? `"${recognizedCommand}"` : 'None"'}
                </span>
              </div>
            </div>

          </div>

          {/* CENTER: PILL CONTROLS */}
          <div className="flex items-center bg-[#031220]/80 border border-[#0f3458]/70 px-4 py-2.5 rounded-full shadow-2xl">
            
            {/* Microphone Toggle (Gold pill) */}
            <button
              onClick={() => setIsListening(!isListening)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer ${
                isListening
                  ? 'bg-[#cba33f] text-[#031220] shadow-[0_0_12px_rgba(203,163,63,0.3)] hover:brightness-105'
                  : 'bg-rose-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:bg-rose-700'
              }`}
              title={isListening ? 'Mute Microphone' : 'Activate Microphone'}
            >
              {isListening ? (
                /* Microphone On Icon */
                <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              ) : (
                /* Microphone Off/Slashed Icon */
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              )}
            </button>

            {/* Vertical Divider */}
            <div className="w-[1px] h-6 bg-[#0f3458]/70 mx-4" />

            {/* Pill secondary utilities */}
            <div className="flex items-center gap-2">
              
              {/* Help button */}
              <button 
                onClick={handleUseHint}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/35 transition-colors cursor-pointer"
                title="Use a hint"
              >
                <Lightbulb className="w-5 h-5" />
              </button>

              {/* Forfeit button */}
              <button 
                onClick={() => setShowForfeitModal(true)}
                className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-800/35 transition-colors cursor-pointer"
                title="Forfeit challenge"
              >
                <Flag className="w-5 h-5" />
              </button>

              {/* Mute/Unmute Audio indicator */}
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg hover:bg-slate-800/35 transition-all cursor-pointer ${
                  isMuted ? 'text-rose-500' : 'text-slate-400 hover:text-white'
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

          {/* BALANCING FLEX SPACE */}
          <div className="hidden lg:block w-[180px]"></div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#0f2d4a]/30 bg-[#00152B] py-4 text-center text-[10px] text-slate-500 tracking-wider">
        <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Vocal Quest. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* FORFEIT CONFIRMATION MODAL */}
      {showForfeitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-[#091b33] border border-slate-700/50 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">Abandon Encounter?</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              If you forfeit now, your progress in this encounter will be lost and you will return to the Game Hub.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowForfeitModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:text-white text-xs font-bold transition hover:bg-slate-800"
              >
                Stay and Fight
              </button>
              <button
                onClick={handleForfeitConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 text-xs font-bold transition shadow-[0_2px_10px_rgba(220,38,38,0.3)]"
              >
                Forfeit
              </button>
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest pt-1">
              🎤 Speak: "Forfeit" or "Stay"
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default DemonGuardian
