import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <Logo size={24} />
          <p className="text-sm leading-loose text-center md:text-left">
            Built with ❤️ for language learners worldwide
          </p>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="/about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </a>
          <a
            href="/blog"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Blog
          </a>
          <a
            href="/contact"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Contact
          </a>
          <a
            href="/terms"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Terms
          </a>
          <a
            href="/privacy"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Privacy
          </a>
        </nav>
      </div>
    </footer>
  )
}
