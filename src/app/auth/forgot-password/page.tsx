'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { authApi } from '@/lib/api'

export default function ForgotPassword() {
  const { t, locale } = useI18n()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setIsLoading(true)

    try {
      await authApi.forgotPassword(email)
      
      // Always show success message even if email doesn't exist (for security)
      setMessage(t('auth.passwordResetEmailSent'))
      setEmail('')
    } catch (err: unknown) {
      const error = err as { error?: string; statusCode?: number; message?: string }
      if (error.error === 'user_not_found') {
        // Don't reveal if the email exists for security reasons
        setMessage(t('auth.passwordResetEmailSent'))
        setEmail('')
      } else if (error.error === 'invalid_email') {
        setError(t('auth.errors.invalidEmail'))
      } else if (error.statusCode === 429) {
        setError(t('auth.errors.tooManyAttempts'))
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
          {t('auth.passwordReset.title')}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {t('auth.passwordReset.instructions')}
        </p>
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
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                {t('auth.email')}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            <div className="text-center mt-4">
              <Link href="/auth/signin" className="text-sm font-medium text-primary hover:text-primary/90">
                {t('auth.signIn')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
