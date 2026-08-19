import { useState, useEffect, useRef, useCallback } from 'react';

export function useVoiceCommands(commandMap = {}) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Check browser compatibility
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError('Web Speech API is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;       // Keep listening continuously
        recognition.interimResults = false;  // Process only final speech results
        recognition.lang = 'en-US';           // Language setting

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const rawText = event.results[current][0].transcript;
            
            // 1. Text Normalization: Lowercase & remove punctuation
            const cleanText = rawText.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
            setTranscript(cleanText);

            // 2. Fuzzy & Synonym Matching
            Object.keys(commandMap).forEach((commandKey) => {
                // Split comma/pipe separated synonyms e.g. "attack, strike, fight"
                const triggers = commandKey.toLowerCase().split(/[,|]/).map((t) => t.trim());

                // Check if spoken phrase includes any trigger keyword
                const matched = triggers.some((trigger) => trigger.length > 0 && cleanText.includes(trigger));

                if (matched) {
                    commandMap[commandKey](); // Execute associated handler
                }
            });
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setError(`Speech recognition error: ${event.error}`);
        };

        recognition.onend = () => {
            // Auto-restart if it was intended to keep listening
            if (recognitionRef.current && isListening) {
                try {
                    recognitionRef.current.start();
                } catch (e) {
                    console.warn('Could not auto-restart recognition:', e);
                }
            }
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [commandMap, isListening]);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                setError(null);
            } catch (err) {
                console.error('Start error:', err);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, [isListening]);

    return {
        isListening,
        transcript,
        error,
        startListening,
        stopListening,
    };
}
