'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'
import { Menu, X, QrCode } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'react-qr-code'

const navigation = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Download', href: '/download' },
  { name: 'Terms & Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
]

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
      <nav className="flex items-center justify-between p-6 lg:px-8 mx-auto max-w-7xl" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Logo size={32} />
            <span className="font-semibold text-xl">PollyChat</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors hover:text-primary ${
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="relative group">
            <button
              type="button"
              className="flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              aria-label="Show QR code for app download"
            >
              <QrCode className="h-5 w-5" />
            </button>
            <div className="absolute right-0 top-full mt-2 p-4 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium mb-2">Scan to download PollyChat app</p>
                <div className="p-2 bg-white rounded">
                  <QRCode
                    value="https://pollytalk.promptai.cn/release/app-release.apk"
                    size={150}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">https://pollytalk.promptai.cn/release/app-release.apk</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border"
              >
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                    <Logo size={32} />
                    <span className="font-semibold text-xl">PollyChat</span>
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-border">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-accent ${
                            pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <div className="-mx-3 rounded-lg px-3 py-4 flex flex-col items-center">
                        <p className="text-base font-semibold mb-3">Scan to download PollyChat app</p>
                        <div className="p-2 bg-white rounded">
                          <QRCode
                            value="https://pollytalk.promptai.cn/release/app-release.apk"
                            size={150}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">https://pollytalk.promptai.cn/release/app-release.apk</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
