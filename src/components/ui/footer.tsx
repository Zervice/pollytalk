import { Logo } from "./logo"
import { useI18n } from '@/i18n/i18n-context'
import Link from 'next/link'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <Logo size={24} />
          <p className="text-sm leading-loose text-center md:text-left">
            {t('footer.tagline')}
          </p>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t('footer.about')}
          </Link>
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t('footer.blog')}
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t('footer.contact')}
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t('footer.terms')}
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t('footer.privacy')}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
