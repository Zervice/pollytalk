'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started with language learning",
    features: [
      "1 AI conversation per day",
      "Basic language assessment",
      "Core language exercises",
      "Community support",
    ],
    cta: "Start Free",
    href: "/signup",
  },
  {
    name: "Pro",
    price: "$15",
    period: "per month",
    description: "Best for serious language learners",
    features: [
      "Unlimited AI conversations",
      "Advanced language assessment",
      "Personalized learning path",
      "Progress analytics",
      "Priority support",
      "Multiple language access",
    ],
    cta: "Start Pro Trial",
    href: "/signup?plan=pro",
    featured: true,
  },
  {
    name: "Team",
    price: "Custom",
    description: "For organizations and language schools",
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Bulk user management",
      "Custom learning paths",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
]

export default function PricingPage() {
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
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
            Choose the perfect plan for your language learning journey
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
                    Most Popular
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
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
            <div className="space-y-2">
              <h3 className="font-semibold">Can I switch plans later?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards and PayPal.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Is there a refund policy?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
