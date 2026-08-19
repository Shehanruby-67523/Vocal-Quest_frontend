import { useCallback, useEffect } from 'react'

export function useSpeechSynthesis() {
  const speak = useCallback((text, onEndCallback) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-Speech is not supported in this browser.')
      return
    }

    // Cancel any current ongoing speech so questions don't overlap
    window.speechSynthesis.cancel()

    if (!text) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95  // Speech speed (0.1 to 10)
    utterance.pitch = 1.0  // Pitch (0 to 2)
    utterance.lang = 'en-US'

    // Optional callback when voice finishes speaking
    if (onEndCallback) {
      utterance.onend = () => {
        onEndCallback()
      }
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  // Cleanup: stop speaking if user leaves page
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return { speak, stop }
}
