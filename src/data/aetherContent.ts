export interface ShowcaseScreen {
  id: string
  label: string
  shortLabel: string
  eyebrow: string
  title: string
  summary: string
  image: string
  alt: string
  specs: string[]
}

export interface CapabilityPillar {
  code: string
  title: string
  subtitle: string
  description: string
  specs: string[]
}

export interface ScrollStoryChapter {
  index: string
  tag: string
  title: string
  description: string
  detail: string
  image: string
  alt: string
  accent: 'cyan' | 'violet' | 'emerald' | 'sky'
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface ServiceCategoryGroup {
  category: string
  services: string[]
}

export const SHOWCASE_SCREENS: ShowcaseScreen[] = [
  {
    id: 'home-dark',
    label: 'Obsidian Workspace Home',
    shortLabel: 'Dark Canvas',
    eyebrow: '01 · Spatial Shell · Dark Mode',
    title: 'Atmospheric clarity from first launch.',
    summary:
      'Aether separates your daily web tools from general browser clutter. Quick-start service cards, workspace switching, command search, and live memory telemetry live inside a calm midnight obsidian frame.',
    image: '/screenshots/1-home-dark.png',
    alt: 'Aether Nexspace desktop application home screen in dark theme showing quick-start web apps and Personal workspace selector',
    specs: ['3 Workspaces Max', 'Up to 6 Apps / Space', 'Live Topbar RAM Telemetry', 'Compact & Normal Rail'],
  },
  {
    id: 'catalog',
    label: '38-Service Catalog',
    shortLabel: 'Service Catalog',
    eyebrow: '02 · Extensible Catalog',
    title: 'Curated web apps plus any HTTPS address.',
    summary:
      'Browse 38 built-in web services filtered across Messaging, Productivity, Email, Meetings, AI, Development, Design, Social, Media, Search, and Shopping—or bind any custom URL with custom icons and User-Agent overrides.',
    image: '/screenshots/2-service-catalog.png',
    alt: 'Aether Nexspace Add Web Application catalog modal filtering services by category with notification badges',
    specs: ['38 Built-in Services', '12 Category Filters', 'Custom HTTPS Support', '2 Accounts / Service'],
  },
  {
    id: 'performance',
    label: 'Memory & Sleep Engine',
    shortLabel: 'Performance',
    eyebrow: '03 · Resource Discipline',
    title: 'Automatic inactivity sleep without signing you out.',
    summary:
      'Configure inactivity sleep timers per workspace or trigger instant background suspension. Inactive renderers unload from active RAM while preserving cookies, local storage, and persistent logins intact.',
    image: '/screenshots/3-performance-settings.png',
    alt: 'Aether Nexspace Performance settings panel showing auto-sleep inactivity threshold, Suspend Inactive Apps control, Disk Caches, and Crash Recovery',
    specs: ['5m to 1h Auto-Sleep', 'Per-App Sleep Exclusions', 'Per-App Cache Clearing', 'Crash Recovery & Safe Mode'],
  },
  {
    id: 'home-light',
    label: 'Fluent Light Pearl',
    shortLabel: 'Light Theme',
    eyebrow: '04 · Dual Surface Architecture',
    title: 'Adaptive Light, Dark, and System Fluent themes.',
    summary:
      'Switch dynamically between Deep Obsidian and Light Pearl, follow Windows system preferences automatically, choose from 7 accent palettes, and customize your desktop environment.',
    image: '/screenshots/4-home-light.png',
    alt: 'Aether Nexspace desktop application home screen in light theme showing elevated cards and Fluent controls',
    specs: ['Dark / Light / System', '7 Accent Palettes', 'System Tray Controls', 'High-Contrast Mode'],
  },
]

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    code: 'WS-01',
    title: 'Multi-Workspace Isolation',
    subtitle: 'Focused environments in one window',
    description:
      'Group applications into up to three dedicated workspaces (such as Personal, Work, or a custom environment) with up to six apps per workspace, custom emojis and accent colors, and independent drag-and-drop ordering.',
    specs: ['Personal, Work + 1 custom workspace', 'Up to 6 applications per workspace', 'Ctrl+Shift+[ / ] workspace switching'],
  },
  {
    code: 'MA-02',
    title: 'Multi-Account Partitioning',
    subtitle: 'Side-by-side logins with zero bleed',
    description:
      'Run up to two isolated instances of the same service—such as work and personal WhatsApp or two Gmail inboxes—each backed by its own Chromium storage partition (persist:<id>) and color differentiation.',
    specs: ['Independent cookies & IndexedDB', 'Custom labels & account colors', 'Temporarily disable without losing logins'],
  },
  {
    code: 'MM-03',
    title: 'Intelligent RAM Suspension',
    subtitle: 'Hibernate idle apps automatically',
    description:
      'Monitor private memory directly from the top bar and reclaim memory automatically via configurable inactivity timers (5 min to 1 hour) or Deep Sleep unloading while preserving active web logins.',
    specs: ['One-click Suspend Inactive Apps', 'Per-app sleep exclusion toggles', 'Individual & global disk cache cleanup'],
  },
  {
    code: 'KB-04',
    title: 'Command Palette & Shortcuts',
    subtitle: 'Keyboard-first desktop navigation',
    description:
      'Invoke the fuzzy Command Palette (Ctrl+Q / Ctrl+P) even while typing inside sandboxed web apps. Jump directly to apps (Ctrl+1…9), cycle workspaces, toggle Do Not Disturb (Ctrl+Shift+D), or customize keybindings.',
    specs: ['Roving tabindex sidebar navigation', 'Modal focus trapping & Escape stack', 'Customizable keybindings in Settings'],
  },
  {
    code: 'CR-05',
    title: 'Crash Loop & Safe Mode Engine',
    subtitle: 'Failure isolation per web view',
    description:
      'An unresponsive or crashed service stays contained to its own renderer process. Three crashes within 60 seconds pause infinite reload loops, while atomic session heartbeats restore your last workspace cleanly.',
    specs: ['Automatic OOM background sleep', 'Safe Reload with default flags', 'Startup Safe Mode (GPU acceleration bypass)'],
  },
  {
    code: 'NT-06',
    title: 'Notifications, Backups & Proxy',
    subtitle: 'Desktop utilities engineered for control',
    description:
      'Review messages in the slide-out Notification Center with DND & custom alert audio, export versioned JSON configuration backups stripped of secrets, and configure global or per-app HTTP/HTTPS/SOCKS5 proxies.',
    specs: ['Per-app notification mute toggles', 'Schema v2 JSON backup export/import', 'System Tray close behavior controls'],
  },
]

