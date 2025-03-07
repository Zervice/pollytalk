'use client'

import { useI18n } from '@/i18n/i18n-context'

export function LanguageLoading({ children }: { children: React.ReactNode }) {
  const { isInitialized } = useI18n()

  if (!isInitialized) {
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
