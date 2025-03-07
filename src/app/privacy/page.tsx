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
          {t('privacy.title')}
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.introduction.title')}</h2>
            <p>
              {t('privacy.introduction.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.infoCollect.title')}</h2>
            <h3 className="text-xl font-medium mb-2">{t('privacy.infoCollect.personalTitle')}</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacy.infoCollect.personal1')}</li>
              <li>{t('privacy.infoCollect.personal2')}</li>
              <li>{t('privacy.infoCollect.personal3')}</li>
              <li>{t('privacy.infoCollect.personal4')}</li>
              <li>{t('privacy.infoCollect.personal5')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">{t('privacy.infoCollect.usageTitle')}</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacy.infoCollect.usage1')}</li>
              <li>{t('privacy.infoCollect.usage2')}</li>
              <li>{t('privacy.infoCollect.usage3')}</li>
              <li>{t('privacy.infoCollect.usage4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.useInfo.title')}</h2>
            <p>{t('privacy.useInfo.intro')}:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacy.useInfo.use1')}</li>
              <li>{t('privacy.useInfo.use2')}</li>
              <li>{t('privacy.useInfo.use3')}</li>
              <li>{t('privacy.useInfo.use4')}</li>
              <li>{t('privacy.useInfo.use5')}</li>
              <li>{t('privacy.useInfo.use6')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.dataSharing.title')}</h2>
            <p>{t('privacy.dataSharing.intro')}:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacy.dataSharing.share1')}</li>
              <li>{t('privacy.dataSharing.share2')}</li>
              <li>{t('privacy.dataSharing.share3')}</li>
              <li>{t('privacy.dataSharing.share4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.security.title')}</h2>
            <p>
              {t('privacy.security.intro')}:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacy.security.measure1')}</li>
              <li>{t('privacy.security.measure2')}</li>
              <li>{t('privacy.security.measure3')}</li>
              <li>{t('privacy.security.measure4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.rights.title')}</h2>
            <p>{t('privacy.rights.intro')}:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacy.rights.right1')}</li>
              <li>{t('privacy.rights.right2')}</li>
              <li>{t('privacy.rights.right3')}</li>
              <li>{t('privacy.rights.right4')}</li>
              <li>{t('privacy.rights.right5')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.cookies.title')}</h2>
            <p>
              {t('privacy.cookies.intro')}:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacy.cookies.use1')}</li>
              <li>{t('privacy.cookies.use2')}</li>
              <li>{t('privacy.cookies.use3')}</li>
              <li>{t('privacy.cookies.use4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.children.title')}</h2>
            <p>
              {t('privacy.children.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.international.title')}</h2>
            <p>
              {t('privacy.international.content')}:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacy.international.safeguard1')}</li>
              <li>{t('privacy.international.safeguard2')}</li>
              <li>{t('privacy.international.safeguard3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.changes.title')}</h2>
            <p>
              {t('privacy.changes.content')}:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('privacy.changes.notification1')}</li>
              <li>{t('privacy.changes.notification2')}</li>
              <li>{t('privacy.changes.notification3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.contact.title')}</h2>
            <p>
              {t('privacy.contact.content')}:
            </p>
            <ul className="list-none pl-6 mt-2">
              <li>{t('privacy.contact.email')}</li>
              <li>{t('privacy.contact.address')}</li>
              <li>{t('privacy.contact.dpo')}</li>
            </ul>
          </section>

          <section className="mt-12">
            <p className="text-sm text-muted-foreground">
              {t('privacy.lastUpdated')}
            </p>
          </section>
        </div>
      </div>
    </motion.main>
  )
}