export const SCROLL_STORY_CHAPTERS: ScrollStoryChapter[] = [
  {
    index: '01',
    tag: 'Spatial Consolidation',
    title: 'Leave forty browser tabs behind.',
    description:
      'Aether Nexspace replaces scattered browser windows with a single keyboard-addressable desktop shell built specifically for everyday web apps.',
    detail: 'Quick-switch across Work and Personal workspaces via the top bar, dropdown menu, or Ctrl+Shift+[ and Ctrl+Shift+].',
    image: '/screenshots/1-home-dark.png',
    alt: 'Aether Nexspace Dark workspace shell consolidating web applications',
    accent: 'cyan',
  },
  {
    index: '02',
    tag: 'Partition Boundaries',
    title: 'Curated catalog, isolated sessions.',
    description:
      'Launch from 38 built-in services or add custom HTTPS destinations. Each app instance keeps its own Chromium partition on disk, preventing cookie and account collisions.',
    detail: 'Run up to two independent accounts per service (e.g. Gmail 1 & Gmail 2) with isolated caches and notification controls.',
    image: '/screenshots/2-service-catalog.png',
    alt: 'Aether Nexspace curated service catalog modal with 12 category filters',
    accent: 'violet',
  },
  {
    index: '03',
    tag: 'Active Memory Discipline',
    title: 'Reclaim RAM while sessions wait.',
    description:
      'Inactive apps step down onto configurable inactivity timers and Deep Sleep unloading—cutting active renderer memory without wiping your authentication state.',
    detail: 'Exclude priority apps from sleep, inspect per-app caches, or suspend background views on demand.',
    image: '/screenshots/3-performance-settings.png',
    alt: 'Aether Nexspace Performance settings panel showing inactivity threshold and memory controls',
    accent: 'emerald',
  },
  {
    index: '04',
    tag: 'Local-First Protection',
    title: 'Locked on your hardware. Quiet on your schedule.',
    description:
      'Optional PIN lock encrypts credentials locally using Electron safeStorage (Windows DPAPI). Configure close-to-tray behavior and Fluent Light or Dark appearance.',
    detail: 'Zero NSquare accounts, zero cloud telemetry, and strict context-isolated web views.',
    image: '/screenshots/4-privacy-security.png',
    alt: 'Aether Nexspace Privacy & Security settings panel showing master PIN configuration, local session storage, and zero telemetry active',
    accent: 'sky',
  },
]

