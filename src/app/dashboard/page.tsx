'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { useAuth } from '@/contexts/auth-context'
import { UserNav } from '@/components/ui/user-nav'
import { Button } from '@/components/ui/button'
import { BarChart3, Clock, BookOpen, Flame, MessageSquare } from 'lucide-react'
import { dashboardApi, DashboardStats, RecentActivity } from '@/lib/api'

// Helper function to format learning time from milliseconds
const formatLearningTime = (milliseconds: string): string => {
  const ms = parseInt(milliseconds)
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}

// Helper function to format study time
const formatStudyTime = (milliseconds: string): string => {
  const ms = parseInt(milliseconds)
  const minutes = Math.floor(ms / (1000 * 60))
  return `${minutes}m`
}

// Helper function to format date
const formatDate = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp))
  return date.toLocaleDateString()
}

export default function Dashboard() {
  const { t, locale } = useI18n()
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!isLoading && !user) {
      router.push('/auth/signin')
      return
    }
    
    // Fetch dashboard data when user is authenticated
    if (user && !isLoading) {
      fetchDashboardData()
    }
  }, [user, isLoading, router])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch both stats and recent activity in parallel
      const [statsData, activityData] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRecentChats()
      ])
      
      setStats(statsData)
      setRecentActivity(activityData)
    } catch (err: unknown) {
      console.error('Failed to fetch dashboard data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  if (error) {
    return (
      <>
        <UserNav />
        <main className="flex-1 pt-[72px] pb-12">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchDashboardData}>{t('dashboard.retry')}</Button>
            </div>
          </div>
        </main>
      </>
    )
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title={t('dashboard.stats.conversations')} 
                value={stats?.conversations || '0'} 
                icon={<MessageSquare className="h-6 w-6" />} 
              />
              <StatCard 
                title={t('dashboard.stats.learningTime')} 
                value={stats ? formatLearningTime(stats.learningTime) : '0h 0m'} 
                icon={<Clock className="h-6 w-6" />} 
              />
              <StatCard 
                title={t('dashboard.stats.wordsLearned')} 
                value={stats?.wordsLearned || '0'} 
                icon={<BookOpen className="h-6 w-6" />} 
              />
              <StatCard 
                title={t('dashboard.stats.streak')} 
                value={stats?.streak || '0'} 
                icon={<Flame className="h-6 w-6" />} 
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.recentActivity')}</h2>
            {recentActivity.length > 0 ? (
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="divide-y divide-border">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{activity.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(activity.time)} • {formatStudyTime(activity.studyTime)}
                        </div>
                      </div>
                      {/*<Button variant="outline" size="sm">*/}
                      {/*  {t('dashboard.continueConversation')}*/}
                      {/*</Button>*/}
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
