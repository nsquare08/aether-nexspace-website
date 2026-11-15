import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Check, X, RotateCcw, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'

export interface ComparisonItem {
  metric: string
  before: string
  after: string
  chaosHighlight: string
  aetherHighlight: string
}

const COMPARISONS: ComparisonItem[] = [
  {
    metric: 'Workspace Model',
    before: '40+ mixed browser tabs competing in one window',
    after: '3 structured workspaces with dedicated app rosters',
    chaosHighlight: 'High Friction · 40+ Tabs',
    aetherHighlight: '3 Structured Workspaces',
  },
  {
    metric: 'Multi-Account',
    before: 'Constant sign-out or multiple incognito windows',
    after: 'Isolated Chromium partitions run 2 accounts side-by-side',
    chaosHighlight: 'Cookie Bleed · Collisions',
    aetherHighlight: 'Discrete Chromium Partitions',
  },
  {
    metric: 'Memory Usage',
    before: '2.4+ GB constantly consumed by idle background tabs',
    after: 'Automatic auto-sleep cuts idle memory to <200 MB total',
    chaosHighlight: '2.4+ GB Idle Waste',
    aetherHighlight: '<200 MB Auto-Sleep',
  },
  {
    metric: 'Data & Privacy',
    before: 'Mandatory cloud profiles and behavioral ad tracking',
    after: 'Zero vendor accounts, zero telemetry, 100% on-device',
    chaosHighlight: 'Mandatory Cloud Profiles',
    aetherHighlight: 'Zero Telemetry · 100% On-Device',
  },
]

