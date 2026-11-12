import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  Command,
  Plus,
  Globe,
  MessageSquare,
  Briefcase,
  Code2,
  Tv,
  Zap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { SERVICE_CATEGORY_GROUPS } from '../data/aetherContent'
import { cn } from '../lib/utils'

interface ServiceItem {
  name: string
  category: string
  accent: 'cyan' | 'violet' | 'emerald' | 'amber'
}

const CATEGORY_META = {
  All: { label: 'All Services', count: 38, icon: Globe },
  'Messaging & Meetings': { label: 'Messaging', count: 9, icon: MessageSquare, accent: 'cyan' as const },
  'Productivity & Email': { label: 'Productivity', count: 11, icon: Briefcase, accent: 'emerald' as const },
  'AI, Code & Design': { label: 'AI & Code', count: 7, icon: Code2, accent: 'violet' as const },
  'Media, Social & Web': { label: 'Media & Web', count: 11, icon: Tv, accent: 'amber' as const },
}

const ALL_SERVICES: ServiceItem[] = SERVICE_CATEGORY_GROUPS.flatMap((group) => {
  const accent =
    group.category === 'Messaging & Meetings'
      ? 'cyan'
      : group.category === 'Productivity & Email'
        ? 'emerald'
        : group.category === 'AI, Code & Design'
          ? 'violet'
          : 'amber'

  return group.services.map((svc) => ({
    name: svc,
    category: group.category,
    accent,
  }))
})

interface ShortcutItem {
  keys: string
  action: string
  scope: 'Navigation' | 'System' | 'Workspaces'
  description: string
}

const SHORTCUTS: ShortcutItem[] = [
  {
    keys: 'Ctrl + Q',
    action: 'Open Command Palette',
    scope: 'Navigation',
    description: 'Fuzzy search across all services and workspaces instantly',
  },
  {
    keys: 'Ctrl + Shift + [',
    action: 'Previous Workspace',
    scope: 'Workspaces',
    description: 'Switch backward between Personal, Work & Custom spaces',
  },
  {
    keys: 'Ctrl + Shift + ]',
    action: 'Next Workspace',
    scope: 'Workspaces',
    description: 'Switch forward between Personal, Work & Custom spaces',
  },
  {
    keys: 'Ctrl + 1…9',
    action: 'Jump to App by Index',
    scope: 'Navigation',
    description: 'Directly focus a sandboxed service in the current workspace',
  },
  {
    keys: 'Ctrl + B',
    action: 'Toggle Sidebar Width',
    scope: 'System',
    description: 'Expand or collapse the service launcher sidebar',
  },
  {
    keys: 'Alt + S',
    action: 'Open Settings',
    scope: 'System',
    description: 'Manage inactivity sleep timers, themes, and partitions',
  },
  {
    keys: 'Ctrl + Shift + D',
    action: 'Toggle Do Not Disturb',
    scope: 'System',
    description: 'Mute badge counters and desktop notification sound alerts',
  },
]

