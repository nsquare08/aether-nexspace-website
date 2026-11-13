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

          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Aether Nexspace operates without vendor servers, analytics collectors, or cloud profiling. Your web sessions travel directly between your Windows PC and the services you visit.
          </p>
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
        <div className="mt-12 rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#09111e] to-[#060912] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-2 text-emerald-400">
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
              onClick={() => setInspectorActive(!inspectorActive)}
              className="cursor-pointer rounded-lg border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1.5 font-mono text-xs text-emerald-200 transition hover:bg-emerald-500/25"
            >
              {inspectorActive ? 'Hide Diagnostics' : 'Inspect Local Footprint'}
            </button>
          </div>

          {/* Network Path Comparison Diagram */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Direct Aether Route */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-emerald-300 uppercase">
                  Aether Nexspace Network Path
                </span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                  Direct TLS
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-center font-mono text-xs">
                <div className="rounded-lg border border-emerald-400/30 bg-[#07131a] p-3 text-white">
                  <p className="text-[11px] text-emerald-400 font-semibold">Your Windows PC</p>
                  <p className="mt-1 text-[9px] text-slate-400">Local DPAPI Vault</p>
                </div>
                <div className="flex-1 px-3">
                  <div className="relative h-0.5 w-full bg-emerald-400">
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded bg-emerald-400 px-1 font-mono text-[9px] text-black font-semibold">
                      Direct HTTPS
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-emerald-400/30 bg-[#07131a] p-3 text-white">
                  <p className="text-[11px] text-emerald-400 font-semibold">Web Destination</p>
                  <p className="mt-1 text-[9px] text-slate-400">Official Server</p>
                </div>
              </div>
              <p className="mt-4 text-[11px] text-emerald-200/90 leading-relaxed font-mono">
                ✓ 0 bytes routed through NSquare cloud. Data never leaves your PC except directly to the service provider.
              </p>
            </div>

            {/* Conventional SaaS Workspace Route */}
            <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-5 opacity-75">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-rose-300 uppercase">
                  Typical Cloud Workspace Browser
                </span>
                <span className="rounded bg-rose-500/20 px-2 py-0.5 font-mono text-[10px] text-rose-300">
                  Cloud Relayed
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-center font-mono text-xs">
                <div className="rounded-lg border border-white/10 bg-[#160a12] p-3 text-slate-300">
                  <p className="text-[11px] text-slate-300">User PC</p>
                  <p className="mt-1 text-[9px] text-slate-500">Local Browser</p>
                </div>
                <div className="flex-1 px-2">
                  <div className="h-0.5 w-full bg-rose-500/40" />
                  <p className="mt-1 text-[9px] text-rose-400 font-mono">Telemetry Proxy</p>
                </div>
                <div className="rounded-lg border border-rose-400/20 bg-[#160a12] p-3 text-rose-200">
                  <p className="text-[11px] text-rose-300">Vendor Cloud</p>
                  <p className="mt-1 text-[9px] text-slate-500">Analytics Logged</p>
                </div>
              </div>
              <p className="mt-4 text-[11px] text-slate-400 leading-relaxed font-mono">
                ✗ Mandatory cloud logins, behavioral analytics, and central sync storage.
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
                className="mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-[#070a14] p-4 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-slate-400">
                  <span>System Diagnostics Audit</span>
                  <span className="text-emerald-400">100% Pass</span>
                </div>
                <div className="mt-3 space-y-2 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Storage Root:</span>
                    <code className="text-cyan-300">%APPDATA%\Aether\</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Outgoing Telemetry:</span>
                    <span className="text-emerald-400">0.00 KB (Absolute Zero)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Hardware Cipher:</span>
                    <span className="text-white">Windows DPAPI (CryptProtectData)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Third-Party Beacons:</span>
                    <span className="text-emerald-400">None Bundled (0 Blocked)</span>
                  </div>
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
