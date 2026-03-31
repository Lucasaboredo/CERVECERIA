import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BREW Admin — Panel de Administración',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brew-bg">
      {children}
    </div>
  )
}
