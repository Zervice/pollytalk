'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, Minus, Plus } from "lucide-react"
import { useI18n } from "@/i18n/i18n-context"
import { useState } from "react"

export default function PricingPage() {
  const { t } = useI18n()
  const [addOns, setAddOns] = useState(0)
  
  // Calculate additional time and cost based on add-ons
  const baseTime = 30 // minutes
  const basePrice = 45 // dollars
  const earlyAdopterBasePrice = 30 // dollars (early adopter price)
  const addOnTime = 15 // minutes per add-on
  const addOnPrice = 20 // dollars per add-on
  
  const totalTime = baseTime + (addOns * addOnTime)
  const totalPrice = basePrice + (addOns * addOnPrice)
  const earlyAdopterTotalPrice = earlyAdopterBasePrice + (addOns * addOnPrice)
  
  const incrementAddOn = () => {
    if (addOns < 4) { // Max 4 add-ons (90 minutes total)
      setAddOns(addOns + 1)
    }
  }
  
  const decrementAddOn = () => {
    if (addOns > 0) {
      setAddOns(addOns - 1)
    }
  }

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
            {/* Special FAQ for add-ons */}
            <div className="space-y-4 md:col-span-2 bg-muted/30 p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-xl">{t('pricing.addOn.faqQuestion')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('pricing.addOn.faqAnswer')}
              </p>
              
              <div className="bg-card p-4 rounded-md shadow-sm border border-border">
                <h4 className="font-medium text-base mb-3">{t('pricing.addOn.title')}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('pricing.addOn.description')}
                </p>
                
                <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md mb-3">
                  <span className="text-sm">{t('pricing.addOn.pricePerUnit')}</span>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={decrementAddOn}
                    disabled={addOns === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1 mx-3">
                    <div className="relative pt-1">
                      <input
                        type="range"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        min="0"
                        max="4"
                        step="1"
                        value={addOns}
                        onChange={(e) => setAddOns(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={incrementAddOn}
                    disabled={addOns === 4}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-sm space-y-1 mt-3">
                  <p>{t('pricing.addOn.totalTime').replace('{0}', totalTime.toString())}</p>
                  <div className="font-semibold">
                    <span>{t('pricing.addOn.totalMonthlyPrice')}</span>
                    <span className="text-red-700 line-through opacity-80 mr-2">
                      {t('pricing.addOn.totalPrice').replace('{0}', totalPrice.toString())}
                    </span>
                    <span className="text-green-600">
                      {t('pricing.addOn.earlyAdopterTotalPrice').replace('{0}', earlyAdopterTotalPrice.toString())}
                    </span>
                  </div>
                  {addOns >= 3 && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                      {t('pricing.addOn.upgradeHint')}
                    </p>
                  )}
                </div>
                
                {addOns > 0 && (
                  <Button
                    className="w-full mt-4"
                    variant="default"
                    size="sm"
                    asChild
                  >
                    <a href={`/signup?plan=regular&addOns=${addOns}&totalTime=${totalTime}&totalPrice=${earlyAdopterTotalPrice}`}>
                      {t('pricing.addOn.purchaseButton')}
                    </a>
                  </Button>
                )}
              </div>
              
              <div className="flex justify-center mt-4">
                <span className="text-sm text-muted-foreground">— {t('pricing.addOn.orText')} —</span>
              </div>
              
              <div className="text-center mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a href="/signup?plan=aggressive">
                    {t('pricing.addOn.upgradeButton')}
                  </a>
                </Button>
              </div>
            </div>
            
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
