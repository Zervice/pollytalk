'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { useAuth } from '@/contexts/auth-context'
import { UserNav } from '@/components/ui/user-nav'
import { Button } from '@/components/ui/button'
import { User, Lock, Globe, AlertTriangle } from 'lucide-react'
import {ErrorResponse, userApi} from '@/lib/api'

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
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!isLoading && !user) {
      router.push('/auth/signin')
    }
    
    // In a real app, you would fetch user profile from Firebase here
    if (user) {
      setProfile({
        ...mockUserProfile,
        email: user.loginName || mockUserProfile.email,
        name: user.name || mockUserProfile.name,
      })
      setFormData({
        ...mockUserProfile,
        email: user.loginName || mockUserProfile.email,
        name: user.name || mockUserProfile.name,
      })
    }
  }, [user, isLoading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear previous errors when user starts typing
    if (updateError) {
      setUpdateError(null)
    }
    if (updateSuccess) {
      setUpdateSuccess(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Only update if name has changed
    if (formData.name === profile.name) {
      setIsEditing(false)
      return
    }
    
    setIsUpdating(true)
    setUpdateError(null)
    setUpdateSuccess(false)
    
    try {
      await userApi.updateUserName(formData.name)
      
      // Update local state on success
      setProfile(formData)
      setIsEditing(false)
      setUpdateSuccess(true)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000)
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : (error as ErrorResponse)?.message || 'An unknown error occurred'
      setUpdateError(errorMessage)
      // 移除这两行，保持编辑状态和用户输入的数据
      // setFormData(profile)
      // setIsEditing(false) - 这行本来就没有，但确保不要添加
    } finally {
      setIsUpdating(false)
    }
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
                        disabled={isUpdating}
                      >
                        {t('profile.updateProfile')}
                      </Button>
                    )}
                  </div>
                  
                  {/* Success Message */}
                  {updateSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800">{t('profile.updateSuccess')}</p>
                    </div>
                  )}
                  
                  {/* Error Message */}
                  {updateError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">{updateError}</p>
                    </div>
                  )}
                  
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
                          disabled={isUpdating}
                          className="block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                          required
                          minLength={2}
                          maxLength={50}
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
                        <p className="mt-1 text-xs text-muted-foreground">{t('profile.emailCannotBeChanged')}</p>
                      </div>
                      <div className="flex gap-2 justify-end pt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setIsEditing(false)
                            setFormData(profile)
                            setUpdateError(null)
                            setUpdateSuccess(false)
                          }}
                          disabled={isUpdating}
                        >
                          {t('profile.cancel')}
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isUpdating || formData.name.trim().length < 2}
                        >
                          {isUpdating ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                              {t('profile.updating')}
                            </>
                          ) : (
                            t('profile.save')
                          )}
                        </Button>
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
                    <Button>{t('profile.saveChanges')}</Button>
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
                    {t('profile.updatePasswordDescription')}
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
