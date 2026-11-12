import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { StoreCtaButton } from './StoreCtaButton'
import { getStoreBadgeLabel, isStoreLive } from '../config/store'

interface NavbarProps {
  currentPath: string
  onNavigate: (path: string, hash?: string) => void
  onOpenStoreModal: () => void
}

const NAV_LINKS = [
  { label: 'Overview', hash: '#intro' },
  { label: 'Showcase', hash: '#showcase' },
  { label: 'Capabilities', hash: '#capabilities' },
  { label: 'Story', hash: '#story' },
  { label: 'Privacy', hash: '#privacy' },
  { label: 'FAQ', hash: '#faq' },
]

export function Navbar({ currentPath, onNavigate, onOpenStoreModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const handleLinkClick = (hash: string) => {
    setMobileOpen(false)
    onNavigate('/', hash)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-white/[0.08] bg-[#050710]/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-[#050710]/85 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            setMobileOpen(false)
            onNavigate('/', currentPath === '/' ? '#hero' : undefined)
          }}
          className="group flex items-center gap-3 focus-visible:outline-none"
        >
          <img
            src="/brand/icon-256.png"
            alt="Aether Nexspace logo"
            width={34}
            height={34}
            className="h-8.5 w-8.5 rounded-lg object-cover ring-1 ring-white/15 transition group-hover:ring-cyan-400/50"
          />
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold tracking-tight text-white sm:text-base">
              Aether Nexspace
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">
              NSquare
            </span>
          </div>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.hash}
              href={`/${item.hash}`}
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick(item.hash)
              }}
              className="text-xs font-medium tracking-wide text-slate-300 transition hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] ${
              isStoreLive()
                ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
                : 'border-white/10 bg-white/[0.03] text-slate-300'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isStoreLive() ? 'bg-emerald-400' : 'bg-cyan-400 animate-pulse'
              }`}
            />
            {isStoreLive() ? 'Microsoft Store' : getStoreBadgeLabel()}
          </span>
          <StoreCtaButton variant="nav" onOpenComingSoon={onOpenStoreModal} />
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-200 transition hover:border-cyan-400/40 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-b border-white/10 bg-[#070911]/95 px-5 py-5 backdrop-blur-2xl md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.hash}
                  href={`/${item.hash}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(item.hash)
                  }}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.05] hover:text-cyan-300"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault()
                  setMobileOpen(false)
                  onNavigate('/privacy')
                }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-cyan-300"
              >
                Privacy Policy
              </a>
            </nav>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="mb-3 font-mono text-[11px] text-slate-400">{getStoreBadgeLabel()}</p>
              <StoreCtaButton
                onOpenComingSoon={() => {
                  setMobileOpen(false)
                  onOpenStoreModal()
                }}
                className="w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
