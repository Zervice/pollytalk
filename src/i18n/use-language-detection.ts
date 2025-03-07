'use client'

import { useEffect, useState } from 'react'

type Locale = 'en' | 'zh'

/**
 * Hook for detecting user's preferred language based on browser settings
 * Returns the detected language immediately without any async operations
 */
export function useLanguageDetection(): Locale {
  // Detect language synchronously
  const detectLanguage = (): Locale => {
    // Check browser language settings
    if (typeof navigator !== 'undefined') {
      const browserLanguages = [
        navigator.language,
        ...(navigator.languages || [])
      ]
      
      const preferredLanguage = browserLanguages.find(lang => {
        const langCode = lang.toLowerCase().split('-')[0]
        return langCode === 'zh'
      })
      
      if (preferredLanguage) {
        return 'zh'
      }
    }
    
    // Default to English
    return 'en'
  }
  
  // We can use this in SSR-safe way
  const [detectedLocale] = useState<Locale>(() => detectLanguage())
  
  return detectedLocale
}
