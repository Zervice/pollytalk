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
        <script async src="https://dev.zervice.us/ava/chatbot.js" data-config="eyJpZCI6ImNiX2RmYmFlMTM5YTZhMDRmYTc5MWQ2ZjE5ZGJmYjcwMWRlIiwidG9rZW4iOiJhY19jYTQyZjg3Njc3OGE0ZWNkYWI1OTc0OGUxMmI3NGFjMCIsIm5hbWUiOiJQb2xseVRhbGtpZSIsInRoZW1lIjoiIzliZDczMSJ9" data-id="6f7e685f-a115-4f97-9b7f-f19631d84646" data-js="https://uma.zervice.us/script.js"></script>
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
