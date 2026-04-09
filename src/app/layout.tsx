import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MeinHaus — Plataforma de construccion en Argentina',
  description: 'Conectamos profesionales del oficio con quienes quieren construir bien. Patagonia, Argentina.',
  keywords: 'construccion, oficios, SIP, steel frame, Patagonia, Argentina',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}