'use client'

import { motion } from "framer-motion"
import { useI18n } from "@/i18n/i18n-context"

export default function TermsPage() {
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
          {t('termsPage.title')}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t('termsPage.lastUpdated')}
        </p>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.introduction.title')}</h2>
            <p>
              {t('termsPage.introduction.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.serviceDescription.title')}</h2>
            <p>
              {t('termsPage.serviceDescription.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('termsPage.serviceDescription.item1')}</li>
              <li>{t('termsPage.serviceDescription.item2')}</li>
              <li>{t('termsPage.serviceDescription.item3')}</li>
              <li>{t('termsPage.serviceDescription.item4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.userAccounts.title')}</h2>
            <p>
              {t('termsPage.userAccounts.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('termsPage.userAccounts.item1')}</li>
              <li>{t('termsPage.userAccounts.item2')}</li>
              <li>{t('termsPage.userAccounts.item3')}</li>
              <li>{t('termsPage.userAccounts.item4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.userConduct.title')}</h2>
            <p>
              {t('termsPage.userConduct.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('termsPage.userConduct.item1')}</li>
              <li>{t('termsPage.userConduct.item2')}</li>
              <li>{t('termsPage.userConduct.item3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.payments.title')}</h2>
            <p>
              {t('termsPage.payments.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('termsPage.payments.item1')}</li>
              <li>{t('termsPage.payments.item2')}</li>
              <li>{t('termsPage.payments.item3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.intellectualProperty.title')}</h2>
            <p>
              {t('termsPage.intellectualProperty.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.userContent.title')}</h2>
            <p>
              {t('termsPage.userContent.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('termsPage.userContent.item1')}</li>
              <li>{t('termsPage.userContent.item2')}</li>
              <li>{t('termsPage.userContent.item3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.prohibitedActivities.title')}</h2>
            <p>
              {t('termsPage.prohibitedActivities.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('termsPage.prohibitedActivities.item1')}</li>
              <li>{t('termsPage.prohibitedActivities.item2')}</li>
              <li>{t('termsPage.prohibitedActivities.item3')}</li>
              <li>{t('termsPage.prohibitedActivities.item4')}</li>
              <li>{t('termsPage.prohibitedActivities.item5')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.termination.title')}</h2>
            <p>
              {t('termsPage.termination.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('termsPage.termination.item1')}</li>
              <li>{t('termsPage.termination.item2')}</li>
              <li>{t('termsPage.termination.item3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.disclaimer.title')}</h2>
            <p>
              {t('termsPage.disclaimer.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('termsPage.disclaimer.item1')}</li>
              <li>{t('termsPage.disclaimer.item2')}</li>
              <li>{t('termsPage.disclaimer.item3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.limitationOfLiability.title')}</h2>
            <p>
              {t('termsPage.limitationOfLiability.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.changes.title')}</h2>
            <p>
              {t('termsPage.changes.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('termsPage.changes.item1')}</li>
              <li>{t('termsPage.changes.item2')}</li>
              <li>{t('termsPage.changes.item3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.governingLaw.title')}</h2>
            <p>
              {t('termsPage.governingLaw.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('termsPage.contact.title')}</h2>
            <p>
              {t('termsPage.contact.content')}
            </p>
            <ul className="list-none pl-6 mt-2">
              <li>{t('termsPage.contact.email')}</li>
              <li>{t('termsPage.contact.address')}</li>
            </ul>
          </section>

          <section className="mt-12">
            <p className="text-sm text-muted-foreground">
              {t('termsPage.lastUpdated')}
            </p>
          </section>
        </div>
      </div>
    </motion.main>
  )
}
