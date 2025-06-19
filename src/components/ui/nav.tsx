'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'
import { Menu, X, QrCode, LogIn, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'react-qr-code'
import { DownloadUrlProvider, useDownloadUrl } from '@/context/download-url-context'
import { useI18n } from '@/i18n/i18n-context'
import { LanguageSwitcher } from './language-switcher'
import { useAuth } from '@/contexts/auth-context'
import { Button } from './button'

const QrCodeDisplay = ({ size }: { size: number }) => {
  const { downloadUrl, loading, error } = useDownloadUrl();
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium mb-2">{t('nav.scanToDownload')}</p>
      <div className="p-2 bg-white rounded-lg">
        {loading && <div style={{ width: size, height: size }} className="flex items-center justify-center"><p>Loading...</p></div>}
        {error && <div style={{ width: size, height: size }} className="flex items-center justify-center"><p className="text-destructive">Error</p></div>}
        {downloadUrl && (
          <QRCode
            value={downloadUrl}
            size={size}
            level="H"
          />
        )}
      </div>
      {downloadUrl && <p className="text-xs text-muted-foreground mt-1 max-w-[180px] break-all">{downloadUrl}</p>}
    </div>
  );
};

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t, locale } = useI18n()
  const { user, signOut } = useAuth()
  
  // If user is authenticated, don't render this navigation
  // as UserNav will be shown instead
  if (user) return null;
  
  const navigation = [
    { name: t('nav.pricing'), href: '/pricing' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.download'), href: '/download' },
    { name: t('nav.terms'), href: '/terms' },
    { name: t('nav.privacy'), href: '/privacy' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
      <nav className="flex items-center justify-between p-6 lg:px-8 mx-auto max-w-7xl" aria-label="Global">
        <div className="flex lg:w-1/5">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-1">
            <Logo size={28} />
            <span className="font-semibold text-lg">
              {locale === 'zh' ? '博语通' : 'PollyTalkie'}
              {locale === 'zh' && <span className="text-xs ml-1 text-muted-foreground">(PollyTalkie)</span>}
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher compact={true} />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors hover:text-primary ${
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-5 items-center">
          <LanguageSwitcher />
          {user ? (
            <Button 
              variant="outline" 
              onClick={() => signOut()}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>{t('auth.signOut')}</span>
            </Button>
          ) : (
            <Link href="/auth/signin">
              <Button 
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>{t('auth.signIn')}</span>
              </Button>
            </Link>
          )}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-border bg-accent/30 text-foreground hover:bg-accent hover:text-primary transition-all"
              aria-label="Show QR code for app download"
            >
              <QrCode className="h-6 w-6" />
              <span className="text-sm font-medium">{t('nav.downloadApp')}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 p-4 bg-background border-2 border-primary/20 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible scale-95 group-hover:scale-100 transition-all duration-300 z-50">
              <DownloadUrlProvider lazy>
                <QrCodeDisplay size={180} />
              </DownloadUrlProvider>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed inset-y-0 right-0 z-50 w-full h-screen overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                    <Logo size={32} />
                    <span className="font-semibold text-xl">
                      {locale === 'zh' ? '博语通' : 'PollyTalkie'}
                      {locale === 'zh' && <span className="text-xs ml-1 text-muted-foreground">(PollyTalkie)</span>}
                    </span>
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                {/* Main navigation - no scrolling needed */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="space-y-4 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block rounded-lg px-4 py-3 text-lg font-semibold text-center leading-7 hover:bg-accent ${
                          pathname === item.href ? 'text-primary bg-accent/50' : 'text-foreground'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Bottom section with language and QR code */}
                <div className="mt-auto pt-4 border-t border-border">
                  <div className="flex flex-col items-center gap-4">
                    <LanguageSwitcher />
                    {user ? (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          signOut();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2 w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('auth.signOut')}</span>
                      </Button>
                    ) : (
                      <Link href="/auth/signin" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                        <Button 
                          variant="outline"
                          className="flex items-center gap-2 w-full"
                        >
                          <LogIn className="h-4 w-4" />
                          <span>{t('auth.signIn')}</span>
                        </Button>
                      </Link>
                    )}
                    <DownloadUrlProvider lazy>
                      <QrCodeDisplay size={120} />
                    </DownloadUrlProvider>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