export function CompareRealityReveal() {
  const [globalProgress, setGlobalProgress] = useState(1) // 0 = 100% Browser Chaos, 1 = 100% Aether Nexspace
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null)
  const [cardHoverProgress, setCardHoverProgress] = useState<number>(0.5)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const hasAutoRevealedRef = useRef(false)

  // Smoothly animate globalProgress from current value to target value
  const animateTo = useCallback((target: number, durationMs = 1200) => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current)
    }

    const startVal = globalProgress
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / durationMs)
      // Ease out cubic: 1 - pow(1 - t, 3)
      const ease = 1 - Math.pow(1 - t, 3)
      const current = startVal + (target - startVal) * ease
      setGlobalProgress(current)

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step)
      } else {
        setGlobalProgress(target)
        animFrameRef.current = null
      }
    }

    animFrameRef.current = requestAnimationFrame(step)
  }, [globalProgress])

  // Automated cinematic reveal when section first scrolls into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAutoRevealedRef.current) {
          hasAutoRevealedRef.current = true
          // Start in Browser Chaos, wait 350ms, then sweep to Aether Nexspace
          setGlobalProgress(0)
          const timer = setTimeout(() => {
            // Animate 0 -> 1 over 1400ms
            if (animFrameRef.current !== null) {
              cancelAnimationFrame(animFrameRef.current)
            }
            const startTime = performance.now()
            const duration = 1400

            const step = (now: number) => {
              const elapsed = now - startTime
              const t = Math.min(1, elapsed / duration)
              // Ease-in-out cubic
              const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
              setGlobalProgress(ease)

              if (t < 1) {
                animFrameRef.current = requestAnimationFrame(step)
              } else {
                setGlobalProgress(1)
                animFrameRef.current = null
              }
            }
            animFrameRef.current = requestAnimationFrame(step)
          }, 350)

          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [])

  // Dragging slider track
  const updateProgressFromEvent = useCallback((clientX: number) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
    setGlobalProgress(pct)
  }, [])

  const onSliderMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    updateProgressFromEvent(e.clientX)

    const onMouseMove = (moveEv: MouseEvent) => {
      updateProgressFromEvent(moveEv.clientX)
    }

    const onMouseUp = () => {
      setIsDragging(false)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onSliderTouchStart = (e: React.TouchEvent) => {
    if (!e.touches[0]) return
    setIsDragging(true)
    updateProgressFromEvent(e.touches[0].clientX)

    const onTouchMove = (moveEv: TouchEvent) => {
      if (moveEv.touches[0]) {
        updateProgressFromEvent(moveEv.touches[0].clientX)
      }
    }

    const onTouchEnd = () => {
      setIsDragging(false)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }

    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)
  }

  // Replay the reveal animation from Browser Chaos to Aether Nexspace
  const handleReplay = () => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current)
    }
    setGlobalProgress(0)
    setTimeout(() => {
      animateTo(1, 1400)
    }, 200)
  }

  // Individual card hover laser-tracking
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setHoveredCardIdx(idx)
    setCardHoverProgress(pct)
  }

  const handleCardMouseLeave = () => {
    setHoveredCardIdx(null)
  }

  return (
    <div
      ref={containerRef}
      className="relative mt-16 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#070b16]/90 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)] sm:p-8 transition-colors duration-700"
    >
      {/* Ambient dynamic atmospheric glow */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-24 right-1/4 h-64 w-96 rounded-full blur-3xl transition-all duration-700',
          globalProgress > 0.5 ? 'bg-cyan-500/15 opacity-100' : 'bg-rose-500/15 opacity-100'
        )}
      />

      {/* Header bar: Title & Reveal Controller */}
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-6">
        <div>
          <span className="font-mono text-xs tracking-wider text-cyan-400 uppercase">
            Act I · The Paradigm Shift
          </span>
          <h3 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
            Compare Your Daily Workspace Experience
          </h3>
          <p className="mt-1 font-mono text-xs text-slate-400">
            Revealing the architectural transition from chaotic browser tabs to an isolated desktop shell.
          </p>
        </div>

        {/* Reveal Controller (Replaces static tab switcher) */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0c101e]/90 p-1.5 shadow-inner backdrop-blur-md">
            {/* Browser Chaos label */}
            <button
              type="button"
              onClick={() => animateTo(0)}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold transition cursor-pointer select-none',
                globalProgress < 0.3
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                  : 'text-slate-400 hover:text-rose-300'
              )}
              title="Reveal 100% Browser Chaos"
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-colors',
                  globalProgress < 0.3 ? 'bg-rose-400 shadow-[0_0_8px_#f43f5e]' : 'bg-slate-600'
                )}
              />
              <span>Browser Chaos</span>
            </button>

            {/* Interactive Reveal Slider Track */}
            <div
              ref={trackRef}
              onMouseDown={onSliderMouseDown}
              onTouchStart={onSliderTouchStart}
              className="relative flex h-7 w-24 sm:w-36 items-center px-1 cursor-ew-resize select-none"
              title="Slide to reveal transition"
              aria-label="Reveal transition slider"
              role="slider"
              aria-valuenow={Math.round(globalProgress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {/* Track Rail */}
              <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400 rounded-full"
                  style={{ width: `${globalProgress * 100}%` }}
                />
              </div>

              {/* Draggable Glowing Handle */}
              <div
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#070b16] shadow-[0_0_12px_rgba(34,211,238,0.8)] cursor-grab active:cursor-grabbing hover:scale-110 transition-transform',
                  isDragging && 'scale-115'
                )}
                style={{ left: `${globalProgress * 100}%` }}
              >
                <div
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition-colors',
                    globalProgress > 0.5 ? 'bg-cyan-400' : 'bg-rose-400'
                  )}
                />
              </div>
            </div>

            {/* Aether Nexspace label */}
            <button
              type="button"
              onClick={() => animateTo(1)}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold transition cursor-pointer select-none',
                globalProgress > 0.7
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                  : 'text-slate-400 hover:text-cyan-300'
              )}
              title="Reveal 100% Aether Nexspace"
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-colors',
                  globalProgress > 0.7
                    ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse'
                    : 'bg-slate-600'
                )}
              />
              <span>Aether Nexspace</span>
            </button>

            {/* Replay Reveal Button */}
            <button
              type="button"
              onClick={handleReplay}
              className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition cursor-pointer"
              title="Replay Reveal Animation"
              aria-label="Replay transformation animation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Interactive Reveal Cards */}
      <div className="relative z-10 mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COMPARISONS.map((comp, idx) => {
          // Calculate staggered progressive reveal across 4 cards
          // Card 0: 0.00 -> 0.40
          // Card 1: 0.20 -> 0.60
          // Card 2: 0.40 -> 0.80
          // Card 3: 0.60 -> 1.00
          const start = idx * 0.2
          const end = start + 0.4
          const staggeredPct = Math.max(0, Math.min(1, (globalProgress - start) / (end - start)))

          // When card is directly hovered, laser cursor wipes this card
          const isCardHovered = hoveredCardIdx === idx
          const effectivePct = isCardHovered ? cardHoverProgress : staggeredPct

          return (
            <div
              key={comp.metric}
              onMouseMove={(e) => handleCardMouseMove(e, idx)}
              onMouseLeave={handleCardMouseLeave}
              className={cn(
                'group relative min-h-[160px] overflow-hidden rounded-xl border p-4.5 select-none transition-all duration-300',
                effectivePct > 0.5
                  ? 'border-cyan-400/40 bg-[#08101e]/85 shadow-[0_0_25px_rgba(6,182,212,0.12)]'
                  : 'border-rose-500/30 bg-[#160a12]/75 shadow-[0_0_20px_rgba(244,63,94,0.08)]'
              )}
            >
              {/* Top illuminated subtle border accent */}
              <div
                className={cn(
                  'absolute top-0 left-0 right-0 h-[2px] transition-all duration-500',
                  effectivePct > 0.5
                    ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80'
                    : 'bg-gradient-to-r from-transparent via-rose-500/70 to-transparent opacity-60'
                )}
              />

              {/* -------------------------------------------------------------
                  LAYER 1: BROWSER CHAOS (BASE LAYER)
                 ------------------------------------------------------------- */}
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80 shadow-[0_0_6px_#f43f5e]" />
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-rose-300/80">
                        {comp.metric}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-rose-400">
                      <X className="h-3 w-3 stroke-[2.5]" />
                      <span>Chaos</span>
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-rose-200/85 line-through decoration-rose-500/50">
                    {comp.before}
                  </p>
                </div>

                <div className="mt-3">
                  <span className="inline-block rounded border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] text-rose-400/80">
                    {comp.chaosHighlight}
                  </span>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  LAYER 2: AETHER NEXSPACE (REVEAL OVERLAY VIA CLIP-PATH)
                 ------------------------------------------------------------- */}
              <div
                className="absolute inset-0 p-4.5 flex flex-col justify-between bg-gradient-to-br from-[#091526]/95 via-[#07101d]/98 to-[#060b16]/98 transition-[clip-path]"
                style={{
                  clipPath: `polygon(0 0, ${effectivePct * 100}% 0, ${effectivePct * 100}% 100%, 0 100%)`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                        {comp.metric}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 rounded-full border border-cyan-400/50 bg-cyan-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                      <span>Resolved</span>
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-100 font-medium">
                    {comp.after}
                  </p>
                </div>

                <div className="mt-3">
                  <span className="inline-flex items-center gap-1.5 rounded border border-cyan-400/30 bg-cyan-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300">
                    <Sparkles className="h-2.5 w-2.5 text-cyan-400" />
                    <span>{comp.aetherHighlight}</span>
                  </span>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  REVEAL LASER DIVIDER (VISIBLE DURING TRANSITIONS OR HOVER)
                 ------------------------------------------------------------- */}
              {effectivePct > 0.01 && effectivePct < 0.99 && (
                <div
                  className="pointer-events-none absolute top-0 bottom-0 w-[2px] z-30 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]"
                  style={{ left: `${effectivePct * 100}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
