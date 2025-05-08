'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export function useAuthRedirect(options: { 
  ifAuthenticated?: string;
  ifNotAuthenticated?: string;
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (user && options.ifAuthenticated) {
      router.push(options.ifAuthenticated)
    } else if (!user && options.ifNotAuthenticated) {
      router.push(options.ifNotAuthenticated)
    }
  }, [user, isLoading, router, options])

  return { user, isLoading }
}
