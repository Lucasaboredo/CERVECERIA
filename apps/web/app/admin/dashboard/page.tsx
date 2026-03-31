'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { adminApi, type Beer, type Food, type Style, type Drink } from '@/lib/api'
import {
  Wine, Beer as BeerIcon, UtensilsCrossed, Clock, BarChart3,
  Plus, Edit2, Trash2, Star, LogOut, ArrowLeft,
  CheckCircle2, XCircle, Upload, X, Save, Bookmark
} from 'lucide-react'

// ─── hooks ────────────────────────────────────────────────────
function useToken() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    const t = localStorage.getItem('brew_token')
    if (!t) { router.push('/admin'); return }
    setToken(t)
  }, [router])
  return token
}

function useToast() {
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const show = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])
  return { toast, show }
}

// ─── STAT CARD ─────────────────────────────────────────────────
function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: number | string; sub?: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="text-brew-gold">{icon}</div>
      </div>
      <div className="font-script tracking-normal text-3xl font-bold text-brew-gold mb-1">{value}</div>
      <div className="text-brew-text-dim text-sm">{label}</div>
      {sub && <div className="text-xs text-brew-text-dim mt-1">{sub}</div>}
    </div>
  )
}

// ─── TOGGLE SWITCH ─────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-green-600' : 'bg-brew-border'}`}
    >
      <motion.span
        layout
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
    </button>
  )
}

// ─── BEER MODAL ────────────────────────────────────────────────
const EMPTY_BEER = { name:'', style:'', origin:'Local', description:'', ibu:30, abv:5.0, priceHalf:1000, pricePint:1800, priceGrowler:0, onTap:true, bestseller:false }

