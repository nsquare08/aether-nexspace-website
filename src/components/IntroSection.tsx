import { useState } from 'react'
import {
  Sparkles,
  Layers,
  Cpu,
  ArrowRight,
  Database,
  Lock,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { STORE_CONFIG } from '../config/store'
import { CompareRealityReveal } from './CompareRealityReveal'

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

export function IntroSection() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0)

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
        </div>

        {/* ================================================================
            ACT I: CINEMATIC COMPARISON REVEAL (Chaos to Aether Nexspace)
           ================================================================ */}
        <CompareRealityReveal />

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
