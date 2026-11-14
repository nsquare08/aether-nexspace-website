import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react'
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
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    if (!isZoomOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomOpen(false)
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))
      } else if (e.key === '-' || e.key === '_') {
        setZoomLevel((z) => Math.max(1, +(z - 0.25).toFixed(2)))
      } else if (e.key === '0') {
        setZoomLevel(1)
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isZoomOpen])

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
            02 · Workspace Narrative
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
                  <div
                    onClick={() => {
                      setActiveChapter(idx)
                      setIsZoomOpen(true)
                      setZoomLevel(1)
                    }}
                    className="group relative mt-5 cursor-zoom-in overflow-hidden rounded-xl border border-white/[0.08] lg:hidden"
                    title="Tap to zoom in"
                  >
                    <img
                      src={chapter.image}
                      alt={chapter.alt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/75 px-2.5 py-1 font-mono text-[11px] text-cyan-200 backdrop-blur-sm">
                      <ZoomIn className="h-3 w-3 text-cyan-400" />
                      <span>Tap to zoom</span>
                    </div>
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
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-slate-400">
                    {current.index} / {current.tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsZoomOpen(true)
                      setZoomLevel(1)
                    }}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-500/20"
                    title="Click to zoom in"
                  >
                    <ZoomIn className="h-3 w-3" />
                    <span>Zoom</span>
                  </button>
                </div>
              </div>

              <div
                onClick={() => {
                  setIsZoomOpen(true)
                  setZoomLevel(1)
                }}
                className="group relative aspect-[16/9] cursor-zoom-in overflow-hidden rounded-xl border border-white/[0.08] bg-[#050710]"
                title="Click to pop up and zoom in/out"
              >
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
                        ? 'scale-100 opacity-100 group-hover:scale-[1.015]'
                        : 'pointer-events-none scale-[1.03] opacity-0'
                    }`}
                  />
                ))}

                {/* Subtle Hover Zoom Affordance Pill */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-black/85 px-4 py-2 font-mono text-xs font-medium text-cyan-200 shadow-2xl">
                    <ZoomIn className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Click to expand &amp; zoom</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Interactive Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot zoom viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsZoomOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0a0d18] shadow-[0_32px_90px_-20px_rgba(0,0,0,0.95)]"
            >
              {/* Modal Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#070912] px-4 py-3 sm:px-6">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${ACCENT_CLASSES[current.accent]}`}>
                    {current.index} · {current.tag}
                  </span>
                  <span className="hidden truncate text-xs text-slate-400 sm:inline">
                    {current.title}
                  </span>
                </div>

                {/* Controls Toolbar: Zoom Out, Percentage, Zoom In, Reset, Close */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center rounded-lg border border-white/10 bg-[#0e1220] p-0.5">
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
                      disabled={zoomLevel <= 1}
                      title="Zoom Out"
                      aria-label="Zoom Out"
                      className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded text-slate-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="w-14 text-center font-mono text-xs text-cyan-300">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
                      disabled={zoomLevel >= 2.5}
                      title="Zoom In"
                      aria-label="Zoom In"
                      className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded text-slate-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    disabled={zoomLevel === 1}
                    title="Reset Zoom (100%)"
                    aria-label="Reset Zoom"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-[#0e1220] text-slate-300 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(false)}
                    title="Close (Esc)"
                    aria-label="Close zoomed view"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-[#0e1220] text-slate-300 transition hover:border-rose-400/50 hover:bg-rose-500/10 hover:text-rose-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Viewport Canvas with Smooth Interactive Zoom */}
              <div
                className="relative flex flex-1 items-center justify-center overflow-auto bg-[#050710] p-4 sm:p-6"
                style={{ maxHeight: 'calc(94vh - 110px)' }}
              >
                <div
                  className="transition-transform duration-200 ease-out select-none"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                    cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in',
                  }}
                  onClick={() => setZoomLevel((z) => (z > 1 ? 1 : 1.6))}
                  title={zoomLevel > 1 ? 'Click to zoom out' : 'Click to zoom in'}
                >
                  <img
                    src={current.image}
                    alt={current.alt}
                    width={2400}
                    height={1350}
                    className="block h-auto max-h-[72vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                  />
                </div>
              </div>

              {/* Bottom Info & Keyboard Shortcut Hints */}
              <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#070912] px-4 py-2 font-mono text-[11px] text-slate-400 sm:px-6">
                <span className="text-cyan-300">
                  Click image to {zoomLevel > 1 ? 'zoom out (100%)' : 'zoom in (160%)'}
                </span>
                <span className="hidden sm:inline">Use +/- or ESC to exit</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
