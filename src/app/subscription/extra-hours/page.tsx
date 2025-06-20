"use client"

import { useEffect, useState } from "react"
import { useI18n } from "@/i18n/i18n-context"
import { paymentApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ExtraPackage {
  id: string | number
  name: string
  salePrice: number // cents
  studyHours: number
  description?: string
}

export default function PurchaseExtraHoursPage() {
  const { t } = useI18n()

  const [packages, setPackages] = useState<ExtraPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const raw = await paymentApi.getPackages("extra_time_package", "web")
        interface RawPkg {
          id: string | number
          name: string
          salePrice: number | string
          description?: string
          extraTimePackage?: { studyHours: number }
        }
        const mapped: ExtraPackage[] = (raw as RawPkg[]).map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          salePrice: Number(p.salePrice),
          studyHours: p.extraTimePackage?.studyHours || 0,
        }))
        setPackages(mapped)
      } catch (e) {
        console.error(e)
        setError(e instanceof Error ? e.message : "Failed to load packages")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleCheckout = async (pkg: ExtraPackage) => {
    try {
      setLoading(true)
      const { url } = await paymentApi.createSubscriptionSession(pkg.id)
      window.location.href = url
    } catch (e) {
      console.error(e)
      setError(e instanceof Error ? e.message : "Unable to start checkout")
      setLoading(false)
    }
  }

  if (loading && !packages.length) {
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
      <div className="container px-4 md:px-6 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {t("subscription.purchaseExtraHours")}
        </h1>

        {error && <p className="mb-4 text-destructive text-center">{error}</p>}

        {packages.length ? (
          <div
            className={
              "grid gap-6 " +
              (packages.length === 1
                ? "grid-cols-1"
                : packages.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3")
            }
          >
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {pkg.name} · +{pkg.studyHours}h
                </h2>
                {pkg.description && (
                  <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
                    {pkg.description}
                  </p>
                )}
                <p className="text-2xl font-bold mb-6">
                  ${(pkg.salePrice / 100).toFixed(2)}
                </p>
                <Button
                  className="w-full mt-auto"
                  disabled={loading}
                  onClick={() => handleCheckout(pkg)}
                >
                  {t("subscription.checkoutNow")}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            {t("subscription.noExtraPackages")}
          </p>
        )}
      </div>
    </motion.main>
  )
}


import { useState, useEffect } from 'react'
import { useI18n } from '@/i18n/i18n-context'
import { paymentApi } from '@/lib/api'
import { Button } from '@/components/ui/button'


import { motion } from 'framer-motion'

interface PackageInfo {
  id: string | number
  name: string
  salePrice: number // cents
  studyHours: number
  description?: string
}

export default function PurchaseExtraHoursPage() {
  const { t } = useI18n()


  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch extra‐time packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true)
      try {
        const raw = await paymentApi.getPackages('extra_time_package', 'web')
        interface RawExtraPackage {
          id: number | string;
          name: string;
          salePrice: number | string;
          extraTimePackage?: { studyHours: number };
        }
        const mapped: PackageInfo[] = (raw as RawExtraPackage[]).map((p) => ({
          id: p.id,
          name: p.name,
          salePrice: Number(p.salePrice),
          studyHours: p.extraTimePackage?.studyHours || 0,
        }))
        setPackages(mapped)
      } catch (err) {
        console.error(err)
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Failed to load packages')
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchPackages()
  }, [])


    setQuantities((prev) => {
  const handleCheckoutPackage = async (pkg: PackageInfo) => {
    try {
      setIsLoading(true)
      const { url } = await paymentApi.createSubscriptionSession(pkg.id)
      window.location.href = url
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Unable to start checkout')
      }
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
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col">
                  <h2 className="text-lg font-semibold mb-2">
                    {pkg.name} · +{pkg.studyHours}h
                  </h2>
                  {pkg.description && (
                    <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
                      {pkg.description}
                    </p>
                  )}
                  <p className="text-2xl font-bold mb-6">${(pkg.salePrice / 100).toFixed(2)}</p>
                  <Button className="w-full mt-auto" disabled={isLoading} onClick={() => handleCheckoutPackage(pkg)}>
                    {t('subscription.checkoutNow')}
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground">{t('subscription.noExtraPackages')}</p>
        )}
      </div>
    </motion.main>
  )
}
