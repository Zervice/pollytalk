'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { useAuth } from '@/contexts/auth-context'
import { LanguageSwitcher } from './language-switcher'
import { LogOut, QrCode, User, CreditCard, LayoutDashboard } from 'lucide-react'
import { Button } from './button'
import QRCode from 'react-qr-code'
import { Logo } from './logo'

export function UserNav() {
  const { t, locale } = useI18n()
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  
  const navigation = [
    { name: t('userNav.dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('userNav.subscription'), href: '/subscription', icon: CreditCard },
    { name: t('userNav.profile'), href: '/profile', icon: User },
  ]

  if (!user) return null

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
      <nav className="flex items-center justify-between p-6 lg:px-8 mx-auto max-w-7xl" aria-label="Global">
        <div className="flex lg:flex-1">
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
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 transition-colors hover:text-primary flex items-center gap-2 ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
          <LanguageSwitcher />
          
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
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium mb-2">{t('nav.scanToDownload')}</p>
                <div className="p-3 bg-white rounded-md border border-primary/20">
                  <QRCode
                    value="https://www.pollytalkie.com/release/app-release.apk"
                    size={180}
                    level="H"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">https://www.pollytalkie.com/release/app-release.apk</p>
              </div>
            </div>
          </div>
          
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
