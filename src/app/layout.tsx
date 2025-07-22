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
        <script async src="http://dev.zervice.us/ava/chatbot.js" data-config="eyJpZCI6ImNiXzU4YTdlYzkzZWE5YzRkNWY5ZThkMzA1NTRmMGFhNDViIiwidG9rZW4iOiJhY18yOTIwNmVmZTdkMjc0NTI0YTNiYzhmNTVkMGYyOGRjNSIsIm5hbWUiOiJDaGF0Ym90In0=" data-id="73d7a440-dc06-44d7-b96a-4d89549ec958" data-js="https://uma.zervice.us/script.js"></script>
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
