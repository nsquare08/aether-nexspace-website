import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface OrbitalCanvasProps {
  scrollProgressRef: React.MutableRefObject<number>
}

export function OrbitalCanvas({ scrollProgressRef }: OrbitalCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersReduced = reducedMotionQuery.matches
    const isNarrow = window.innerWidth < 768

    let renderer: THREE.WebGLRenderer | null = null
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, isNarrow ? 1.25 : 1.75)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 18

    // Subtle atmospheric orbital particle field
    const count = isNarrow ? 260 : 520
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const cyan = new THREE.Color('#38bdf8')
    const violet = new THREE.Color('#7c3aed')
    const slate = new THREE.Color('#94a3b8')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 3.2 + Math.random() * 14.5
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * 1.15

      positions[i3] = Math.cos(theta) * Math.cos(phi) * radius
      positions[i3 + 1] = Math.sin(phi) * radius * 0.65
      positions[i3 + 2] = Math.sin(theta) * Math.cos(phi) * radius * 0.45 - 3

      const mixFactor = Math.random()
      const tint = mixFactor < 0.42 ? cyan : mixFactor < 0.72 ? violet : slate
      colors[i3] = tint.r
      colors[i3 + 1] = tint.g
      colors[i3 + 2] = tint.b
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: isNarrow ? 0.095 : 0.085,
      vertexColors: true,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(points)

    // Precision architectural orbital ellipses
    const ringGroup = new THREE.Group()
    const createOrbitalRing = (rx: number, ry: number, colorHex: string, opacity: number) => {
      const curve = new THREE.EllipseCurve(0, 0, rx, ry, 0, Math.PI * 2, false, 0)
      const pts = curve.getPoints(128).map((p) => new THREE.Vector3(p.x, p.y, 0))
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const mat = new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity })
      return new THREE.LineLoop(geo, mat)
    }

    const ring1 = createOrbitalRing(9.5, 4.2, '#38bdf8', 0.08)
    ring1.rotation.z = 0.24
    ring1.rotation.x = 0.42
    const ring2 = createOrbitalRing(12.2, 5.4, '#7c3aed', 0.065)
    ring2.rotation.z = -0.32
    ring2.rotation.x = -0.28

    ringGroup.add(ring1, ring2)
    ringGroup.position.z = -4
    scene.add(ringGroup)

    let pointerX = 0
    let pointerY = 0
    const onPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 0.9
      pointerY = (e.clientY / window.innerHeight - 0.5) * 0.6
    }
    if (!prefersReduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }

    const onResize = () => {
      if (!renderer) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize, { passive: true })

    let rafId = 0
    const clock = new THREE.Clock()

    const renderFrame = () => {
      if (!renderer) return
      const elapsed = clock.getElapsedTime()
      const progress = scrollProgressRef.current

      if (!prefersReduced) {
        points.rotation.y = elapsed * 0.025 + progress * 0.35 + pointerX * 0.14
        points.rotation.x = elapsed * 0.012 + pointerY * 0.12
        ringGroup.rotation.z = elapsed * 0.03 + progress * 0.45
        ringGroup.rotation.y = pointerX * 0.18
      }

      renderer.render(scene, camera)
      if (!prefersReduced && !document.hidden) {
        rafId = window.requestAnimationFrame(renderFrame)
      }
    }

    const onVisibilityChange = () => {
      if (prefersReduced) return
      if (document.hidden) {
        window.cancelAnimationFrame(rafId)
      } else {
        rafId = window.requestAnimationFrame(renderFrame)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    renderFrame()

    return () => {
      window.cancelAnimationFrame(rafId)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      particleGeometry.dispose()
      particleMaterial.dispose()
      ringGroup.traverse((obj) => {
        if (obj instanceof THREE.LineLoop) {
          obj.geometry.dispose()
          if (obj.material instanceof THREE.Material) obj.material.dispose()
        }
      })
      renderer?.dispose()
      if (renderer?.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [scrollProgressRef])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-85"
    />
  )
}

export default OrbitalCanvas
