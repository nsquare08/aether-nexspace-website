import { ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import { PRIVACY_GUARANTEES } from '../data/aetherContent'

interface PrivacySectionProps {
  onOpenPrivacy: () => void
}

export function PrivacySection({ onOpenPrivacy }: PrivacySectionProps) {
  return (
    <section
      id="privacy"
      className="relative z-10 border-t border-white/[0.07] bg-[#060811]/95 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              <span>05 · Privacy &amp; Trust</span>
            </div>

            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Your sessions stay on your machine. Full stop.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Aether Nexspace does not operate user accounts, analytics collectors, or NSquare cloud servers that inspect or sync what you do inside your apps. Traffic inside each workspace travels directly between your Windows device and the web services you choose to open.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault()
                  onOpenPrivacy()
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20 hover:text-white"
              >
                <Lock className="h-4 w-4" aria-hidden="true" />
                <span>Read Full Privacy Policy</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="/privacy.html"
                className="font-mono text-xs text-slate-400 underline decoration-white/20 underline-offset-4 transition hover:text-slate-200"
              >
                Static HTML Policy (EN / ES)
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#090d18]">
              <div className="border-b border-white/[0.08] bg-[#0c101d] px-6 py-3.5">
                <span className="font-mono text-xs tracking-wider text-slate-400 uppercase">
                  Verified Local-First Security Matrix
                </span>
              </div>

              <div className="divide-y divide-white/[0.08]">
                {PRIVACY_GUARANTEES.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-3 px-6 py-5 sm:grid-cols-12 sm:items-center"
                  >
                    <div className="sm:col-span-4">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                    </div>
                    <div className="sm:col-span-3">
                      <span className="inline-block rounded border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-xs text-cyan-300">
                        {item.value}
                      </span>
                    </div>
                    <div className="sm:col-span-5">
                      <p className="text-xs leading-relaxed text-slate-400">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