function BeerModal({ beer, token, onClose, onSaved, styles }: { beer: Beer | null; token: string; onClose: () => void; onSaved: () => void; styles: string[] }) {
  const api = adminApi(token)
  const isNew = !beer?.id
  const [form, setForm] = useState<any>(beer || EMPTY_BEER)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const { url } = await api.upload.image(file)
      set('imageUrl', url)
    } catch { alert('Error al subir imagen') }
    finally { setUploading(false) }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const { name, style, origin, description, imageUrl, onTap, bestseller } = form
      const data = { 
        name, style, origin, description, imageUrl, onTap, bestseller,
        ibu: +form.ibu, abv: +form.abv, priceHalf: +form.priceHalf, 
        pricePint: +form.pricePint, priceGrowler: +form.priceGrowler || undefined 
      }
      if (isNew) await api.beers.create(data)
      else await api.beers.update(beer!.id, data)
      onSaved()
      onClose()
    } catch { alert('Error al guardar') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="bg-brew-bg border-2 border-brew-border w-full max-w-lg max-h-[90vh] overflow-y-auto drop-shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-brew-border">
          <h2 className="font-script tracking-normal text-xl text-brew-cream font-bold">{isNew ? 'Nueva Cerveza' : 'Editar Cerveza'}</h2>
          <button onClick={onClose} className="text-brew-text-dim hover:text-brew-cream w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brew-bg3 transition-colors"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Nombre *</label>
              <input required className="input-field" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Golden Sunset IPA" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Estilo *</label>
              <input required list="beer-styles" className="input-field" value={form.style} onChange={e => set('style', e.target.value)} placeholder="Ej: IPA, Stout" />
              <datalist id="beer-styles">
                {styles.map(s => <option key={s} value={s} />)}
              </datalist>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Origen</label>
              <select className="input-field" value={form.origin} onChange={e => set('origin', e.target.value)}>
                <option>Local</option><option>Importada</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">ABV %</label>
              <input type="number" step="0.1" min="0" max="20" className="input-field" value={form.abv} onChange={e => set('abv', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">IBU</label>
              <input type="number" min="0" max="120" className="input-field" value={form.ibu} onChange={e => set('ibu', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">½ Pinta $</label>
              <input type="number" className="input-field" value={form.priceHalf} onChange={e => set('priceHalf', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Pinta $</label>
              <input type="number" className="input-field" value={form.pricePint} onChange={e => set('pricePint', e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Growler $ (opcional)</label>
              <input type="number" className="input-field" value={form.priceGrowler || ''} onChange={e => set('priceGrowler', e.target.value)} placeholder="0" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Descripción / Notas de Cata</label>
              <textarea rows={2} className="input-field resize-none" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Notas frutales, amargor suave..." />
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Imagen</label>
            <label className="flex items-center gap-2 px-4 py-2.5 bg-brew-bg3 border border-dashed border-brew-border rounded-lg cursor-pointer hover:border-brew-amber transition-colors text-sm text-brew-text-dim">
              <Upload size={14} />
              {uploading ? 'Subiendo...' : form.imageUrl ? '✓ Imagen cargada (click para cambiar)' : 'Subir imagen (JPG, PNG, WebP — máx 5MB)'}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <Toggle checked={form.onTap} onChange={() => set('onTap', !form.onTap)} />
              <span className="text-sm text-brew-text">En Canilla</span>
            </div>
            <div className="flex items-center gap-3">
              <Toggle checked={form.bestseller} onChange={() => set('bestseller', !form.bestseller)} />
              <span className="text-sm text-brew-text">⭐ Más Vendida</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 btn-ghost border-2 border-brew-border py-2.5 text-sm uppercase tracking-widest font-bold">Cancelar</button>
            <button type="submit" disabled={loading} className="flex-[2] btn-primary py-2.5 text-sm disabled:opacity-60">
              {loading ? 'Guardando...' : <span className="flex items-center justify-center gap-2"><Save size={14} />{isNew ? 'Crear Cerveza' : 'Guardar Cambios'}</span>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── FOOD MODAL ────────────────────────────────────────────────
const CATS = ['Hamburguesas','Tapeo','Veggie','Entradas','Postres']
const EMPTY_FOOD = { name:'', category:'Hamburguesas', description:'', price:2000, available:true }

function FoodModal({ food, token, onClose, onSaved }: { food: Food | null; token: string; onClose: () => void; onSaved: () => void }) {
  const api = adminApi(token)
  const isNew = !food?.id
  const [form, setForm] = useState<any>(food || EMPTY_FOOD)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const { url } = await api.upload.image(file)
      set('imageUrl', url)
    } catch { alert('Error al subir imagen') }
    finally { setUploading(false) }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    try {
      const { name, category, description, imageUrl, available } = form
      const data = { name, category, description, imageUrl, available, price: +form.price }
      if (isNew) await api.food.create(data)
      else await api.food.update(food!.id, data)
      onSaved(); onClose()
    } catch { alert('Error al guardar') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="bg-brew-bg border-2 border-brew-border w-full max-w-lg drop-shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-brew-border">
          <h2 className="font-script tracking-normal text-xl text-brew-cream font-bold">{isNew ? 'Nuevo Plato' : 'Editar Plato'}</h2>
          <button onClick={onClose} className="text-brew-text-dim hover:text-brew-cream w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brew-bg3 transition-colors"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Nombre *</label>
            <input required className="input-field" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Smash Burger BREW" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Categoría</label>
              <select className="input-field" value={form.category} onChange={e => set('category', e.target.value)}>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Precio $ *</label>
              <input type="number" required className="input-field" value={form.price} onChange={e => set('price', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Descripción</label>
            <textarea rows={2} className="input-field resize-none" value={form.description} onChange={e => set('description', e.target.value)} />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Imagen</label>
            <label className="flex items-center gap-2 px-4 py-2.5 bg-brew-bg3 border border-dashed border-brew-border rounded-lg cursor-pointer hover:border-brew-amber transition-colors text-sm text-brew-text-dim">
              <Upload size={14} />
              {uploading ? 'Subiendo...' : form.imageUrl ? '✓ Imagen cargada (click para cambiar)' : 'Subir imagen (JPG, PNG, WebP — máx 5MB)'}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Toggle checked={form.available} onChange={() => set('available', !form.available)} />
            <span className="text-sm text-brew-text">Disponible</span>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 btn-ghost border-2 border-brew-border py-2.5 text-sm uppercase font-bold tracking-widest">Cancelar</button>
            <button type="submit" disabled={loading} className="flex-[2] btn-primary py-2.5 text-sm disabled:opacity-60">
              {loading ? 'Guardando...' : <span className="flex items-center justify-center gap-2"><Save size={14} />{isNew ? 'Crear Plato' : 'Guardar Cambios'}</span>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}


// ─── DRINK MODAL ────────────────────────────────────────────────
const DRINK_CATS = ['Gins Nacionales','Gins Importados','Aperitivos','con Gin:','con Vodka:','con Ron:','con Whisky:','Whiskies','Carta de Vinos','Vinos por copa','Sin Alcohol']
const EMPTY_DRINK = { name:'', category:'Aperitivos', description:'', price:2000, available:true }

function DrinkModal({ drink, token, onClose, onSaved }: { drink: Drink | null; token: string; onClose: () => void; onSaved: () => void }) {
  const api = adminApi(token)
  const isNew = !drink?.id
  const [form, setForm] = useState<any>(drink || EMPTY_DRINK)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const { url } = await api.upload.image(file)
      set('imageUrl', url)
    } catch { alert('Error al subir imagen') }
    finally { setUploading(false) }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    try {
      const { name, category, description, imageUrl, available } = form
      const data = { name, category, description, imageUrl, available, price: +form.price }
      if (isNew) await api.drinks.create(data)
      else await api.drinks.update(drink!.id, data)
      onSaved(); onClose()
    } catch { alert('Error al guardar') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="bg-brew-bg border-2 border-brew-border w-full max-w-lg drop-shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-brew-border">
          <h2 className="font-script tracking-normal text-xl text-brew-cream font-bold">{isNew ? 'Nueva Bebida/Trago' : 'Editar Bebida/Trago'}</h2>
          <button onClick={onClose} className="text-brew-text-dim hover:text-brew-cream w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brew-bg3 transition-colors"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Nombre *</label>
            <input required className="input-field" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Negroni" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Categoría</label>
              <select className="input-field" value={form.category} onChange={e => set('category', e.target.value)}>
                {DRINK_CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Precio $ *</label>
              <input type="number" required className="input-field" value={form.price} onChange={e => set('price', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Descripción</label>
            <textarea rows={2} className="input-field resize-none" value={form.description} onChange={e => set('description', e.target.value)} />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-1">Imagen</label>
            <label className="flex items-center gap-2 px-4 py-2.5 bg-brew-bg3 border border-dashed border-brew-border rounded-lg cursor-pointer hover:border-brew-amber transition-colors text-sm text-brew-text-dim">
              <Upload size={14} />
              {uploading ? 'Subiendo...' : form.imageUrl ? '✓ Imagen cargada (click para cambiar)' : 'Subir imagen (JPG, PNG, WebP — máx 5MB)'}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Toggle checked={form.available} onChange={() => set('available', !form.available)} />
            <span className="text-sm text-brew-text">Disponible</span>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 btn-ghost border-2 border-brew-border py-2.5 text-sm uppercase font-bold tracking-widest">Cancelar</button>
            <button type="submit" disabled={loading} className="flex-[2] btn-primary py-2.5 text-sm disabled:opacity-60">
              {loading ? 'Guardando...' : <span className="flex items-center justify-center gap-2"><Save size={14} />{isNew ? 'Crear Bebida/Trago' : 'Guardar Cambios'}</span>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── MAIN DASHBOARD ────────────────────────────────────────────
type Section = 'beers' | 'food' | 'drinks' | 'happy-hour'

export default function Dashboard() {
  const token = useToken()
  const router = useRouter()
  const { toast, show: showToast } = useToast()
  const [section, setSection] = useState<Section>('beers')
  const [beers, setBeers] = useState<Beer[]>([])
  const [foods, setFoods] = useState<Food[]>([])
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [drinkModal, setDrinkModal] = useState<Drink | null | 'new'>('new' as any)
  const [openDrinkModal, setOpenDrinkModal] = useState(false)
  const [styles, setStyles] = useState<Style[]>([])
  const [hhConfig, setHhConfig] = useState<any>(null)
  const [beerModal, setBeerModal] = useState<Beer | null | 'new'>('new' as any)
  const [foodModal, setFoodModal] = useState<Food | null | 'new'>('new' as any)
  const [openBeerModal, setOpenBeerModal] = useState(false)
  const [openFoodModal, setOpenFoodModal] = useState(false)
  const [hhLoading, setHhLoading] = useState(false)

  const loadBeers = useCallback(async () => {
    if (!token) return
    try { setBeers(await adminApi(token).beers.getAll()) } catch { showToast('Error al cargar cervezas', 'error') }
  }, [token, showToast])

    const loadDrinks = useCallback(async () => {
    if (!token) return
    try { setDrinks(await adminApi(token).drinks.getAll()) } catch { showToast('Error al cargar bebidas', 'error') }
  }, [token, showToast])

  const loadFoods = useCallback(async () => {
    if (!token) return
    try { setFoods(await adminApi(token).food.getAll()) } catch { showToast('Error al cargar platos', 'error') }
  }, [token, showToast])

  const loadHH = useCallback(async () => {
    if (!token) return
    try { setHhConfig(await adminApi(token).happyHour.getConfig()) } catch {}
  }, [token])

  const loadStyles = useCallback(async () => {
    if (!token) return
    try { setStyles(await adminApi(token).styles.getAll()) } catch { showToast('Error al cargar estilos', 'error') }
  }, [token, showToast])

  useEffect(() => { if (token) { loadBeers(); loadFoods(); loadDrinks(); loadHH(); loadStyles() } }, [token])

  async function toggleTap(id: string) {
    if (!token) return
    try {
      const updated = await adminApi(token).beers.toggleTap(id)
      setBeers(bs => bs.map(b => b.id === id ? { ...b, onTap: updated.onTap } : b))
      showToast(updated.onTap ? '✅ Marcada On Tap' : '🔴 Marcada Sold Out')
    } catch { showToast('Error', 'error') }
  }

  async function toggleBestseller(id: string) {
    if (!token) return
    try {
      const updated = await adminApi(token).beers.toggleBestseller(id)
      setBeers(bs => bs.map(b => b.id === id ? { ...b, bestseller: updated.bestseller } : b))
      showToast(updated.bestseller ? '⭐ Marcada Más Vendida' : 'Quitada de Más Vendidas')
    } catch { showToast('Error', 'error') }
  }

  async function deleteBeer(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"?`)) return
    if (!token) return
    await adminApi(token).beers.delete(id)
    setBeers(bs => bs.filter(b => b.id !== id))
    showToast(`"${name}" eliminada`)
  }

  async function toggleFoodAvailable(id: string) {
    if (!token) return
    try {
      const updated = await adminApi(token).food.toggleAvailable(id)
      setFoods(fs => fs.map(f => f.id === id ? { ...f, available: updated.available } : f))
      showToast(updated.available ? '✅ Disponible' : 'Marcado no disponible')
    } catch { showToast('Error', 'error') }
  }

  async function deleteFood(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"?`)) return
    if (!token) return
    await adminApi(token).food.delete(id)
    setFoods(fs => fs.filter(f => f.id !== id))
    showToast(`"${name}" eliminado`)
  }

  
  async function toggleDrinkAvailable(id: string) {
    if (!token) return
    try {
      const updated = await adminApi(token).drinks.toggleAvailable(id)
      setDrinks(ds => ds.map(d => d.id === id ? { ...d, available: updated.available } : d))
      showToast(updated.available ? '✅ Disponible' : 'Marcado no disponible')
    } catch { showToast('Error', 'error') }
  }

  async function deleteDrink(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"?`)) return
    if (!token) return
    await adminApi(token).drinks.delete(id)
    setDrinks(ds => ds.filter(d => d.id !== id))
    showToast(`"${name}" eliminada`)
  }

  async function addStyle(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    const form = e.target as HTMLFormElement
    const input = form.elements.namedItem('styleName') as HTMLInputElement
    const name = input.value.trim()
    if (!name) return
    try {
      await adminApi(token).styles.create({ name })
      input.value = ''
      loadStyles()
      showToast(`Estilo "${name}" agregado`)
    } catch { showToast('Error al agregar estilo o ya existe', 'error') }
  }

  async function deleteStyle(id: string, name: string) {
    if (!confirm(`¿Eliminar estilo "${name}"? No se borrarán las cervezas, pero el filtro desaparecerá si no lo reponés.`)) return
    if (!token) return
    try {
      await adminApi(token).styles.delete(id)
      setStyles(ss => ss.filter(s => s.id !== id))
      showToast(`Estilo "${name}" eliminado`)
    } catch { showToast('Error al eliminar estilo', 'error') }
  }

  async function saveHH() {
    if (!token || !hhConfig) return
    setHhLoading(true)
    try {
      await adminApi(token).happyHour.update(hhConfig)
      showToast('✅ Happy Hour actualizado')
    } catch { showToast('Error al guardar', 'error') }
    finally { setHhLoading(false) }
  }

  function logout() {
    localStorage.removeItem('brew_token')
    router.push('/admin')
  }

  if (!token) return null

  const NAV = [
    { id: 'beers' as Section, label: 'Cervezas', icon: <BeerIcon size={17} /> },
    
    { id: 'food' as Section, label: 'Gastronomía', icon: <UtensilsCrossed size={17} /> },
    { id: 'drinks' as Section, label: 'Tragos y Bebidas', icon: <Wine size={17} /> },
    { id: 'happy-hour' as Section, label: 'Happy Hour', icon: <Clock size={17} /> },
    
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-brew-bg border-r-2 border-brew-border flex flex-col py-6 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="flex flex-col items-center gap-3 px-5 pb-8 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden drop-shadow-xl border border-brew-border">
            <img src="/logo.jpg" alt="BREW Logo" className="w-full h-full object-cover grayscale" />
          </div>
          <span className="font-script tracking-normal font-bold text-brew-cream text-lg uppercase tracking-widest">Dashboard</span>
        </div>

        <nav className="flex flex-col gap-1 px-3 flex-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                section === n.id
                  ? 'bg-brew-amber/15 text-brew-gold border border-brew-amber/20'
                  : 'text-brew-text-dim hover:text-brew-cream hover:bg-brew-surface'
              }`}>
              {n.icon} {n.label}
            </button>
          ))}
        </nav>

        <div className="px-3 mt-3 flex flex-col gap-1">
          <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-brew-text-dim hover:text-brew-cream hover:bg-brew-surface transition-all">
            <ArrowLeft size={15} /> Ver Sitio
          </a>
          <button onClick={logout} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-brew-text-dim hover:text-red-400 hover:bg-red-950/20 transition-all">
            <LogOut size={15} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto min-w-0">

        {/* ── BEERS ── */}
        {section === 'beers' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b-2 border-brew-border pb-6 mb-2">
              <div>
                <h1 className="font-script tracking-normal text-4xl uppercase tracking-widest font-bold text-brew-cream leading-none">Cervezas</h1>
                <p className="text-brew-text-dim text-sm mt-2 font-sans italic">Gestioná tu tap list en tiempo real</p>
              </div>
              <button id="btn-new-beer" onClick={() => { setBeerModal(null); setOpenBeerModal(true) }}
                className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
                <Plus size={15} /> Nueva Cerveza
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={<BeerIcon size={20} />} label="Total" value={beers.length} />
              <StatCard icon={<CheckCircle2 size={20} />} label="En Canilla" value={beers.filter(b => b.onTap).length} />
              <StatCard icon={<XCircle size={20} />} label="Sold Out" value={beers.filter(b => !b.onTap).length} />
              <StatCard icon={<Star size={20} />} label="Más Vendidas" value={beers.filter(b => b.bestseller).length} />
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brew-border">
                      {['Cerveza','Estilo','ABV','IBU','½ Pinta','Pinta','On Tap','Top','Acciones'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-brew-text-dim">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {beers.map(b => (
                      <tr key={b.id} className="border-b border-brew-border/40 hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5 font-semibold text-brew-cream text-sm">{b.name}</td>
                        <td className="px-4 py-3.5"><span className="badge-style">{b.style}</span></td>
                        <td className="px-4 py-3.5 text-sm text-brew-text-dim">{b.abv}%</td>
                        <td className="px-4 py-3.5 text-sm text-brew-text-dim">{b.ibu}</td>
                        <td className="px-4 py-3.5 text-sm text-brew-gold">${b.priceHalf.toLocaleString('es-AR')}</td>
                        <td className="px-4 py-3.5 text-sm font-bold text-brew-gold">${b.pricePint.toLocaleString('es-AR')}</td>
                        <td className="px-4 py-3.5"><Toggle checked={b.onTap} onChange={() => toggleTap(b.id)} /></td>
                        <td className="px-4 py-3.5"><Toggle checked={b.bestseller} onChange={() => toggleBestseller(b.id)} /></td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-2">
                            <button onClick={() => { setBeerModal(b); setOpenBeerModal(true) }}
                              className="p-1.5 rounded-lg bg-brew-amber/10 border border-brew-amber/20 text-brew-amber hover:bg-brew-amber/20 transition-colors">
                              <Edit2 size={13} />
                            </button>
                            <button onClick={() => deleteBeer(b.id, b.name)}
                              className="p-1.5 rounded-lg bg-red-950/30 border border-red-700/20 text-red-400 hover:bg-red-950/50 transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!beers.length && <p className="text-center text-brew-text-dim py-12">No hay cervezas cargadas.</p>}
              </div>
            </div>
          </div>
        )}

        
        {section === 'food' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b-2 border-brew-border pb-6 mb-2">
              <div>
                <h1 className="font-script tracking-normal text-4xl uppercase tracking-widest font-bold text-brew-cream leading-none">Gastronomía</h1>
                <p className="text-brew-text-dim text-sm mt-2 font-sans italic">Administrá el menú de comidas</p>
              </div>
              <button onClick={() => { setFoodModal(null); setOpenFoodModal(true) }}
                className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
                <Plus size={15} /> Nuevo Plato
              </button>
            </div>

            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brew-border">
                      {['Plato','Categoría','Precio','Disponible','Acciones'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-brew-text-dim">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {foods.map(f => (
                      <tr key={f.id} className="border-b border-brew-border/40 hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5 font-semibold text-brew-cream text-sm">{f.name}</td>
                        <td className="px-4 py-3.5"><span className="badge-style">{f.category}</span></td>
                        <td className="px-4 py-3.5 text-sm font-bold text-brew-gold">${f.price.toLocaleString('es-AR')}</td>
                        <td className="px-4 py-3.5"><Toggle checked={f.available} onChange={() => toggleFoodAvailable(f.id)} /></td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-2">
                            <button onClick={() => { setFoodModal(f); setOpenFoodModal(true) }}
                              className="p-1.5 rounded-lg bg-brew-amber/10 border border-brew-amber/20 text-brew-amber hover:bg-brew-amber/20 transition-colors">
                              <Edit2 size={13} />
                            </button>
                            <button onClick={() => deleteFood(f.id, f.name)}
                              className="p-1.5 rounded-lg bg-red-950/30 border border-red-700/20 text-red-400 hover:bg-red-950/50 transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!foods.length && <p className="text-center text-brew-text-dim py-12">No hay platos cargados.</p>}
              </div>
            </div>
          </div>
        )}

        
        {/* ── DRINKS ── */}
        {section === 'drinks' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b-2 border-brew-border pb-6 mb-2">
              <div>
                <h1 className="font-script tracking-normal text-4xl uppercase tracking-widest font-bold text-brew-cream leading-none">Tragos y Bebidas</h1>
                <p className="text-brew-text-dim text-sm mt-2 font-sans italic">Administrá la carta de tragos, vinos y sin alcohol</p>
              </div>
              <button onClick={() => { setDrinkModal(null); setOpenDrinkModal(true) }}
                className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
                <Plus size={15} /> Nueva Bebida
              </button>
            </div>

            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brew-border">
                      {['Bebida','Categoría','Precio','Disponible','Acciones'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-brew-text-dim">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {drinks.map(f => (
                      <tr key={f.id} className="border-b border-brew-border/40 hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5 font-semibold text-brew-cream text-sm">{f.name}</td>
                        <td className="px-4 py-3.5"><span className="badge-style">{f.category}</span></td>
                        <td className="px-4 py-3.5 text-sm font-bold text-brew-gold">${f.price.toLocaleString('es-AR')}</td>
                        <td className="px-4 py-3.5"><Toggle checked={f.available} onChange={() => toggleDrinkAvailable(f.id)} /></td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-2">
                            <button onClick={() => { setDrinkModal(f); setOpenDrinkModal(true) }}
                              className="p-1.5 rounded-lg bg-brew-amber/10 border border-brew-amber/20 text-brew-amber hover:bg-brew-amber/20 transition-colors">
                              <Edit2 size={13} />
                            </button>
                            <button onClick={() => deleteDrink(f.id, f.name)}
                              className="p-1.5 rounded-lg bg-red-950/30 border border-red-700/20 text-red-400 hover:bg-red-950/50 transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!drinks.length && <p className="text-center text-brew-text-dim py-12">No hay bebidas cargadas.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ── HAPPY HOUR ── */}
        {section === 'happy-hour' && hhConfig && (
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="border-b-2 border-brew-border pb-6 mb-2">
              <h1 className="font-script tracking-normal text-4xl uppercase tracking-widest font-bold text-brew-cream leading-none">Happy Hour Engine</h1>
              <p className="text-brew-text-dim text-sm mt-2 font-sans italic">Precios automáticos según horario del servidor</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-5">
                <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-2">Hora de inicio</label>
                <input type="time" className="input-field" value={hhConfig.startTime} onChange={e => setHhConfig((h: any) => ({ ...h, startTime: e.target.value }))} />
              </div>
              <div className="card p-5">
                <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-2">Hora de fin</label>
                <input type="time" className="input-field" value={hhConfig.endTime} onChange={e => setHhConfig((h: any) => ({ ...h, endTime: e.target.value }))} />
              </div>
              <div className="card p-5">
                <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-2">Descuento %</label>
                <input type="number" min="1" max="100" className="input-field" value={hhConfig.discount} onChange={e => setHhConfig((h: any) => ({ ...h, discount: +e.target.value }))} />
              </div>
              <div className="card p-5 flex items-center justify-between">
                <span className="text-sm text-brew-text">Activo</span>
                <Toggle checked={hhConfig.isActive} onChange={() => setHhConfig((h: any) => ({ ...h, isActive: !h.isActive }))} />
              </div>
            </div>
            <div className="card p-5">
              <label className="block text-xs uppercase tracking-wider text-brew-text-dim mb-3">Días activos</label>
              <div className="flex gap-2 flex-wrap">
                {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map((d, i) => {
                  const active = hhConfig.daysOfWeek?.includes(i)
                  return (
                    <button key={i} onClick={() => setHhConfig((h: any) => ({
                      ...h,
                      daysOfWeek: active ? h.daysOfWeek.filter((x: number) => x !== i) : [...(h.daysOfWeek || []), i]
                    }))}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                        active ? 'bg-brew-amber/20 border-brew-amber text-brew-gold' : 'bg-brew-bg3 border-brew-border text-brew-text-dim hover:border-brew-amber'
                      }`}>
                      {d}
                    </button>
                  )
                })}
              </div>
            </div>
            <button onClick={saveHH} disabled={hhLoading} className="btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-60">
              <Save size={15} /> {hhLoading ? 'Guardando...' : 'Guardar Configuración'}
            </button>
          </div>
        )}
      </main>

      {/* MODALS */}
      <AnimatePresence>
        {openBeerModal && (
          <BeerModal
//          styles={styles.map(s => s.name)}
            beer={beerModal as Beer | null}
            token={token}
            onClose={() => setOpenBeerModal(false)}
            onSaved={loadBeers}
            styles={styles.map(s => s.name)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {openFoodModal && (
          <FoodModal
            food={foodModal as Food | null}
            token={token}
            onClose={() => setOpenFoodModal(false)}
            onSaved={loadFoods}
          />
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {openDrinkModal && (
          <DrinkModal
            drink={drinkModal as Drink | null}
            token={token}
            onClose={() => setOpenDrinkModal(false)}
            onSaved={loadDrinks}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 16, x: '-50%' }}
            className={`fixed bottom-6 left-1/2 z-[100] px-5 py-3 rounded-xl text-sm font-semibold shadow-xl border ${
              toast.type === 'success'
                ? 'bg-green-950/80 border-green-700/40 text-green-300'
                : 'bg-red-950/80 border-red-700/40 text-red-300'
            } backdrop-blur-sm`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}