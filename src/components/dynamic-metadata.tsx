'use client'

import { useI18n } from '@/i18n/i18n-context'
import { useEffect } from 'react'

/**
 * Component to dynamically update metadata based on the current language
 */
export function DynamicMetadata() {
  const { locale } = useI18n()
  
  useEffect(() => {
    // Update the document title based on the current language
    if (locale === 'zh') {
      document.title = '博语通 (PollyTalk) - 您的AI对话伴侣'
    } else {
      document.title = 'PollyTalk - Your AI Conversation Companion'
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      if (locale === 'zh') {
        metaDescription.setAttribute('content', '通过与AI的自然对话练习语言')
      } else {
        metaDescription.setAttribute('content', 'Practice languages through natural conversations with AI')
      }
    }
  }, [locale])
  
  // This component doesn't render anything visible
  return null
}
