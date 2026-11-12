import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CONTRAST_ROWS = [
  {
    aspect: 'Browser Clutter',
    before: 'Dozens of mixed personal and work tabs competing inside general web browsers.',
    after: 'Dedicated Personal, Work, and custom workspaces bounded inside one clean desktop frame.',
  },
  {
    aspect: 'Account Collisions',
    before: 'Constantly signing in and out or opening separate incognito profiles for two accounts.',
    after: 'Per-app Chromium storage partitions keep up to two independent logins per service side-by-side.',
  },
  {
    aspect: 'Idle Memory Drain',
    before: 'Background web apps continue running timers and scripts long after you stop looking at them.',
    after: 'Configurable auto-sleep suspends inactive views while preserving logins, plus per-app sleep exclusions.',
  },
  {
    aspect: 'Account Surveillance',
    before: 'Workspaces gated behind mandatory cloud sign-ins and usage telemetry pipelines.',
    after: 'Zero vendor accounts and zero telemetry—settings and sessions remain locally on your Windows PC.',
  },
]

export function IntroSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.intro-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.72,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative z-10 border-t border-white/[0.07] bg-[#060811]/90 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="intro-reveal lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.18em] text-cyan-400 uppercase">
              04 · Architectural Premise
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
              A calmer home for every web app you rely on.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              Messaging clients, inboxes, calendars, AI assistants, and design boards were never meant to fight for space with ephemeral research tabs. Aether Nexspace gives essential web applications a permanent, structured Windows shell engineered by NSquare.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Every service opens inside an isolated Chromium partition with keyboard-first switching, inactivity memory controls, and local-first privacy built into the runtime.
            </p>
          </div>

          <div className="intro-reveal lg:col-span-7">
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {CONTRAST_ROWS.map((row) => (
                <div
                  key={row.aspect}
                  className="grid gap-4 py-6 sm:grid-cols-12 sm:items-start sm:gap-6"
                >
                  <div className="sm:col-span-3">
                    <span className="font-mono text-xs font-medium tracking-wider text-cyan-300 uppercase">
                      {row.aspect}
                    </span>
                  </div>
                  <div className="sm:col-span-4">
                    <p className="text-xs leading-relaxed text-slate-500 line-through decoration-white/20">
                      {row.before}
                    </p>
                  </div>
                  <div className="sm:col-span-5">
                    <p className="text-sm leading-relaxed text-slate-200">{row.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
