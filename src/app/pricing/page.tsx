'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useI18n } from "@/i18n/i18n-context"

export default function PricingPage() {
  const { t } = useI18n()

  const tiers = [
  {
    name: t('pricing.tiers.regular.name'),
    price: t('pricing.tiers.regular.price'),
    earlyPrice: t('pricing.tiers.regular.earlyPrice'),
    period: t('pricing.tiers.regular.period'),
    description: t('pricing.tiers.regular.description'),
    features: [
      t('pricing.tiers.regular.features.feature1'),
      t('pricing.tiers.regular.features.feature2'),
      t('pricing.tiers.regular.features.feature3'),
      t('pricing.tiers.regular.features.feature4'),
      t('pricing.tiers.regular.features.feature5'),
      t('pricing.tiers.regular.features.feature6'),
    ],
    cta: t('pricing.tiers.regular.cta'),
    href: "/signup?plan=regular",
    freeTrial: true,
  },
  {
    name: t('pricing.tiers.aggressive.name'),
    price: t('pricing.tiers.aggressive.price'),
    earlyPrice: t('pricing.tiers.aggressive.earlyPrice'),
    period: t('pricing.tiers.aggressive.period'),
    description: t('pricing.tiers.aggressive.description'),
    features: [
      t('pricing.tiers.aggressive.features.feature1'),
      t('pricing.tiers.aggressive.features.feature2'),
      t('pricing.tiers.aggressive.features.feature3'),
      t('pricing.tiers.aggressive.features.feature4'),
      t('pricing.tiers.aggressive.features.feature5'),
      t('pricing.tiers.aggressive.features.feature6'),
    ],
    cta: t('pricing.tiers.aggressive.cta'),
    href: "/signup?plan=aggressive",
    featured: true,
    freeTrial: false,
  },
  {
    name: t('pricing.tiers.unlimited.name'),
    price: t('pricing.tiers.unlimited.price'),
    earlyPrice: t('pricing.tiers.unlimited.earlyPrice'),
    period: t('pricing.tiers.unlimited.period'),
    description: t('pricing.tiers.unlimited.description'),
    features: [
      t('pricing.tiers.unlimited.features.feature1'),
      t('pricing.tiers.unlimited.features.feature2'),
      t('pricing.tiers.unlimited.features.feature3'),
      t('pricing.tiers.unlimited.features.feature4'),
      t('pricing.tiers.unlimited.features.feature5'),
      t('pricing.tiers.unlimited.features.feature6'),
    ],
    cta: t('pricing.tiers.unlimited.cta'),
    href: "/signup?plan=unlimited",
    freeTrial: false,
  },
  {
    name: t('pricing.tiers.school.name'),
    price: t('pricing.tiers.school.price'),
    description: t('pricing.tiers.school.description'),
    features: [
      t('pricing.tiers.school.features.feature1'),
      t('pricing.tiers.school.features.feature2'),
      t('pricing.tiers.school.features.feature3'),
      t('pricing.tiers.school.features.feature4'),
      t('pricing.tiers.school.features.feature5'),
      t('pricing.tiers.school.features.feature6'),
    ],
    cta: t('pricing.tiers.school.cta'),
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative flex flex-col p-4 bg-card text-card-foreground rounded-lg shadow-lg border ${
                tier.featured
                  ? "border-primary ring-2 ring-primary"
                  : "border-border"
              }`}
            >
              <div className="absolute -top-4 left-0 right-0 flex justify-center gap-2">
                {tier.featured && (
                  <span className="bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground rounded-full">
                    {t('pricing.mostPopular')}
                  </span>
                )}
                {tier.freeTrial && (
                  <span className="bg-green-600 px-3 py-1 text-xs font-semibold text-white rounded-full">
                    {t('pricing.freeTrialBadge')}
                  </span>
                )}
              </div>
              <div className="mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-center">{tier.name}</h3>
                <div className="mt-4 mb-2 flex flex-col">
                  <div className="flex flex-col items-center">
                    {tier.earlyPrice ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl md:text-4xl font-bold text-red-700 line-through opacity-80">
                            {tier.price}
                          </span>
                          <span className="text-4xl md:text-5xl font-extrabold text-green-600">{tier.earlyPrice}</span>
                          {tier.period && (
                            <span className="text-sm md:text-base text-muted-foreground">
                              {tier.period}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 py-1 px-3 bg-green-100 dark:bg-green-900/30 rounded-full text-center">
                          <span className="text-sm md:text-base text-green-600 dark:text-green-400 font-medium">
                            {t('pricing.earlyAdopter')}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl md:text-5xl font-extrabold">{tier.price}</span>
                        {tier.period && (
                          <span className="mt-1 text-sm md:text-base text-muted-foreground">
                            {tier.period}
                          </span>
                        )}
                      </>                      
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm md:text-base text-muted-foreground text-center">
                  {tier.description}
                </p>
              </div>
              <ul className="my-6 space-y-3 flex-1 text-sm md:text-base border-t border-b py-4 border-border/30">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-4 py-6 text-base font-semibold"
                size="lg"
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
          <div className="grid gap-6 md:grid-cols-2 text-left">
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
            <div className="space-y-2">
              <h3 className="font-semibold">{t('pricing.faq.question4')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('pricing.faq.answer4')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
