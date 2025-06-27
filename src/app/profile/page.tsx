'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/i18n-context'
import { useAuth } from '@/contexts/auth-context'
import { UserNav } from '@/components/ui/user-nav'
import { Button } from '@/components/ui/button'
import { User, Lock, Globe, AlertTriangle } from 'lucide-react'
import {ErrorResponse, userApi, LanguageSettings, SupportedLanguage} from '@/lib/api'

// 语言选项配置
const languageOptions: { value: SupportedLanguage; label: string }[] = [
  { value: 'zh-CN', label: '中文 (简体)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'fr-FR', label: 'Français' },
  { value: 'es-ES', label: 'Español' },
  { value: 'de-DE', label: 'Deutsch' },
  { value: 'ja-JP', label: '日本語' },
  { value: 'ko-KR', label: '한국어' }
];

export default function Profile() {
  const { t } = useI18n()
  const { user, isLoading } = useAuth()
  const router = useRouter()
  
  // 个人信息状态
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    nativeLanguage: 'en-US' as SupportedLanguage,
    learningLanguage: 'zh-CN' as SupportedLanguage,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  
  // 语言设置状态
  const [isUpdatingLanguage, setIsUpdatingLanguage] = useState(false)
  const [languageUpdateError, setLanguageUpdateError] = useState<string | null>(null)
  const [languageUpdateSuccess, setLanguageUpdateSuccess] = useState(false)

  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!isLoading && !user) {
      router.push('/auth/signin')
    }
    
    if (user) {
     console.log(user.setting?.nativeLang)
     console.log(user.setting?.learningLang)
      const userProfile = {
        name: user.name || '',
        email: user.loginName || '',
        nativeLanguage: (user.setting?.nativeLang ) as SupportedLanguage,
        learningLanguage: (user.setting?.learningLang ) as SupportedLanguage,
      }
      setProfile(userProfile)
      setFormData(userProfile)
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
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLanguageUpdate = async () => {
    setIsUpdatingLanguage(true)
    setLanguageUpdateError(null)
    setLanguageUpdateSuccess(false)
    
    try {
      await userApi.updateLanguageSettings({
        learningLang: profile.learningLanguage,
        nativeLang: profile.nativeLanguage
      })
      
      setLanguageUpdateSuccess(true)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setLanguageUpdateSuccess(false)
      }, 3000)
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : (error as ErrorResponse)?.message || 'An unknown error occurred'
      setLanguageUpdateError(errorMessage)
    } finally {
      setIsUpdatingLanguage(false)
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
                  
                  {/* Language Success Message */}
                  {languageUpdateSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800">{t('profile.languageUpdateSuccess')}</p>
                    </div>
                  )}
                  
                  {/* Language Error Message */}
                  {languageUpdateError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">{languageUpdateError}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('profile.nativeLanguage')}</h3>
                      <select
                        className="block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        value={profile.nativeLanguage}
                        onChange={(e) => {
                          setProfile({...profile, nativeLanguage: e.target.value as SupportedLanguage})
                          setLanguageUpdateError(null)
                          setLanguageUpdateSuccess(false)
                        }}
                        disabled={isUpdatingLanguage}
                      >
                        {languageOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('profile.learningLanguage')}</h3>
                      <select
                        className="block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        value={profile.learningLanguage}
                        onChange={(e) => {
                          setProfile({...profile, learningLanguage: e.target.value as SupportedLanguage})
                          setLanguageUpdateError(null)
                          setLanguageUpdateSuccess(false)
                        }}
                        disabled={isUpdatingLanguage}
                      >
                        {languageOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      onClick={handleLanguageUpdate}
                      disabled={isUpdatingLanguage}
                    >
                      {isUpdatingLanguage ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          {t('profile.updating')}
                        </>
                      ) : (
                        t('profile.saveChanges')
                      )}
                    </Button>
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
