import { useState, useEffect, useRef } from 'react'

export function SmoothFollower() {
  const mousePosition = useRef({ x: -100, y: -100 })

  const dotPosition = useRef({ x: -100, y: -100 })
  const borderDotPosition = useRef({ x: -100, y: -100 })

  const [renderPos, setRenderPos] = useState({ dot: { x: -100, y: -100 }, border: { x: -100, y: -100 } })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasMouse] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  })

  const DOT_SMOOTHNESS = 0.2
  const BORDER_DOT_SMOOTHNESS = 0.1

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }

    const handleMouseLeaveWindow = () => {
      setIsVisible(false)
    }

    const handleMouseEnterWindow = () => {
      setIsVisible(true)
    }

    // Dynamic event delegation for interactive hover detection across all elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest(
          'a, button, img, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive="true"]'
        )
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest(
          'a, button, img, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive="true"]'
        )
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)

    // Animation function for smooth movement
    let animationId: number
    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
      }

      dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, DOT_SMOOTHNESS)
      dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, DOT_SMOOTHNESS)

      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS
      )
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS
      )

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: { x: borderDotPosition.current.x, y: borderDotPosition.current.y },
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      cancelAnimationFrame(animationId)
    }
  }, [])

  if (typeof window === 'undefined' || !hasMouse || !isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Inner Dot */}
      <div
        className="absolute rounded-full bg-cyan-300 dark:bg-white shadow-[0_0_8px_#22d3ee]"
        style={{
          width: '8px',
          height: '8px',
          transform: 'translate(-50%, -50%)',
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
        }}
      />

      {/* Outer Follower Ring */}
      <div
        className="absolute rounded-full border border-cyan-400/80 dark:border-white/80 shadow-[0_0_12px_rgba(6,182,212,0.3)] bg-cyan-500/[0.04]"
        style={{
          width: isHovering ? '44px' : '28px',
          height: isHovering ? '44px' : '28px',
          transform: 'translate(-50%, -50%)',
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          transition:
            'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s, background-color 0.25s',
        }}
      />
    </div>
  )
}

export default SmoothFollower
