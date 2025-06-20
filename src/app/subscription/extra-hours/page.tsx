"use client"

import { useState, useEffect } from 'react'
import { useI18n } from '@/i18n/i18n-context'
import { paymentApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface PackageInfo {
  id: string | number
  name: string
  salePrice: number // cents
  studyHours: number
}

export default function PurchaseExtraHoursPage() {
  const { t } = useI18n()
  const router = useRouter()

  const [packages, setPackages] = useState<PackageInfo[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch extra‐time packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true)
      try {
        const raw = await paymentApi.getPackages('extra_time_package', 'web')
        const mapped: PackageInfo[] = raw.map((p: any) => ({
          id: p.id,
          name: p.name,
          salePrice: Number(p.salePrice),
          studyHours: p.extraTimePackage?.studyHours || 0,
        }))
        setPackages(mapped)
      } catch (err: any) {
        console.error(err)
        setError(err?.message || 'Failed to load packages')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const updateQty = (id: string | number, delta: number) => {
    setQuantities((prev) => {
      const curr = prev[id] || 0
      const next = Math.min(Math.max(curr + delta, 0), 10)
      return { ...prev, [id]: next }
    })
  }

  /* Aggregate totals not currently displayed but kept for potential future use */
  const totals = packages.reduce(
    (acc, pkg) => {
      const qty = quantities[pkg.id] || 0
      acc.hours += pkg.studyHours * qty
      acc.priceCents += pkg.salePrice * qty
      return acc
    },
    { hours: 0, priceCents: 0 }
  )

  const totalHours = totals.hours
  const totalPrice = (totals.priceCents / 100).toFixed(2) // currently unused

  const handleCheckoutPackage = async (pkg: PackageInfo) => {
    const qty = quantities[pkg.id] || 0
    if (qty === 0) return
    try {
      setIsLoading(true)
      const { url } = await paymentApi.createSubscriptionSession(pkg.id)
      window.location.href = url
    } catch (err: any) {
      console.error(err)
      setError(err?.message || 'Unable to start checkout')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !packages.length) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen flex-col items-center py-12 bg-background"
    >
      <div className="container px-4 md:px-6 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {t('subscription.purchaseExtraHours')}
        </h1>

        {error && (
          <p className="mb-4 text-destructive text-center">{error}</p>
        )}

        {packages.length ? (
          <>
            <div
              className={
                `grid gap-6 ` +
                (packages.length === 1
                  ? 'grid-cols-1'
                  : packages.length === 2
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-3')
              }
            >
              {packages.map((pkg) => {
                const qty = quantities[pkg.id] || 0
                return (
                  <div key={pkg.id} className="bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col">
                    <h2 className="text-lg font-semibold mb-2">{pkg.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('subscription.extraHoursDetail').replace('{hours}', String(pkg.studyHours))}
                    </p>

                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Button variant="outline" size="icon" onClick={() => updateQty(pkg.id, -1)} disabled={qty === 0}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-xl font-semibold w-10 text-center">{qty}</span>
                      <Button variant="outline" size="icon" onClick={() => updateQty(pkg.id, 1)} disabled={qty === 10}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* totals & checkout */}
                    <div className="text-center mt-auto space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {t('subscription.totalExtraHours').replace('{hours}', String(pkg.studyHours * qty))}
                      </p>
                      <p className="text-lg font-bold">${((pkg.salePrice * qty) / 100).toFixed(2)}</p>
                      <Button className="w-full" size="sm" disabled={qty === 0 || isLoading} onClick={() => handleCheckoutPackage(pkg)}>
                        {t('subscription.checkoutNow')}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>


          </>
        ) : (
          <p className="text-center text-muted-foreground">{t('subscription.noExtraPackages')}</p>
        )}
      </div>
    </motion.main>
  )
}
