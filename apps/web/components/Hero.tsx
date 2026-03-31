'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* BG with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-110"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/hero.png')`, filter: 'brightness(0.4) saturate(0.65)' }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brew-bg/50 to-brew-bg z-[1]" />
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center flex flex-col items-center gap-5 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brew-text-dim text-xs font-semibold tracking-[6px] uppercase"
        >
          Bienvenidos a
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white font-sans">BAWS.</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-serif text-brew-cream text-xl md:text-2xl tracking-[0.2em] uppercase font-bold"
        >
          Beer, Aperitif, Wine, Spirit
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-brew-text-dim text-xs tracking-[8px] uppercase mt-2 hidden"
        >
          
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex gap-4 flex-wrap justify-center mt-6"
        >
          <a href="#tragos" className="btn-primary">Ver Carta</a>
          <a href="#tap-list" className="btn-outline">Cervezas</a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-brew-text-dim"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  )
}
