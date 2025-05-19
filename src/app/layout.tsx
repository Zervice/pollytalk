import './globals.css'
import { ClientLayout } from '@/components/client-layout'
import type { Metadata } from 'next'

// Using local font fallbacks instead of Google Fonts for more reliable static builds
// This prevents build failures when Google Fonts can't be fetched

export const metadata: Metadata = {
  title: 'PollyTalkie - Your AI Conversation Companion',
  description: 'Practice languages through natural conversations with AI',
  alternates: {
    languages: {
      'en': '/en',
      'zh': '/zh',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
