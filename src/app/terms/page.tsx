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
          {t('terms.title')}
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.introduction.title')}</h2>
            <p>
              {t('terms.introduction.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.serviceDescription.title')}</h2>
            <p>
              {t('terms.serviceDescription.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('terms.serviceDescription.item1')}</li>
              <li>{t('terms.serviceDescription.item2')}</li>
              <li>{t('terms.serviceDescription.item3')}</li>
              <li>{t('terms.serviceDescription.item4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.userAccounts.title')}</h2>
            <p>
              {t('terms.userAccounts.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('terms.userAccounts.item1')}</li>
              <li>{t('terms.userAccounts.item2')}</li>
              <li>{t('terms.userAccounts.item3')}</li>
              <li>{t('terms.userAccounts.item4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.userConduct.title')}</h2>
            <p>
              {t('terms.userConduct.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('terms.userConduct.item1')}</li>
              <li>{t('terms.userConduct.item2')}</li>
              <li>{t('terms.userConduct.item3')}</li>
              <li>{t('terms.userConduct.item4')}</li>
              <li>{t('terms.userConduct.item5')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.intellectualProperty.title')}</h2>
            <p>
              {t('terms.intellectualProperty.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('terms.intellectualProperty.item1')}</li>
              <li>{t('terms.intellectualProperty.item2')}</li>
              <li>{t('terms.intellectualProperty.item3')}</li>
              <li>{t('terms.intellectualProperty.item4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.paymentTerms.title')}</h2>
            <p>
              {t('terms.paymentTerms.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('terms.paymentTerms.item1')}</li>
              <li>{t('terms.paymentTerms.item2')}</li>
              <li>{t('terms.paymentTerms.item3')}</li>
              <li>{t('terms.paymentTerms.item4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.termination.title')}</h2>
            <p>
              {t('terms.termination.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('terms.termination.item1')}</li>
              <li>{t('terms.termination.item2')}</li>
              <li>{t('terms.termination.item3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.disclaimer.title')}</h2>
            <p>
              {t('terms.disclaimer.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('terms.disclaimer.item1')}</li>
              <li>{t('terms.disclaimer.item2')}</li>
              <li>{t('terms.disclaimer.item3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.liability.title')}</h2>
            <p>
              {t('terms.liability.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.changes.title')}</h2>
            <p>
              {t('terms.changes.content')}
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>{t('terms.changes.item1')}</li>
              <li>{t('terms.changes.item2')}</li>
              <li>{t('terms.changes.item3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.contact.title')}</h2>
            <p>
              {t('terms.contact.content')}
            </p>
            <ul className="list-none pl-6 mt-2">
              <li>{t('terms.contact.email')}</li>
              <li>{t('terms.contact.address')}</li>
            </ul>
          </section>

          <section className="mt-12">
            <p className="text-sm text-muted-foreground">
              {t('terms.lastUpdated')}
            </p>
          </section>
        </div>
      </div>
    </motion.main>
  )
}
