import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { THIRD_PARTY_ATTRIBUTIONS } from '../data/aetherContent'
import { STORE_CONFIG } from '../config/store'

interface FooterProps {
  onNavigate: (path: string, hash?: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const [noticesOpen, setNoticesOpen] = useState(false)

  useEffect(() => {
    if (!noticesOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNoticesOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [noticesOpen])

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#04060d] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-3.5">
          <img
            src="/brand/icon-256.png"
            alt="Aether Nexspace"
            width={32}
            height={32}
            loading="lazy"
            className="h-8 w-8 rounded-lg ring-1 ring-white/15"
          />
          <div>
            <p className="font-display text-sm font-semibold text-white">
              Aether Nexspace <span className="font-mono text-xs font-normal text-slate-400">v{STORE_CONFIG.PRODUCT_VERSION}</span>
            </p>
            <p className="text-xs text-slate-400">
              Published by NSquare · Copyright © 2026 NSquare. All rights reserved.
            </p>
          </div>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <a
            href="/#capabilities"
            onClick={(e) => {
              e.preventDefault()
              onNavigate('/', '#capabilities')
            }}
            className="transition hover:text-slate-200"
          >
            Capabilities
          </a>
          <a
            href="/#faq"
            onClick={(e) => {
              e.preventDefault()
              onNavigate('/', '#faq')
            }}
            className="transition hover:text-slate-200"
          >
            FAQ
          </a>
          <a
            href="/privacy"
            onClick={(e) => {
              e.preventDefault()
              onNavigate('/privacy')
            }}
            className="transition hover:text-cyan-300"
          >
            Privacy Policy
          </a>
          <button
            type="button"
            onClick={() => setNoticesOpen(true)}
            className="cursor-pointer transition hover:text-slate-200"
          >
            Third-Party Notices
          </button>
        </nav>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/[0.06] px-5 pt-6 sm:px-8">
        <p className="text-[11px] leading-relaxed text-slate-500">
          Aether Nexspace is an independent Windows desktop workspace by NSquare and is not affiliated with, sponsored by, or endorsed by third-party web services shown in the service catalog.
        </p>
      </div>

      <AnimatePresence>
        {noticesOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="third-party-notices-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNoticesOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#0b0e18] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 id="third-party-notices-title" className="font-display text-lg font-semibold text-white">
                  Third-Party Software Attributions
                </h3>
                <button
                  type="button"
                  onClick={() => setNoticesOpen(false)}
                  aria-label="Close legal notices"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white/10 text-slate-300 hover:border-white/30 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                Aether Nexspace is proprietary software published by NSquare and acknowledges the following open-source components incorporated under permissive licenses:
              </p>
              <ul className="mt-4 space-y-3 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-300">
                {THIRD_PARTY_ATTRIBUTIONS.map((credit) => (
                  <li key={credit} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    {credit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
