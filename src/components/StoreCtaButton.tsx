import { ArrowUpRight } from 'lucide-react'
import { isStoreLive, STORE_CONFIG } from '../config/store'
import { MicrosoftStoreIcon } from './MicrosoftStoreIcon'

interface StoreCtaButtonProps {
  onOpenComingSoon?: () => void
  variant?: 'primary' | 'secondary' | 'nav'
  className?: string
  label?: string
}

export function StoreCtaButton({
  onOpenComingSoon,
  variant = 'primary',
  className = '',
  label = 'Download From Store',
}: StoreCtaButtonProps) {
  const live = isStoreLive()

  const baseStyles =
    variant === 'nav'
      ? 'inline-flex items-center gap-2 rounded-md border border-cyan-400/35 bg-cyan-500/12 px-3.5 py-2 text-xs font-medium tracking-wide text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-500/20 hover:text-white'
      : variant === 'secondary'
        ? 'inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-slate-100 transition hover:border-cyan-400/45 hover:bg-white/[0.08]'
        : 'inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#06b6d4] via-[#38bdf8] to-[#0078d4] px-6 py-3.5 text-sm font-semibold text-[#050710] shadow-[0_0_28px_-6px_rgba(6,182,212,0.55)] transition hover:brightness-110'

  const handleStoreClick = () => {
    // Attempt to invoke the native Windows Store application on Windows devices
    if (typeof window !== 'undefined' && /Windows/i.test(navigator.userAgent || '')) {
      try {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = STORE_CONFIG.STORE_APP_URI
        document.body.appendChild(iframe)
        setTimeout(() => {
          try {
            document.body.removeChild(iframe)
          } catch {}
        }, 2000)
      } catch {}
    }
  }

  if (live) {
    return (
      <a
        href={STORE_CONFIG.STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleStoreClick}
        className={`${baseStyles} ${className}`.trim()}
      >
        <MicrosoftStoreIcon className="h-4 w-4 shrink-0" />
        <span>{label}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onOpenComingSoon}
      className={`${baseStyles} cursor-pointer ${className}`.trim()}
    >
      <MicrosoftStoreIcon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </button>
  )
}
