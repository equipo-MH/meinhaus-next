import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MeinHaus — Sistemas constructivos en Argentina',
  description: 'La plataforma de referencia sobre construcción industrializada en Argentina. Sistemas constructivos, capas, regiones y herramientas de decisión.',
  keywords: 'construcción industrializada, SIP, steel frame, sistemas constructivos, Argentina, Patagonia',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
