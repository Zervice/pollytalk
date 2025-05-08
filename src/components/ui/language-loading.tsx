'use client'

import { useI18n } from '@/i18n/i18n-context'
import { useEffect, useState } from 'react'

export function LanguageLoading({ children }: { children: React.ReactNode }) {
  const { isInitialized } = useI18n()
  const [forceShow, setForceShow] = useState(true)
  const [loadingTime, setLoadingTime] = useState(0)
  
  // Add a timeout to ensure we don't block the UI for too long
  useEffect(() => {
    // Primary timeout - force show content after a reasonable time
    const timer = setTimeout(() => {
      setForceShow(false)
      console.log('Language loading timeout reached, forcing content display')
    }, 500) // Reduced from 800ms to 500ms for better user experience
    
    // Secondary timeout for debugging
    const debugTimer = setInterval(() => {
      setLoadingTime(prev => {
        const newTime = prev + 100
        // Log every second for debugging
        if (newTime % 1000 === 0) {
          console.log(`Still loading language preferences after ${newTime}ms, initialized: ${isInitialized}`)
        }
        return newTime
      })
    }, 100)
    
    return () => {
      clearTimeout(timer)
      clearInterval(debugTimer)
    }
  }, [])

  // Safety mechanism - if loading takes too long, show content anyway
  useEffect(() => {
    if (loadingTime > 3000) { // 3 seconds absolute maximum
      setForceShow(false)
      console.error('Language loading took too long, forcing content display after 3s')
    }
  }, [loadingTime])

  // Only show loading if we're not initialized AND within the timeout period
  if (!isInitialized && forceShow) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading language preferences...</p>
          {loadingTime > 1500 && (
            <button 
              onClick={() => setForceShow(false)}
              className="text-xs text-primary hover:underline mt-2"
            >
              Continue without waiting
            </button>
          )}
        </div>
      </div>
    )
  }

  return <>{children}</>
}
