import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Sparkles,
  Layers,
  Cpu,
  Check,
  X,
  ArrowRight,
  Database,
  Lock,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { STORE_CONFIG } from '../config/store'

// ============================================================================
// ARCHITECTURAL EXPLODED LAYERS DATA
// ============================================================================

interface StackLayer {
  id: string
  number: string
  name: string
  role: string
  detail: string
  accent: string
  icon: typeof Layers
  badge: string
}

const STACK_LAYERS: StackLayer[] = [
  {
    id: 'layer-shell',
    number: '01',
    name: 'Spatial Shell & Navigation Rail',
    role: 'Top-Level Window & Multi-Workspace Manager',
    detail: 'Three isolated spatial workspaces (Personal, Work, Custom) bounded inside a calibrated obsidian frame with roving tabindex and instant shortcut switching.',
    accent: 'cyan',
    icon: Layers,
    badge: 'Desktop Host Layer',
  },
  {
    id: 'layer-partitions',
    number: '02',
    name: 'Hermetic Storage Partitions',
    role: 'Isolated Chromium Storage per Service',
    detail: 'Every service instance runs with its own isolated cookies, cache, and IndexedDB SQLite store (persist:<id>). Up to two accounts of any app run side-by-side with zero bleed.',
    accent: 'emerald',
    icon: Database,
    badge: 'Sandbox Runtime',
  },
  {
    id: 'layer-ram',
    number: '03',
    name: 'Resource Discipline Engine',
    role: 'Automatic Inactivity Sleep & RAM Suspension',
    detail: 'Monitors real-time private memory and unloads inactive WebContents renderers during idle periods (5m–1h) without signing you out of web applications.',
    accent: 'violet',
    icon: Cpu,
    badge: 'Memory Management',
  },
  {
    id: 'layer-security',
    number: '04',
    name: 'Local Cryptographic Vault',
    role: 'Hardware-Backed Windows DPAPI Encryption',
    detail: 'Optional workspace lock PINs and proxy credentials encrypted using Windows Data Protection API (Crypt32). Absolute zero cloud servers and zero tracking telemetry.',
    accent: 'amber',
    icon: Lock,
    badge: 'Local-First Security',
  },
]

// ============================================================================
// CINEMATIC COMPARISON DATA (The Sprawl vs. The Shell)
// ============================================================================

const COMPARISONS = [
  {
    metric: 'Workspace Model',
    before: '40+ mixed browser tabs competing in one window',
    after: '3 structured workspaces with dedicated app rosters',
  },
  {
    metric: 'Multi-Account',
    before: 'Constant sign-out or multiple incognito windows',
    after: 'Isolated Chromium partitions run 2 accounts side-by-side',
  },
  {
    metric: 'Memory Usage',
    before: '2.4+ GB constantly consumed by idle background tabs',
    after: 'Automatic auto-sleep cuts idle memory to <200 MB total',
  },
  {
    metric: 'Data & Privacy',
    before: 'Mandatory cloud profiles and behavioral ad tracking',
    after: 'Zero vendor accounts, zero telemetry, 100% on-device',
  },
]

