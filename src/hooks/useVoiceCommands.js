import { useState, useEffect, useRef, useCallback } from 'react';

// Lightweight Levenshtein Distance for Fuzzy Phonetic Matching
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Calculate fuzzy similarity percentage (0 to 100)
function calculateSimilarity(str1, str2) {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 100;
  const dist = levenshteinDistance(str1, str2);
  return ((maxLen - dist) / maxLen) * 100;
}

export function useVoiceCommands(commandMap = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const lastExecutedTimeRef = useRef(0);
  const commandMapRef = useRef(commandMap);

  // Keep commandMap reference updated without re-triggering effect
  useEffect(() => {
    commandMapRef.current = commandMap;
  }, [commandMap]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Web Speech API is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true; // Fast real-time recognition
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let currentResult = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentResult += event.results[i][0].transcript;
      }

      // Normalize speech: lowercase & remove punctuation
      let cleanText = currentResult
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
        .trim();

      if (!cleanText) return;
      setTranscript(cleanText);

      // Common speech recognition phonetic normalizations
      cleanText = cleanText
        .replace(/\bdamon\b/g, 'demon')
        .replace(/\bdimon\b/g, 'demon')
        .replace(/\bdaemon\b/g, 'demon')
        .replace(/\bdemons\b/g, 'demon')
        .replace(/\bshrin\b/g, 'shrine')
        .replace(/\bfolow\b/g, 'follow');

      const now = Date.now();
      const spokenWords = cleanText.split(/\s+/);

      // Check for command triggers
      Object.keys(commandMapRef.current).forEach((commandKey) => {
        const triggers = commandKey
          .toLowerCase()
          .split(/[,|]/)
          .map((t) => t.trim())
          .filter(Boolean);

        const isMatched = triggers.some((trigger) => {
          // 1. Direct Substring Match
          if (cleanText.includes(trigger)) return true;

          // 2. Word-by-Word Fuzzy & Phonetic Match
          return spokenWords.some((word) => {
            if (word.length < 3 && trigger.length >= 3) return false;
            const sim = calculateSimilarity(word, trigger);
            return sim >= 75 || levenshteinDistance(word, trigger) <= 2;
          });
        });

        if (isMatched) {
          // Throttle execution (prevent double execution within 1.2s)
          if (now - lastExecutedTimeRef.current > 1200) {
            lastExecutedTimeRef.current = now;
            if (typeof commandMapRef.current[commandKey] === 'function') {
              commandMapRef.current[commandKey]();
            }
          }
        }
      });
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') return; // Ignore silent pauses
      console.warn('Speech recognition warning:', event.error);
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone permissions in your browser.');
        setIsListening(false);
        isListeningRef.current = false;
      }
    };

    recognition.onend = () => {
      // Auto-restart recognition if intended to keep listening continuously
      if (isListeningRef.current) {
        try {
          recognition.start();
        } catch (e) {
          console.warn('Auto-restart recognition attempt:', e);
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      isListeningRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore stop errors on unmount
        }
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        isListeningRef.current = true;
        recognitionRef.current.start();
        setIsListening(true);
        setError(null);
      } catch (err) {
        // Recognition might already be running
        setIsListening(true);
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // Ignore stop error
      }
    }
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
  };
}
