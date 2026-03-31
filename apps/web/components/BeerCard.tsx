'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import type { Beer } from '@/lib/api'
import { Star, Droplets, Zap, X, MapPin, Beer as BeerIcon } from 'lucide-react'

function BeerOmeter({ label, value, max, color = 'amber' }: { label: string; value: number; max: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-semibold tracking-wider uppercase text-brew-text-dim w-8">{label}</span>
      <div className="flex-1 h-1.5 bg-brew-bg3 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color === 'amber' ? 'bg-gradient-to-r from-brew-amber to-brew-gold' : 'bg-gradient-to-r from-amber-900 to-brew-amber'}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true }}
        />
      </div>
      <span className="text-[11px] font-bold text-brew-gold w-9 text-right">{value}{label === 'ABV' ? '%' : ''}</span>
    </div>
  )
}

function BeerModal({ beer, onClose }: { beer: Beer; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-brew-surface border border-brew-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-52 bg-brew-bg3">
          {beer.imageUrl
            ? <Image src={beer.imageUrl} alt={beer.name} fill className="object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-brew-amber/30"><BeerIcon size={64} strokeWidth={1} /></div>
          }
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-brew-bg/80 rounded-full flex items-center justify-center text-brew-cream-dim hover:text-brew-cream transition-colors">
            <X size={16} />
          </button>
          {beer.bestseller && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-gradient-to-r from-brew-amber to-brew-gold text-brew-bg text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
              <Star size={10} fill="currentColor" /> Más Vendida
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brew-cream">{beer.name}</h2>
              <p className="text-brew-text-dim text-sm mt-0.5 flex items-center gap-1.5"><MapPin size={14} className="text-brew-amber" /> {beer.origin}</p>
            </div>
            <span className="badge-style mt-1">{beer.style}</span>
          </div>

          {beer.description && <p className="text-brew-text-dim text-sm leading-relaxed">{beer.description}</p>}

          <div className="flex flex-col gap-2 py-3 border-y border-brew-border">
            <BeerOmeter label="IBU" value={beer.ibu} max={100} color="amber" />
            <BeerOmeter label="ABV" value={beer.abv} max={12} color="dark" />
          </div>

          <div className="flex gap-2">
            {[
              { label: '½ Pinta', value: beer.priceHalf },
              { label: 'Pinta', value: beer.pricePint },
              ...(beer.priceGrowler ? [{ label: 'Growler', value: beer.priceGrowler }] : []),
            ].map(p => (
              <div key={p.label} className="flex-1 text-center py-3 bg-brew-bg3 rounded-lg border border-brew-border">
                <span className="block text-[10px] tracking-wider uppercase text-brew-text-dim mb-1">{p.label}</span>
                <span className="text-lg font-bold text-brew-gold">${p.value.toLocaleString('es-AR')}</span>
              </div>
            ))}
          </div>

          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full self-start ${
            beer.onTap ? 'badge-on-tap' : 'badge-sold-out'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {beer.onTap ? 'En Canilla' : 'Sold Out'}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function BeerCard({ beer, index }: { beer: Beer; index: number }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className={`flex flex-col md:flex-row gap-2 py-4 border-b border-brew-border/50 cursor-pointer group ${!beer.onTap ? 'opacity-50' : ''}`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-end justify-between gap-4 mb-2">
            <h3 className="font-serif text-2xl font-bold text-brew-cream group-hover:text-brew-gold transition-colors">{beer.name}</h3>
            <div className="flex-1 border-b-[3px] border-dotted border-brew-border/50 mb-2 invisible md:visible shrink"></div>
            <div className="text-xl font-bold text-brew-gold shrink-0">${beer.pricePint.toLocaleString('es-AR')} <span className="text-xs text-brew-text-dim">PINTA</span></div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-brew-text-dim font-sans">
            <span className="uppercase tracking-widest text-brew-amber">{beer.style}</span>
            <span className="opacity-50">•</span>
            <span>{beer.abv}% ABV</span>
            <span className="opacity-50">•</span>
            <span>{beer.ibu} IBU</span>
            {beer.bestseller && (
               <><span className="text-brew-gold font-bold ml-2">★ TOP</span></>
            )}
            {!beer.onTap && (
               <span className="text-red-500 font-bold ml-auto uppercase tracking-widest text-xs">Agotada</span>
            )}
          </div>
          
          {beer.description && (
            <p className="text-sm font-sans italic text-brew-text-dim/80 mt-1">{beer.description}</p>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && <BeerModal beer={beer} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  )
}
