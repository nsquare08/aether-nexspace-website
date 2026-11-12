import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Command,
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
  icon: string
}

const SERVICE_ICONS: Record<string, string> = {
  WhatsApp: '/icons/apps/whatsapp.png',
  Telegram: '/icons/apps/telegram.png',
  Discord: '/icons/apps/discord.png',
  Slack: '/icons/apps/slack.png',
  'Microsoft Teams': '/icons/apps/microsoftteams.png',
  Signal: '/icons/apps/signal.png',
  Snapchat: '/icons/apps/snapchat.png',
  'Google Meet': '/icons/apps/googlemeet.png',
  Zoom: '/icons/apps/zoom.png',
  Gmail: '/icons/apps/gmail.png',
  Outlook: '/icons/apps/microsoftoutlook.png',
  ProtonMail: '/icons/apps/protonmail.png',
  Notion: '/icons/apps/notion.png',
  'Google Drive': '/icons/apps/googledrive.png',
  'Google Calendar': '/icons/apps/googlecalendar.png',
  Trello: '/icons/apps/trello.png',
  Todoist: '/icons/apps/todoist.png',
  Linear: '/icons/apps/linear.png',
  Jira: '/icons/apps/jira.png',
  OneDrive: '/icons/apps/onedrive.png',
  ChatGPT: '/icons/apps/chatgpt.png',
  Claude: '/icons/apps/claude.png',
  Gemini: '/icons/apps/gemini.png',
  GitHub: '/icons/apps/github.png',
  GitLab: '/icons/apps/gitlab.png',
  Figma: '/icons/apps/figma.png',
  Miro: '/icons/apps/miro.png',
  YouTube: '/icons/apps/youtube.png',
  Spotify: '/icons/apps/spotify.png',
  'YouTube Music': '/icons/apps/youtubemusic.png',
  Instagram: '/icons/apps/instagram.png',
  X: '/icons/apps/x.png',
  LinkedIn: '/icons/apps/linkedin.png',
  Reddit: '/icons/apps/reddit.png',
  Facebook: '/icons/apps/facebook.png',
  Pinterest: '/icons/apps/pinterest.png',
  DuckDuckGo: '/icons/apps/duckduckgo.png',
  Flipkart: '/icons/apps/flipkart.png',
}

const CATEGORY_META = {
  All: { label: 'All Services', count: 38, icon: Globe },
  'Messaging & Meetings': { label: 'Messaging', count: 9, icon: MessageSquare },
  'Productivity & Email': { label: 'Productivity', count: 11, icon: Briefcase },
  'AI, Code & Design': { label: 'AI & Code', count: 7, icon: Code2 },
  'Media, Social & Web': { label: 'Media & Web', count: 11, icon: Tv },
}

const ALL_SERVICES: ServiceItem[] = SERVICE_CATEGORY_GROUPS.flatMap((group) => {
  return group.services.map((svc) => ({
    name: svc,
    category: group.category,
    icon: SERVICE_ICONS[svc] || '/brand/icon-256.png',
  }))
})

interface ShortcutItem {
  keys: string
  action: string
  scope: 'Navigation' | 'System' | 'Workspaces'
}

