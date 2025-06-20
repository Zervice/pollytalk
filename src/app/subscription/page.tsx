'use client'

import { useEffect, useState } from 'react'
import { paymentApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { useAuth } from '@/contexts/auth-context'
import { UserNav } from '@/components/ui/user-nav'
import { Button } from '@/components/ui/button'
import { Check, CreditCard, Calendar, Receipt, AlertCircle } from 'lucide-react'
import SubscribePackageList from './SubscribePackageList'



export default function Subscription() {
  const { t } = useI18n()
  const { user, isLoading: isAuthLoading } = useAuth()
  const router = useRouter()

  const [subscription, setSubscription] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cancel (or manage) current subscription via backend
  const handleManageSubscription = async () => {
    setIsLoading(true)
    try {
      // First verify that the subscription is cancelable
      const { cancelable } = await paymentApi.checkCancelable()
      if (!cancelable) {
        setError('Your subscription cannot be managed from the web interface.')
        setIsLoading(false)
        return
      }

      await paymentApi.cancelSubscription()
      // refresh data
      await fetchSubscription()
    } catch (err: any) {
      console.error(err)
      setError(err?.message || 'Could not manage subscription. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchSubscription() {
    setIsLoading(true)
    setError(null)

    try {
      const member = await paymentApi.getMember()
      if (!member?.id || member.freeTrial || member.source !== 'stripe') {
        setSubscription(null)
        return
      }

      // Resolve package / plan name
      let planName = member.name || 'Subscription'
      try {
        const packages = await paymentApi.getPackages('subscribe')
        const pkg = packages.find((p: any) => p.id === member.packageId)
        if (pkg) planName = pkg.name
      } catch {
        /* ignore lookup errors */
      }

      // Ensure expireAt is treated as a numeric timestamp (milliseconds since epoch)
      const expireAtTimestamp = member.expireAt ? Number(member.expireAt) : null

      // Study time information
      const unlimited = !!member.unlimitedStudyTime || (member.totalSeconds !== undefined && Number(member.totalSeconds) <= 0)
      const totalHours = unlimited ? null : Number(member.totalSeconds || 0) / 3600
      const usedHours = unlimited ? null : Number(member.usedSeconds || 0) / 3600

      const nextBillingDate =
        expireAtTimestamp && !isNaN(expireAtTimestamp)
          ? new Date(expireAtTimestamp).toLocaleDateString()
          : '—'

      setSubscription({
        plan: planName,
        status: expireAtTimestamp && Date.now() < expireAtTimestamp ? 'active' : 'expired',
        nextBillingDate,
        paymentMethod: 'Stripe',
        billingHistory: [],
        unlimited,
        totalHours,
        usedHours,
      });
    } catch (err) {
      console.error(err);
      setError('Failed to load subscription details.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthLoading) return

    if (!user) {
      router.push('/auth/signin?redirect=/subscription')
      return
    }

    fetchSubscription()
  }, [user, isAuthLoading, router])

  if (isAuthLoading || isLoading) {

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      <UserNav />
      <main className="flex-1 pt-[72px] pb-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              {t('subscription.title')}
            </h1>
          </div>

          {error && (
            <div className="mb-8 bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg flex items-center gap-3">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          {subscription ? (
            <>
              {/* Current Plan */}
              <div className="mb-12 bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('subscription.currentPlan')}</h2>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                        {subscription.plan}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground capitalize">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{subscription.status}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={handleManageSubscription}>{t('subscription.managePlan')}</Button>
                      <Button asChild><a href="/pricing">{t('subscription.upgradePlan')}</a></Button>
                    </div>
                  </div>

                  <div className="border-t border-border my-4"></div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>
                        Total hours purchased:{' '}
                        {subscription.unlimited
                          ? 'Unlimited'
                          : subscription.totalHours?.toFixed(1)}
                      </p>
                      <p>
                        Used hours:{' '}
                        {subscription.unlimited
                          ? '—'
                          : subscription.usedHours?.toFixed(1)}
                      </p>
                    </div>
                    {!subscription.unlimited && (
                      <Button variant="secondary" asChild>
                        <a href="/subscription/extra-hours">Purchase Extra Hours</a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">{t('subscription.billingInfo')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">{t('subscription.nextBilling')}</h3>
                        <p className="text-muted-foreground">{subscription.nextBillingDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-start gap-4">
                      <CreditCard className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">{t('subscription.paymentMethod')}</h3>
                        <p className="text-muted-foreground">{subscription.paymentMethod}</p>
                        <Button variant="link" className="px-0 h-auto text-sm" onClick={handleManageSubscription}>{t('subscription.updatePayment')}</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('subscription.billingHistory')}</h2>
                {subscription.billingHistory.length > 0 ? (
                  <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {subscription.billingHistory.map((item: any) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 capitalize">
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Receipt className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <p className="text-muted-foreground">{t('subscription.noHistory')}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            !isLoading && (
              <div className="text-center">
                <p className="text-muted-foreground mb-6">You do not have an active subscription.</p>
                <SubscribePackageList />
              </div>
            )
          )}
        </div>
      </main>
    </>
  )
}
