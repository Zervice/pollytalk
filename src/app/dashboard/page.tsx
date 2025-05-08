'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { useAuth } from '@/contexts/auth-context'
import { UserNav } from '@/components/ui/user-nav'
import { Button } from '@/components/ui/button'
import { BarChart3, Clock, BookOpen, Award, Flame, MessageSquare } from 'lucide-react'

// Mock data for user statistics
const mockUserStats = {
  conversations: 24,
  learningTime: '12h 30m',
  wordsLearned: 348,
  level: 'Intermediate',
  streak: 7,
  recentActivity: [
    { id: 1, type: 'conversation', title: 'Daily Routine', date: '2025-05-07', duration: '15m' },
    { id: 2, type: 'vocabulary', title: 'Food and Dining', date: '2025-05-06', duration: '10m' },
    { id: 3, type: 'conversation', title: 'Travel Planning', date: '2025-05-05', duration: '20m' },
  ]
}

export default function Dashboard() {
  const { t, locale } = useI18n()
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState(mockUserStats)

  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!isLoading && !user) {
      router.push('/auth/signin')
    }
    
    // In a real app, you would fetch user statistics from Firebase here
    // For now, we're using mock data
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
              {t('dashboard.title')}
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              {t('dashboard.welcome')}, {user.loginName?.split('@')[0] || 'User'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.stats.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard 
                title={t('dashboard.stats.conversations')} 
                value={stats.conversations.toString()} 
                icon={<MessageSquare className="h-6 w-6" />} 
              />
              <StatCard 
                title={t('dashboard.stats.learningTime')} 
                value={stats.learningTime} 
                icon={<Clock className="h-6 w-6" />} 
              />
              <StatCard 
                title={t('dashboard.stats.wordsLearned')} 
                value={stats.wordsLearned.toString()} 
                icon={<BookOpen className="h-6 w-6" />} 
              />
              <StatCard 
                title={t('dashboard.stats.level')} 
                value={stats.level} 
                icon={<BarChart3 className="h-6 w-6" />} 
              />
              <StatCard 
                title={t('dashboard.stats.streak')} 
                value={stats.streak.toString()} 
                icon={<Flame className="h-6 w-6" />} 
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.recentActivity')}</h2>
            {stats.recentActivity.length > 0 ? (
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="divide-y divide-border">
                  {stats.recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.date} • {activity.duration}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        {t('dashboard.continueConversation')}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-lg border border-border p-8 text-center">
                <p className="text-muted-foreground">{t('dashboard.noActivity')}</p>
              </div>
            )}
          </div>

          {/* Start New Conversation */}
          <div className="text-center">
            <Button size="lg" className="px-8">
              {t('dashboard.startConversation')}
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-primary">{icon}</div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
