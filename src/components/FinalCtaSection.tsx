import { StoreCtaButton } from './StoreCtaButton'
import { getStoreBadgeLabel } from '../config/store'

interface FinalCtaSectionProps {
  onOpenStoreModal: () => void
}

export function FinalCtaSection({ onOpenStoreModal }: FinalCtaSectionProps) {
  return (
    <section className="relative z-10 overflow-hidden border-t border-white/[0.07] bg-[#050710] py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[440px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.16),rgba(124,58,237,0.1)_48%,transparent_72%)] blur-3xl"
      />

      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <div className="mx-auto mb-7 inline-flex rounded-3xl border border-white/15 bg-[#090c17] p-3 shadow-[0_0_50px_-10px_rgba(56,189,248,0.4)]">
          <img
            src="/brand/icon-256.png"
            alt="Aether Nexspace official emblem"
            width={72}
            height={72}
            loading="lazy"
            className="h-16 w-16 rounded-2xl object-cover sm:h-18 sm:w-18"
          />
        </div>

        <p className="font-mono text-xs tracking-[0.18em] text-cyan-400 uppercase">
          {getStoreBadgeLabel()}
        </p>

        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Focused work begins with an uncluttered desktop.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base text-slate-300">
          Bring your messaging, mail, docs, and AI tools together under isolated partitions—designed and published for Windows by NSquare.
        </p>

        <div className="mt-9 flex justify-center">
          <StoreCtaButton onOpenComingSoon={onOpenStoreModal} className="px-8 py-4 text-base" />
        </div>
      </div>
    </section>
  )
}
