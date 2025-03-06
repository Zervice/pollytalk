import Image from 'next/image'

export function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  // Define aspect ratio to maintain image proportions
  const height = Math.round(size * 1) // Adjust this multiplier based on your logo's aspect ratio

  return (
    <div className={`relative ${className}`} style={{ width: size, height }}>
      <Image
        src="/logo.png"
        alt="PollyTalk Logo"
        fill
        className="object-contain"
        sizes={`${size}px`}
        priority
      />
    </div>
  )
}
