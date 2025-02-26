'use client'

import { motion } from "framer-motion"
import { Smartphone, Apple, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const platforms = [
  {
    name: "iOS App",
    icon: Apple,
    description: "Download PollyChat for iPhone and iPad",
    steps: [
      "Open the App Store on your iOS device",
      "Search for 'PollyChat Language Learning'",
      "Tap 'Get' to install the app",
      "Open the app and start learning"
    ],
    buttonText: "Download on App Store",
    href: "https://apps.apple.com/app/pollychat",
    systemRequirements: "Requires iOS 14.0 or later"
  },
  {
    name: "Android App",
    icon: Smartphone,
    description: "Download PollyChat for Android devices",
    steps: [
      "Open the Google Play Store",
      "Search for 'PollyChat Language Learning'",
      "Tap 'Install'",
      "Open the app and start learning"
    ],
    buttonText: "Get it on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.pollychat",
    systemRequirements: "Requires Android 8.0 or later"
  }
]

export default function DownloadPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center py-12 bg-background"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Download PollyChat
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
            Start your language learning journey on your mobile device
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {platforms.map((platform, index) => {
            const Icon = platform.icon
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative flex flex-col p-6 bg-card text-card-foreground rounded-lg border border-border"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">{platform.name}</h2>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {platform.description}
                </p>

                <div className="space-y-6 flex-1">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Installation Steps</h3>
                    <ul className="space-y-2">
                      {platform.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                            {stepIndex + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full group" asChild>
                      <a href={platform.href} target="_blank" rel="noopener noreferrer">
                        {platform.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      {platform.systemRequirements}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground">
            If you're having trouble downloading or installing the app,{" "}
            <a href="/contact" className="text-primary hover:underline">
              contact our support team
            </a>
            .
          </p>
        </div>

        <div className="mt-12 p-6 bg-card text-card-foreground rounded-lg border border-border max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Why Choose the Mobile App?</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>Learn anytime, anywhere</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>Offline learning support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>Push notifications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>Better speech recognition</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.main>
  )
}
