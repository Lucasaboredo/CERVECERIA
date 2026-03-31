'use client'
import { motion } from 'framer-motion'
import type { Food } from '@/lib/api'
import { Utensils, UtensilsCrossed, Leaf, Coffee, Cookie, Beer as BeerIcon } from 'lucide-react'

const CAT_ICON: Record<string, React.ReactNode> = {
  Hamburguesas: <Utensils size={24} />, 
  Tapeo: <UtensilsCrossed size={24} />, 
  Veggie: <Leaf size={24} />, 
  Entradas: <UtensilsCrossed size={24} />, 
  Postres: <Cookie size={24} />,
}

function FoodCard({ item, index }: { item: Food; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`py-5 border-b border-brew-border/50 ${!item.available ? 'opacity-40' : ''}`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Text */}
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h4 className="font-script tracking-normal text-2xl font-bold text-brew-cream leading-tight">{item.name}</h4>
            <div className="flex-1 border-b-[3px] border-dotted border-brew-border/50 mb-1.5 shrink invisible md:visible"></div>
            <span className="text-xl font-bold text-brew-gold shrink-0">${item.price.toLocaleString('es-AR')}</span>
          </div>

          {item.description && <p className="text-brew-text-dim text-sm italic font-sans leading-relaxed mb-3">{item.description}</p>}

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans tracking-widest uppercase mt-auto">
            {item.pairingBeer && (
              <span className="text-brew-amber flex items-center gap-1.5"><BeerIcon size={14} /> MARIDAJE: {item.pairingBeer.name}</span>
            )}
            {!item.available && (
              <span className="text-red-500 font-bold ml-auto">⚠ AGOTADO</span>
            )}
          </div>
        </div>

        {/* Image - now small and square like a classic menu thumbnail if it exists */}
        {item.imageUrl && (
          <div className="w-full md:w-32 md:h-24 h-48 overflow-hidden shrink-0 mt-4 md:mt-0 border-2 border-brew-bg3 shadow-md">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale-[0.2]" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function FoodSection({ foods }: { foods: Food[] }) {
  const byCategory = foods.reduce<Record<string, Food[]>>((acc, f) => {
    if (!acc[f.category]) acc[f.category] = []
    acc[f.category].push(f)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-14">
      {Object.entries(byCategory).map(([cat, items]) => (
        <div key={cat}>
          <h3 className="flex items-center gap-3 font-script tracking-normal text-2xl text-brew-cream mb-6 pb-3 border-b border-brew-border">
            <span className="w-1 h-7 bg-gradient-to-b from-brew-amber to-brew-gold rounded-full" />
            <div className="text-brew-amber">{CAT_ICON[cat] || <Utensils size={24} />}</div> {cat}
          </h3>
          <div className="flex flex-col gap-2 max-w-4xl mx-auto">
            {items.map((f, i) => <FoodCard key={f.id} item={f} index={i} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
