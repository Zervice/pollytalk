'use client'

import Image from 'next/image'
import { useI18n } from '@/i18n/i18n-context'
import { getAssetPath } from '@/lib/utils'

export function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  const { locale } = useI18n()
  // Define aspect ratio to maintain image proportions
  const height = Math.round(size * 1) // Adjust this multiplier based on your logo's aspect ratio
  
  // Set alt text based on language
  const altText = locale === 'zh' ? '博语通 (PollyTalk) 标志' : 'PollyTalk Logo'

  return (
    <div className={`relative ${className}`} style={{ width: size, height }}>
      <Image
        src={getAssetPath('/logo.png')}
        alt={altText}
        fill
        className="object-contain"
        sizes={`${size}px`}
        priority
      />
    </div>
  )
}
