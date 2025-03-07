'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useI18n } from "@/i18n/i18n-context"

export default function PricingPage() {
  const { t } = useI18n()

  const tiers = [
  {
    name: t('pricing.tiers.basic.name'),
    price: t('pricing.tiers.basic.price'),
    description: t('pricing.tiers.basic.description'),
    features: [
      t('pricing.tiers.basic.features.feature1'),
      t('pricing.tiers.basic.features.feature2'),
      t('pricing.tiers.basic.features.feature3'),
      t('pricing.tiers.basic.features.feature4'),
    ],
    cta: t('pricing.tiers.basic.cta'),
    href: "/signup",
  },
  {
    name: t('pricing.tiers.pro.name'),
    price: t('pricing.tiers.pro.price'),
    period: t('pricing.tiers.pro.period'),
    description: t('pricing.tiers.pro.description'),
    features: [
      t('pricing.tiers.pro.features.feature1'),
      t('pricing.tiers.pro.features.feature2'),
      t('pricing.tiers.pro.features.feature3'),
      t('pricing.tiers.pro.features.feature4'),
      t('pricing.tiers.pro.features.feature5'),
      t('pricing.tiers.pro.features.feature6'),
    ],
    cta: t('pricing.tiers.pro.cta'),
    href: "/signup?plan=pro",
    featured: true,
  },
  {
    name: t('pricing.tiers.team.name'),
    price: t('pricing.tiers.team.price'),
    description: t('pricing.tiers.team.description'),
    features: [
      t('pricing.tiers.team.features.feature1'),
      t('pricing.tiers.team.features.feature2'),
      t('pricing.tiers.team.features.feature3'),
      t('pricing.tiers.team.features.feature4'),
      t('pricing.tiers.team.features.feature5'),
      t('pricing.tiers.team.features.feature6'),
    ],
    cta: t('pricing.tiers.team.cta'),
    href: "/contact",
  },
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
            {t('pricing.title')}
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative flex flex-col p-6 bg-card text-card-foreground rounded-lg shadow-lg border ${
                tier.featured
                  ? "border-primary ring-2 ring-primary"
                  : "border-border"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground rounded-full">
                    {t('pricing.mostPopular')}
                  </span>
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="ml-1 text-sm text-muted-foreground">
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>
              <ul className="mb-6 space-y-2 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={tier.featured ? "default" : "outline"}
                asChild
              >
                <a href={tier.href}>{tier.cta}</a>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('pricing.faqTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
            <div className="space-y-2">
              <h3 className="font-semibold">{t('pricing.faq.question1')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('pricing.faq.answer1')}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">{t('pricing.faq.question2')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('pricing.faq.answer2')}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">{t('pricing.faq.question3')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('pricing.faq.answer3')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
