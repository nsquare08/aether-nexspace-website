import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowRight,
  ArrowLeft,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { STORE_CONFIG } from '../config/store'

// ============================================================================
// TYPES & CAPABILITY DATA
// ============================================================================

interface CapabilityData {
  id: string
  code: string
  tag: string
  title: string
  oneLiner: string
  accent: 'cyan' | 'violet' | 'emerald' | 'amber' | 'sky' | 'rose'
  metrics: string[]
  visualType: 'workspace' | 'multiaccount' | 'ram' | 'command' | 'crash' | 'notification'
}

const CAPABILITIES: CapabilityData[] = [
  {
    id: 'workspaces',
    code: 'WS-01',
    tag: 'SPATIAL ARCHITECTURE',
    title: 'Multi-Workspace Isolation',
    oneLiner: 'Three dedicated spatial environments in one window. Cycle between Personal, Work, and Custom spaces with zero tab chaos.',
    accent: 'cyan',
    metrics: ['3 Distinct Spaces', 'Up to 6 Apps / Space', 'Ctrl + Shift + [ / ]'],
    visualType: 'workspace',
  },
  {
    id: 'multiaccount',
    code: 'MA-02',
    tag: 'SESSION PARTITIONING',
    title: 'Multi-Account Partitioning',
    oneLiner: 'Run two independent accounts of any service side-by-side with discrete Chromium partitions and zero cookie bleed.',
    accent: 'emerald',
    metrics: ['Independent Cookies', 'Per-App Custom Colors', 'No Account Collision'],
    visualType: 'multiaccount',
  },
  {
    id: 'ramsuspension',
    code: 'MM-03',
    tag: 'RESOURCE DISCIPLINE',
    title: 'Intelligent RAM Suspension',
    oneLiner: 'Hibernate idle web views automatically. Reclaim up to 85% active RAM while keeping sessions and auth tokens intact.',
    accent: 'violet',
    metrics: ['5m–1h Inactivity Sleep', 'Deep Sleep Unloading', 'Instant Wakeup'],
    visualType: 'ram',
  },
  {
    id: 'commandpalette',
    code: 'KB-04',
    tag: '0MS ACCELERATOR',
    title: 'Global Command Palette',
    oneLiner: 'Instant fuzzy launcher across all services and workspaces. Intercepts at the desktop runtime layer even inside embedded web apps.',
    accent: 'sky',
    metrics: ['Fuzzy Service Search', 'Jump by Index (Ctrl+1..9)', 'Focus Trapping'],
    visualType: 'command',
  },
  {
    id: 'crashguard',
    code: 'CR-05',
    tag: 'PROCESS CONTAINMENT',
    title: 'Crash Loop & Safe Guard',
    oneLiner: 'Renderer failures remain contained to their own process without crashing your window. Atomic heartbeats restore state cleanly.',
    accent: 'rose',
    metrics: ['Process-Level Shield', 'Infinite Loop Breaker', 'Safe Mode GPU Bypass'],
    visualType: 'crash',
  },
  {
    id: 'desktopcontrols',
    code: 'NT-06',
    tag: 'DESKTOP UTILITY',
    title: 'Notification Hub & Proxy',
    oneLiner: 'Slide-out notification center with instant DND, custom alert audio chimes, sanitized JSON backups, and per-app proxy routing.',
    accent: 'amber',
    metrics: ['Global DND Toggle', 'SOCKS5 / HTTP Proxy', 'Sanitized JSON Backup'],
    visualType: 'notification',
  },
]

// ============================================================================
// BESPOKE VISUAL CARD COMPOSITIONS (Each capability gets its own custom visual)
// ============================================================================

