import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'
import { CompareRealityReveal } from './CompareRealityReveal'

// ============================================================================
// ARCHITECTURAL EXPLODED LAYERS DATA (Minimalistic & Crisp)
// ============================================================================

interface StackLayer {
  id: string
  number: string
  name: string
  shortName: string
  badge: string
  summary: string
  specs: string[]
  accent: 'cyan' | 'emerald' | 'violet' | 'amber'
}

const STACK_LAYERS: StackLayer[] = [
  {
    id: 'layer-shell',
    number: '01',
    name: 'Spatial Shell',
    shortName: 'Shell',
    badge: 'Desktop Host',
    summary: 'Three isolated workspaces inside a single obsidian frame with instant shortcut switching.',
    specs: ['Personal, Work & Custom', 'Instant Shortcut Switch', 'Zero Window Clutter'],
    accent: 'cyan',
  },
  {
    id: 'layer-partitions',
    number: '02',
    name: 'Hermetic Partitions',
    shortName: 'Sandbox',
    badge: 'Sandbox Runtime',
    summary: 'Independent cookie jars and SQLite storage per service. Run two accounts side-by-side with zero bleed.',
    specs: ['Multi-Account per App', 'Zero Cookie Bleed', 'Isolated SQLite Store'],
    accent: 'emerald',
  },
  {
    id: 'layer-ram',
    number: '03',
    name: 'Resource Discipline',
    shortName: 'Memory',
    badge: 'Memory Engine',
    summary: 'Automatically suspends inactive background renderers to keep RAM minimal while retaining active logins.',
    specs: ['Smart RAM Sleep', 'Zero Login Loss', 'Instant Wakeup'],
    accent: 'violet',
  },
  {
    id: 'layer-security',
    number: '04',
    name: 'Hardware Vault',
    shortName: 'Security',
    badge: 'Local Security',
    summary: 'Workspace PINs and proxy credentials encrypted locally via Windows DPAPI. Zero cloud telemetry.',
    specs: ['Windows DPAPI (Crypt32)', 'Zero Telemetry', '100% On-Device'],
    accent: 'amber',
  },
]

const LAYER_ACCENTS: Record<
  StackLayer['accent'],
  {
    border: string
    activeBg: string
    badgeClass: string
    mesh: string
  }
> = {
  cyan: {
    border: 'border-cyan-400',
    activeBg: 'bg-cyan-500/15',
    badgeClass: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30',
    mesh: 'radial-gradient(at 0% 0%, rgba(6, 182, 212, 0.22) 0px, transparent 65%), radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.14) 0px, transparent 60%), #070a14',
  },
  emerald: {
    border: 'border-emerald-400',
    activeBg: 'bg-emerald-500/15',
    badgeClass: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
    mesh: 'radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.22) 0px, transparent 65%), radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.14) 0px, transparent 60%), #070f14',
  },
  violet: {
    border: 'border-violet-400',
    activeBg: 'bg-violet-500/15',
    badgeClass: 'bg-violet-400/10 text-violet-300 border-violet-400/30',
    mesh: 'radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.22) 0px, transparent 65%), radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.14) 0px, transparent 60%), #0a0816',
  },
  amber: {
    border: 'border-amber-400',
    activeBg: 'bg-amber-500/15',
    badgeClass: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
    mesh: 'radial-gradient(at 0% 0%, rgba(245, 158, 11, 0.22) 0px, transparent 65%), radial-gradient(at 100% 100%, rgba(239, 68, 68, 0.14) 0px, transparent 60%), #120a06',
  },
}

