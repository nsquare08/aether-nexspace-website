import { CheckCircle2, Monitor } from 'lucide-react'
import { StoreCtaButton } from './StoreCtaButton'
import { getStoreBadgeLabel, isStoreLive, STORE_CONFIG } from '../config/store'

interface DownloadSectionProps {
  onOpenStoreModal: () => void
}

const RELEASE_SPECS = [
  'Windows 10 (1809+) & Windows 11',
  `Release v${STORE_CONFIG.PRODUCT_VERSION} · Free on Microsoft Store`,
  'Zero NSquare vendor account required',
]

export function DownloadSection({ onOpenStoreModal }: DownloadSectionProps) {
  const live = isStoreLive()

  return (
    <section
      id="download"
      className="relative z-10 border-t border-white/[0.07] bg-[#050710] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.11] bg-gradient-to-b from-[#0e1222] to-[#080b14] p-8 text-center shadow-[0_32px_90px_-30px_rgba(6,182,212,0.22)] sm:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl"
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3.5 py-1.5 font-mono text-xs text-cyan-200">
              <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{getStoreBadgeLabel()}</span>
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Make room for a better digital workspace.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base text-slate-300">
              {live
                ? 'Install Aether Nexspace directly from the official Microsoft Store listing for automatic Store-managed updates.'
                : 'Aether Nexspace is undergoing Microsoft Store certification. Public download activates here once Store review is complete.'}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4">
              <StoreCtaButton onOpenComingSoon={onOpenStoreModal} className="px-8 py-4 text-base" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/[0.08] pt-6">
              {RELEASE_SPECS.map((spec) => (
                <div
                  key={spec}
                  className="inline-flex items-center gap-2 font-mono text-xs text-slate-300"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
