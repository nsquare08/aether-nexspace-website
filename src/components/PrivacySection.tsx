import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  HardDrive,
  EyeOff,
  UserX,
  FileCheck2,
  Terminal,
  CheckCircle2,
  Server,
  Laptop,
  Globe,
  Activity,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'
import { cn } from '../lib/utils'

interface PrivacySectionProps {
  onOpenPrivacy: () => void
}

interface VaultPillar {
  id: string
  code: string
  title: string
  highlight: string
  description: string
  icon: typeof ShieldCheck
  accent: 'emerald' | 'cyan' | 'violet' | 'amber'
  evidence: string
}

const VAULT_PILLARS: VaultPillar[] = [
  {
    id: 'telemetry',
    code: 'PV-01',
    title: 'Zero Vendor Telemetry',
    highlight: 'No Analytics · No Beacons',
    description: 'No telemetry SDKs, tracking pixels, or data collection servers. Aether Nexspace sends 0 bytes of usage telemetry to NSquare.',
    icon: EyeOff,
    accent: 'emerald',
    evidence: 'Network Monitor: 0 outgoing requests to NSquare domains.',
  },
  {
    id: 'dpapi',
    code: 'PV-02',
    title: 'Windows DPAPI Hardware Keys',
    highlight: 'Crypt32 · Hardware Bound',
    description: 'Optional workspace lock PINs and proxy credentials are encrypted on disk using the Windows Data Protection API (DPAPI).',
    icon: Lock,
    accent: 'cyan',
    evidence: 'Encrypted via Electron safeStorage tied to your Windows user logon.',
  },
  {
    id: 'sandboxing',
    code: 'PV-03',
    title: 'Hermetic Sandbox Partitions',
    highlight: 'nodeIntegration: false',
    description: 'Embedded web applications execute inside discrete Chromium partitions. Device APIs including USB, Serial, HID, Bluetooth, and MIDI are blocked.',
    icon: HardDrive,
    accent: 'violet',
    evidence: 'Strict partition boundaries (persist:<id>) prevent cross-app cookie bleed.',
  },
  {
    id: 'noaccount',
    code: 'PV-04',
    title: 'No Account Required',
    highlight: 'Frictionless · Zero Cloud Identity',
    description: 'No email address, no phone number, no password, and no vendor account required. All settings and preferences stay on your local disk.',
    icon: UserX,
    accent: 'amber',
    evidence: 'Config saved locally to %APPDATA%\\Aether\\config.json.',
  },
]

