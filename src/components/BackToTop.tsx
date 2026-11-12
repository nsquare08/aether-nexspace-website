import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          aria-label="Back to top"
          className="group fixed bottom-6 right-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0c101d]/85 text-slate-300 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-500/15 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] active:scale-95 sm:bottom-8 sm:right-8"
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 text-cyan-400" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
