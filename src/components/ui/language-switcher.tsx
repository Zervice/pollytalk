'use client'

import { useI18n } from '@/i18n/i18n-context'
import { GlobeIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

interface LanguageSwitcherProps {
  compact?: boolean;
}

export function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n()

  const toggleLanguage = () => {
    // Toggle between English and Chinese
    const newLocale = locale === 'en' ? 'zh' : 'en'
    setLocale(newLocale)
  }

  // Current flag and next flag to switch to
  const currentFlag = locale === 'en' ? '/flags/us.svg' : '/flags/cn.svg'
  const nextFlag = locale === 'en' ? '/flags/cn.svg' : '/flags/us.svg'
  const nextLanguage = locale === 'en' ? '中文' : 'English'

  if (compact) {
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md border border-border bg-accent/30 text-foreground hover:bg-accent hover:text-primary transition-all"
        aria-label="Toggle language"
        title={locale === 'en' ? 'Switch to Chinese' : 'Switch to English'}
      >
        <div className="relative w-5 h-3.5 overflow-hidden rounded-sm">
          <Image 
            src={currentFlag} 
            alt={locale === 'en' ? 'US Flag' : 'Chinese Flag'}
            fill
            className="object-cover"
            sizes="20px"
            priority
          />
        </div>
        <span className="text-xs">→</span>
        <div className="relative w-5 h-3.5 overflow-hidden rounded-sm">
          <Image 
            src={nextFlag} 
            alt={locale === 'en' ? 'Chinese Flag' : 'US Flag'}
            fill
            className="object-cover"
            sizes="20px"
            priority
          />
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-border bg-accent/30 text-foreground hover:bg-accent hover:text-primary transition-all"
      aria-label="Toggle language"
      title={locale === 'en' ? 'Switch to Chinese' : 'Switch to English'}
    >
      <div className="relative w-5 h-3.5 overflow-hidden rounded-sm">
        <Image 
          src={currentFlag} 
          alt={locale === 'en' ? 'US Flag' : 'Chinese Flag'}
          fill
          className="object-cover"
          sizes="20px"
          priority
        />
      </div>
      <span className="text-sm font-medium">{locale === 'en' ? 'English' : '中文'}</span>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <span>→</span>
        <div className="relative w-4 h-3 overflow-hidden rounded-sm opacity-70">
          <Image 
            src={nextFlag} 
            alt={locale === 'en' ? 'Chinese Flag' : 'US Flag'}
            fill
            className="object-cover"
            sizes="16px"
            priority
          />
        </div>
        <span className="opacity-70">{nextLanguage}</span>
      </div>
    </button>
  )
}
