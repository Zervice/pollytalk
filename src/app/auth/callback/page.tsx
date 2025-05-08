// This is needed for static export
export const dynamic = 'force-static'

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Handle the OAuth callback on the client side
    const handleOAuthCallback = async () => {
      try {
        // Get the code from the URL
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')
        
        if (code) {
          // Exchange the code for a session
          await supabase.auth.exchangeCodeForSession(code)
          
          // Redirect to the dashboard after successful authentication
          router.push('/dashboard')
        } else {
          // If no code is present, redirect to the sign-in page
          router.push('/auth/signin')
        }
      } catch (error) {
        console.error('Error handling OAuth callback:', error)
        router.push('/auth/signin')
      }
    }

    handleOAuthCallback()
  }, [router])

  // Show a loading state while processing the callback
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg">Completing authentication...</p>
      </div>
    </div>
  )
}
