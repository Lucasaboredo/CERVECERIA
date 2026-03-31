'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Settings } from 'lucide-react'

const links = [
  { href: '/#tragos', label: 'La Carta' },
  { href: '/#tap-list', label: 'Cervezas' },
  { href: '/#food', label: 'Gastronomía' },
  { href: '/#nosotros', label: 'Nosotros' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-brew-bg border-b border-brew-border shadow-2xl shadow-black'
        : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 h-[70px] flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="w-[55px] h-[55px] rounded-full overflow-hidden border-2 border-brew-text flex items-center justify-center transition-transform hover:scale-105">
            <h1 className="text-xl font-bold font-sans">BAWS.</h1>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 font-serif text-[15px] font-bold tracking-[2px] uppercase text-brew-cream-dim hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        <button onClick={() => setOpen(o => !o)} className="md:hidden ml-auto text-brew-cream-dim">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-brew-bg2 border-b border-brew-border px-6 py-4 flex flex-col gap-3"
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-brew-text-dim hover:text-white py-2 text-sm font-medium uppercase tracking-wider">
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
