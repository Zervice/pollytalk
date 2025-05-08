'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { useAuth } from '@/contexts/auth-context'
import { UserNav } from '@/components/ui/user-nav'
import { Button } from '@/components/ui/button'
import { Check, CreditCard, Calendar, Clock, Receipt } from 'lucide-react'

// Mock data for subscription
const mockSubscription = {
  plan: 'Premium',
  status: 'active',
  nextBillingDate: '2025-06-08',
  paymentMethod: 'Visa ending in 4242',
  billingHistory: [
    { id: 1, date: '2025-05-08', amount: '$9.99', status: 'paid' },
    { id: 2, date: '2025-04-08', amount: '$9.99', status: 'paid' },
    { id: 3, date: '2025-03-08', amount: '$9.99', status: 'paid' },
  ]
}

export default function Subscription() {
  const { t } = useI18n()
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!isLoading && !user) {
      router.push('/auth/signin')
    }
    
    // In a real app, you would fetch subscription data from Supabase here
  }, [user, isLoading, router])

  if (isLoading) {
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

          {/* Current Plan */}
          <div className="mb-12 bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t('subscription.currentPlan')}</h2>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                    {mockSubscription.plan}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Active</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">{t('subscription.managePlan')}</Button>
                  <Button variant="outline">{t('subscription.upgradePlan')}</Button>
                </div>
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
                    <p className="text-muted-foreground">{mockSubscription.nextBillingDate}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-start gap-4">
                  <CreditCard className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{t('subscription.paymentMethod')}</h3>
                    <p className="text-muted-foreground">{mockSubscription.paymentMethod}</p>
                    <Button variant="link" className="px-0 h-auto text-sm">{t('subscription.updatePayment')}</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div>
            <h2 className="text-xl font-semibold mb-4">{t('subscription.billingHistory')}</h2>
            {mockSubscription.billingHistory.length > 0 ? (
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
                    {mockSubscription.billingHistory.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
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
        </div>
      </main>
    </>
  )
}
