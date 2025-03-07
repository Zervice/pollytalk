'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import enTranslations from './translations/en.json'
import zhTranslations from './translations/zh.json'

type Locale = 'en' | 'zh'
type Translations = typeof enTranslations

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
      // 1. Check if user has a saved preference in localStorage
      const savedLocale = localStorage.getItem('locale') as Locale
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'zh')) {
        setLocale(savedLocale)
        setIsInitialized(true)
        return
      }

      // 2. Check browser language settings
      const browserLanguages = [
        navigator.language,
        ...(navigator.languages || [])
      ]
      
      // Check if any browser language starts with 'zh'
      const preferredLanguage = browserLanguages.find(lang => {
        const langCode = lang.toLowerCase().split('-')[0]
        return langCode === 'zh'
      })
      
      if (preferredLanguage) {
        setLocale('zh')
      } else {
        // Default to English if no Chinese preference detected
        setLocale('en')
      }
      
      setIsInitialized(true)
    }

    // Execute language detection immediately
    // This avoids any async operations that could delay initialization
    detectUserLanguage()
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('locale', locale)
      document.documentElement.lang = locale
      
      // Update document direction if needed (for RTL languages in the future)
      // document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
      
      // You could also update other language-specific settings here
    }
  }, [locale, isInitialized])

  // Function to get a translation by key (supports nested keys like "nav.home")
  const t = (key: string): string => {
    const keys = key.split('.')
    let result: any = translations[locale]
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }
    
    return result
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
