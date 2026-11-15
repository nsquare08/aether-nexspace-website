import React, { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface CardFanCarouselProps<T = any> {
  items?: T[]
  cards?: T[]
  renderCard?: (item: T, index: number, isSelected: boolean) => React.ReactNode
  selectedIndex?: number
  onSelect?: (item: T, index: number) => void
  className?: string
  showControls?: boolean
}

const MAX_VISIBLE = 7

const DEFAULT_SLOTS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4, zIndex: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1, x: 0, y: 0, zIndex: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4, zIndex: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
]

const FOUR_SLOTS = [
  { rot: -11, scale: 0.94, x: -24, y: 3.2, zIndex: 2 },
  { rot: -3.6, scale: 0.98, x: -8, y: 0.8, zIndex: 4 },
  { rot: 3.6, scale: 0.98, x: 8, y: 0.8, zIndex: 4 },
  { rot: 11, scale: 0.94, x: 24, y: 3.2, zIndex: 2 },
]

function getResponsiveMultiplier(w: number): number {
  if (w < 480) return 0.28
  if (w < 640) return 0.38
  if (w < 768) return 0.5
  if (w < 1024) return 0.75
  return 1
}

function getHeightMultiplier(w: number): number {
  let target: number
  if (w < 480) target = 22 * 16
  else if (w < 640) target = 26 * 16
  else if (w < 768) target = 28 * 16
  else if (w < 1024) target = 34 * 16
  else target = 38 * 16
  const avail = window.innerHeight * 0.7
  return avail >= target ? 1 : avail / target
}

function getSlotConfig(total: number, slot: number) {
  if (total === 4 && slot < FOUR_SLOTS.length) {
    return FOUR_SLOTS[slot]
  }
  if (total >= MAX_VISIBLE && slot < DEFAULT_SLOTS.length) {
    return DEFAULT_SLOTS[slot]
  }
  const center = (total - 1) / 2
  const norm = center > 0 ? (slot - center) / center : 0
  const absNorm = Math.abs(norm)
  return {
    rot: norm * 21,
    scale: 1 - 0.2244 * absNorm * absNorm,
    x: norm * 28,
    y: absNorm * absNorm * 6.5,
    zIndex: Math.round(10 - Math.abs(slot - center)),
  }
}

