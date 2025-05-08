'use client'

import { Nav } from '@/components/ui/nav'
import { Footer } from "@/components/ui/footer"
import { I18nProvider } from '@/i18n/i18n-context'
import { LanguageLoading } from '@/components/ui/language-loading'
import { DynamicMetadata } from '@/components/dynamic-metadata'
import { ClientRouter } from '@/components/client-router'
import { ReactNode } from 'react'

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <DynamicMetadata />
      <LanguageLoading>
        <ClientRouter>
          <Nav />
          <div className="flex-1 pt-[72px]">
            {children}
          </div>
          <Footer />
        </ClientRouter>
      </LanguageLoading>
    </I18nProvider>
  )
}
