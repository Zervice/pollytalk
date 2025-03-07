/**
 * Utility functions for language detection and handling
 */

/**
 * Detect if the browser language settings indicate a Chinese language preference
 */
export function isChinesePreferred(): boolean {
  if (typeof navigator === 'undefined') {
    return false
  }
  
  const browserLanguages = [
    navigator.language,
    ...(navigator.languages || [])
  ]
  
  return browserLanguages.some(lang => {
    const langCode = lang.toLowerCase().split('-')[0]
    return langCode === 'zh'
  })
}

/**
 * Get the browser's primary language code
 */
export function getBrowserLanguage(): string | null {
  if (typeof navigator === 'undefined') {
    return null
  }
  
  return navigator.language.split('-')[0].toLowerCase()
}

/**
 * Format a date according to the specified locale
 */
export function formatDate(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

/**
 * Format a number according to the specified locale
 */
export function formatNumber(num: number, locale: string = 'en'): string {
  return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US').format(num)
}
