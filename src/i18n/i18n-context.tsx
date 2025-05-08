'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import enTranslations from './translations/en.json'
import zhTranslations from './translations/zh.json'

type Locale = 'en' | 'zh'

// Define a type that can represent nested translation objects including arrays
type TestimonialItem = { name: string; location: string; image: string; text: string }
type TranslationValue = string | { [key: string]: TranslationValue } | Array<TestimonialItem> | Array<TranslationValue>
type Translations = Record<string, TranslationValue>

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  translations: Translations
  isInitialized: boolean
}

const translations = {
  en: enTranslations,
  zh: zhTranslations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  // Default to 'en', will be updated based on detection
  const [locale, setLocale] = useState<Locale>('en')
  const [isInitialized, setIsInitialized] = useState(false)
  
  useEffect(() => {
    function detectUserLanguage() {
      try {
        // 1. Check if user has a saved preference in localStorage
        try {
          const savedLocale = localStorage.getItem('locale') as Locale
          if (savedLocale && (savedLocale === 'en' || savedLocale === 'zh')) {
            console.log('Using saved language preference:', savedLocale)
            setLocale(savedLocale)
            setIsInitialized(true)
            return
          }
        } catch (err) {
          console.warn('Error accessing localStorage for language preference:', err)
          // Continue to browser detection if localStorage fails
        }

        // 2. Check browser language settings
        const browserLanguages = [
          navigator.language,
          ...(navigator.languages || [])
        ]
        
        console.log('Detected browser languages:', browserLanguages)
        
        // Check if any browser language starts with 'zh'
        const preferredLanguage = browserLanguages.find(lang => {
          if (!lang) return false
          const langCode = lang.toLowerCase().split('-')[0]
          return langCode === 'zh'
        })
        
        if (preferredLanguage) {
          console.log('Setting language to Chinese based on browser preference')
          setLocale('zh')
        } else {
          // Default to English if no Chinese preference detected
          console.log('Setting language to English (default)')
          setLocale('en')
        }
      } catch (err) {
        // Failsafe - if anything goes wrong, default to English
        console.error('Error during language detection:', err)
        setLocale('en')
      } finally {
        // Always set initialized to true to avoid getting stuck
        setIsInitialized(true)
      }
    }

    // Execute language detection immediately
    // This avoids any async operations that could delay initialization
    detectUserLanguage()
  }, [])

  useEffect(() => {
    if (isInitialized) {
      try {
        // Try to save the locale preference to localStorage
        localStorage.setItem('locale', locale)
      } catch (err) {
        console.warn('Error saving language preference to localStorage:', err)
        // Continue even if localStorage fails
      }
      
      // Update document language attribute
      document.documentElement.lang = locale
      
      // Update document direction if needed (for RTL languages in the future)
      // document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
      
      console.log('Language initialized successfully:', locale)
    }
  }, [locale, isInitialized])

  // Function to get a translation by key (supports nested keys like "nav.home")
  const t = (key: string): string => {
    const keys = key.split('.')
    // We start with the top-level translations object for the current locale
    let result: TranslationValue = translations[locale]
    
    for (const k of keys) {
      if (result && typeof result === 'object' && !Array.isArray(result) && k in result) {
        result = result[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }
    
    // Ensure we only return strings
    return typeof result === 'string' ? result : key
  }

  return (
    <I18nContext.Provider value={{ 
      locale, 
      setLocale, 
      t, 
      translations: translations[locale],
      isInitialized 
    }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
