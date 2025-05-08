'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { useAuth } from '@/contexts/auth-context'
import { UserNav } from '@/components/ui/user-nav'
import { Button } from '@/components/ui/button'
import { User, Lock, Globe, AlertTriangle } from 'lucide-react'

// Mock user profile data
const mockUserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  nativeLanguage: 'English',
  learningLanguage: 'Spanish',
}

export default function Profile() {
  const { t } = useI18n()
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState(mockUserProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(mockUserProfile)

  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!isLoading && !user) {
      router.push('/auth/signin')
    }
    
    // In a real app, you would fetch user profile from Firebase here
    if (user) {
      setProfile({
        ...mockUserProfile,
        email: user.email || mockUserProfile.email,
      })
      setFormData({
        ...mockUserProfile,
        email: user.email || mockUserProfile.email,
      })
    }
  }, [user, isLoading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the user profile in Firebase here
    setProfile(formData)
    setIsEditing(false)
  }

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
              {t('profile.title')}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Personal Information */}
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">{t('profile.personalInfo')}</h2>
                    </div>
                    {!isEditing && (
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(true)}
                      >
                        {t('profile.updateProfile')}
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                          {t('profile.name')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                          {t('auth.email')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled
                          className="block w-full rounded-md border border-border bg-background/50 px-3 py-2 shadow-sm text-muted-foreground cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Email cannot be changed</p>
                      </div>
                      <div className="flex gap-2 justify-end pt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setIsEditing(false)
                            setFormData(profile)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t('profile.name')}</h3>
                        <p>{profile.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{t('auth.email')}</h3>
                        <p>{profile.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Language Preferences */}
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">{t('profile.language')}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('profile.nativeLanguage')}</h3>
                      <select
                        className="block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        value={profile.nativeLanguage}
                        onChange={(e) => setProfile({...profile, nativeLanguage: e.target.value})}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japanese">Japanese</option>
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('profile.learningLanguage')}</h3>
                      <select
                        className="block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        value={profile.learningLanguage}
                        onChange={(e) => setProfile({...profile, learningLanguage: e.target.value})}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japanese">Japanese</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Change Password */}
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">{t('profile.changePassword')}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update your password to keep your account secure.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => router.push('/auth/reset-password')}>
                    {t('profile.changePassword')}
                  </Button>
                </div>
              </div>

              {/* Delete Account */}
              <div className="bg-card rounded-lg border border-destructive/50 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <h2 className="text-xl font-semibold text-destructive">{t('profile.deleteAccount')}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('profile.deleteWarning')}
                  </p>
                  <Button variant="destructive" className="w-full">
                    {t('profile.deleteAccount')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
