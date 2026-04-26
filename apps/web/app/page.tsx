'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import DrinksSection from '@/components/DrinksSection'
import TapListSection from '@/components/TapListSection'
import FoodSection from '@/components/FoodSection'
import type { Beer, Food, HappyHourStatus, Style } from '@/lib/api'
import { Beer as BeerIcon, Utensils, Wheat, RefreshCcw, Award } from 'lucide-react'

import { api } from '@/lib/api'

export default function HomePage() {
  const [beers, setBeers] = useState<Beer[]>([])
  const [foods, setFoods] = useState<Food[]>([])
  const [styles, setStyles] = useState<Style[]>([])
  const [hhStatus, setHhStatus] = useState<HappyHourStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.beers.getAll().catch(() => [] as Beer[]),
      api.food.getAll().catch(() => [] as Food[]),
      api.happyHour.getStatus().catch(() => null),
      api.styles.getAll().catch(() => [] as Style[]),
    ]).then(([b, f, hh, st]) => {
      setBeers(b)
      setFoods(f)
      setHhStatus(hh)
      setStyles(st)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Happy Hour Banner */}
        {hhStatus?.active && (
          <div className="bg-gradient-to-r from-brew-bg3 via-brew-text-dim to-brew-bg3 py-3 px-6 text-center">
            <p className="text-white font-semibold text-sm flex items-center justify-center gap-2">
              <BeerIcon size={16} /> ¡HAPPY HOUR ACTIVO! &nbsp;
              <strong>{hhStatus.discount}% de descuento</strong> en todas las pintas
              &nbsp;·&nbsp; <span className="opacity-80">Hasta las {hhStatus.endTime}hs</span>
            </p>
          </div>
        )}

        {/* Drinks Menu */}
        <DrinksSection />

        {/* Tap List */}
        <section id="tap-list" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="section-pre">Cervezas en Canilla</p>
              <h2 className="section-title">Cervezas</h2>
              <p className="section-sub">Selección artesanal rotativa. Cada birra cuenta una historia.</p>
            </div>
            {loading ? (
              <div className="text-center py-20 flex flex-col items-center justify-center text-brew-text-dim">
                <BeerIcon size={48} strokeWidth={1} className="mb-4 animate-bounce-slow text-brew-amber/40" />
                <p>Cargando cervezas...</p>
              </div>
            ) : (
              <TapListSection beers={beers} stylesList={styles.map(s => s.name)} />
            )}
          </div>
        </section>

        {/* Food */}
        <section id="food" className="py-24 bg-brew-bg2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="section-pre">Para Picar y Compartir</p>
              <h2 className="section-title">Gastronomía</h2>
              <p className="section-sub">Cocina pensada para maridar con cada canilla.</p>
            </div>
            {loading ? (
              <div className="text-center py-16 text-brew-text-dim">
                <p>Cargando menú...</p>
              </div>
            ) : (
              <FoodSection foods={foods} />
            )}
          </div>
        </section>

        {/* Nosotros - BENTO GRID REDESIGN */}
        <section id="nosotros" className="py-24 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brew-amber/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="section-pre">Más que cerveza</p>
              <h2 className="section-title">El Espíritu BREW</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12">
              <div className="flex flex-col gap-6">
                <h3 className="font-serif text-4xl lg:text-5xl text-brew-cream font-bold leading-none uppercase tracking-wide">Maltas, Lúpulo, Agua, Levadura y <span className="text-brew-gold">Pasión</span>.</h3>
                <div className="w-20 h-2 bg-brew-amber my-2"></div>
                <p className="text-brew-text-dim text-lg font-sans leading-relaxed">
                  BREW nació en 2026 de la voluntad por transformar la experiencia clásica de tomar una pinta. 
                  No creemos en los atajos. Cada canilla que abrimos es el resultado directo de procesos honestos 
                  y de un respeto absoluto por el tiempo de maduración de la cerveza.
                </p>
                <p className="text-brew-text-dim text-lg font-sans leading-relaxed">
                  Nuestra propuesta combina lo mejor de la tradición cervecera con recetas audaces y contemporáneas, 
                  en un espacio diseñado rincón a rincón para que cada sorbo valga la pena.
                </p>
              </div>

              {/* Large Image Block */}
              <div className="w-full relative">
                <div className="absolute inset-0 bg-brew-gold translate-x-4 translate-y-4"></div>
                <img src="/hero.png" alt="Interior de BREW" className="relative z-10 w-full h-[500px] object-cover grayscale-[0.5] border-4 border-brew-bg border-opacity-50 shadow-2xl" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-[10px] border-brew-bg3 py-16 px-6 bg-brew-bg">
        <div className="max-w-md mx-auto text-center flex flex-col items-center gap-6">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden grayscale drop-shadow-xl hover:grayscale-0 transition-all duration-500">
            <img src="/logo.jpg" alt="BREW Logo" className="w-full h-full object-cover" />
          </div>
          <p className="font-serif text-brew-cream font-bold uppercase tracking-widest text-xl">Cervecería Artesanal</p>
          <p className="font-sans text-brew-text-dim tracking-widest text-sm uppercase">Colón, Entre Ríos</p>
          <div className="flex gap-6 text-sm text-brew-text font-bold uppercase tracking-wider mt-4">
            <a href="#" className="hover:text-brew-gold transition-colors">Instagram</a>
            <span>·</span>
            <a href="#" className="hover:text-brew-gold transition-colors">WhatsApp</a>
          </div>
          <p className="text-xs text-brew-text-dim">© 2026 BREW Cervecería. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}