export function IntroSection() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0)
  const [realityMode, setRealityMode] = useState<'aether' | 'browser'>('aether')

  const activeLayer = STACK_LAYERS[selectedLayerIndex]

  return (
    <section
      id="intro"
      className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#050711] py-24 sm:py-32"
    >
      {/* Background Magic UI Dot Matrix */}
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

          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Everyday web apps were never meant to fight for air inside ephemeral browser tabs. Step inside the architecture of a dedicated desktop shell.
          </p>
        </div>

        {/* ================================================================
            ACT I: INTERACTIVE REALITY COMPARISON (Browser Chaos vs Aether Nexus)
           ================================================================ */}
        <div className="relative mt-16 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#070b16]/90 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)] sm:p-8 transition-colors duration-500">
          {/* Ambient dynamic atmospheric glow */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute -top-24 right-1/4 h-64 w-96 rounded-full blur-3xl transition-opacity duration-700',
              realityMode === 'aether'
                ? 'bg-cyan-500/10 opacity-100'
                : 'bg-rose-500/10 opacity-100'
            )}
          />

          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-6">
            <div>
              <span className="font-mono text-xs tracking-wider text-cyan-400 uppercase">
                Act I · The Paradigm Shift
              </span>
              <h3 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
                Compare Your Daily Workspace Experience
              </h3>
            </div>

            {/* Mode Toggle Switcher with Animated Sliding Pill */}
            <div className="relative inline-flex rounded-xl border border-white/10 bg-[#0c101e] p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setRealityMode('browser')}
                className="relative z-10 cursor-pointer rounded-lg px-4 py-2 font-mono text-xs font-semibold transition-colors duration-200"
                style={{ color: realityMode === 'browser' ? '#fecdd3' : '#94a3b8' }}
              >
                {realityMode === 'browser' && (
                  <motion.span
                    layoutId="reality-mode-indicator"
                    className="absolute inset-0 rounded-lg border border-rose-500/50 bg-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">Browser Chaos</span>
              </button>
              <button
                type="button"
                onClick={() => setRealityMode('aether')}
                className="relative z-10 cursor-pointer rounded-lg px-4 py-2 font-mono text-xs font-semibold transition-colors duration-200"
                style={{ color: realityMode === 'aether' ? '#a5f3fc' : '#94a3b8' }}
              >
                {realityMode === 'aether' && (
                  <motion.span
                    layoutId="reality-mode-indicator"
                    className="absolute inset-0 rounded-lg border border-cyan-400/60 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">Aether Nexspace</span>
              </button>
            </div>
          </div>

          {/* Interactive Metric Comparison Cards */}
          <div className="relative z-10 mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMPARISONS.map((comp, idx) => (
              <motion.div
                key={comp.metric}
                initial={false}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                animate={{
                  borderColor:
                    realityMode === 'aether'
                      ? 'rgba(34, 211, 238, 0.35)'
                      : 'rgba(244, 63, 94, 0.25)',
                  backgroundColor:
                    realityMode === 'aether'
                      ? 'rgba(10, 18, 36, 0.85)'
                      : 'rgba(22, 10, 18, 0.65)',
                  boxShadow:
                    realityMode === 'aether'
                      ? '0 0 25px rgba(6, 182, 212, 0.12)'
                      : '0 0 20px rgba(244, 63, 94, 0.06)',
                }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="relative overflow-hidden rounded-xl border p-4.5 transition-shadow"
              >
                {/* Top illuminated subtle border accent */}
                <div
                  className={cn(
                    'absolute top-0 left-0 right-0 h-[2px] transition-all duration-500',
                    realityMode === 'aether'
                      ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80'
                      : 'bg-gradient-to-r from-transparent via-rose-500/60 to-transparent opacity-50'
                  )}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                        realityMode === 'aether'
                          ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse'
                          : 'bg-rose-400/70'
                      )}
                    />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {comp.metric}
                    </span>
                  </div>

                  {/* Morphing status icon */}
                  <AnimatePresence mode="wait" initial={false}>
                    {realityMode === 'aether' ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: 45, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        className="rounded-full bg-cyan-400/10 p-1 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                      >
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="cross"
                        initial={{ scale: 0, rotate: 45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: -45, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        className="rounded-full bg-rose-500/10 p-1 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                      >
                        <X className="h-3.5 w-3.5 stroke-[2.5]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Animated description text */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={realityMode}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      'mt-3 min-h-[42px] text-xs leading-relaxed transition-colors',
                      realityMode === 'aether'
                        ? 'text-slate-200 font-medium'
                        : 'text-rose-200/80 line-through opacity-80'
                    )}
                  >
                    {realityMode === 'aether' ? comp.after : comp.before}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================================================================
            ACT II: 3D EXPLODED ARCHITECTURAL RUNTIME STACK
           ================================================================ */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: Layer Selector Buttons */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs tracking-wider text-cyan-400 uppercase">
              Act II · The Runtime Stack
            </span>
            <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              Engineered layer by layer for uncompromising isolation.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Click each architectural stratum to inspect how Aether isolates web content, safeguards memory, and encrypts credentials on disk.
            </p>

            <div className="mt-6 space-y-2">
              {STACK_LAYERS.map((layer, idx) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedLayerIndex(idx)}
                  className={cn(
                    'group/layer flex w-full cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left transition duration-200',
                    selectedLayerIndex === idx
                      ? 'border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                      : 'border-white/[0.08] bg-[#0c101d]/60 hover:border-cyan-400/30 hover:bg-[#101526]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-cyan-400">
                      {layer.number}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white group-hover/layer:text-cyan-200">
                        {layer.name}
                      </p>
                      <p className="font-mono text-[10px] text-slate-400">{layer.badge}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={cn(
                      'h-4 w-4 transition-transform duration-200',
                      selectedLayerIndex === idx ? 'text-cyan-400 translate-x-1' : 'text-slate-500'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: 3D Exploded Layer Detail Canvas */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#0e1324] via-[#090d18] to-[#060810] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.8)] sm:p-8">
              {/* Radial Top Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl"
              />

              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="rounded bg-cyan-400/10 px-2.5 py-1 font-mono text-xs font-semibold text-cyan-300">
                    Tier {activeLayer.number}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{activeLayer.badge}</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400">✓ Shipped in v{STORE_CONFIG.PRODUCT_VERSION}</span>
              </div>

              <div className="mt-6">
                <h4 className="font-display text-2xl font-semibold text-white">
                  {activeLayer.name}
                </h4>
                <p className="mt-1 font-mono text-xs text-cyan-300">{activeLayer.role}</p>

                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {activeLayer.detail}
                </p>
              </div>

              {/* Visual 3D Stack Mockup */}
              <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#070a14] p-4 font-mono text-xs text-slate-400">
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>Architecture Hierarchy:</span>
                  <span className="text-cyan-400">4 / 4 Tiers Active</span>
                </div>

                <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-[10px]">
                  {STACK_LAYERS.map((l, i) => (
                    <div
                      key={l.id}
                      className={cn(
                        'rounded border p-2 transition',
                        selectedLayerIndex === i
                          ? 'border-cyan-400 bg-cyan-500/20 text-white font-semibold'
                          : 'border-white/5 bg-white/[0.02] text-slate-500'
                      )}
                    >
                      Tier {l.number}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
