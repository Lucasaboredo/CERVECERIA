'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BeerOff } from 'lucide-react'
import { BeerCard } from './BeerCard'
import type { Beer } from '@/lib/api'

export default function TapListSection({ beers, stylesList = [] }: { beers: Beer[], stylesList?: string[] }) {
  const [filter, setFilter] = useState('Todas')

  // Combine explicit backend styles with any leftover active beer styles just in case
  const STYLES = useMemo(() => {
    const activeStyles = new Set<string>()
    beers.forEach(b => activeStyles.add(b.style))
    const explicitStyles = new Set(stylesList)
    
    // Union
    activeStyles.forEach(s => explicitStyles.add(s))
    
    return ['Todas', ...Array.from(explicitStyles)]
  }, [beers, stylesList])

  const filtered = useMemo(() => {
    let list = beers
    if (filter !== 'Todas') list = list.filter(b => b.style === filter)
    return list
  }, [beers, filter])

  return (
    <>
      {/* Filters */}
      <div className="w-full mb-10 overflow-hidden relative">
        <div className="flex gap-2 items-center md:justify-center overflow-x-auto whitespace-nowrap flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2 px-1">
          {STYLES.map(s => (
            <motion.button
              key={s}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 text-sm font-bold tracking-widest uppercase transition-all duration-200 border-b-2 ${
                filter === s
                  ? 'border-brew-gold text-brew-gold'
                  : 'border-transparent text-brew-cream-dim hover:text-brew-cream hover:border-brew-border'
              }`}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center justify-center text-brew-text-dim">
          <BeerOff size={48} strokeWidth={1} className="mb-4 text-brew-amber/40" />
          <p>No se encontraron cervezas con ese filtro.</p>
        </div>
      ) : (
        <div className="flex flex-col max-w-4xl mx-auto">
          {filtered.map((beer, i) => (
            <BeerCard key={beer.id} beer={beer} index={i} />
          ))}
        </div>
      )}
    </>
  )
}
