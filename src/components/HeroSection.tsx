import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, Layers, Cpu, ShieldCheck, Sparkles, UserCheck } from 'lucide-react'
import { StoreCtaButton } from './StoreCtaButton'
import { isStoreLive, STORE_CONFIG } from '../config/store'

interface HeroSectionProps {
  onOpenStoreModal: () => void
  onExplore: () => void
}

const HERO_TELEMETRY = [
  { icon: Layers, label: '38 Built-in Services' },
  { icon: ShieldCheck, label: 'Zero Tracking' },
  { icon: UserCheck, label: 'No Account Required' },
  { icon: Cpu, label: 'Auto-Sleep RAM Engine' },
]

export function HeroSection({ onOpenStoreModal, onExplore }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 22,
        opacity: 0,
        duration: 0.78,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })

      gsap.from('.hero-frame-reveal', {
        y: 36,
        scale: 0.98,
        opacity: 0,
        duration: 0.95,
        delay: 0.18,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })

      gsap.to('.hero-orbit-ring', {
        rotate: 360,
        duration: 54,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleFrameMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current || !glowRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(480px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.16), transparent 65%)`
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Atmospheric radial light planes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[620px] w-[1120px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.16)_0%,rgba(124,58,237,0.11)_42%,transparent_72%)] blur-3xl"
      />

      {/* Precision SVG orbital vector framing */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 1000"
        className="hero-orbit-ring pointer-events-none absolute -top-28 left-1/2 -z-10 h-[760px] w-[760px] -translate-x-1/2 opacity-25 sm:h-[920px] sm:w-[920px]"
      >
        <circle cx="500" cy="500" r="340" fill="none" stroke="rgba(56,189,248,0.22)" strokeWidth="1" strokeDasharray="6 10" />
        <circle cx="500" cy="500" r="445" fill="none" stroke="rgba(124,58,237,0.18)" strokeWidth="1" />
        <circle cx="840" cy="500" r="4" fill="#38bdf8" />
        <circle cx="160" cy="500" r="3" fill="#7c3aed" />
      </svg>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="hero-stagger mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#0c0d14]/85 px-4 py-1.5 backdrop-blur-md">
            <img
              src="/brand/icon-256.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 rounded"
            />
            <span className="font-mono text-[11px] tracking-[0.12em] text-cyan-300 uppercase">
              Windows 10 &amp; 11 · v{STORE_CONFIG.PRODUCT_VERSION}
            </span>
            {isStoreLive() && (
              <>
                <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                <span className="font-mono text-[11px] text-slate-300">
                  Available on Microsoft Store
                </span>
              </>
            )}
          </div>

          <h1 className="hero-stagger font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.5rem] lg:leading-[1.03]">
            Everything you need.
            <span className="block whitespace-nowrap mt-1 sm:mt-2">
              <span className="text-[#06b6d4]">One</span>{' '}
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#a78bfa] bg-clip-text text-transparent">
                space.
              </span>
            </span>
          </h1>

          <div className="hero-stagger mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-slate-400">
            {HERO_TELEMETRY.map(({ icon: Icon, label }) => (
              <div key={label} className="inline-flex items-center gap-2 font-mono">
                <Icon className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="hero-stagger mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#06b6d4] via-[#38bdf8] to-[#0078d4] px-7 py-3.5 text-sm font-semibold text-[#050710] shadow-[0_0_32px_-8px_rgba(56,189,248,0.65)] transition hover:brightness-110 sm:w-auto"
            >
              <span>Explore Aether</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>

            <StoreCtaButton
              variant="secondary"
              onOpenComingSoon={onOpenStoreModal}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        {/* Flagship Desktop Frame Composition */}
        <div
          ref={frameRef}
          onMouseMove={handleFrameMouseMove}
          className="hero-frame-reveal relative mx-auto mt-14 max-w-6xl rounded-2xl border border-white/[0.11] bg-[#0b0d16]/90 p-2 shadow-[0_32px_90px_-24px_rgba(0,0,0,0.9),0_0_60px_-20px_rgba(6,182,212,0.2)] sm:mt-16 sm:p-3"
        >
          <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          />

          <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#070911]">
            <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0c0d14] px-4 py-2.5">
              <div className="flex items-center gap-2.5">
                <img
                  src="/brand/icon-256.png"
                  alt=""
                  width={18}
                  height={18}
                  className="h-4.5 w-4.5 rounded"
                />
                <span className="font-display text-xs font-medium text-slate-200">
                  Aether Nexspace — Personal Workspace
                </span>
              </div>
              <div className="hidden items-center gap-2 font-mono text-[11px] text-slate-400 sm:flex">
                <Sparkles className="h-3 w-3 text-cyan-400" aria-hidden="true" />
                <span>Command Palette:</span>
                <kbd className="rounded border border-white/15 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-slate-200">
                  Ctrl+Q
                </kbd>
              </div>
            </div>

            <img
              src="/screenshots/1-home-dark.png"
              alt="Aether Nexspace desktop application home screen showing Personal workspace, service quick-launch cards, and navigation bar"
              width={1600}
              height={1000}
              decoding="async"
              fetchPriority="high"
              className="block h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
