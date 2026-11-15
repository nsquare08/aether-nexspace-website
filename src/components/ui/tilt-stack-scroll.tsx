import React, { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface TiltStackCard {
  id: string
  [key: string]: any
}

export interface TiltStackScrollProps<T = TiltStackCard> {
  cards: T[]
  eyebrow?: React.ReactNode
  heading?: React.ReactNode
  renderCard: (card: T, index: number, isActive: boolean) => React.ReactNode
  height?: string
  snap?: boolean
  className?: string
  autoPlayInterval?: number
}

const clamp = (val: number, min: number, max: number) => (val < min ? min : val > max ? max : val)
const easeOut = (g: number) => 1 - Math.pow(1 - g, 3)

function calculatePose(progress: number, cardIndex: number, prefersReducedMotion: boolean) {
  const arrival = cardIndex === 0 ? 1 : clamp(progress - (cardIndex - 1), 0, 1)
  const stack = clamp(progress - cardIndex, 0, 3)

  if (prefersReducedMotion) {
    return {
      y: 0,
      scale: 1,
      rx: 0,
      rz: 0,
      shade: Math.min(stack, 1) * 0.5,
      opacity: arrival >= 1 ? 1 : arrival,
    }
  }

  const eased = easeOut(arrival)
  return {
    y: (1 - eased) * 125 - stack * 3.2,
    scale: (1 - stack * 0.065) * (0.9 + 0.1 * eased),
    rx: (1 - eased) * 22 - stack * 8.5,
    rz: (1 - eased) * (cardIndex % 2 ? 4.5 : -4.5),
    shade: Math.min(stack, 2) * 0.36,
    opacity: stack > 2.6 ? clamp((3 - stack) / 0.4, 0, 1) : 1,
  }
}

function toTransform(pose: ReturnType<typeof calculatePose>) {
  return `translate3d(0, ${pose.y.toFixed(3)}%, 0) perspective(1400px) rotateX(${pose.rx.toFixed(3)}deg) rotateZ(${pose.rz.toFixed(3)}deg) scale(${pose.scale.toFixed(4)})`
}

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`)

export function TiltStackScroll<T extends TiltStackCard = TiltStackCard>({
  cards,
  eyebrow,
  heading,
  renderCard,
  height = '100svh',
  snap = true,
  className,
  autoPlayInterval = 5500,
}: TiltStackScrollProps<T>) {
  const totalCards = cards.length
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([])
  const counterRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const scrollToCard = useCallback(
    (targetIndex: number) => {
      const track = trackRef.current
      if (!track || totalCards <= 1) return

      const rect = track.getBoundingClientRect()
      const trackTop = rect.top + window.scrollY
      const trackHeight = track.offsetHeight
      const stageHeight = window.innerHeight
      const scrollableDistance = Math.max(1, trackHeight - stageHeight)

      const targetScroll = trackTop + (targetIndex / (totalCards - 1)) * scrollableDistance
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      })
    },
    [totalCards]
  )

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % totalCards
    scrollToCard(nextIdx)
  }

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + totalCards) % totalCards
    scrollToCard(prevIdx)
  }

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying || isHovered || totalCards <= 1) return

    const timer = setInterval(() => {
      const nextIdx = (activeIndex + 1) % totalCards
      scrollToCard(nextIdx)
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [isPlaying, isHovered, activeIndex, totalCards, autoPlayInterval, scrollToCard])

  // GSAP ScrollTrigger Integration
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = mediaQuery.matches
    let lastActive = -1
    let scrollProgress = 0

    const paint = () => {
      for (let i = 0; i < totalCards; i++) {
        const cardEl = cardRefs.current[i]
        if (!cardEl) continue

        const pose = calculatePose(scrollProgress, i, reducedMotion)
        cardEl.style.transform = toTransform(pose)
        cardEl.style.opacity = String(pose.opacity)

        const shadeEl = shadeRefs.current[i]
        if (shadeEl) {
          shadeEl.style.opacity = String(pose.shade)
        }
      }

      const currentIdx = Math.round(scrollProgress)
      if (currentIdx !== lastActive) {
        lastActive = currentIdx
        setActiveIndex(currentIdx)
        if (counterRef.current) {
          counterRef.current.textContent = pad2(currentIdx + 1)
        }
      }

      if (railRef.current) {
        const factor = totalCards > 1 ? scrollProgress / (totalCards - 1) : 1
        railRef.current.style.transform = `scaleX(${factor.toFixed(4)})`
      }
    }

    const trigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress = self.progress * Math.max(totalCards - 1, 0)
        paint()
      },
      snap:
        snap && !reducedMotion && totalCards > 1
          ? {
              snapTo: 1 / (totalCards - 1),
              duration: { min: 0.25, max: 0.65 },
              delay: 0.08,
              ease: 'power2.inOut',
            }
          : undefined,
    })

    triggerRef.current = trigger
    paint()

    // Entrance animation
    const ctx = gsap.context(() => {
      if (reducedMotion) return
      const firstCard = cardRefs.current[0]
      if (firstCard) {
        gsap.from(firstCard, {
          yPercent: 18,
          rotateX: 18,
          scale: 0.92,
          opacity: 0,
          duration: 1.4,
          ease: 'expo.out',
          clearProps: 'rotateX',
          onComplete: paint,
        })
      }
    })

    const onMotionChange = () => {
      reducedMotion = mediaQuery.matches
      paint()
    }

    mediaQuery.addEventListener('change', onMotionChange)

    return () => {
      mediaQuery.removeEventListener('change', onMotionChange)
      trigger.kill()
      ctx.revert()
      paint()
    }
  }, [totalCards, snap])

  return (
    <div
      ref={trackRef}
      className={cn('tss-track relative w-full', className)}
      style={{ height: `calc(${height} * ${Math.max(totalCards, 1)})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <section
        className="tss-stage sticky top-0 flex flex-col justify-between overflow-hidden bg-[#050711] py-8 sm:py-12 px-4 sm:px-8"
        style={{ height }}
        aria-roledescription="carousel"
        aria-label="Core Capabilities Tilt Stack Scroll"
      >
        {/* Background Atmosphere */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-75"
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[450px] w-[850px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,rgba(168,85,247,0.05)_50%,transparent_75%)] blur-3xl"
        />

        {/* Section Header with Eyebrow, Heading, and Controls */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              {eyebrow}
              {heading}
            </div>

            {/* Interactive Player Controls & Counter with Rail */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause scroll auto-play' : 'Resume scroll auto-play'}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0c101d] text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous capability"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0c101d] text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next capability"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0c101d] text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
              >
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Progress Counter & Rail */}
              <div className="ml-2 flex items-center gap-3 font-mono text-xs text-slate-400">
                <b ref={counterRef} className="font-mono text-sm font-semibold text-cyan-300">
                  {pad2(activeIndex + 1)}
                </b>
                <span>/ {pad2(totalCards)}</span>
                <span className="tss-rail">
                  <i ref={railRef} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Central Tilt-Stacked Deck */}
        <div className="relative z-10 mx-auto my-auto flex w-full max-w-7xl items-center justify-center py-4">
          <div className="tss-deck relative flex w-full items-center justify-center">
            {cards.map((card, idx) => {
              const isActive = idx === activeIndex
              return (
                <article
                  key={card.id ?? idx}
                  ref={(el) => {
                    cardRefs.current[idx] = el
                  }}
                  className="tss-card"
                  style={{
                    zIndex: idx + 1,
                  }}
                  aria-roledescription="slide"
                  aria-label={`${pad2(idx + 1)} of ${pad2(totalCards)}: ${card.title ?? ''}`}
                >
                  {/* Darkening Shade Overlay */}
                  <div
                    ref={(el) => {
                      shadeRefs.current[idx] = el
                    }}
                    className="tss-shade"
                  />

                  {/* Card Content Component */}
                  <div className="relative z-10 h-full w-full">{renderCard(card, idx, isActive)}</div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Quick Jump Navigation Strip */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {cards.map((card, idx) => (
              <button
                key={card.id ?? idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                className={cn(
                  'flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2 transition duration-200',
                  activeIndex === idx
                    ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'border-white/[0.08] bg-[#090d18] text-slate-400 hover:border-white/20 hover:text-slate-200'
                )}
              >
                <span className="font-mono text-xs font-semibold">{card.code ?? `0${idx + 1}`}</span>
                <span className="text-xs font-medium">{card.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TiltStackScroll
