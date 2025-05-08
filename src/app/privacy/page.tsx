'use client'

import { motion } from "framer-motion"
import { useI18n } from "@/i18n/i18n-context"

export default function PrivacyPage() {
  const { t } = useI18n()
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center py-12 bg-background"
    >
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          {t('privacyPage.title')}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t('privacyPage.lastUpdated')}
        </p>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.introduction.title')}</h2>
            <p>
              {t('privacyPage.introduction.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.infoCollect.title')}</h2>
            <h3 className="text-xl font-medium mb-2">{t('privacyPage.infoCollect.personalTitle')}</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.infoCollect.personal1')}</li>
              <li>{t('privacyPage.infoCollect.personal2')}</li>
              <li>{t('privacyPage.infoCollect.personal3')}</li>
              <li>{t('privacyPage.infoCollect.personal4')}</li>
              <li>{t('privacyPage.infoCollect.personal5')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">{t('privacyPage.infoCollect.usageTitle')}</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.infoCollect.usage1')}</li>
              <li>{t('privacyPage.infoCollect.usage2')}</li>
              <li>{t('privacyPage.infoCollect.usage3')}</li>
              <li>{t('privacyPage.infoCollect.usage4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.useInfo.title')}</h2>
            <p>{t('privacyPage.useInfo.intro')}:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.useInfo.use1')}</li>
              <li>{t('privacyPage.useInfo.use2')}</li>
              <li>{t('privacyPage.useInfo.use3')}</li>
              <li>{t('privacyPage.useInfo.use4')}</li>
              <li>{t('privacyPage.useInfo.use5')}</li>
              <li>{t('privacyPage.useInfo.use6')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.dataSharing.title')}</h2>
            <p>{t('privacyPage.dataSharing.intro')}:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.dataSharing.share1')}</li>
              <li>{t('privacyPage.dataSharing.share2')}</li>
              <li>{t('privacyPage.dataSharing.share3')}</li>
              <li>{t('privacyPage.dataSharing.share4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.security.title')}</h2>
            <p>
              {t('privacyPage.security.intro')}:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.security.measure1')}</li>
              <li>{t('privacyPage.security.measure2')}</li>
              <li>{t('privacyPage.security.measure3')}</li>
              <li>{t('privacyPage.security.measure4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.rights.title')}</h2>
            <p>{t('privacyPage.rights.intro')}:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.rights.right1')}</li>
              <li>{t('privacyPage.rights.right2')}</li>
              <li>{t('privacyPage.rights.right3')}</li>
              <li>{t('privacyPage.rights.right4')}</li>
              <li>{t('privacyPage.rights.right5')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.cookies.title')}</h2>
            <p>
              {t('privacyPage.cookies.intro')}:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.cookies.use1')}</li>
              <li>{t('privacyPage.cookies.use2')}</li>
              <li>{t('privacyPage.cookies.use3')}</li>
              <li>{t('privacyPage.cookies.use4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.children.title')}</h2>
            <p>
              {t('privacyPage.children.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.international.title')}</h2>
            <p>
              {t('privacyPage.international.content')}:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.international.safeguard1')}</li>
              <li>{t('privacyPage.international.safeguard2')}</li>
              <li>{t('privacyPage.international.safeguard3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.changes.title')}</h2>
            <p>
              {t('privacyPage.changes.content')}:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacyPage.changes.notification1')}</li>
              <li>{t('privacyPage.changes.notification2')}</li>
              <li>{t('privacyPage.changes.notification3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.contact.title')}</h2>
            <p>
              {t('privacyPage.contact.content')}:
            </p>
            <ul className="list-none pl-6 mt-2">
              <li>{t('privacyPage.contact.email')}</li>
              <li>{t('privacyPage.contact.dpo')}</li>
            </ul>
          </section>

          <section className="mt-12">
            <p className="text-sm text-muted-foreground">
              {t('privacyPage.lastUpdated')}
            </p>
          </section>
        </div>
      </div>
    </motion.main>
  )
}
