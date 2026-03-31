import type { Metadata } from 'next'
import { Satisfy } from 'next/font/google'
import './globals.css'

const satisfy = Satisfy({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-satisfy',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BAWS — Beer, Aperitif, Wine, Spirit',
  description: 'BAWS. La mejor experiencia cervecera y de coctelería.',
  keywords: ['cervecería artesanal', 'craft beer', 'cocteles', 'tragos', 'BAWS'],
  openGraph: {
    title: 'BAWS.',
    description: 'Beer, Aperitif, Wine, Spirit',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${satisfy.variable}`}>
      <body className="bg-brew-bg antialiased">{children}</body>
    </html>
  )
}
