'use client'

import { useI18n } from '@/i18n/i18n-context'
import { GlobeIcon } from '@radix-ui/react-icons'
import { useState, useRef, useEffect } from 'react'

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const changeLanguage = (newLocale: 'en' | 'zh') => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center gap-1 px-2 py-1 rounded-md border border-border bg-accent/30 text-foreground hover:bg-accent hover:text-primary transition-all"
        aria-label="Change language"
      >
        <GlobeIcon className="h-4 w-4" />
        <span className="text-sm font-medium">{locale === 'en' ? 'English' : '中文'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-background border border-border rounded-md shadow-lg z-50">
          <ul className="py-1">
            <li>
              <button
                onClick={() => changeLanguage('en')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  locale === 'en' ? 'bg-accent/50 text-primary' : 'hover:bg-accent/30'
                }`}
              >
                English
              </button>
            </li>
            <li>
              <button
                onClick={() => changeLanguage('zh')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  locale === 'zh' ? 'bg-accent/50 text-primary' : 'hover:bg-accent/30'
                }`}
              >
                中文
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
