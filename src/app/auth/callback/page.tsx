'use client'

// This is needed for static export
export const dynamic = 'force-static'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi, setAuthData } from '@/lib/api'
import { useI18n } from '@/i18n/i18n-context'

export default function AuthCallbackPage() {
  const router = useRouter()
  const { t } = useI18n()
  const [status, setStatus] = useState('processing')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Handle the OAuth callback on the client side
    const handleOAuthCallback = async () => {
      try {
        // Get the code and provider from the URL
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')
        const provider = url.searchParams.get('provider') || 'google'
        
        if (code) {
          try {
            // Exchange the code for tokens
            const authResponse = await authApi.exchangeOAuthCode(code, provider)
            
            // Store the authentication data
            setAuthData(authResponse)
            
            setStatus('success');
            
            // Wait a moment to ensure state is updated before redirect
            setTimeout(() => {
              // Use window.location for a hard redirect instead of the router
              // This ensures a full page reload and proper auth context initialization
              window.location.href = '/dashboard';
            }, 1500);
          } catch (exchangeError) {
            setStatus('error');
            setErrorMessage(t('auth.errors.exchangeCodeFailed'));
            setTimeout(() => router.push('/auth/signin'), 2000);
          }
        } else {
          // If no code is present, redirect to the sign-in page
          setStatus('error');
          setErrorMessage(t('auth.errors.noCodeFound'));
          setTimeout(() => router.push('/auth/signin'), 2000);
        }
      } catch (error) {
        setStatus('error');
        setErrorMessage(t('auth.errors.authProcessFailed'));
        setTimeout(() => router.push('/auth/signin'), 2000);
      }
    }

    handleOAuthCallback()
  }, [router, t])

  // Show appropriate status message based on the current state
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {status === 'processing' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">{t('auth.completingAuthentication')}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="text-green-500 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <p className="text-lg">{t('auth.authSuccess')}</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="text-red-500 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <p className="text-lg">{t('auth.authFailed')}</p>
            <p className="text-sm text-muted-foreground mt-2">{errorMessage}</p>
            <p className="text-sm mt-4">{t('auth.redirecting')}</p>
          </>
        )}
      </div>
    </div>
  )
}
