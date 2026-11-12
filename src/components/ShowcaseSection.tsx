import { useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { SHOWCASE_SCREENS } from '../data/aetherContent'

export function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const activeScreen = SHOWCASE_SCREENS[activeIndex]

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + SHOWCASE_SCREENS.length) % SHOWCASE_SCREENS.length)
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % SHOWCASE_SCREENS.length)
  }

  return (
    <section
      id="showcase"
      className="relative z-10 border-t border-white/[0.07] bg-[#050710] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.18em] text-cyan-400 uppercase">
              03 · Application Showcase
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Real desktop captures. Zero mockups.
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Inspect genuine views from the Windows desktop application—from dark and light Fluent canvases to the 38-service catalog and inactivity sleep settings.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Application screenshots"
            className="flex flex-wrap gap-2"
          >
            {SHOWCASE_SCREENS.map((screen, idx) => {
              const selected = idx === activeIndex
              return (
                <button
                  key={screen.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActiveIndex(idx)}
                  className={`cursor-pointer rounded-lg border px-3.5 py-2 text-xs font-medium transition ${
                    selected
                      ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200 shadow-[0_0_20px_-6px_rgba(6,182,212,0.5)]'
                      : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  {screen.shortLabel}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Interactive Desktop Screen Stage */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0b0d16] p-2 sm:p-3">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.07] bg-[#070911]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeScreen.id}
                    src={activeScreen.image}
                    alt={activeScreen.alt}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`Inspect ${activeScreen.label} fullscreen`}
                  className="absolute right-3 bottom-3 inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-white/15 bg-[#050710]/85 px-2.5 py-1.5 font-mono text-[11px] text-slate-200 backdrop-blur-md transition hover:border-cyan-400/50 hover:text-cyan-200"
                >
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Inspect</span>
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span className="text-cyan-400">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span>/</span>
                  <span>{String(SHOWCASE_SCREENS.length).padStart(2, '0')}</span>
                  <span className="ml-2 hidden text-slate-300 sm:inline">{activeScreen.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous screenshot"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-cyan-400/45 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next screenshot"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-cyan-400/45 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Screen Details */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="rounded-2xl border border-white/[0.09] bg-[#0b0e18]/90 p-6 sm:p-7"
              >
                <p className="font-mono text-[11px] tracking-[0.14em] text-cyan-400 uppercase">
                  {activeScreen.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                  {activeScreen.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {activeScreen.summary}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-white/[0.08] pt-5">
                  {activeScreen.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2.5 font-mono text-xs text-slate-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeScreen.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl overflow-hidden rounded-xl border border-white/15 bg-[#070911]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="font-display text-sm font-medium text-white">
                  {activeScreen.label}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close fullscreen preview"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white/10 text-slate-300 hover:border-white/30 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <img
                src={activeScreen.image}
                alt={activeScreen.alt}
                width={1600}
                height={1000}
                className="max-h-[82vh] w-auto object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