export function IntroSection() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0)

  const activeLayer = STACK_LAYERS[selectedLayerIndex]
  const activeAccent = LAYER_ACCENTS[activeLayer.accent]

  return (
    <section
      id="intro"
      className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#050711] py-24 sm:py-32"
    >
      {/* Background Dot Matrix */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-75"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[500px] w-[950px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.07)_0%,rgba(139,92,246,0.05)_50%,transparent_75%)] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 font-mono text-[11px] font-medium tracking-[0.14em] text-cyan-300 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" aria-hidden="true" />
            <span>05 · Cinematic Product Storytelling</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[2.85rem] lg:leading-[1.12]">
            From chaotic browser sprawl to{' '}
            <span className="bg-gradient-to-r from-[#38bdf8] via-[#06b6d4] to-[#a78bfa] bg-clip-text text-transparent">
              spatial serenity.
            </span>
          </h2>
        </div>

        {/* ================================================================
            ACT I: CINEMATIC COMPARISON REVEAL (Chaos to Aether Nexspace)
           ================================================================ */}
        <CompareRealityReveal />

        {/* ================================================================
            ACT II: MINIMALISTIC ARCHITECTURAL RUNTIME STACK
           ================================================================ */}
        <div className="mt-20 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left: Layer Selector Buttons */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs tracking-wider text-cyan-400 uppercase">
              Act II · The Runtime Stack
            </span>
            <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              Four tiers. Absolute isolation.
            </h3>
            <p className="mt-2 text-xs text-slate-400 sm:text-sm">
              Engineered from host window shell to hardware-encrypted disk.
            </p>

            <div className="mt-6 space-y-2.5">
              {STACK_LAYERS.map((layer, idx) => {
                const isSelected = selectedLayerIndex === idx
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setSelectedLayerIndex(idx)}
                    className={cn(
                      'group relative flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-left transition duration-200',
                      isSelected
                        ? 'border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_16px_rgba(6,182,212,0.18)]'
                        : 'border-white/[0.06] bg-[#0c101d]/50 hover:border-white/20 hover:bg-[#101526]'
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={cn(
                          'font-mono text-xs font-semibold transition-colors',
                          isSelected ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                        )}
                      >
                        {layer.number}
                      </span>
                      <div>
                        <p
                          className={cn(
                            'text-xs font-semibold tracking-wide transition-colors',
                            isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                          )}
                        >
                          {layer.name}
                        </p>
                        <p className="font-mono text-[10px] text-slate-400">{layer.badge}</p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        'h-1.5 w-1.5 rounded-full transition-all duration-200',
                        isSelected
                          ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee] scale-125'
                          : 'bg-transparent'
                      )}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Minimalist Detail Card with Grainy Mesh Gradient */}
          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/[0.1] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:p-8 transition-all duration-300"
              style={{
                backgroundImage: activeAccent.mesh,
              }}
            >
              {/* Grain Noise Overlay for Tactile Texture */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Radial Ambient Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"
              />

              {/* Header Badge & Status */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold',
                      activeAccent.badgeClass
                    )}
                  >
                    Tier {activeLayer.number}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{activeLayer.badge}</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400">✓ Active Stratum</span>
              </div>

              {/* Core Content */}
              <div className="relative z-10 mt-6">
                <h4 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {activeLayer.name}
                </h4>

                <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
                  {activeLayer.summary}
                </p>

                {/* Minimalist Spec Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeLayer.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-xs text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Minimalist 4-Level Strata Bar */}
              <div className="relative z-10 mt-8 border-t border-white/[0.08] pt-5">
                <div className="mb-2.5 flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <span>Runtime Strata:</span>
                  <span className="text-cyan-400">Tier {activeLayer.number} / 04</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {STACK_LAYERS.map((l, i) => {
                    const isCur = selectedLayerIndex === i
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setSelectedLayerIndex(i)}
                        className={cn(
                          'group/bar relative flex cursor-pointer flex-col items-center justify-center rounded-lg border py-2 px-1 text-center font-mono transition-all duration-200',
                          isCur
                            ? 'border-cyan-400 bg-cyan-500/20 text-white shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                            : 'border-white/[0.06] bg-black/30 text-slate-400 hover:border-white/20 hover:text-slate-200'
                        )}
                      >
                        <span className="text-[10px] font-semibold">T-0{i + 1}</span>
                        <span className="max-w-full truncate text-[9px] text-slate-400 group-hover/bar:text-slate-300">
                          {l.shortName}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