function WorkspaceVisual() {
  const [activeSpace, setActiveSpace] = useState<'personal' | 'work' | 'custom'>('personal')

  const SPACES = {
    personal: {
      label: 'Personal',
      color: 'border-cyan-400 bg-cyan-500/10 text-cyan-300',
      apps: ['WhatsApp', 'Spotify', 'YouTube', 'Reddit'],
    },
    work: {
      label: 'Work',
      color: 'border-blue-400 bg-blue-500/10 text-blue-300',
      apps: ['Slack', 'Notion', 'Gmail', 'Linear', 'Jira'],
    },
    custom: {
      label: 'Focus',
      color: 'border-violet-400 bg-violet-500/10 text-violet-300',
      apps: ['ChatGPT', 'Claude', 'GitHub', 'Figma'],
    },
  }

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/[0.08] bg-[#070a14] p-4 text-xs">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
        <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
          Workspace Selector
        </span>
        <span className="font-mono text-[10px] text-cyan-400">Ctrl+Shift+[ ]</span>
      </div>

      {/* Interactive Tabs */}
      <div className="my-3 flex gap-1.5">
        {(['personal', 'work', 'custom'] as const).map((space) => (
          <button
            key={space}
            type="button"
            onClick={() => setActiveSpace(space)}
            className={cn(
              'flex-1 cursor-pointer rounded-lg px-2.5 py-1.5 font-mono text-[11px] font-medium transition',
              activeSpace === space
                ? 'border border-cyan-400/50 bg-cyan-500/20 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'border border-white/5 bg-[#0d1222] text-slate-400 hover:text-slate-200'
            )}
          >
            {SPACES[space].label}
          </button>
        ))}
      </div>

      {/* Active Apps Roster */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Active Applications ({SPACES[activeSpace].apps.length})</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SPACES[activeSpace].apps.map((app) => (
            <span
              key={app}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-slate-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {app}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MultiAccountVisual() {
  const [activeTab, setActiveTab] = useState<'work' | 'personal'>('work')

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/[0.08] bg-[#070a14] p-4 text-xs">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
        <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
          Chromium Partition Isolation
        </span>
        <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
          No Bleed
        </span>
      </div>

      {/* Dual Account Side-by-Side Simulation */}
      <div className="my-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('work')}
          className={cn(
            'cursor-pointer rounded-lg border p-2.5 text-left transition',
            activeTab === 'work'
              ? 'border-emerald-400 bg-emerald-500/15 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
              : 'border-white/10 bg-[#0d1222] opacity-60'
          )}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-display text-[11px] font-semibold text-white">Slack (Work)</span>
          </div>
          <p className="mt-1 font-mono text-[9px] text-emerald-300">persist:slack_work</p>
          <p className="mt-1 text-[10px] text-slate-400">corp-sso-token</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('personal')}
          className={cn(
            'cursor-pointer rounded-lg border p-2.5 text-left transition',
            activeTab === 'personal'
              ? 'border-violet-400 bg-violet-500/15 shadow-[0_0_15px_rgba(139,92,246,0.25)]'
              : 'border-white/10 bg-[#0d1222] opacity-60'
          )}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            <span className="font-display text-[11px] font-semibold text-white">Slack (Community)</span>
          </div>
          <p className="mt-1 font-mono text-[9px] text-violet-300">persist:slack_personal</p>
          <p className="mt-1 text-[10px] text-slate-400">community-auth</p>
        </button>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-[#0c101d] p-2 font-mono text-[10px] text-slate-300">
        <span className="text-emerald-400">✓ Isolated Cookies:</span> Independent SQLite jars on disk
      </div>
    </div>
  )
}

function RamSuspensionVisual() {
  const [isSleeping, setIsSleeping] = useState(false)

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/[0.08] bg-[#070a14] p-4 text-xs">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
        <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
          Memory Engine
        </span>
        <button
          type="button"
          onClick={() => setIsSleeping(!isSleeping)}
          className="cursor-pointer rounded-md border border-violet-400/40 bg-violet-500/20 px-2 py-0.5 font-mono text-[10px] text-violet-200 transition hover:bg-violet-500/30"
        >
          {isSleeping ? 'Wake App' : 'Simulate Sleep'}
        </button>
      </div>

      {/* Memory Gauge Simulation */}
      <div className="my-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-300">Renderer RAM State:</span>
          <span className="font-mono text-xs font-semibold text-violet-300">
            {isSleeping ? '18 MB (Suspended)' : '420 MB (Active)'}
          </span>
        </div>

        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#11162a]">
          <motion.div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              isSleeping
                ? 'w-[8%] bg-gradient-to-r from-emerald-400 to-cyan-400'
                : 'w-[85%] bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
            )}
          />
        </div>

        <p className="font-mono text-[10px] text-slate-400">
          {isSleeping
            ? '💤 Inactivity timer reached. WebContents renderer unloaded.'
            : '⚡ Web renderer live. Inactivity countdown active (15m).'
          }
        </p>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-[#0c101d] p-2 font-mono text-[10px] text-slate-300">
        <span className="text-violet-400">✓ Auth Preserved:</span> Tokens retained in local cache
      </div>
    </div>
  )
}

function CommandVisual() {
  const [pressedKey, setPressedKey] = useState<'Ctrl+Q' | 'Ctrl+1' | 'Alt+S'>('Ctrl+Q')

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/[0.08] bg-[#070a14] p-4 text-xs">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
        <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
          Desktop Runtime Forwarding
        </span>
        <span className="font-mono text-[10px] text-sky-400">0ms Latency</span>
      </div>

      {/* Interactive Keycaps */}
      <div className="my-3 flex items-center justify-center gap-2">
        {(['Ctrl+Q', 'Ctrl+1', 'Alt+S'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setPressedKey(key)}
            className={cn(
              'cursor-pointer rounded-lg border px-3 py-2 font-mono text-xs font-semibold shadow-[0_3px_0_rgba(0,0,0,0.6)] transition active:translate-y-0.5',
              pressedKey === key
                ? 'border-sky-300 bg-sky-400 text-[#050710] shadow-[0_0_16px_rgba(56,189,248,0.7)]'
                : 'border-white/20 bg-[#12182b] text-sky-200 hover:border-sky-400/50'
            )}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Feedback Output */}
      <div className="rounded-lg border border-white/[0.06] bg-[#0c101d] p-2 font-mono text-[10px]">
        <span className="text-sky-400">Dispatched: </span>
        <span className="text-white">
          {pressedKey === 'Ctrl+Q' && 'Fuzzy Search Overlay'}
          {pressedKey === 'Ctrl+1' && 'Jump to App 1 (WhatsApp)'}
          {pressedKey === 'Alt+S' && 'Open Settings Panel'}
        </span>
      </div>
    </div>
  )
}

function CrashGuardVisual() {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/[0.08] bg-[#070a14] p-4 text-xs">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
        <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
          Failure Containment
        </span>
        <span className="rounded bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] text-rose-300">
          Shield Active
        </span>
      </div>

      {/* Architecture Node Diagram */}
      <div className="my-2 space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">Host Desktop Shell</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-300">100% Uptime</span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-rose-500/30 bg-rose-950/20 p-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="font-semibold text-white">Renderer Process #3</span>
          </div>
          <span className="font-mono text-[10px] text-rose-300">Isolated Crash</span>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-[#0c101d] p-2 font-mono text-[10px] text-slate-300">
        <span className="text-rose-400">✓ Auto Restore:</span> Session restored via atomic snapshot
      </div>
    </div>
  )
}

function NotificationVisual() {
  const [dndActive, setDndActive] = useState(false)

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/[0.08] bg-[#070a14] p-4 text-xs">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
        <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
          Desktop Utility Hub
        </span>
        <button
          type="button"
          onClick={() => setDndActive(!dndActive)}
          className={cn(
            'cursor-pointer rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium transition',
            dndActive
              ? 'border border-amber-400/50 bg-amber-500/20 text-amber-200'
              : 'border border-white/10 bg-[#12182b] text-slate-400 hover:text-white'
          )}
        >
          {dndActive ? 'DND: On' : 'DND: Off'}
        </button>
      </div>

      <div className="my-3 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-300">System Tray Integration:</span>
          <span className="font-mono text-[10px] text-amber-400">Background Daemon</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-300">Per-App Proxy:</span>
          <span className="font-mono text-[10px] text-slate-400">SOCKS5 / HTTP Tunnel</span>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-[#0c101d] p-2 font-mono text-[10px] text-slate-300">
        <span className="text-amber-400">✓ Backups:</span> Portable JSON exports stripped of secrets
      </div>
    </div>
  )
}

// ============================================================================
// MAIN CAPABILITIES SECTION (Continuous Carousel with 3D Depth)
// ============================================================================

export function CapabilitiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll carousel ticker
  useEffect(() => {
    if (!isPlaying || isHovered) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAPABILITIES.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [isPlaying, isHovered])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % CAPABILITIES.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + CAPABILITIES.length) % CAPABILITIES.length)

  return (
    <section
      id="capabilities"
      className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#050711] py-24 sm:py-32"
    >
      {/* Background Magic UI Dot Matrix & Ambient Flare */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-75"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[450px] w-[850px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,rgba(168,85,247,0.05)_50%,transparent_75%)] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 font-mono text-[11px] font-medium tracking-[0.14em] text-cyan-300 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" aria-hidden="true" />
              <span>04 · Core Capabilities</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[2.85rem] lg:leading-[1.12]">
              Architected for{' '}
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#06b6d4] to-[#a78bfa] bg-clip-text text-transparent">
                absolute desktop flow.
              </span>
            </h2>

            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              Every capability runs locally inside Aether Nexspace v{STORE_CONFIG.PRODUCT_VERSION}—engineered for stability, session autonomy, and zero RAM waste.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause carousel auto-play' : 'Resume carousel auto-play'}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0c101d] text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous capability"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0c101d] text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next capability"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0c101d] text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
            >
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="ml-2 font-mono text-xs text-slate-400">
              <span className="font-semibold text-cyan-300">0{currentIndex + 1}</span> / 0{CAPABILITIES.length}
            </div>
          </div>
        </div>

        {/* ================================================================
            HORIZONTAL 3D SLIDING CAROUSEL
           ================================================================ */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mt-12 overflow-hidden"
        >
          {/* Active Featured Card with 3D Depth */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            {/* Left: Interactive Details & Visual */}
            <div className="lg:col-span-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={CAPABILITIES[currentIndex].id}
                  initial={{ opacity: 0, x: 40, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#0c101e] to-[#070a14] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.7)] sm:p-8"
                >
                  {/* Atmospheric Top Glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl"
                  />

                  <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
                    {/* Copy Column */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3">
                        <span className="rounded bg-cyan-400/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan-300">
                          {CAPABILITIES[currentIndex].code}
                        </span>
                        <span className="font-mono text-[11px] tracking-wider text-slate-400 uppercase">
                          {CAPABILITIES[currentIndex].tag}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                        {CAPABILITIES[currentIndex].title}
                      </h3>

                      <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                        {CAPABILITIES[currentIndex].oneLiner}
                      </p>

                      {/* Pill Metrics */}
                      <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-5">
                        {CAPABILITIES[currentIndex].metrics.map((metric) => (
                          <span
                            key={metric}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0f1424] px-3 py-1.5 font-mono text-xs text-slate-200"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bespoke Interactive Visual Column */}
                    <div className="h-[260px] lg:col-span-5">
                      {CAPABILITIES[currentIndex].visualType === 'workspace' && <WorkspaceVisual />}
                      {CAPABILITIES[currentIndex].visualType === 'multiaccount' && <MultiAccountVisual />}
                      {CAPABILITIES[currentIndex].visualType === 'ram' && <RamSuspensionVisual />}
                      {CAPABILITIES[currentIndex].visualType === 'command' && <CommandVisual />}
                      {CAPABILITIES[currentIndex].visualType === 'crash' && <CrashGuardVisual />}
                      {CAPABILITIES[currentIndex].visualType === 'notification' && <NotificationVisual />}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Peek Navigation Strip */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {CAPABILITIES.map((cap, idx) => (
              <button
                key={cap.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 transition duration-200',
                  currentIndex === idx
                    ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'border-white/[0.08] bg-[#090d18] text-slate-400 hover:border-white/20 hover:text-slate-200'
                )}
              >
                <span className="font-mono text-xs font-semibold">{cap.code}</span>
                <span className="text-xs font-medium">{cap.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
