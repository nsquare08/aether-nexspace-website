import { CAPABILITY_PILLARS } from '../data/aetherContent'

export function CapabilitiesSection() {
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
      </div>
    </section>
  )
}