export function CardFanCarousel<T = any>({
  items,
  cards,
  renderCard,
  selectedIndex,
  onSelect,
  className,
  showControls = true,
}: CardFanCarouselProps<T>) {
  const list = items ?? cards ?? []
  const count = list.length

  const containerRef = useRef<HTMLDivElement>(null)
  const isAnimatingRef = useRef(false)
  const hasMountedRef = useRef(false)
  const hoveredSlotRef = useRef<number | null>(null)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [internalActive, setInternalActive] = useState<number>(0)
  const activeIdx = selectedIndex !== undefined ? selectedIndex : internalActive

  const updateHoverLayout = useCallback(
    (hoveredSlot: number | null) => {
      const container = containerRef.current
      if (!container || !count) return

      const cardEls = Array.from(container.querySelectorAll<HTMLElement>('.fan-card'))
      if (!cardEls.length) return

      const widthMult = getResponsiveMultiplier(window.innerWidth)
      const heightMult = getHeightMultiplier(window.innerWidth)
      const center = (count - 1) / 2

      cardEls.forEach((el, slot) => {
        const base = getSlotConfig(count, slot)
        let posX = base.x * widthMult
        let posY = base.y * heightMult
        let rot = base.rot
        let scale = base.scale
        let delay = 0

        if (hoveredSlot !== null) {
          const dist = Math.abs(slot - hoveredSlot)
          delay = dist * 0.02

          if (slot === hoveredSlot) {
            posY -= 2.5 * heightMult
            scale *= 1.08
          } else {
            const norm = center > 0 ? (slot - center) / center : 0
            const spread = 8 * (1 - Math.abs(norm)) * (1 + 0.2 * Math.max(0, 3 - dist))
            if (slot < hoveredSlot) {
              posX -= spread * widthMult
              rot -= 3 / (dist + 1)
            } else {
              posX += spread * widthMult
              rot += 3 / (dist + 1)
            }
          }
        } else {
          delay = Math.abs(slot - center) * 0.02
        }

        gsap.to(el, {
          x: `${posX}rem`,
          y: `${posY}rem`,
          rotation: rot,
          scale,
          duration: 0.5,
          delay,
          ease: 'elastic.out(1, 0.75)',
          overwrite: 'auto',
        })

        gsap.set(el, {
          zIndex: base.zIndex + (slot === hoveredSlot ? 25 : 0),
        })
      })
    },
    [count]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container || !count) return

    const cardEls = Array.from(container.querySelectorAll<HTMLElement>('.fan-card'))
    if (!cardEls.length) return

    const widthMult = getResponsiveMultiplier(window.innerWidth)
    const heightMult = getHeightMultiplier(window.innerWidth)
    const isFirstRun = !hasMountedRef.current

    if (isFirstRun) {
      isAnimatingRef.current = true
      let completedCount = 0

      cardEls.forEach((el, slot) => {
        const base = getSlotConfig(count, slot)
        const targetX = base.x * widthMult
        const targetY = base.y * heightMult

        gsap.set(el, {
          x: 0,
          y: `${12 * heightMult}rem`,
          rotation: 0,
          scale: 0.5,
          opacity: 0,
        })

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: base.rot,
          scale: base.scale,
          opacity: 1,
          zIndex: base.zIndex,
          duration: 1.2,
          ease: 'elastic.out(1.05, 0.78)',
          delay: 0.15 + slot * 0.08,
          onComplete: () => {
            completedCount++
            if (completedCount >= cardEls.length) {
              isAnimatingRef.current = false
              hasMountedRef.current = true
            }
          },
        })
      })
    } else {
      updateHoverLayout(hoveredSlotRef.current)
    }

    const mouseEnterHandlers = cardEls.map((el, slot) => {
      const handler = () => {
        if (isAnimatingRef.current) return
        if (leaveTimerRef.current) {
          clearTimeout(leaveTimerRef.current)
          leaveTimerRef.current = null
        }
        if (hoveredSlotRef.current !== slot) {
          hoveredSlotRef.current = slot
          updateHoverLayout(slot)
        }
      }
      el.addEventListener('mouseenter', handler)
      return { el, handler }
    })

    const onMouseLeave = () => {
      if (isAnimatingRef.current) return
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = setTimeout(() => {
        hoveredSlotRef.current = null
        updateHoverLayout(null)
      }, 60)
    }

    container.addEventListener('mouseleave', onMouseLeave)

    const onResize = () => {
      if (!isAnimatingRef.current) {
        updateHoverLayout(hoveredSlotRef.current)
      }
    }

    window.addEventListener('resize', onResize)

    return () => {
      mouseEnterHandlers.forEach(({ el, handler }) => el.removeEventListener('mouseenter', handler))
      container.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    }
  }, [count, updateHoverLayout])

  const handleSelect = (item: T, index: number) => {
    setInternalActive(index)
    onSelect?.(item, index)
    hoveredSlotRef.current = index
    updateHoverLayout(index)
  }

  const handlePrev = () => {
    const nextIdx = (activeIdx - 1 + count) % count
    const item = list[nextIdx]
    if (item !== undefined) handleSelect(item, nextIdx)
  }

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % count
    const item = list[nextIdx]
    if (item !== undefined) handleSelect(item, nextIdx)
  }

  if (!count) return null

  const navButtonClass = cn(
    'relative flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md',
    'text-white/60 cursor-pointer shrink-0 z-30 outline-none',
    'shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-white',
    'active:opacity-75 transition-all duration-300'
  )

  return (
    <div className={cn('relative z-20 flex w-full flex-col items-center py-4 px-2 sm:px-4', className)}>
      {/* Central Fan Arc Container */}
      <div className="flex w-full max-w-[90rem] items-center justify-center">
        <div ref={containerRef} className="fan-layout relative flex w-full max-w-[80rem] items-center justify-center">
          {list.map((item, idx) => {
            const isSelected = idx === activeIdx
            const itemId = (item as any)?.id ?? idx
            return (
              <div
                key={itemId}
                onClick={() => handleSelect(item, idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelect(item, idx)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select vault card ${idx + 1}`}
                className={cn(
                  'fan-card cursor-pointer transition-colors duration-300',
                  isSelected && 'ring-1 ring-emerald-400/60 shadow-[0_0_35px_rgba(16,185,129,0.3)]'
                )}
              >
                {renderCard ? (
                  renderCard(item, idx, isSelected)
                ) : (
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-900">
                    <img
                      src={String((item as any)?.imgUrl ?? '')}
                      alt={String((item as any)?.alt ?? `Card ${idx}`)}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Chevrons and Dot Indicators */}
      {showControls && count > 1 && (
        <div className="relative z-30 mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            className={cn(navButtonClass, 'h-10 w-10 sm:h-11 sm:w-11')}
            onClick={handlePrev}
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {list.map((item, idx) => {
              const itemId = (item as any)?.id ?? idx
              return (
                <button
                  key={itemId}
                  type="button"
                  onClick={() => handleSelect(item, idx)}
                  aria-label={`Jump to card ${idx + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300 cursor-pointer',
                    idx === activeIdx
                      ? 'w-6 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  )}
                />
              )
            })}
          </div>

          <button
            type="button"
            className={cn(navButtonClass, 'h-10 w-10 sm:h-11 sm:w-11')}
            onClick={handleNext}
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default CardFanCarousel
