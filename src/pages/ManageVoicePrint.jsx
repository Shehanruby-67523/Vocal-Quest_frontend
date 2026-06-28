import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Info, 
  Shield, 
  Trash2, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  AlertCircle, 
  X, 
  HelpCircle,
  Check
} from "lucide-react";
import Logo from "../Components/Logo";
import { colors } from "../styles/colors";

const TARGET_SENTENCE = "The golden sun sets over the quest mountains, echoing the ancient whispers of the vocal masters. My voice is my key, my power, and my identity within the realm.";
const TARGET_WORDS = TARGET_SENTENCE.split(" ");
const TARGET_WORDS_CLEAN = TARGET_WORDS.map(w => w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, ""));

export default function ManageVoicePrint() {
  const navigate = useNavigate();
  
  // Status states
  const [voicePrintStatus, setVoicePrintStatus] = useState(() => {
    return localStorage.getItem("vocal_quest_voice_print_status") || "active";
  });
  const [isRecording, setIsRecording] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [spokenWords, setSpokenWords] = useState(new Set());
  const [transcriptText, setTranscriptText] = useState("");
  const [speechFeedback, setSpeechFeedback] = useState("Press the button or say 'start recording' to begin.");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Accessibility states
  const [audioGuidance, setAudioGuidance] = useState(() => {
    const saved = localStorage.getItem("vocal_quest_audio_guidance");
    return saved !== null ? saved === "true" : true;
  });
  const [announcement, setAnnouncement] = useState("");
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Refs for tracking microphone / SpeechRecognition
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const backgroundRecRef = useRef(null);
  const calibrationRecRef = useRef(null);
  const simulationIntervalRef = useRef(null);

  // Keep references fresh for listeners
  const isRecordingRef = useRef(isRecording);
  const showDeleteConfirmRef = useRef(showDeleteConfirm);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    showDeleteConfirmRef.current = showDeleteConfirm;
  }, [showDeleteConfirm]);

  // Check browser SpeechRecognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setHasSpeechSupport(!!SpeechRecognition);
  }, []);

  // Set page focus & initial announcements for blind users
  useEffect(() => {
    isMountedRef.current = true;
    localStorage.setItem("vocal_quest_audio_guidance", audioGuidance);
    
    // Initial voice narration
    const initialGreeting = `Manage Voice Print page. Your current voice print status is ${voicePrintStatus}. ` +
      (audioGuidance 
        ? "Voice guidance is enabled. Press Alt plus H for a list of voice commands at any time, or say start recording to begin calibration." 
        : "");
    
    announce(initialGreeting);
    
    return () => {
      isMountedRef.current = false;
      window.speechSynthesis.cancel();
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
    };
  }, []);

  // Screen reader and TTS helper
  const announce = (text) => {
    setAnnouncement(text);
    if (audioGuidance && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Synth sound chimes using Web Audio API for audio feedback
  const playSynthSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const playTone = (freq, duration, oscType = "sine", startTime = 0) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = oscType;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
      };

      if (type === "start") {
        // High rising chime
        playTone(440, 0.1, "sine", 0);
        playTone(554, 0.1, "sine", 0.05);
        playTone(659, 0.1, "sine", 0.1);
        playTone(880, 0.2, "sine", 0.15);
      } else if (type === "success") {
        // High double success chime
        playTone(523.25, 0.08, "triangle", 0);
        playTone(659.25, 0.08, "triangle", 0.08);
        playTone(783.99, 0.25, "sine", 0.16);
      } else if (type === "error") {
        // Low double error buzz
        playTone(200, 0.15, "sawtooth", 0);
        playTone(180, 0.2, "sawtooth", 0.1);
      } else if (type === "delete") {
        // Falling de-registration chime
        playTone(783.99, 0.1, "sine", 0);
        playTone(523.25, 0.1, "sine", 0.08);
        playTone(392, 0.25, "sine", 0.16);
      } else if (type === "command") {
        // Short system feedback beep
        playTone(880, 0.06, "sine", 0);
      }
    } catch (e) {
      console.warn("AudioContext chime failed:", e);
    }
  };

  // Keyboard controls handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space to toggle recording
      if (e.code === "Space" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "BUTTON") {
        e.preventDefault();
        if (isRecording) {
          stopRecording(true);
        } else {
          startRecording();
        }
      }
      // Escape to close modals or cancel recording
      if (e.code === "Escape") {
        if (showDeleteConfirm) {
          setShowDeleteConfirm(false);
          announce("Deletion cancelled.");
        } else if (showHelpModal) {
          setShowHelpModal(false);
        } else if (isRecording) {
          stopRecording(false);
        }
      }
      // Alt + V to toggle voice guidance
      if (e.altKey && e.code === "KeyV") {
        toggleVoiceGuidance();
      }
      // Alt + H for help
      if (e.altKey && e.code === "KeyH") {
        toggleHelp();
      }
      // Alt + S to read target sentence
      if (e.altKey && e.code === "KeyS") {
        announce(`The calibration sentence is: ${TARGET_SENTENCE}`);
      }
      // Alt + D to delete
      if (e.altKey && e.code === "KeyD") {
        handleDeleteClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRecording, showDeleteConfirm, showHelpModal, voicePrintStatus, audioGuidance, spokenWords]);

  // Audio Guidance Toggler
  const toggleVoiceGuidance = () => {
    const nextState = !audioGuidance;
    setAudioGuidance(nextState);
    localStorage.setItem("vocal_quest_audio_guidance", nextState);
    
    // Play command chime and speak confirmation
    playSynthSound("command");
    const msg = nextState ? "Voice guidance enabled" : "Voice guidance disabled";
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(msg);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleHelp = () => {
    playSynthSound("command");
    const next = !showHelpModal;
    setShowHelpModal(next);
    if (next) {
      announce("Help menu opened. Available voice and keyboard shortcuts: Spacebar to record, Alt plus V to toggle voice guidance, Alt plus H for this help, Alt plus S to read the sentence, and Alt plus D to delete voice print. Press Escape to close.");
    } else {
      announce("Help menu closed.");
    }
  };

  // Start Calibration recording
  const startRecording = async () => {
    if (isRecording) return;

    if (!hasSpeechSupport) {
      // Fallback for unsupported browsers: simulate the calibration
      simulateCalibration();
      return;
    }

    try {
      // Request mic permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      // Temporarily halt background command listener
      if (backgroundRecRef.current) {
        try {
          backgroundRecRef.current.stop();
        } catch (e) {}
      }

      setSpokenWords(new Set());
      setCalibrationProgress(0);
      setTranscriptText("");
      setIsRecording(true);
      setSpeechFeedback("Listening... Speak the calibration sentence clearly.");
      playSynthSound("start");
      announce("Recording started. Read: " + TARGET_SENTENCE);

      // Web Audio analyser setup for canvas visualizer
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Calibration speech recognition setup
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          } else {
            interimTranscript += event.results[i][0].transcript + " ";
          }
        }

        const fullTranscript = (finalTranscript + interimTranscript).toLowerCase();
        setTranscriptText(fullTranscript);

        // Word-level matching
        const cleanWords = fullTranscript
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, "")
          .split(/\s+/);

        setSpokenWords(prev => {
          const next = new Set(prev);
          cleanWords.forEach(word => {
            if (TARGET_WORDS_CLEAN.includes(word)) {
              next.add(word);
            }
          });

          const progress = Math.min(100, Math.round((next.size / TARGET_WORDS_CLEAN.length) * 100));
          setCalibrationProgress(progress);
          return next;
        });
      };

      rec.onerror = (e) => {
        console.error("Calibration recognition error:", e);
        if (e.error === "no-speech") {
          setSpeechFeedback("No speech detected. Please speak clearly.");
        }
      };

      calibrationRecRef.current = rec;
      rec.start();

    } catch (err) {
      console.error("Microphone access failed:", err);
      setSpeechFeedback("Microphone access denied. Please allow mic in settings.");
      announce("Microphone access denied. Please check page permission settings.");
      playSynthSound("error");
      setIsRecording(false);
      
      // Restart background listener
      restartBackgroundListener();
    }
  };

  // Stop recording & evaluate calibration score
  const stopRecording = (shouldSave = true) => {
    setIsRecording(false);

    // Stop microphone tracks
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }

    // Stop Speech Recognition
    if (calibrationRecRef.current) {
      try {
        calibrationRecRef.current.stop();
      } catch (e) {}
      calibrationRecRef.current = null;
    }

    // Close AudioCtx
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    analyserRef.current = null;

    if (shouldSave) {
      // Evaluate calibration success. Resilient threshold: 50% match
      const successThreshold = 50;
      const progress = Math.min(100, Math.round((spokenWords.size / TARGET_WORDS_CLEAN.length) * 100));
      
      if (progress >= successThreshold) {
        setVoicePrintStatus("active");
        localStorage.setItem("vocal_quest_voice_print_status", "active");
        localStorage.setItem("vocal_quest_voice_print_calibrated_at", new Date().toISOString());
        
        setSpeechFeedback(`Calibration successful! Accuracy: ${progress}%. Voice print activated.`);
        announce(`Calibration successful with accuracy of ${progress} percent. Your unique voice print is now active.`);
        playSynthSound("success");
      } else {
        setSpeechFeedback(`Calibration failed (Match: ${progress}%). Read the sentence clearly.`);
        announce(`Calibration failed. Spoken words matched only ${progress} percent. Please read the full sentence clearly and try again.`);
        playSynthSound("error");
      }
    } else {
      setSpeechFeedback("Recording cancelled.");
      announce("Recording cancelled.");
    }

    // Restart background listener
    restartBackgroundListener();
  };

  // Simulate calibration for testing or unsupported browsers
  const simulateCalibration = () => {
    setIsRecording(true);
    setSpokenWords(new Set());
    setCalibrationProgress(0);
    setTranscriptText("");
    setSpeechFeedback("Speech recognition not supported. Running mock calibration...");
    announce("Speech recognition is not supported in this browser. Running simulated calibration. Please read the sentence aloud.");
    playSynthSound("start");

    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += 10;
      setCalibrationProgress(progressVal);

      // Progressively highlight words
      const wordsToHighlight = Math.floor((progressVal / 100) * TARGET_WORDS_CLEAN.length);
      setSpokenWords(new Set(TARGET_WORDS_CLEAN.slice(0, wordsToHighlight)));

      if (progressVal >= 100) {
        clearInterval(interval);
        setIsRecording(false);
        setVoicePrintStatus("active");
        localStorage.setItem("vocal_quest_voice_print_status", "active");
        setSpeechFeedback("Simulated calibration successful! Voice print activated.");
        announce("Simulated calibration complete. Voice print updated successfully.");
        playSynthSound("success");
        restartBackgroundListener();
      }
    }, 450);

    simulationIntervalRef.current = interval;
  };

  // Delete voice print handler
  const handleDeleteClick = () => {
    playSynthSound("command");
    if (voicePrintStatus === "inactive") {
      announce("You do not have an active voice print to delete.");
      setSpeechFeedback("No active voice print to delete.");
      return;
    }
    setShowDeleteConfirm(true);
    announce("Are you sure you want to delete your voice print? Say 'confirm delete' or press enter to delete, or escape to cancel.");
  };

  const confirmDelete = () => {
    playSynthSound("delete");
    setVoicePrintStatus("inactive");
    localStorage.setItem("vocal_quest_voice_print_status", "inactive");
    localStorage.removeItem("vocal_quest_voice_print_calibrated_at");
    setShowDeleteConfirm(false);
    setSpeechFeedback("Voice print deleted.");
    announce("Voice print deleted successfully. Vocal authentication features are now disabled.");
  };

  // Restart continuous background command listener
  const restartBackgroundListener = () => {
    setTimeout(() => {
      if (isMountedRef.current && !isRecordingRef.current && backgroundRecRef.current) {
        try {
          backgroundRecRef.current.start();
        } catch (e) {
          console.warn("Could not restart background listener:", e);
        }
      }
    }, 1000);
  };

  // Continuous background Speech Recognition for voice control
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onresult = (event) => {
      // Ignore background commands during active calibration
      if (isRecordingRef.current) return;

      const resultIndex = event.resultIndex;
      const transcript = event.results[resultIndex][0].transcript.trim().toLowerCase();
      console.log("Background Voice Command:", transcript);

      // Handle voice commands
      if (
        transcript.includes("start recording") || 
        transcript.includes("update voice print") || 
        transcript.includes("begin calibration") ||
        transcript.includes("calibrate voice")
      ) {
        playSynthSound("command");
        startRecording();
      } else if (
        transcript.includes("delete voice print") || 
        transcript.includes("remove voice print") || 
        transcript.includes("delete voice")
      ) {
        playSynthSound("command");
        handleDeleteClick();
      } else if (transcript.includes("confirm delete") || transcript.includes("yes delete")) {
        if (showDeleteConfirmRef.current) {
          playSynthSound("command");
          confirmDelete();
        }
      } else if (transcript.includes("cancel") || transcript.includes("stop delete") || transcript.includes("escape")) {
        if (showDeleteConfirmRef.current) {
          playSynthSound("command");
          setShowDeleteConfirm(false);
          announce("Deletion cancelled.");
        }
      } else if (transcript.includes("go back") || transcript.includes("back") || transcript.includes("return to settings")) {
        playSynthSound("command");
        announce("Returning to profile settings.");
        setTimeout(() => navigate("/profile"), 1200);
      } else if (transcript.includes("read text") || transcript.includes("read sentence") || transcript.includes("sentence")) {
        playSynthSound("command");
        announce(`The calibration sentence is: ${TARGET_SENTENCE}`);
      } else if (transcript.includes("help") || transcript.includes("voice commands") || transcript.includes("commands")) {
        playSynthSound("command");
        announce("Voice commands available: 'start recording' to calibrate, 'delete voice print' to remove, 'go back' to return to settings, 'read sentence' to hear the calibration text, and 'toggle guidance' to turn voice prompts on or off.");
      } else if (transcript.includes("toggle guidance") || transcript.includes("toggle voice") || transcript.includes("voice guidance")) {
        toggleVoiceGuidance();
      }
    };

    rec.onerror = (e) => {
      console.error("Background voice command error:", e.error);
    };

    rec.onend = () => {
      // Auto-restart background listener if page is active and not recording
      if (isMountedRef.current && !isRecordingRef.current) {
        try {
          rec.start();
        } catch (e) {}
      }
    };

    backgroundRecRef.current = rec;
    
    // Initial start
    try {
      rec.start();
    } catch (e) {
      console.error("Failed to start background listener:", e);
    }

    return () => {
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      try {
        rec.stop();
      } catch (e) {}
    };
  }, [navigate]);

  // Audio Visualizer Drawing Loop
  useEffect(() => {
    let animationId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      
      const width = canvas.width;
      const height = canvas.height;
      canvasCtx.clearRect(0, 0, width, height);

      // Symmetric visualizer bars in the center
      const barCount = 7;
      const barWidth = 6;
      const gap = 8;
      const totalWidth = (barCount * barWidth) + ((barCount - 1) * gap);
      const startX = (width - totalWidth) / 2;
      const centerY = height / 2;

      let heights = [];
      if (isRecording && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Map frequency data to symmetric bars
        for (let i = 0; i < barCount; i++) {
          const distFromCenter = Math.abs(i - Math.floor(barCount / 2));
          // Use different frequency bins for each bar (lower indices correspond to vocal range)
          const dataIdx = Math.min(dataArray.length - 1, distFromCenter * 2 + 1);
          const val = dataArray[dataIdx] || 0;
          heights.push(Math.max(0.1, val / 255));
        }
      } else {
        // Idle heartbeat-style breathing wave
        const t = Date.now() * 0.0035;
        for (let i = 0; i < barCount; i++) {
          const distFromCenter = Math.abs(i - Math.floor(barCount / 2));
          const baseHeight = 0.2 + (0.55 - distFromCenter * 0.16); // symmetric peaks
          const wave = Math.sin(t + i * 0.65) * 0.08;
          heights.push(Math.max(0.12, baseHeight + wave));
        }
      }

      // Draw bars
      canvasCtx.fillStyle = colors.gold;
      for (let i = 0; i < barCount; i++) {
        const barHeight = heights[i] * (height * 0.55); // Scale bar height to max 55% of canvas height
        const x = startX + i * (barWidth + gap);
        const y = centerY - barHeight / 2;

        canvasCtx.beginPath();
        // Draw capsules (fully rounded rectangles)
        canvasCtx.roundRect(x, y, barWidth, barHeight, barWidth / 2);
        canvasCtx.fill();
      }
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isRecording]);

  return (
    <div 
      className="min-h-screen text-slate-200 flex flex-col font-sans relative overflow-x-hidden selection:bg-[#EFB034]/30"
      style={{ backgroundColor: colors.page }}
    >
      {/* Screen Reader Announcements (ARIA Live Region) */}
      <div 
        className="sr-only" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        {announcement}
      </div>

      {/* Top Header */}
      <header 
        className="fixed top-0 left-0 z-50 w-full backdrop-blur-md border-b transition-all duration-300"
        style={{ 
          backgroundColor: colors.nav, 
          borderColor: "rgba(28, 58, 94, 0.4)" 
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link to="/" aria-label="Vocal Quest Home Page">
            <Logo />
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Help Toggle Button */}
            <button
              onClick={toggleHelp}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              title="Help Shortcuts (Alt+H)"
              aria-label="Voice and Keyboard Help Shortcuts"
            >
              <HelpCircle size={20} />
            </button>

            {/* Voice Guidance Toggle */}
            <button
              onClick={toggleVoiceGuidance}
              className={`p-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold ${
                audioGuidance 
                  ? "bg-[#EFB034]/10 text-[#EFB034] hover:bg-[#EFB034]/20 border border-[#EFB034]/30" 
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
              title="Toggle Voice Guidance (Alt+V)"
              aria-label={`Voice Guidance is ${audioGuidance ? "Enabled" : "Disabled"}. Click to toggle.`}
              aria-pressed={audioGuidance}
            >
              {audioGuidance ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="hidden sm:inline">Voice Guidance</span>
            </button>

            {/* Back button matching figma */}
            <Link 
              to="/profile" 
              onClick={() => announce("Going back to profile settings.")}
              className="text-xs md:text-sm font-semibold hover:text-[#EFB034] transition-colors flex items-center gap-2 cursor-pointer py-1.5 px-3 rounded-lg hover:bg-white/5"
              style={{ color: colors.textMuted }}
              aria-label="Back to Settings Page"
            >
              <ArrowLeft size={14} className="stroke-[2.5]" /> 
              Back to Settings
            </Link>
          </div>
        </div>
      </header>

      {/* Main Column */}
      <main className="w-full max-w-3xl mx-auto px-6 flex-1 flex flex-col justify-center gap-8 py-4 z-10 pt-24">
        
        {/* Title area */}
        <section aria-labelledby="page-title">
          <h1 
            id="page-title" 
            className="text-white text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Manage Voice Print
          </h1>
          <p 
            className="text-sm mt-2 font-medium" 
            style={{ color: colors.textMuted }}
          >
            Configure your unique vocal profile for authentication and immersive gameplay.
          </p>

          {/* VOICE PRINT Badge matching screenshot */}
          <div className="mt-4 flex items-center">
            {voicePrintStatus === "active" ? (
              <div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-[10px] md:text-xs font-bold tracking-widest"
                role="status"
                aria-label="Voice Print Status: Active"
              >
                <CheckCircle2 size={14} className="stroke-[2.5]" />
                <span>VOICE PRINT: ACTIVE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
              </div>
            ) : (
              <div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-950/20 text-rose-400 text-[10px] md:text-xs font-bold tracking-widest"
                role="status"
                aria-label="Voice Print Status: Inactive"
              >
                <AlertCircle size={14} className="stroke-[2.5]" />
                <span>VOICE PRINT: INACTIVE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 ml-1" />
              </div>
            )}
          </div>
        </section>

        {/* Central Calibration Card */}
        <section 
          className="relative overflow-hidden rounded-3xl p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-panel border border-slate-800/80 transition-all duration-300"
          style={{ backgroundColor: colors.panelDark }}
          aria-labelledby="calibration-card-title"
        >
          {/* Subtle audio waves in background when recording */}
          {isRecording && (
            <div className="absolute inset-0 bg-radial-gradient from-[#EFB034]/5 to-transparent pointer-events-none animate-pulse" />
          )}

          {/* Visualizer Circle */}
          <div 
            className="w-36 h-36 rounded-full border-2 flex items-center justify-center mb-6 relative overflow-hidden transition-all duration-500"
            style={{ 
              borderColor: isRecording ? colors.gold : "#EFB03450",
              boxShadow: isRecording ? "0 0 20px rgba(239, 176, 52, 0.25)" : "none",
              backgroundColor: "#201D12"
            }}
          >
            <canvas 
              ref={canvasRef} 
              width={140} 
              height={140} 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Calibration title */}
          <h3 
            id="calibration-card-title" 
            className="text-white text-xl md:text-2xl font-bold mb-3"
          >
            {isRecording ? "Listening..." : "Calibration Required"}
          </h3>

          {/* Calibration prompt sentence */}
          <div className="max-w-xl mx-auto my-3 p-4 bg-slate-900/40 rounded-2xl border border-slate-800/40">
            <span className="sr-only">Read the following sentence:</span>
            <p className="text-sm md:text-base leading-relaxed text-slate-300 select-none font-medium">
              {TARGET_WORDS.map((word, idx) => {
                const cleanWord = TARGET_WORDS_CLEAN[idx];
                const isSpoken = spokenWords.has(cleanWord);
                return (
                  <span
                    key={idx}
                    className={`mx-0.5 inline-block transition-all duration-300 ${
                      isSpoken 
                        ? "text-[#EFB034] font-semibold scale-105 drop-shadow-[0_0_8px_rgba(239,176,52,0.5)]" 
                        : "text-slate-400 opacity-60"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>

          {/* Calibration Progress Bar */}
          {isRecording && (
            <div className="w-full max-w-md bg-slate-900/60 rounded-full h-2 mt-2 mb-4 overflow-hidden border border-slate-800/80">
              <div 
                className="h-full bg-[#EFB034] transition-all duration-300"
                style={{ width: `${calibrationProgress}%` }}
                role="progressbar"
                aria-valuenow={calibrationProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Vocal Calibration matching: ${calibrationProgress}% complete`}
              />
            </div>
          )}

          {/* Real-time transcribed text display */}
          {isRecording && transcriptText && (
            <p className="text-xs text-[#EFB034]/70 italic max-w-sm mb-4 truncate">
              Heard: "{transcriptText}"
            </p>
          )}

          {/* Audio Feedback Message */}
          <p className="text-xs font-semibold text-[#A9BCD2] mb-6">
            {speechFeedback}
          </p>

          {/* UPDATE VOICE PRINT trigger button */}
          <button
            onClick={isRecording ? () => stopRecording(true) : startRecording}
            className={`font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] w-full max-w-xs ${
              isRecording 
                ? "bg-rose-500 hover:bg-rose-600 text-white" 
                : "text-[#16263F]"
            }`}
            style={{ backgroundColor: isRecording ? undefined : colors.gold }}
            aria-label={isRecording ? "Stop Recording Voice Calibration" : "Update Voice Print Calibration"}
          >
            {isRecording ? (
              <>
                <MicOff size={18} className="animate-pulse" />
                <span>STOP RECORDING</span>
              </>
            ) : (
              <>
                <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center font-bold text-[10px]"></span>
                <span>UPDATE VOICE PRINT</span>
              </>
            )}
          </button>

          <p className="text-[10px] font-bold text-slate-500 mt-4 tracking-widest uppercase">
            {isRecording ? "Press Spacebar or say 'stop' when finished" : "Press Spacebar or say 'start recording'"}
          </p>
        </section>

        {/* Feature Cards columns */}
        <section 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          aria-label="Features and Privacy Details"
        >
          {/* Card 1: How it works */}
          <article 
            className="border border-slate-800/80 rounded-2xl p-6 flex flex-col gap-2 relative overflow-hidden transition-all hover:border-[#EFB034]/20"
            style={{ backgroundColor: colors.panelDark }}
          >
            <h4 className="font-bold text-xs tracking-widest flex items-center gap-2 uppercase" style={{ color: colors.gold }}>
              <Info size={16} className="text-[#EFB034]" />
              <span>HOW IT WORKS</span>
            </h4>
            <p className="text-xs md:text-sm leading-relaxed text-slate-300 font-medium">
              Your voice print is a unique mathematical model of your vocal characteristics. It is used to securely verify your identity and trigger special in-game spells that respond only to your voice.
            </p>
          </article>

          {/* Card 2: Privacy first */}
          <article 
            className="border border-slate-800/80 rounded-2xl p-6 flex flex-col gap-2 relative overflow-hidden transition-all hover:border-[#EFB034]/20"
            style={{ backgroundColor: colors.panelDark }}
          >
            <h4 className="font-bold text-xs tracking-widest flex items-center gap-2 uppercase" style={{ color: colors.gold }}>
              <Shield size={16} className="text-[#EFB034]" />
              <span>PRIVACY FIRST</span>
            </h4>
            <p className="text-xs md:text-sm leading-relaxed text-slate-300 font-medium">
              Vocal Quest encrypts all biometric data. Your voice prints are never shared with third parties and are used exclusively for game functionality and account security.
            </p>
          </article>
        </section>

        {/* Privacy Controls & deletion section */}
        <section 
          className="border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ borderColor: "rgba(28, 58, 94, 0.4)" }}
          aria-labelledby="privacy-controls-title"
        >
          <div>
            <h4 id="privacy-controls-title" className="text-white font-bold text-sm">Privacy Controls</h4>
            <p 
              className="text-xs mt-1 max-w-md font-medium"
              style={{ color: colors.textMuted }}
            >
              Removing your voice print will disable vocal authentication and certain gameplay features.
            </p>
          </div>

          <button
            onClick={handleDeleteClick}
            disabled={voicePrintStatus === "inactive"}
            className={`font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors py-2 px-4 rounded-lg bg-red-950/15 border border-red-500/10 hover:border-red-500/30 ${
              voicePrintStatus === "inactive" 
                ? "opacity-45 cursor-not-allowed text-slate-500" 
                : "text-red-400 hover:text-red-300"
            }`}
            aria-label="Delete Voice Print"
          >
            {/* Red delete trash-x icon */}
            <div className="relative w-4 h-4 flex items-center justify-center">
              <Trash2 size={16} />
              <span className="absolute text-[8px] font-extrabold top-[3px]"></span>
            </div>
            <span>Delete Voice Print</span>
          </button>
        </section>

        {/* Footer Copyright */}
        <footer className="text-center text-[10px] tracking-widest text-slate-500 mt-12 mb-6 uppercase select-none">
          © 2024 VOCAL QUEST - BIOMETRIC SECURITY MODULE V2.4.0
        </footer>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-confirm-title"
          aria-describedby="delete-confirm-desc"
        >
          <div 
            className="w-full max-w-sm rounded-2xl border border-red-500/20 p-6 flex flex-col gap-4 text-center shadow-2xl relative animate-scale-up"
            style={{ backgroundColor: colors.panelDark }}
          >
            <div className="w-12 h-12 rounded-full bg-red-950/30 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
              <AlertCircle size={24} />
            </div>

            <div>
              <h3 id="delete-confirm-title" className="text-white text-lg font-bold">Delete Voice Print?</h3>
              <p id="delete-confirm-desc" className="text-xs text-slate-400 mt-2">
                This action is permanent. You will need to re-calibrate your voice to use voice login and special spelling commands.
              </p>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => {
                  playSynthSound("command");
                  setShowDeleteConfirm(false);
                  announce("Deletion cancelled.");
                }}
                className="flex-1 py-2.5 rounded-lg border border-slate-800 text-slate-300 text-xs font-bold hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold cursor-pointer"
              >
                Delete
              </button>
            </div>
            
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
              Say 'confirm delete' or press Enter to proceed
            </p>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help Modal */}
      {showHelpModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-title"
        >
          <div 
            className="w-full max-w-md rounded-2xl border border-[#EFB034]/20 p-6 flex flex-col gap-4 shadow-2xl"
            style={{ backgroundColor: colors.panelDark }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(28, 58, 94, 0.4)" }}>
              <h3 id="help-title" className="text-white text-base font-bold flex items-center gap-2">
                <HelpCircle size={18} className="text-[#EFB034]" />
                <span>Accessibility & Voice Controls</span>
              </h3>
              <button 
                onClick={toggleHelp} 
                className="text-slate-400 hover:text-white cursor-pointer"
                aria-label="Close Help Menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs leading-relaxed">
              <p className="text-slate-300 font-semibold mb-1">
                This module is optimized for keyboard users and screen readers.
              </p>
              
              <div className="grid grid-cols-2 gap-2 border-b pb-3 border-slate-800">
                <span className="font-bold text-[#EFB034]">Shortcut Key</span>
                <span className="font-bold text-white">Action</span>
                
                <span>Spacebar</span>
                <span>Start / Stop Recording</span>
                
                <span>Alt + V</span>
                <span>Toggle Speech Guidance (TTS)</span>
                
                <span>Alt + S</span>
                <span>Read Calibration Sentence</span>
                
                <span>Alt + D</span>
                <span>Trigger Delete Confirmation</span>
                
                <span>Alt + H</span>
                <span>Toggle this Help Menu</span>
                
                <span>Escape</span>
                <span>Close menus / Cancel actions</span>
              </div>

              <p className="text-[#EFB034] font-semibold mt-1">
                Background Voice Commands:
              </p>
              <p className="text-slate-300 italic text-[11px]">
                Speak these anytime (requires mic permission):
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                <li>"start recording" — Begins voice calibration</li>
                <li>"delete voice print" — Triggers deletion modal</li>
                <li>"confirm delete" — Performs deletion inside modal</li>
                <li>"cancel" — Cancels recording or deletion</li>
                <li>"read sentence" — Speaks the calibration sentence out loud</li>
                <li>"toggle guidance" — Turns speech assistance on/off</li>
                <li>"go back" — Navigates back to Profile Settings</li>
                <li>"help" — Narrates these voice commands</li>
              </ul>
            </div>

            <button
              onClick={toggleHelp}
              className="mt-3 w-full py-2.5 rounded-lg text-[#16263F] text-xs font-bold hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: colors.gold }}
            >
              Close Help
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
