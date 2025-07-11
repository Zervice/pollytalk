'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { useAuth } from '@/contexts/auth-context'
import { LanguageSwitcher } from './language-switcher'
import { LogOut, QrCode, User, CreditCard, LayoutDashboard } from 'lucide-react'
import { Button } from './button'
import QRCode from 'react-qr-code'
import { DownloadUrlProvider, useDownloadUrl } from '@/context/download-url-context'
import { Logo } from './logo'

const QrCodePopupContent = () => {
  const { downloadUrl, loading, error } = useDownloadUrl();
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium mb-2">{t('nav.scanToDownload')}</p>
      <div className="p-2 bg-white rounded-lg">
        {loading && <div className="w-[180px] h-[180px] flex items-center justify-center"><p>Loading...</p></div>}
        {error && <div className="w-[180px] h-[180px] flex items-center justify-center"><p className="text-destructive">Error</p></div>}
        {downloadUrl && (
          <QRCode
            value={downloadUrl}
            size={180}
            level="H"
          />
        )}
      </div>
      {downloadUrl && <p className="text-xs text-muted-foreground mt-1 max-w-[180px] break-all">{downloadUrl}</p>}
    </div>
  );
};

export function UserNav() {
  const { t, locale } = useI18n()
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  
  const navigation = [
    { name: t('userNav.dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('userNav.subscription'), href: '/subscription', icon: CreditCard },
    { name: t('nav.download'), href: '/download' },
    { name: t('userNav.profile'), href: '/profile', icon: User },
  ]

  if (!user) return null

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
      <nav className="flex items-center justify-between p-6 lg:px-8 mx-auto max-w-7xl" aria-label="Global">
        <div className="flex lg:w-1/5">
          <Link href="/dashboard" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Logo size={32} />
            <span className="font-semibold text-xl">
              {locale === 'zh' ? '博语通' : 'PollyTalkie'}
              {locale === 'zh' && <span className="text-xs ml-1 text-muted-foreground">(PollyTalkie)</span>}
            </span>
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
          <LanguageSwitcher />
          <Button 
            variant="outline" 
            onClick={() => signOut()}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>{t('auth.signOut')}</span>
          </Button>
        </div>
        
        {/* Mobile menu - we'll implement this in a separate component if needed */}
      </nav>
    </header>
  )
}
