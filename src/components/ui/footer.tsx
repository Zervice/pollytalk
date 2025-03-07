import { Logo } from "./logo"
import { useI18n } from '@/i18n/i18n-context'

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
          <a
            href="/about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t('footer.about')}
          </a>
          <a
            href="/blog"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t('footer.blog')}
          </a>
          <a
            href="/contact"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t('footer.contact')}
          </a>
          <a
            href="/terms"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t('footer.terms')}
          </a>
          <a
            href="/privacy"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {t('footer.privacy')}
          </a>
        </nav>
      </div>
    </footer>
  )
}
