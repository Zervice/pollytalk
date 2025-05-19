'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { authApi } from '@/lib/api'

export default function ResetPassword() {
  const { t, locale } = useI18n()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resetToken, setResetToken] = useState<string | null>(null)

  useEffect(() => {
    // Check if we have a token in the URL
    const url = new URL(window.location.href)
    const token = url.searchParams.get('token')
    
    if (!token) {
      // If no token, redirect to sign in
      router.push('/auth/signin')
      return
    }
    
    // We don't need to verify the token here as it will be verified when used
    // Just store it for later use
    setResetToken(token)
  }, [router])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    // Validate passwords
    if (password !== confirmPassword) {
      setError(t('auth.errors.passwordsDoNotMatch'))
      return
    }

    if (password.length < 8) {
      setError(t('auth.errors.passwordTooShort'))
      return
    }

    setIsLoading(true)

    try {
      if (!resetToken) {
        throw new Error('Password reset token is missing')
      }
      
      // Reset the password
      await authApi.resetPassword(resetToken, password)
      
      setMessage(t('auth.passwordResetSuccess'))
      // Redirect to sign in after a short delay
      setTimeout(() => {
        router.push('/auth/signin')
      }, 2000)
    } catch (err: unknown) {
      const error = err as { error?: string; statusCode?: number; message?: string }
      if (error.error === 'weak_password') {
        setError(t('auth.errors.passwordTooWeak'))
      } else if (error.error === 'invalid_token' || error.error === 'expired_token') {
        setError(t('auth.errors.invalidOrExpiredToken'))
      } else {
        setError(error.message || t('auth.errors.general'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={40} />
            <span className="font-semibold text-2xl">
              {locale === 'zh' ? '博语通' : 'PollyTalkie'}
              {locale === 'zh' && <span className="text-xs ml-1 text-muted-foreground">(PollyTalkie)</span>}
            </span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          {t('auth.resetPassword')}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10 border border-border">
          <form className="space-y-6" onSubmit={handleResetPassword}>
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            {message && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
                {message}
              </div>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                {t('auth.password')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-border bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                {t('auth.confirmPassword')}
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border border-border bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : t('auth.resetPassword')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
