'use client'

import { useI18n } from '@/i18n/i18n-context'
import { UserNav } from '@/components/ui/user-nav'

export default function AboutPage() {
  const { t, locale } = useI18n()

  return (
    <>
      <UserNav />
      <main className="flex-1 pt-[72px] pb-12">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">
            {t('aboutPage.title')}
          </h1>
          
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              {t('aboutPage.mission.title')}
            </h2>
            <p className="mb-6">
              {t('aboutPage.mission.content')}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">
              {t('aboutPage.technology.title')}
            </h2>
            <p className="mb-6">
              {t('aboutPage.technology.content')}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">
              {t('aboutPage.team.title')}
            </h2>
            <p className="mb-6">
              {t('aboutPage.team.content')}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">
              {t('aboutPage.values.title')}
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>{t('aboutPage.values.innovation')}</strong>: {t('aboutPage.values.innovationDesc')}
              </li>
              <li className="mb-2">
                <strong>{t('aboutPage.values.inclusivity')}</strong>: {t('aboutPage.values.inclusivityDesc')}
              </li>
              <li className="mb-2">
                <strong>{t('aboutPage.values.quality')}</strong>: {t('aboutPage.values.qualityDesc')}
              </li>
              <li className="mb-2">
                <strong>{t('aboutPage.values.community')}</strong>: {t('aboutPage.values.communityDesc')}
              </li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">
              {t('aboutPage.joinUs.title')}
            </h2>
            <p>
              {t('aboutPage.joinUs.content')}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