// Aceternity-style mouse-following spotlight card wrapper
function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#080b14]/80 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
        className
      )}
    >
      {/* Dynamic radial gradient spotlight (Aceternity style) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.12), transparent 70%)`
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* Magic UI subtle border beam on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.05] group-hover:ring-cyan-400/20 transition-all duration-300"
        aria-hidden="true"
      />

      <div className="relative z-10 p-6 sm:p-8">{children}</div>
    </div>
  )
}

export function ServicesEcosystemSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [activeShortcutFilter, setActiveShortcutFilter] = useState<'All' | 'Navigation' | 'Workspaces' | 'System'>('All')
  const [recentlyTriggeredKey, setRecentlyTriggeredKey] = useState<string | null>(null)
  const [customUrlInput, setCustomUrlInput] = useState('')

  // Filter services by category and search
  const filteredServices = useMemo(() => {
    return ALL_SERVICES.filter((svc) => {
      const matchesCategory = activeCategory === 'All' || svc.category === activeCategory
      const matchesSearch =
        searchQuery.trim() === '' ||
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Filter shortcuts
  const filteredShortcuts = useMemo(() => {
    if (activeShortcutFilter === 'All') return SHORTCUTS
    return SHORTCUTS.filter((s) => s.scope === activeShortcutFilter)
  }, [activeShortcutFilter])

  // Key trigger simulator
  const triggerShortcut = (keys: string) => {
    setRecentlyTriggeredKey(keys)
    setTimeout(() => {
      setRecentlyTriggeredKey((curr) => (curr === keys ? null : curr))
    }, 1500)
  }

  // Global keydown listener so typing keys live in browser provides tactile feedback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'q') {
        e.preventDefault()
        triggerShortcut('Ctrl + Q')
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        triggerShortcut('Ctrl + B')
      } else if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault()
        triggerShortcut('Alt + S')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section
      id="ecosystem"
      className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#050710] py-24 sm:py-32"
    >
      {/* Background Magic UI Dot Matrix & Atmospheric Flare */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-75"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1)_0%,rgba(124,58,237,0.06)_45%,transparent_70%)] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 font-mono text-[11px] font-medium tracking-[0.14em] text-cyan-300 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" aria-hidden="true" />
            <span>03 · Service Ecosystem &amp; Command Flow</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[2.85rem] lg:leading-[1.12]">
            Your entire digital stack,{' '}
            <span className="bg-gradient-to-r from-[#38bdf8] via-[#06b6d4] to-[#a78bfa] bg-clip-text text-transparent">
              native to your desktop.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Launch from 38 pre-configured web services, inject any custom HTTPS destination, and navigate with zero-latency global shortcuts.
          </p>
        </div>

        {/* Side-by-Side Modern Interactive Cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* ========================================================
              LEFT CONTAINER: Interactive Service Ecosystem Catalog
             ======================================================== */}
          <div className="lg:col-span-7">
            <SpotlightCard className="flex flex-col gap-6">
              {/* Header & Badges */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-5">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-cyan-400 uppercase">
                    <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Curated Catalog · 38 Built-in + Custom</span>
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-white">
                    Supported Digital Services
                  </h3>
                </div>

                <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Isolated Chromium Partitions</span>
                </div>
              </div>

              {/* Search Bar + Live Counter */}
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name (e.g. WhatsApp, Claude, Notion, Figma)..."
                  className="w-full rounded-xl border border-white/[0.1] bg-[#0c101c] py-2.5 pr-24 pl-10 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-[#0f1424] focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition"
                />
                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-slate-400">
                  {filteredServices.length} match{filteredServices.length === 1 ? '' : 'es'}
                </span>
              </div>

              {/* Magic UI Sliding Category Pill Selector */}
              <div className="flex flex-wrap gap-1.5 border-b border-white/[0.07] pb-4">
                {Object.entries(CATEGORY_META).map(([key, meta]) => {
                  const isActive = activeCategory === key
                  const Icon = meta.icon

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setActiveCategory(key)
                        setSelectedService(null)
                      }}
                      className={cn(
                        'relative cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs transition duration-200 flex items-center gap-1.5',
                        isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/25 to-blue-500/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon className="relative z-10 h-3.5 w-3.5" aria-hidden="true" />
                      <span className="relative z-10">{meta.label}</span>
                      <span className="relative z-10 text-[10px] opacity-60">({meta.count})</span>
                    </button>
                  )
                })}
              </div>

              {/* Interactive Service Tiles Grid */}
              <div className="max-h-[340px] overflow-y-auto pr-1 space-y-2 [scrollbar-width:thin] [scrollbar-color:rgba(56,189,248,0.2)_transparent]">
                {filteredServices.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
                    <p className="text-sm text-slate-400">No built-in services match &ldquo;{searchQuery}&rdquo;</p>
                    <p className="mt-1 font-mono text-xs text-cyan-300">
                      You can add it below as a Custom HTTPS Service!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {filteredServices.map((svc) => {
                      const isSelected = selectedService?.name === svc.name

                      return (
                        <motion.button
                          key={svc.name}
                          type="button"
                          onClick={() => setSelectedService(isSelected ? null : svc)}
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            'group/tile flex items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-200 cursor-pointer',
                            isSelected
                              ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                              : 'border-white/[0.08] bg-[#0c101d]/60 hover:border-cyan-400/40 hover:bg-[#101526]'
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={cn(
                                'h-2 w-2 rounded-full shrink-0',
                                svc.accent === 'cyan'
                                  ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                                  : svc.accent === 'emerald'
                                    ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                                    : svc.accent === 'violet'
                                      ? 'bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]'
                                      : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                              )}
                            />
                            <span className="truncate text-xs font-medium text-slate-200 group-hover/tile:text-white">
                              {svc.name}
                            </span>
                          </div>

                          <span className="font-mono text-[9px] text-slate-500 group-hover/tile:text-cyan-300">
                            2× acc
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Live Selected Service Inspector Sheet */}
              <AnimatePresence mode="wait">
                {selectedService && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 8 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 8 }}
                    className="overflow-hidden rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-950/40 via-[#0a1120] to-[#0c0d18] p-4 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                        <span className="font-display font-semibold text-white">
                          {selectedService.name} Partition Architecture
                        </span>
                      </div>
                      <span className="rounded bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                        {selectedService.category}
                      </span>
                    </div>
                    <p className="mt-2 text-slate-300 leading-relaxed">
                      Isolated in a separate Chromium partition (<code className="text-cyan-300">persist:{selectedService.name.toLowerCase()}</code>). Supports 2 concurrent accounts (e.g. Work &amp; Personal) with auto-sleep memory suspension and zero tracking bleed.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive Custom HTTPS Service Adder Simulation */}
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-4 transition-all duration-300 hover:border-cyan-400/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4 text-cyan-400" />
                    <span className="font-display text-xs font-semibold text-white">
                      Need another web service or private internal dashboard?
                    </span>
                  </div>
                  <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300">
                    Unlimited Custom
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mb-3">
                  Aether Nexspace accepts any custom HTTPS endpoint with dedicated partition cookies, custom icons, and user-agent overrides.
                </p>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Globe className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                    <input
                      type="url"
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      placeholder="https://dashboard.internal.company.com"
                      className="w-full rounded-lg border border-white/10 bg-[#070911] py-1.5 pr-3 pl-9 font-mono text-[11px] text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!customUrlInput) setCustomUrlInput('https://my-custom-saas.com')
                    }}
                    className="cursor-pointer rounded-lg bg-white/10 px-3 py-1.5 font-mono text-[11px] text-white hover:bg-cyan-500 hover:text-[#050710] transition"
                  >
                    Simulate Add
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* ========================================================
              RIGHT CONTAINER: WebContents Shortcuts & Controls
             ======================================================== */}
          <div className="lg:col-span-5">
            <SpotlightCard className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-2 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Command className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.14em] text-cyan-400 uppercase">
                      WebContents Shortcut Forwarding
                    </p>
                    <h3 className="mt-0.5 font-display text-2xl font-semibold text-white">
                      Default Keybindings
                    </h3>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                  0ms Latency
                </span>
              </div>

              <p className="text-xs leading-relaxed text-slate-300">
                Shortcuts intercept at the desktop runtime layer, executing even while typing inside sandboxed web views. Click or press keys to test the accelerator response:
              </p>

              {/* Shortcut Scope Filter Tabs */}
              <div className="flex flex-wrap gap-1 border-b border-white/[0.07] pb-3">
                {(['All', 'Navigation', 'Workspaces', 'System'] as const).map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => setActiveShortcutFilter(scope)}
                    className={cn(
                      'cursor-pointer rounded-md px-2.5 py-1 font-mono text-[11px] transition',
                      activeShortcutFilter === scope
                        ? 'border border-cyan-400/40 bg-cyan-500/15 text-cyan-200'
                        : 'border border-transparent text-slate-400 hover:text-slate-200'
                    )}
                  >
                    {scope}
                  </button>
                ))}
              </div>

              {/* Interactive Keybinding Items */}
              <div className="space-y-2.5">
                {filteredShortcuts.map((item) => {
                  const isRecentlyTriggered = recentlyTriggeredKey === item.keys

                  return (
                    <motion.div
                      key={item.keys}
                      onClick={() => triggerShortcut(item.keys)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        'group/key flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all duration-200',
                        isRecentlyTriggered
                          ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_24px_rgba(6,182,212,0.4)]'
                          : 'border-white/[0.08] bg-[#0c101d]/60 hover:border-cyan-400/30 hover:bg-[#101526]'
                      )}
                    >
                      <div className="pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white group-hover/key:text-cyan-200">
                            {item.action}
                          </span>
                          <span className="font-mono text-[9px] text-slate-500 uppercase">
                            · {item.scope}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-400 leading-snug">
                          {item.description}
                        </p>
                      </div>

                      {/* 3D-styled Mechanical Keycap with tactile glow */}
                      <kbd
                        className={cn(
                          'shrink-0 rounded-lg border px-2.5 py-1.5 font-mono text-xs font-semibold shadow-[0_4px_0_rgba(0,0,0,0.6)] transition-all duration-150 active:translate-y-0.5 active:shadow-none',
                          isRecentlyTriggered
                            ? 'border-cyan-300 bg-cyan-400 text-[#050710] shadow-[0_0_12px_rgba(56,189,248,0.8)] scale-105'
                            : 'border-white/20 bg-gradient-to-b from-[#182032] to-[#0c101d] text-cyan-300 group-hover/key:border-cyan-400/60'
                        )}
                      >
                        {item.keys}
                      </kbd>
                    </motion.div>
                  )
                })}
              </div>

              {/* Interactive Keycap Press Feedback Banner */}
              <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#090d18] px-3.5 py-2.5 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-slate-400">
                  <Zap className="h-3.5 w-3.5 text-cyan-400" />
                  <span>
                    {recentlyTriggeredKey ? (
                      <span className="text-cyan-300 font-semibold animate-pulse">
                        Dispatched: {recentlyTriggeredKey}
                      </span>
                    ) : (
                      'Try pressing Ctrl+Q or Alt+S'
                    )}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Customizable in Settings
                </span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  )
}