export const SERVICE_CATEGORY_GROUPS: ServiceCategoryGroup[] = [
  {
    category: 'Messaging & Meetings',
    services: ['WhatsApp', 'Telegram', 'Discord', 'Slack', 'Microsoft Teams', 'Signal', 'Snapchat', 'Google Meet', 'Zoom'],
  },
  {
    category: 'Productivity & Email',
    services: ['Gmail', 'Outlook', 'ProtonMail', 'Notion', 'Google Drive', 'Google Calendar', 'Trello', 'Todoist', 'Linear', 'Jira', 'OneDrive'],
  },
  {
    category: 'AI, Code & Design',
    services: ['ChatGPT', 'Claude', 'Gemini', 'GitHub', 'GitLab', 'Figma', 'Miro'],
  },
  {
    category: 'Media, Social & Web',
    services: ['YouTube', 'Spotify', 'YouTube Music', 'Instagram', 'X', 'LinkedIn', 'Reddit', 'Facebook', 'Pinterest', 'DuckDuckGo', 'Flipkart'],
  },
]

export const PRIVACY_GUARANTEES = [
  {
    label: 'Account Requirement',
    value: 'None',
    detail: 'No NSquare sign-up or vendor cloud profile required to launch or configure Aether Nexspace.',
  },
  {
    label: 'Telemetry & Analytics',
    value: 'Zero',
    detail: 'No analytics SDKs, behavioral tracking beacons, or external NSquare data-collection servers.',
  },
  {
    label: 'PIN & Proxy Encryption',
    value: 'Windows DPAPI',
    detail: 'Optional workspace lock PINs and proxy credentials are encrypted locally via Electron safeStorage (DPAPI).',
  },
  {
    label: 'Web View Sandboxing',
    value: 'Per-App Partition',
    detail: 'Embedded web apps execute with nodeIntegration disabled inside separate Chromium persist partitions; USB, Serial, HID, and MIDI stay blocked.',
  },
]

export const FAQ_ITEMS: FaqEntry[] = [
  {
    question: 'What is Aether Nexspace?',
    answer:
      'Aether Nexspace is a Windows desktop application developed and published by NSquare. It unifies everyday web services—such as WhatsApp Web, Gmail, Slack, Notion, Telegram, Discord, and custom HTTPS sites—inside organized workspaces with isolated Chromium sessions, inactivity RAM suspension, and local-first security.',
  },
  {
    question: 'Which Windows versions are supported?',
    answer:
      'Aether Nexspace is built for Windows 10 (version 1809 or later) and Windows 11 (x64).',
  },
  {
    question: 'How do I install it?',
    answer:
      'Once Microsoft Store certification finishes, installation happens directly through the official Microsoft Store listing with built-in Store updates—requiring no manual configuration or external download mirrors.',
  },
  {
    question: 'Where can I download it?',
    answer:
      'Aether Nexspace is currently undergoing Microsoft Store certification and will be distributed through the official Microsoft Store listing. Unverified third-party mirrors are not endorsed.',
  },
  {
    question: 'How does it handle privacy?',
    answer:
      'Aether Nexspace operates on a local-first model: there are zero NSquare accounts, zero telemetry SDKs, and zero NSquare data-collection servers. App sessions live on your Windows device inside per-app Chromium storage partitions, while optional lock PINs and proxy passwords are encrypted locally via Windows DPAPI (Electron safeStorage).',
  },
  {
    question: 'Will premium options be introduced?',
    answer:
      'Aether Nexspace launches free on the Microsoft Store with its core desktop workspace features included. We do not announce unconfirmed future tiers or dates ahead of official NSquare announcements.',
  },
]

export const THIRD_PARTY_ATTRIBUTIONS = [
  'Electron Framework & Node.js — Copyright (c) OpenJS Foundation and Electron contributors (MIT License).',
  'Chromium Project — Copyright (c) The Chromium Authors (BSD-style licenses).',
  'Space Grotesk Typography — Copyright (c) 2020 The Space Grotesk Project Authors (SIL Open Font License 1.1).',
  'Lucide Icons — Copyright (c) Lucide Contributors (ISC License).',
  'Yuki Project — Incorporates MIT-licensed architectural components derived from Yuki Project, Copyright (c) 2025-2026 Digital Fox.',
]
