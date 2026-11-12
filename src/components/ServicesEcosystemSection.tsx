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
  Sparkles,
} from 'lucide-react'
import { SERVICE_CATEGORY_GROUPS } from '../data/aetherContent'
import { cn } from '../lib/utils'

interface ServiceItem {
  name: string
  category: string
  icon: string
  summary: string
  runtime: string
}

interface ServiceDetails {
  summary: string
  runtime: string
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

const SERVICE_DETAILS: Record<string, ServiceDetails> = {
  WhatsApp: {
    summary: 'End-to-end encrypted messaging, voice calls, and media sharing on desktop.',
    runtime: 'Isolated Chromium partition (persist:whatsapp) with persistent session login and zero cross-app tracking.',
  },
  Telegram: {
    summary: 'Cloud-based real-time messaging, channels, supergroups, and large file transfers.',
    runtime: 'Dedicated sandbox session (persist:telegram) running with background audio support and isolated storage.',
  },
  Discord: {
    summary: 'Voice, video, and text communication platform for communities and gaming.',
    runtime: 'Isolated renderer instance (persist:discord) preserving server navigation and unread state without telemetry bleed.',
  },
  Slack: {
    summary: 'Enterprise team collaboration, organized workspace channels, and direct messaging.',
    runtime: 'Multi-account compatible sandbox (persist:slack) with discrete authentication tokens and notification routing.',
  },
  'Microsoft Teams': {
    summary: 'Workplace video meetings, threaded conversations, and document collaboration.',
    runtime: 'Sandboxed partition (persist:microsoftteams) supporting enterprise single sign-on with independent cookies.',
  },
  Signal: {
    summary: 'Privacy-centric encrypted messaging focused on secure communications.',
    runtime: 'Dedicated partition sandbox (persist:signal) running in complete isolation from advertising cookies.',
  },
  Snapchat: {
    summary: 'Photo and video messaging, interactive AR lenses, and stories on the web.',
    runtime: 'Sandboxed web runtime (persist:snapchat) retaining camera/microphone permissions locally on device.',
  },
  'Google Meet': {
    summary: 'Enterprise-grade high-definition video conferencing and real-time screen sharing.',
    runtime: 'Hardware-accelerated Chromium view (persist:googlemeet) with isolated WebRTC audio/video device routing.',
  },
  Zoom: {
    summary: 'Virtual meeting rooms, collaborative webinars, and group screen sharing.',
    runtime: 'Isolated web view (persist:zoom) preventing tracking cookies from traversing other workplace apps.',
  },
  Gmail: {
    summary: 'Fast, secure email client with smart search, priority inbox, and spam protection.',
    runtime: 'Independent partition (persist:gmail) supporting multi-account logins side-by-side with zero session bleed.',
  },
  Outlook: {
    summary: 'Microsoft enterprise email, calendar scheduling, and contact management.',
    runtime: 'Partitioned session (persist:microsoftoutlook) maintaining Microsoft 365 credentials without global browser lock-in.',
  },
  ProtonMail: {
    summary: 'Swiss-based zero-access encrypted email engineered for uncompromising privacy.',
    runtime: 'Hermetic sandbox partition (persist:protonmail) with client-side cryptographic key storage preserved on disk.',
  },
  Notion: {
    summary: 'Connected all-in-one workspace for wikis, docs, databases, and project notes.',
    runtime: 'Offline-resilient partition (persist:notion) with local IndexedDB cache retention and seamless fast-switch.',
  },
  'Google Drive': {
    summary: 'Cloud file storage, synchronization, document previewing, and asset sharing.',
    runtime: 'Isolated partition (persist:googledrive) maintaining Google Workspace file access without cross-origin trackers.',
  },
  'Google Calendar': {
    summary: 'Time management, meeting scheduling, smart agendas, and event notifications.',
    runtime: 'Low-overhead partition (persist:googlecalendar) waking instantly for meeting alerts while sleeping during inactivity.',
  },
  Trello: {
    summary: 'Visual Kanban boards, sprint lists, and collaborative workflow card management.',
    runtime: 'Isolated partition (persist:trello) retaining board states and drag-and-drop caching with zero data leakage.',
  },
  Todoist: {
    summary: 'Intuitive task management, daily planning, recurring reminders, and productivity tracking.',
    runtime: 'Lightweight sandbox (persist:todoist) that suspends into low-RAM state while keeping task sync alive.',
  },
  Linear: {
    summary: 'High-speed issue tracking, sprint cycles, and roadmap planning built for modern teams.',
    runtime: 'High-performance Chromium partition (persist:linear) with snappy keyboard shortcut forwarding.',
  },
  Jira: {
    summary: 'Agile project tracking, scrum boards, bug reporting, and sprint release cycles.',
    runtime: 'Isolated enterprise session (persist:jira) caching Atlassian Cloud dashboards without slowing other workspace views.',
  },
  OneDrive: {
    summary: 'Microsoft cloud file storage, shared folder access, and document synchronization.',
    runtime: 'Secure partition (persist:onedrive) with isolated Microsoft identity tokens and seamless file retrieval.',
  },
  ChatGPT: {
    summary: 'OpenAI generative conversational intelligence for reasoning, coding, and drafting.',
    runtime: 'Isolated sandbox partition (persist:chatgpt) maintaining authenticated sessions with zero third-party cookie access.',
  },
  Claude: {
    summary: 'Anthropic advanced AI assistant tailored for deep technical analysis, writing, and code.',
    runtime: 'Private Chromium partition (persist:claude) keeping large context conversations securely cached locally.',
  },
  Gemini: {
    summary: 'Google multimodal AI assistant for multi-turn reasoning, coding, and research.',
    runtime: 'Isolated partition (persist:gemini) maintaining persistent Google AI sessions with zero cross-app tracking.',
  },
  GitHub: {
    summary: 'Git version control hosting, pull request code review, issues, and developer CI/CD.',
    runtime: 'Dedicated partition (persist:github) holding GitHub 2FA credentials securely with isolated local tokens.',
  },
  GitLab: {
    summary: 'Unified DevOps lifecycle, private Git repository hosting, and automated CI pipelines.',
    runtime: 'Sandboxed partition (persist:gitlab) with isolated session tokens and safe WebContents shortcut handling.',
  },
  Figma: {
    summary: 'Cloud-native collaborative interface design, vector prototyping, and design systems.',
    runtime: 'GPU-accelerated WebGL view (persist:figma) maintaining complex canvas states with dedicated memory caps.',
  },
  Miro: {
    summary: 'Infinite collaborative visual canvas for diagramming, brainstorming, and wireframes.',
    runtime: 'Isolated partition (persist:miro) allocating dedicated graphics acceleration without impacting desktop stability.',
  },
  YouTube: {
    summary: 'Global video streaming platform, subscribed channels, creator playlists, and livestreams.',
    runtime: 'Sandboxed media container (persist:youtube) supporting PiP and background audio with automatic inactivity throttling.',
  },
  Spotify: {
    summary: 'Digital music and podcast streaming service with personalized algorithmic mixes.',
    runtime: 'Background audio runtime (persist:spotify) retaining media keys while exempting playback from sleep timers.',
  },
  'YouTube Music': {
    summary: 'Music streaming platform featuring official tracks, albums, live performances, and mixes.',
    runtime: 'Audio-optimized sandbox (persist:youtubemusic) supporting continuous background playback with media keys.',
  },
  Instagram: {
    summary: 'Visual media sharing, reels, stories, direct messages, and creator profiles.',
    runtime: 'Isolated partition (persist:instagram) containing Meta trackers entirely within its own sandbox.',
  },
  X: {
    summary: 'Real-time global news, breaking discussions, community feeds, and short-form posts.',
    runtime: 'Sandboxed container (persist:x) preventing tracking pixels from correlating browsing habits across other tabs.',
  },
  LinkedIn: {
    summary: 'Professional networking, career development, industry news, and recruitment messaging.',
    runtime: 'Isolated workplace session (persist:linkedin) preserving business connections without ad network cross-talk.',
  },
  Reddit: {
    summary: 'Network of community forums, niche discussions, topic-based feeds, and upvoted content.',
    runtime: 'Isolated partition (persist:reddit) maintaining subreddit preferences and dark mode cache locally.',
  },
  Facebook: {
    summary: 'Social networking platform connecting groups, pages, marketplace, and messaging.',
    runtime: 'Hermetic storage partition (persist:facebook) trapping social graph tracking within a strictly isolated sandbox.',
  },
  Pinterest: {
    summary: 'Visual discovery engine, inspirational moodboards, recipe collections, and design pins.',
    runtime: 'Sandboxed partition (persist:pinterest) with local asset caching and zero third-party cookie propagation.',
  },
  DuckDuckGo: {
    summary: 'Privacy-respecting search engine that avoids profiling, tracking, or personalized ad targeting.',
    runtime: 'Private search partition (persist:duckduckgo) clearing transient web caches on app close.',
  },
  Flipkart: {
    summary: 'E-commerce marketplace for electronics, fashion, lifestyle products, and everyday essentials.',
    runtime: 'Secure shopping partition (persist:flipkart) isolating payment sessions and shopping cart cookies.',
  },
}

const CATEGORY_META = {
  All: { label: 'All Services', count: 38, icon: Globe },
  'Messaging & Meetings': { label: 'Messaging', count: 9, icon: MessageSquare },
  'Productivity & Email': { label: 'Productivity', count: 11, icon: Briefcase },
  'AI, Code & Design': { label: 'AI & Code', count: 7, icon: Code2 },
  'Media, Social & Web': { label: 'Media & Web', count: 11, icon: Tv },
}

const ALL_SERVICES: ServiceItem[] = SERVICE_CATEGORY_GROUPS.flatMap((group) => {
  return group.services.map((svc) => {
    const details = SERVICE_DETAILS[svc] || {
      summary: `${svc} cloud application.`,
      runtime: `Isolated Chromium storage partition (persist:${svc.toLowerCase().replace(/\s+/g, '')}) with zero cross-app tracking.`,
    }
    return {
      name: svc,
      category: group.category,
      icon: SERVICE_ICONS[svc] || '/brand/icon-256.png',
      summary: details.summary,
      runtime: details.runtime,
    }
  })
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

              {/* Minimalist Partition Info Sheet on Click with clear top margin */}
              <AnimatePresence mode="wait">
                {selectedService && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 6 }}
                    className="mt-5 overflow-hidden rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-950/40 via-[#0a1120] to-[#0c0d18] p-4 text-xs shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={selectedService.icon}
                          alt=""
                          width={18}
                          height={18}
                          className="h-4.5 w-4.5 rounded object-contain shrink-0"
                        />
                        <span className="font-display font-semibold text-white">
                          {selectedService.name} Partition
                        </span>
                      </div>
                      <span className="rounded bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                        {selectedService.category}
                      </span>
                    </div>

                    <div className="mt-2.5 space-y-1.5">
                      <p className="text-[12px] font-medium text-slate-200 leading-snug">
                        {selectedService.summary}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                        {selectedService.runtime}
                      </p>
                    </div>
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