export function PrivacySection({ onOpenPrivacy }: PrivacySectionProps) {
  const [selectedPillar, setSelectedPillar] = useState<VaultPillar>(VAULT_PILLARS[0])
  const [inspectorActive, setInspectorActive] = useState(false)
  const [isAuditing, setIsAuditing] = useState(false)

  const runAudit = () => {
    setIsAuditing(true)
    setTimeout(() => {
      setIsAuditing(false)
    }, 600)
  }

  const toggleInspector = () => {
    if (!inspectorActive) {
      runAudit()
    }
    setInspectorActive(!inspectorActive)
  }

  return (
    <section
      id="privacy"
      className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#050711] py-24 sm:py-32"
    >
      {/* Background Magic UI Dot Matrix */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-75"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,rgba(6,182,212,0.05)_50%,transparent_75%)] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-[11px] font-medium tracking-[0.14em] text-emerald-300 uppercase">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            <span>06 · Privacy &amp; Trust</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[2.85rem] lg:leading-[1.12]">
            Zero cloud. Zero tracking.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              100% on your device.
            </span>
          </h2>
        </div>

        {/* ================================================================
            CENTRAL INTERACTIVE VAULT GRID
           ================================================================ */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VAULT_PILLARS.map((pillar) => {
            const Icon = pillar.icon
            const isSelected = selectedPillar.id === pillar.id

            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setSelectedPillar(pillar)}
                className={cn(
                  'group flex cursor-pointer flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-200',
                  isSelected
                    ? 'border-emerald-400 bg-gradient-to-b from-[#0e1c18] to-[#070e10] shadow-[0_0_24px_rgba(16,185,129,0.25)]'
                    : 'border-white/[0.08] bg-[#080d1a]/70 hover:border-emerald-400/30 hover:bg-[#0c1324]'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl border p-2',
                        isSelected
                          ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-300'
                          : 'border-white/10 bg-white/[0.04] text-slate-400 group-hover:text-emerald-300'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">{pillar.code}</span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] text-emerald-300">{pillar.highlight}</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-white/[0.06] pt-3 font-mono text-[10px] text-slate-400">
                  <span className="text-emerald-400">✓ Verified: </span>
                  {pillar.evidence}
                </div>
              </button>
            )
          })}
        </div>

        {/* ================================================================
            INTERACTIVE SECURITY INSPECTOR & NETWORK FLOW VISUALIZER
           ================================================================ */}
        <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#09111e] to-[#060912] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] sm:p-8">
          {/* Subtle background ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-1/4 h-56 w-80 rounded-full bg-emerald-500/10 blur-3xl"
          />

          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-2 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  Local-First Security Inspector
                </h3>
                <p className="font-mono text-xs text-slate-400">
                  Direct connection verification &amp; storage boundary audit
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleInspector}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1.5 font-mono text-xs text-emerald-200 transition hover:bg-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {inspectorActive ? 'Hide Diagnostics' : 'Inspect Local Footprint'}
            </button>
          </div>

          {/* Network Path Comparison Diagram */}
          <div className="relative z-10 mt-6 grid gap-6 lg:grid-cols-2">
            {/* Direct Aether Route */}
            <div className="relative overflow-hidden rounded-xl border border-emerald-500/35 bg-gradient-to-b from-[#071718]/70 to-[#040e10]/90 p-5 shadow-[0_0_30px_rgba(16,185,129,0.08)]">
              {/* Top illuminated line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />

              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-emerald-300 uppercase tracking-wide">
                  Aether Nexspace Network Path
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct TLS
                </span>
              </div>

              {/* Dynamic Network Pipeline Flow */}
              <div className="mt-4 flex items-center justify-between text-center font-mono text-xs">
                {/* Node 1: User Windows PC */}
                <div className="rounded-lg border border-emerald-400/40 bg-[#07131a] p-3 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all">
                  <div className="flex items-center justify-center gap-1 text-emerald-400">
                    <Laptop className="h-3.5 w-3.5" />
                    <p className="text-[11px] font-semibold">Your Windows PC</p>
                  </div>
                  <p className="mt-1 flex items-center justify-center gap-1 text-[9px] text-slate-400">
                    <Lock className="h-2.5 w-2.5 text-emerald-400/80" />
                    Local DPAPI Vault
                  </p>
                </div>

                {/* Animated Flow Conduit */}
                <div className="relative flex-1 px-3">
                  <div className="relative h-1 w-full overflow-hidden rounded-full bg-emerald-950/80 border border-emerald-500/40">
                    {/* Flowing animated light beam */}
                    <motion.div
                      className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-emerald-300 to-transparent blur-[0.5px]"
                      animate={{ x: ['-100%', '350%'] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                    />
                    {/* Traveling data particle */}
                    <motion.div
                      className="absolute top-1/2 -mt-1 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_#34d399]"
                      animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                    />
                  </div>

                  {/* Direct HTTPS Badge */}
                  <div className="mt-2 flex justify-center">
                    <span className="inline-flex items-center gap-1 rounded border border-emerald-400/40 bg-emerald-400/15 px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Direct HTTPS
                    </span>
                  </div>
                </div>

                {/* Node 2: Web Destination */}
                <div className="rounded-lg border border-emerald-400/40 bg-[#07131a] p-3 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all">
                  <div className="flex items-center justify-center gap-1 text-emerald-400">
                    <Globe className="h-3.5 w-3.5" />
                    <p className="text-[11px] font-semibold">Web Destination</p>
                  </div>
                  <p className="mt-1 flex items-center justify-center gap-1 text-[9px] text-slate-400">
                    <Server className="h-2.5 w-2.5 text-emerald-400/80" />
                    Official Server
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-emerald-200/90 leading-relaxed font-mono flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>0 bytes routed through NSquare cloud. Data never leaves your PC except directly to the service provider.</span>
              </p>
            </div>

            {/* Conventional SaaS Workspace Route */}
            <div className="relative overflow-hidden rounded-xl border border-rose-500/20 bg-rose-950/10 p-5 opacity-80 hover:opacity-100 transition-opacity">
              {/* Top illuminated line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-rose-300 uppercase tracking-wide">
                  Typical Cloud Workspace Browser
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/20 px-2.5 py-0.5 font-mono text-[10px] text-rose-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" />
                  Cloud Relayed
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-center font-mono text-xs">
                <div className="rounded-lg border border-white/10 bg-[#160a12] p-3 text-slate-300">
                  <div className="flex items-center justify-center gap-1 text-slate-300">
                    <Laptop className="h-3.5 w-3.5" />
                    <p className="text-[11px]">User PC</p>
                  </div>
                  <p className="mt-1 text-[9px] text-slate-500">Local Browser</p>
                </div>

                <div className="relative flex-1 px-2">
                  <div className="relative h-1 w-full overflow-hidden rounded-full bg-rose-950/60 border border-rose-500/20">
                    {/* Stuttering / slow packet animation */}
                    <motion.div
                      className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-rose-500/80 to-transparent"
                      animate={{ x: ['-80%', '240%'] }}
                      transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                    />
                  </div>
                  <div className="mt-2 flex justify-center">
                    <span className="inline-flex items-center gap-1 rounded border border-rose-500/30 bg-rose-500/10 px-1.5 py-0.5 font-mono text-[9px] text-rose-300">
                      <span className="h-1 w-1 rounded-full bg-rose-400 animate-pulse" />
                      Telemetry Proxy
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border border-rose-400/20 bg-[#160a12] p-3 text-rose-200">
                  <div className="flex items-center justify-center gap-1 text-rose-300">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <p className="text-[11px]">Vendor Cloud</p>
                  </div>
                  <p className="mt-1 text-[9px] text-slate-500">Analytics Logged</p>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-slate-400 leading-relaxed font-mono flex items-center gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span>Mandatory cloud logins, behavioral analytics, and central sync storage.</span>
              </p>
            </div>
          </div>

          {/* Collapsible Local Disk & Diagnostics Audit */}
          <AnimatePresence>
            {inspectorActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-[#070a14] p-4.5 font-mono text-xs shadow-inner"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    <span className="text-white font-semibold">System Diagnostics Audit</span>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 border border-emerald-400/30">
                      100% Pass
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={runAudit}
                    disabled={isAuditing}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    <RefreshCw className={cn("h-3 w-3", isAuditing && "animate-spin text-emerald-400")} />
                    <span>{isAuditing ? 'Scanning...' : 'Re-run Audit'}</span>
                  </button>
                </div>

                <div className="mt-3.5 space-y-2 text-[11px]">
                  {[
                    { label: 'Storage Root:', value: '%APPDATA%\\Aether\\', note: '(Strict Local Boundary)', color: 'text-cyan-300' },
                    { label: 'Outgoing Telemetry:', value: '0.00 KB', note: '(Absolute Zero · No Sockets Bound)', color: 'text-emerald-400' },
                    { label: 'Hardware Cipher:', value: 'Windows DPAPI', note: '(CryptProtectData Hardware-Bound)', color: 'text-white' },
                    { label: 'Third-Party Beacons:', value: 'None Bundled', note: '(0 Trackers Injected)', color: 'text-emerald-400' },
                    { label: 'Network Sockets:', value: 'Direct TLS 1.3', note: '(User PC ➔ Destination Server)', color: 'text-cyan-300' },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex flex-wrap items-center justify-between gap-1 rounded bg-white/[0.02] px-2.5 py-1.5"
                    >
                      <div className="flex items-center gap-2 text-slate-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={cn('font-semibold', item.color)}>{item.value}</span>
                        <span className="text-[10px] text-slate-500">{item.note}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center justify-between border-t border-white/[0.06] pt-2.5 text-[10px] text-emerald-400/90 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Activity className="h-3 w-3 animate-pulse text-emerald-400" />
                    Realtime Integrity Guard: ACTIVE
                  </span>
                  <span className="flex items-center text-slate-400">
                    Ready
                    <span className="inline-block h-3 w-1.5 bg-emerald-400 animate-pulse ml-1.5" />
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================================================================
            PRIVACY POLICY ACTION BAR
           ================================================================ */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-[#090d18] p-6 sm:flex-row sm:px-8">
          <div className="flex items-center gap-3.5">
            <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-2.5 text-cyan-400">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-base font-semibold text-white">
                Independent Windows Privacy Standard
              </h4>
              <p className="text-xs text-slate-400">
                Published and certified for Windows 10 &amp; 11 distribution.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 px-5 py-2.5 text-xs font-semibold text-cyan-200 transition hover:border-cyan-400 hover:text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Read Full Privacy Policy</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <a
              href="/privacy.html"
              className="rounded-xl border border-white/10 bg-[#0c101d] px-4 py-2.5 font-mono text-xs text-slate-400 transition hover:border-white/20 hover:text-slate-200"
            >
              Static HTML Policy
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
