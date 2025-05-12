'use client'

import { Nav } from '@/components/ui/nav'
import { UserNav } from '@/components/ui/user-nav'
import { Footer } from "@/components/ui/footer"
import { I18nProvider } from '@/i18n/i18n-context'
import { LanguageLoading } from '@/components/ui/language-loading'
import { DynamicMetadata } from '@/components/dynamic-metadata'
import { ClientRouter } from '@/components/client-router'
import { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/auth-context'

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <AuthProvider>
        <DynamicMetadata />
        <LanguageLoading>
          <ClientRouter>
            <Nav />
            <UserNav />
            <div className="flex-1 pt-[72px]">
              {children}
            </div>
            <Footer />
          </ClientRouter>
        </LanguageLoading>
      </AuthProvider>
    </I18nProvider>
  )
}
