import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nav } from '@/components/ui/nav'
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Nav />
        <div className="flex-1 pt-[72px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