const SHORTCUTS: ShortcutItem[] = [
  { keys: 'Ctrl + Q', action: 'Open Command Palette', scope: 'Navigation' },
  { keys: 'Ctrl + Shift + [', action: 'Previous Workspace', scope: 'Workspaces' },
  { keys: 'Ctrl + Shift + ]', action: 'Next Workspace', scope: 'Workspaces' },
  { keys: 'Ctrl + 1…9', action: 'Jump to App by Index', scope: 'Navigation' },
  { keys: 'Ctrl + B', action: 'Toggle Sidebar Width', scope: 'System' },
  { keys: 'Alt + S', action: 'Open Settings', scope: 'System' },
  { keys: 'Ctrl + Shift + D', action: 'Toggle Do Not Disturb', scope: 'System' },
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
        'group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#080b14]/85 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
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
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [activeShortcutFilter, setActiveShortcutFilter] = useState<'All' | 'Navigation' | 'Workspaces' | 'System'>('All')
  const [recentlyTriggeredKey, setRecentlyTriggeredKey] = useState<string | null>(null)

  // Filter services by category
  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') return ALL_SERVICES
    return ALL_SERVICES.filter((svc) => svc.category === activeCategory)
  }, [activeCategory])

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

  // Global keydown listener for hotkey feedback
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
        {/* Section Header (Minimalistic & Aesthetic) */}
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
        </div>

        {/* Side-by-Side Modern Interactive Cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* ========================================================
              LEFT CONTAINER: Supported Digital Services
             ======================================================== */}
          <div className="lg:col-span-7">
            <SpotlightCard className="flex flex-col gap-6">
              {/* Header */}
              <div className="border-b border-white/[0.08] pb-4">
                <h3 className="font-display text-2xl font-semibold text-white">
                  Supported Digital Services
                </h3>
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

              {/* Interactive Service Tiles Grid with Official Brand Icons */}
              <div className="max-h-[380px] overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(56,189,248,0.2)_transparent]">
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
                          'group/tile flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all duration-200 cursor-pointer',
                          isSelected
                            ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                            : 'border-white/[0.08] bg-[#0c101d]/60 hover:border-cyan-400/40 hover:bg-[#101526]'
                        )}
                      >
                        <img
                          src={svc.icon}
                          alt=""
                          width={20}
                          height={20}
                          loading="lazy"
                          className="h-5 w-5 rounded shrink-0 object-contain"
                        />
                        <span className="truncate text-xs font-medium text-slate-200 group-hover/tile:text-white">
                          {svc.name}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Minimalist Partition Info Sheet on Click */}
              <AnimatePresence mode="wait">
                {selectedService && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 6 }}
                    className="overflow-hidden rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-950/40 via-[#0a1120] to-[#0c0d18] p-3.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                        <span className="font-display font-semibold text-white">
                          {selectedService.name} Partition
                        </span>
                      </div>
                      <span className="rounded bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                        {selectedService.category}
                      </span>
                    </div>
                    <p className="mt-1.5 text-slate-300 leading-relaxed text-[11px]">
                      Isolated Chromium storage partition (<code className="text-cyan-300">persist:{selectedService.name.toLowerCase()}</code>) with local-first session preservation and zero cross-app tracking.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </div>

          {/* ========================================================
              RIGHT CONTAINER: Default Keybindings
             ======================================================== */}
          <div className="lg:col-span-5">
            <SpotlightCard className="flex flex-col gap-6">
              {/* Header (Clean & Minimalist) */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-2 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Command className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    Default Keybindings
                  </h3>
                </div>
              </div>

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

              {/* Interactive Keybinding Items (Clean & Aesthetic) */}
              <div className="space-y-2">
                {filteredShortcuts.map((item) => {
                  const isRecentlyTriggered = recentlyTriggeredKey === item.keys

                  return (
                    <motion.div
                      key={item.keys}
                      onClick={() => triggerShortcut(item.keys)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        'group/key flex cursor-pointer items-center justify-between rounded-xl border px-3.5 py-3 transition-all duration-200',
                        isRecentlyTriggered
                          ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_24px_rgba(6,182,212,0.4)]'
                          : 'border-white/[0.08] bg-[#0c101d]/60 hover:border-cyan-400/30 hover:bg-[#101526]'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white group-hover/key:text-cyan-200">
                          {item.action}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500 uppercase">
                          · {item.scope}
                        </span>
                      </div>

                      {/* 3D-styled Mechanical Keycap with tactile glow */}
                      <kbd
                        className={cn(
                          'shrink-0 rounded-lg border px-2.5 py-1 font-mono text-xs font-semibold shadow-[0_3px_0_rgba(0,0,0,0.6)] transition-all duration-150 active:translate-y-0.5 active:shadow-none',
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
