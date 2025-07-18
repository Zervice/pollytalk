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
      <head>
        <script async src="http://local.zervice.us/ava/chatbot.js" data-config="eyJpZCI6ImNiX2IyZGM1YmI3OWQyZjQ3OWQ5ZTM4Y2JiMGU0YmM3Y2IzIiwidG9rZW4iOiJhY19jYzJiNTI4YjhkZDA0YTVkYThjZTRmOWExZjBhMjk5MSIsIm5hbWUiOiJQb2xseXRhbGtpZSIsInRoZW1lIjoiIzM4YmYzYyJ9" data-id="f2872ae2-f0cd-4a31-8d48-2e13d90a7e33" data-js="https://uma.zervice.us/script.js"></script>
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "4bcf3f093bd540b1abf323957828f8b2"}'></script>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="0224687c-8896-4c82-8b39-8356fcfc150b"></script>
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
