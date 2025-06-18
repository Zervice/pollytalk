'use client'

import { motion } from "framer-motion"
import { Smartphone, Apple, ArrowRight, QrCode, Download, Skull } from "lucide-react"
import { Button } from "@/components/ui/button"
import QRCode from "react-qr-code"
import { useI18n } from "@/i18n/i18n-context"
import { DownloadUrlProvider, useDownloadUrl } from '@/context/download-url-context'

const DownloadContent = () => {
  const { t } = useI18n()
  const { downloadUrl, loading, error } = useDownloadUrl()

  const platforms = [
    {
      name: t('download.ios.name'),
      icon: Apple,
      description: t('download.ios.description'),
      steps: [
        t('download.ios.step1'),
        t('download.ios.step2'),
        t('download.ios.step3'),
        t('download.ios.step4')
      ],
      buttonText: t('download.ios.buttonText'),
      href: "https://apps.apple.com/app/pollytalkie",
      systemRequirements: t('download.ios.requirements')
    },
    {
      name: t('download.android.name'),
      icon: Skull,
      evilTitle: t('download.android.evilGoogleTitle'),
      description: t('download.android.evilGoogleDescription'),
      steps: [
        t('download.android.evilGoogleStep1'),
        t('download.android.evilGoogleStep2'),
      ],
      systemRequirements: t('download.android.requirements')
    }
  ]

  
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
            {t('download.title')}
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
            {t('download.subtitle')}
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
                
                {platform.evilTitle && (
                  <h3 className="text-lg font-bold text-destructive mb-2">{platform.evilTitle}</h3>
                )}
                <p className="text-muted-foreground mb-6">
                  {platform.description}
                </p>

                <div className="space-y-6 flex-1">
                  <div className="space-y-4">
                    <h3 className="font-semibold">{t('download.installationSteps')}</h3>
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

                  {platform.href && platform.buttonText && (
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
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 bg-primary/5 border-2 border-primary/20 rounded-xl max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">{t('download.directDownload')}</h2>
          </div>
          
          <p className="text-muted-foreground mb-6">
            {t('download.scanQrCode')}
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="p-4 bg-white rounded-lg border border-primary/20">
              {loading && <div className="w-[200px] h-[200px] flex items-center justify-center"><p>Loading QR Code...</p></div>}
              {error && <div className="w-[200px] h-[200px] flex items-center justify-center"><p className="text-destructive">Error loading QR code.</p></div>}
              {downloadUrl && (
                <QRCode
                  value={downloadUrl}
                  size={200}
                  level="H"
                />
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{t('download.downloadInstructions')}</h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">1</span>
                  <span className="text-muted-foreground">{t('download.step1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">2</span>
                  <span className="text-muted-foreground">{t('download.step2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">3</span>
                  <span className="text-muted-foreground">{t('download.step3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">4</span>
                  <span className="text-muted-foreground">{t('download.step4')}</span>
                </li>
              </ul>
              
              <Button className="w-full group" asChild disabled={loading || !downloadUrl}>
                <a href={downloadUrl || '#'} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  {t('download.downloadApk')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {t('download.apkFileSize')}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('download.needHelp')}</h2>
          <p className="text-muted-foreground">
            {t('download.troubleDownloading')}{" "}
            <a href="/contact" className="text-primary hover:underline">
              {t('download.contactSupport')}
            </a>
            .
          </p>
        </div>

        <div className="mt-12 p-6 bg-card text-card-foreground rounded-lg border border-border max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">{t('download.whyMobile')}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>{t('download.benefit1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>{t('download.benefit2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>{t('download.benefit3')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>{t('download.benefit4')}</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.main>
  )
}

export default function DownloadPage() {
  return (
    <DownloadUrlProvider>
      <DownloadContent />
    </DownloadUrlProvider>
  )
}
