import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'motion/react'
const OrbitalCanvas = lazy(() => import('./components/OrbitalCanvas'))
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { IntroSection } from './components/IntroSection'
import { ShowcaseSection } from './components/ShowcaseSection'
import { CapabilitiesSection } from './components/CapabilitiesSection'
import { ScrollStorySection } from './components/ScrollStorySection'
import { PrivacySection } from './components/PrivacySection'
import { DownloadSection } from './components/DownloadSection'
import { FaqSection } from './components/FaqSection'
import { FinalCtaSection } from './components/FinalCtaSection'
import { Footer } from './components/Footer'
import { StoreStatusModal } from './components/StoreStatusModal'
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage'

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/')
  const [storeModalOpen, setStoreModalOpen] = useState(false)
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgressRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [currentPath])

  const handleNavigate = useCallback((path: string, hash?: string) => {
    const nextUrl = hash ? `${path}${hash}` : path
    window.history.pushState({}, '', nextUrl)
    setCurrentPath(path)

    if (hash) {
      const targetId = hash.replace(/^#/, '')
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const isPrivacyPage = currentPath === '/privacy' || currentPath === '/privacidad'

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#050710] text-[#e1e1ee]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-[#050710]"
        >
          Skip to main content
        </a>

        <Suspense fallback={null}>
          <OrbitalCanvas scrollProgressRef={scrollProgressRef} />
        </Suspense>

        <Navbar
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onOpenStoreModal={() => setStoreModalOpen(true)}
        />

        {isPrivacyPage ? (
          <PrivacyPolicyPage onBackHome={() => handleNavigate('/', '#hero')} />
        ) : (
          <main id="main-content" tabIndex={-1}>
            <HeroSection
              onOpenStoreModal={() => setStoreModalOpen(true)}
              onExplore={() => handleNavigate('/', '#showcase')}
            />
            <IntroSection />
            <ShowcaseSection />
            <CapabilitiesSection />
            <ScrollStorySection />
            <PrivacySection onOpenPrivacy={() => handleNavigate('/privacy')} />
            <DownloadSection onOpenStoreModal={() => setStoreModalOpen(true)} />
            <FaqSection />
            <FinalCtaSection onOpenStoreModal={() => setStoreModalOpen(true)} />
          </main>
        )}

        <Footer onNavigate={handleNavigate} />

        <StoreStatusModal
          open={storeModalOpen}
          onClose={() => setStoreModalOpen(false)}
          onOpenPrivacy={() => handleNavigate('/privacy')}
        />
      </div>
    </MotionConfig>
  )
}

export default App
