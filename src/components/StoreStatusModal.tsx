import { useEffect } from 'react'
import { Monitor, ShieldCheck, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { STORE_CONFIG } from '../config/store'

interface StoreStatusModalProps {
  open: boolean
  onClose: () => void
  onOpenPrivacy: () => void
}

export function StoreStatusModal({ open, onClose, onOpenPrivacy }: StoreStatusModalProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="store-status-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#0b0e18] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.95)]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="/brand/icon-256.png"
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-md"
                />
                <span className="font-display text-sm font-semibold text-white">
                  Microsoft Store Distribution
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Microsoft Store dialog"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white/10 text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/12 px-3 py-1 font-mono text-[11px] text-cyan-200">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Coming soon to Microsoft Store</span>
              </div>

              <h3
                id="store-status-modal-title"
                className="mt-4 font-display text-2xl font-semibold text-white"
              >
                Undergoing Microsoft Store Certification
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Aether Nexspace v{STORE_CONFIG.PRODUCT_VERSION} is currently completing Microsoft Store review so you can install signed builds cleanly with automatic Store-managed updates.
              </p>

              <div className="mt-5 space-y-2.5 rounded-xl border border-white/[0.08] bg-[#070911] p-4 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Publisher</span>
                  <span>NSquare</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Supported OS</span>
                  <span>Windows 10 (1809+) / Windows 11</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Pricing</span>
                  <span className="text-cyan-300">Free</span>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2.5 text-xs leading-relaxed text-slate-400">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <p>
                  To protect users, no unofficial mirror or external executable is offered here. Once approved, this button links directly to the verified Microsoft Store listing.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2.5 border-t border-white/[0.08] pt-5 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    onOpenPrivacy()
                  }}
                  className="cursor-pointer rounded-lg border border-white/10 px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
                >
                  Review Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-[#050710] transition hover:brightness-110"
                >
                  <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Got it</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
