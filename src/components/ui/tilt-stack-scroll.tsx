import React, { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react'
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
  snap = false,
  className,
}: TiltStackScrollProps<T>) {
  const totalCards = cards.length
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([])
  const triggerRef = useRef<ScrollTrigger | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)

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
    const nextIdx = Math.min(activeIndex + 1, totalCards - 1)
    scrollToCard(nextIdx)
  }

  const handlePrev = () => {
    const prevIdx = Math.max(activeIndex - 1, 0)
    scrollToCard(prevIdx)
  }

  const handleSkip = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const targetScroll = rect.bottom + window.scrollY
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
  }, [])

  // GSAP ScrollTrigger Integration (Scroll-driven only, no automatic timers)
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

    const onMotionChange = () => {
      reducedMotion = mediaQuery.matches
      paint()
    }

    mediaQuery.addEventListener('change', onMotionChange)

    return () => {
      mediaQuery.removeEventListener('change', onMotionChange)
      trigger.kill()
      paint()
    }
  }, [totalCards, snap])

  return (
    <div
      ref={trackRef}
      className={cn('tss-track relative w-full', className)}
      style={{ height: `calc(${height} * ${Math.max(totalCards, 1)})` }}
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

        {/* Section Header with Eyebrow and Heading (Top-right controls removed) */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            {eyebrow}
            {heading}
          </div>
        </div>

        {/* Central Tilt-Stacked Deck */}
        <div className="relative z-10 mx-auto my-auto flex w-full max-w-7xl items-center justify-center py-2 sm:py-4">
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

        {/* Bottom Navigation: Single Button 'Skip' with Left & Right Arrows */}
        <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-center pt-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#090d18]/90 p-1.5 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous capability"
              className={cn(
                'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white active:scale-95',
                activeIndex === 0 && 'opacity-35 cursor-not-allowed hover:bg-transparent hover:text-slate-400'
              )}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/15 px-4 py-1.5 font-mono text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/25 hover:text-white active:scale-95 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            >
              <span>Skip</span>
              <ArrowDown className="h-3.5 w-3.5 text-cyan-400" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={activeIndex === totalCards - 1}
              aria-label="Next capability"
              className={cn(
                'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white active:scale-95',
                activeIndex === totalCards - 1 && 'opacity-35 cursor-not-allowed hover:bg-transparent hover:text-slate-400'
              )}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TiltStackScroll
