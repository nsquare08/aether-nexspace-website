import { useState } from 'react'
import { CAPABILITY_PILLARS, SERVICE_CATEGORY_GROUPS } from '../data/aetherContent'
import { Keyboard, Plus } from 'lucide-react'

const KEYBOARD_HIGHLIGHTS = [
  { keys: 'Ctrl + Q', action: 'Open Command Palette' },
  { keys: 'Ctrl + Shift + [ / ]', action: 'Switch Workspaces' },
  { keys: 'Ctrl + 1…9', action: 'Jump to App by Index' },
  { keys: 'Ctrl + B', action: 'Toggle Sidebar Width' },
  { keys: 'Alt + S', action: 'Open Settings' },
  { keys: 'Ctrl + Shift + D', action: 'Toggle Do Not Disturb' },
]

export function CapabilitiesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const visibleGroups =
    selectedCategory === 'All'
      ? SERVICE_CATEGORY_GROUPS
      : SERVICE_CATEGORY_GROUPS.filter((g) => g.category === selectedCategory)

  return (
    <section
      id="capabilities"
      className="relative z-10 border-t border-white/[0.07] bg-[#060811]/95 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.18em] text-cyan-400 uppercase">
            04 · Verified Capabilities
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Engineered as desktop infrastructure, not another wrapper.
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Every workflow below is shipped and verified inside Aether Nexspace v1.0.0 for Windows.
          </p>
        </div>

        {/* Hairline 6-Pillar Swiss Grid */}
        <div className="mt-12 grid border-t border-l border-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITY_PILLARS.map((pillar) => (
            <article
              key={pillar.code}
              className="group flex flex-col justify-between border-r border-b border-white/[0.08] bg-[#080b14]/70 p-6 transition-colors hover:bg-[#0d111e] sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-cyan-400">
                    {pillar.code}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-cyan-400" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-slate-400">{pillar.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {pillar.description}
                </p>
              </div>

              <ul className="mt-6 space-y-2 border-t border-white/[0.06] pt-4">
                {pillar.specs.map((spec) => (
                  <li key={spec} className="font-mono text-[11px] text-slate-400">
                    <span className="mr-2 text-cyan-400/80">—</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Service Catalog Directory + Keyboard Telemetry Row */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="rounded-2xl border border-white/[0.08] bg-[#090c16] p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-mono text-[11px] tracking-[0.14em] text-cyan-400 uppercase">
                  Curated Catalog · 38 Services + Custom HTTPS
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-white">
                  Supported Digital Services
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['All', ...SERVICE_CATEGORY_GROUPS.map((g) => g.category)].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`cursor-pointer rounded-md border px-2.5 py-1 font-mono text-[11px] transition ${
                      selectedCategory === cat
                        ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200'
                        : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat === 'All' ? 'All (38)' : cat.split(' & ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-5">
              {visibleGroups.map((group) => (
                <div key={group.category}>
                  <p className="mb-2.5 font-mono text-[11px] tracking-wider text-slate-400 uppercase">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.services.map((svc) => (
                      <span
                        key={svc}
                        className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-200"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 border-t border-white/[0.07] pt-4 text-xs text-slate-400">
                <Plus className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                <span>
                  Plus any custom HTTPS website URL with custom names, icons, and User-Agent overrides.
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#090c16] p-6 sm:p-8 lg:col-span-5">
            <div className="flex items-center gap-2.5 border-b border-white/[0.08] pb-5">
              <Keyboard className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              <div>
                <p className="font-mono text-[11px] tracking-[0.14em] text-cyan-400 uppercase">
                  WebContents Shortcut Forwarding
                </p>
                <h3 className="mt-0.5 font-display text-xl font-semibold text-white">
                  Default Keybindings
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Shortcuts work directly even while focus sits inside embedded web applications, and can be remapped inside Settings.
            </p>

            <dl className="mt-5 divide-y divide-white/[0.07]">
              {KEYBOARD_HIGHLIGHTS.map((item) => (
                <div key={item.keys} className="flex items-center justify-between py-3">
                  <dt className="text-xs text-slate-300">{item.action}</dt>
                  <dd>
                    <kbd className="rounded border border-white/15 bg-[#050710] px-2 py-1 font-mono text-[11px] text-cyan-300">
                      {item.keys}
                    </kbd>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
