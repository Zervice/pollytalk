'use client'

// This is needed for static export
export const dynamic = 'force-static'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth, getRedirectResult } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Handle the OAuth callback on the client side
    const handleOAuthCallback = async () => {
      try {
        // Get the redirect result from Firebase
        const result = await getRedirectResult(auth)
        
        if (result) {
          // User is signed in
          // Redirect to the dashboard after successful authentication
          router.push('/dashboard')
        } else {
          // If no result is present, redirect to the sign-in page
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
