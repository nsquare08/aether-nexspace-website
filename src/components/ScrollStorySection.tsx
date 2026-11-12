import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SCROLL_STORY_CHAPTERS } from '../data/aetherContent'

gsap.registerPlugin(ScrollTrigger)

const ACCENT_CLASSES: Record<string, string> = {
  cyan: 'text-cyan-300 border-cyan-400/40 bg-cyan-500/10',
  violet: 'text-violet-300 border-violet-400/40 bg-violet-500/10',
  emerald: 'text-emerald-300 border-emerald-400/40 bg-emerald-500/10',
  sky: 'text-sky-300 border-sky-400/40 bg-sky-500/10',
}

export function ScrollStorySection() {
  const containerRef = useRef<HTMLElement | null>(null)
  const [activeChapter, setActiveChapter] = useState(0)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const chapters = gsap.utils.toArray<HTMLElement>('.story-chapter-card')
      chapters.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveChapter(index),
          onEnterBack: () => setActiveChapter(index),
        })
      })

      gsap.to('.story-orbital-backdrop', {
        rotate: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => mm.revert()
  }, [])

  const current = SCROLL_STORY_CHAPTERS[activeChapter]

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative z-10 border-t border-white/[0.07] bg-[#050710] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-cyan-400 uppercase">
            05 · Workspace Narrative
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            From tab chaos to spatial discipline.
          </h2>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Scrolling Narrative Chapters */}
          <div className="space-y-8 lg:col-span-5 lg:space-y-24 lg:pb-16">
            {SCROLL_STORY_CHAPTERS.map((chapter, idx) => {
              const isCurrent = idx === activeChapter
              return (
                <div
                  key={chapter.index}
                  onMouseEnter={() => setActiveChapter(idx)}
                  className={`story-chapter-card rounded-2xl border p-6 transition-all duration-300 sm:p-7 ${
                    isCurrent
                      ? 'border-cyan-400/35 bg-[#0b101d] shadow-[0_0_40px_-16px_rgba(56,189,248,0.3)]'
                      : 'border-white/[0.07] bg-[#080b13]/75 lg:opacity-65 hover:lg:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${ACCENT_CLASSES[chapter.accent]}`}
                    >
                      {chapter.index} · {chapter.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {chapter.description}
                  </p>
                  <p className="mt-4 border-t border-white/[0.07] pt-3.5 font-mono text-xs leading-relaxed text-slate-400">
                    {chapter.detail}
                  </p>

                  {/* Mobile-only inline preview so mobile users see every screen in context */}
                  <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.08] lg:hidden">
                    <img
                      src={chapter.image}
                      alt={chapter.alt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sticky Desktop Stage */}
          <div className="hidden lg:sticky lg:top-28 lg:col-span-7 lg:block">
            <div className="relative rounded-2xl border border-white/[0.1] bg-[#0a0d17] p-3 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
              <div
                aria-hidden="true"
                className="story-orbital-backdrop pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(6,182,212,0.14),rgba(124,58,237,0.1)_48%,transparent_72%)] blur-2xl"
              />

              <div className="mb-3 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  {SCROLL_STORY_CHAPTERS.map((chap, idx) => (
                    <button
                      key={chap.index}
                      type="button"
                      onClick={() => setActiveChapter(idx)}
                      className={`h-1.5 cursor-pointer rounded-full transition-all ${
                        idx === activeChapter ? 'w-8 bg-cyan-400' : 'w-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Jump to story chapter ${chap.index}: ${chap.tag}`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  {current.index} / {current.tag}
                </span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] bg-[#050710]">
                {SCROLL_STORY_CHAPTERS.map((chap, idx) => (
                  <img
                    key={chap.index}
                    src={chap.image}
                    alt={chap.alt}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out ${
                      idx === activeChapter
                        ? 'scale-100 opacity-100'
                        : 'pointer-events-none scale-[1.03] opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
