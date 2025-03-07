'use client'

import { useEffect, useState } from 'react'

type Locale = 'en' | 'zh'

/**
 * Hook for detecting user's preferred language
 * Returns the detected language and loading state
 */
export function useLanguageDetection(): { 
  detectedLocale: Locale | null, 
  isDetecting: boolean 
} {
  const [detectedLocale, setDetectedLocale] = useState<Locale | null>(null)
  const [isDetecting, setIsDetecting] = useState(true)

  useEffect(() => {
    async function detectLanguage() {
      // 1. Check browser language settings
      const browserLanguages = [
        navigator.language,
        ...(navigator.languages || [])
      ]
      
      const preferredLanguage = browserLanguages.find(lang => {
        const langCode = lang.toLowerCase().split('-')[0]
        return langCode === 'zh'
      })
      
      if (preferredLanguage) {
        setDetectedLocale('zh')
        setIsDetecting(false)
        return
      }

      // 2. Try to detect location based on IP (using a free geolocation API)
      try {
        const response = await fetch('https://ipapi.co/json/')
        if (response.ok) {
          const data = await response.json()
          // Check if user is in a Chinese-speaking region
          if (['CN', 'HK', 'TW', 'MO', 'SG'].includes(data.country_code)) {
            setDetectedLocale('zh')
            setIsDetecting(false)
            return
          }
        }
      } catch (error) {
        console.warn('Error detecting location:', error)
      }

      // Default to English if no Chinese preference detected
      setDetectedLocale('en')
      setIsDetecting(false)
    }

    detectLanguage()
  }, [])

  return { detectedLocale, isDetecting }
}
