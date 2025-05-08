'use client'

// This is needed for static export
export const dynamic = 'force-static'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authApi, setAuthData } from '@/lib/api'
import { useI18n } from '@/i18n/i18n-context'

export default function AuthCallbackPage() {
  const router = useRouter()
  const { t } = useI18n()

  useEffect(() => {
    // Handle the OAuth callback on the client side
    const handleOAuthCallback = async () => {
      try {
        // Get the code and provider from the URL
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')
        const provider = url.searchParams.get('provider') || 'google'
        
        if (code) {
          // Exchange the code for tokens
          const authResponse = await authApi.exchangeOAuthCode(code, provider)
          
          // Store the authentication data
          setAuthData(authResponse)
          
          // Redirect to the dashboard after successful authentication
          router.push('/dashboard')
        } else {
          // If no code is present, redirect to the sign-in page
          console.error('No authorization code found in callback URL')
          router.push('/auth/signin')
        }
      } catch (error) {
        console.error('Error handling OAuth callback:', error)
        router.push('/auth/signin')
      }
    }

    handleOAuthCallback()
  }, [router, t])

  // Show a loading state while processing the callback
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg">{t('auth.completingAuthentication')}</p>
      </div>
    </div>
  )
}
