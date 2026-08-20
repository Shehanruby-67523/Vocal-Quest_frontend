import { useCallback, useEffect, useRef } from 'react'

export function useSpeechSynthesis() {
  const timeoutRef = useRef(null)

  const speak = useCallback((text, onEndCallback) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-Speech is not supported in this browser.')
      if (onEndCallback) onEndCallback()
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    window.speechSynthesis.cancel()

    if (!text) {
      if (onEndCallback) onEndCallback()
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    utterance.pitch = 1.0
    utterance.lang = 'en-US'

    let hasEnded = false
    const handleDone = () => {
      if (hasEnded) return
      hasEnded = true
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (onEndCallback) {
        onEndCallback()
      }
    }

    utterance.onend = handleDone
    utterance.onerror = handleDone

    // Safety fallback timer: auto-release block after 6 seconds max
    timeoutRef.current = setTimeout(() => {
      handleDone()
    }, 6000)

    window.speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return { speak, stop }
}
