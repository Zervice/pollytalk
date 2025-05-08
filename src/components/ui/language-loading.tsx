'use client'

import { useI18n } from '@/i18n/i18n-context'
import { useEffect, useState } from 'react'

export function LanguageLoading({ children }: { children: React.ReactNode }) {
  const { isInitialized } = useI18n()
  const [forceShow, setForceShow] = useState(true)
  
  // Add a timeout to ensure we don't block the UI for too long
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceShow(false)
    }, 800) // Show loading for max 800ms
    
    return () => clearTimeout(timer)
  }, [])

  // Only show loading if we're not initialized AND within the timeout period
  if (!isInitialized && forceShow) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading language preferences...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
