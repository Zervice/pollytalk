import './globals.css'
import { Inter } from 'next/font/google'
import { ClientLayout } from '@/components/client-layout'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'PollyTalk - Your AI Conversation Companion',
  description: 'Practice languages through natural conversations with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
