'use client'

import { useState, useEffect } from 'react'
import { Wine, Martini } from 'lucide-react'
import { api, type Drink } from '@/lib/api'

type MenuCategory = { category: string; icon?: React.ReactNode; items: Drink[] }

export default function DrinksSection() {
  const [menuData, setMenuData] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const drinks = await api.drinks.getAll()
        const availableDrinks = drinks.filter(d => d.available)
        
        // Group by category, retaining the intended display order
        const catOrder = [
          'Gins Nacionales','Gins Importados','Aperitivos','con Gin:','con Vodka:','con Ron:','con Whisky:','Whiskies','Carta de Vinos','Vinos por copa','Sin Alcohol'
        ]
        
        const grouped: MenuCategory[] = []
        for (const catName of catOrder) {
          const items = availableDrinks.filter(d => d.category === catName)
          if (items.length > 0) {
            let icon: React.ReactNode = undefined
            if (catName.includes('Gins')) icon = <Martini size={80} strokeWidth={1} className="text-white/20 mx-auto opacity-50 mb-4" />
            else if (catName.includes('Vino')) icon = <Wine size={80} strokeWidth={1} className="text-white/20 mx-auto opacity-50 mb-4" />
            
            grouped.push({ category: catName, icon, items })
          }
        }
        
        // Add any categories from DB not explicitly ordered
        const otherCats = Array.from(new Set(availableDrinks.map(d => d.category))).filter(c => !catOrder.includes(c))
        for (const catName of otherCats) {
          const items = availableDrinks.filter(d => d.category === catName)
          grouped.push({ category: catName, items })
        }
        
        setMenuData(grouped)
      } catch (err) {
        console.error('Failed to load drinks', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return null

  return (
    <section id="tragos" className="py-24 bg-brew-bg text-brew-text border-b border-brew-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-pre">Coctelería & Spirits</p>
          <h2 className="section-title">La Carta</h2>
          <p className="section-sub">Una selección exclusiva para cada momento de la noche.</p>
        </div>

        {/* Menu Grid Container */}
        <div className="border border-brew-border p-8 md:p-12 relative overflow-hidden bg-brew-bg2">
          
          {/* subtle decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brew-text opacity-30"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brew-text opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brew-text opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brew-text opacity-30"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Left Column */}
            <div className="flex flex-col gap-12">
               {menuData.filter((_, i) => i % 2 === 0).map((block, idx) => (
                 <div key={idx} className="relative">
                    {block.icon}
                    <h3 className="font-script text-4xl md:text-5xl text-center mb-8 rotate-[-2deg] opacity-90">{block.category}</h3>
                    <ul className="flex flex-col gap-3">
                      {block.items.map((item) => (
                        <li key={item.id} className="flex flex-col">
                          <div className="flex justify-between items-baseline gap-4">
                            <span className="font-bold text-sm tracking-widest uppercase">{item.name}</span>
                            <div className="flex-grow border-b border-dotted border-brew-border mx-2 relative top-[-4px] opacity-40"></div>
                            <span className="font-bold whitespace-nowrap">\${item.price}</span>
                          </div>
                          {item.description && (
                            <span className="text-[10px] text-brew-text-dim mt-1 uppercase tracking-wider">{item.description}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                 </div>
               ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-12">
               {menuData.filter((_, i) => i % 2 !== 0).map((block, idx) => (
                 <div key={idx} className="relative">
                    {block.icon}
                    <h3 className="font-script text-4xl md:text-5xl text-center mb-8 rotate-[-2deg] opacity-90">{block.category}</h3>
                    <ul className="flex flex-col gap-3">
                      {block.items.map((item) => (
                        <li key={item.id} className="flex flex-col">
                          <div className="flex justify-between items-baseline gap-4">
                            <span className="font-bold text-sm tracking-widest uppercase">{item.name}</span>
                            <div className="flex-grow border-b border-dotted border-brew-border mx-2 relative top-[-4px] opacity-40"></div>
                            <span className="font-bold whitespace-nowrap">\${item.price}</span>
                          </div>
                          {item.description && (
                            <span className="text-[10px] text-brew-text-dim mt-1 uppercase tracking-wider">{item.description}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                 </div>
               ))}
               
               {/* Extras block matching the image footer */}
               <div className="mt-8 border-t border-brew-border pt-8 flex justify-between text-xs tracking-wider uppercase text-brew-text-dim">
                 <div>
                   <span className="font-bold text-brew-text block mb-2">Adicionales</span>
                   <ul className="list-disc pl-4 space-y-1">
                     <li>Naranja - Lima - Limón - Pomelo</li>
                     <li>Romero - Menta - Pepino</li>
                   </ul>
                 </div>
                 <div className="text-right">
                   <div className="flex justify-between gap-4"><span>Frutos Rojos</span> <span>$1000</span></div>
                   <div className="flex justify-between gap-4"><span>Maracuyá</span> <span>$1000</span></div>
                   <div className="flex justify-between gap-4"><span>Mix Botánicos</span> <span>$800</span></div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
