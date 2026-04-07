'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LOGO = "/images/logo.png"

const LEFT_LINKS: [string, string][] = [
  ['Sistemas', '/sistemas'],
  ['Regiones', '/regiones'],
  ['Países', '/paises'],
  ['Comunidad', '/comunidad'],
  ['Índice', '/indice'],
]

const RIGHT_LINKS: [string, string, boolean][] = [
  ['Artículos', '/articulos', false],
  ['⬡ Selector', '/selector', true],
  ['Quiero construir', '/quiero-construir', false],
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isDark = pathname === '/' || pathname.startsWith('/paises')

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const dark = isDark && !solid
  const lc = dark ? 'rgba(250,249,246,.42)' : 'var(--mid)'

  return (
    <nav style={{
      position: 'fixed' as const, top: 0, left: 0, right: 0, zIndex: 500,
      transition: 'all .4s', borderBottom: '1px solid transparent',
      ...(solid ? {
        background: 'rgba(243,242,238,.97)',
        backdropFilter: 'blur(14px)',
        borderBottomColor: 'rgba(24,23,19,.07)',
      } : {}),
    }}>
      <div style={{
        maxWidth: 'var(--max)', margin: '0 auto',
        padding: '0 var(--pad)', height: 'var(--nav)',
        display: 'grid' as const, gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' as const,
      }}>

        {/* LEFT */}
        <div style={{ display: 'flex' as const, alignItems: 'center' as const, gap: '1.4rem' }}>
          {LEFT_LINKS.map(([label, href]) => (
            <Link key={href} href={href} style={{
              fontFamily: 'var(--mono)', fontSize: '.55rem',
              letterSpacing: '.13em', textTransform: 'uppercase' as const,
              color: pathname === href ? 'var(--rl)' : lc,
              transition: 'color .2s', textDecoration: 'none',
            }}>{label}</Link>
          ))}
        </div>

        {/* CENTER */}
        <div style={{ display: 'flex' as const, flexDirection: 'column' as const, alignItems: 'center' as const, gap: '4px' }}>
          <Link href="/" style={{ lineHeight: 0 }}>
            <img src={LOGO} alt="MeinHaus" style={{
              height: '30px', width: 'auto',
              filter: dark ? 'brightness(0) invert(1)' : 'brightness(0)',
              transition: 'filter .35s',
            }} />
          </Link>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '.4rem',
            letterSpacing: '.22em', textTransform: 'uppercase' as const,
            color: dark ? 'rgba(250,249,246,.2)' : 'rgba(24,23,19,.3)',
            whiteSpace: 'nowrap' as const, transition: 'color .35s',
          }}>
            Diseño · Construcción · <span style={{ color: 'var(--rl)' }}>Sistemas</span>
          </span>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'flex-end' as const, gap: '1.1rem' }}>
          {RIGHT_LINKS.map(([label, href, highlight]) => (
            <Link key={href} href={href} style={{
              fontFamily: 'var(--mono)', fontSize: '.55rem',
              letterSpacing: '.13em', textTransform: 'uppercase' as const,
              color: highlight ? 'var(--rl)' : lc,
              textDecoration: 'none',
            }}>{label}</Link>
          ))}
          <Link href="/sumate" style={{
            fontFamily: 'var(--mono)', fontSize: '.55rem',
            letterSpacing: '.13em', textTransform: 'uppercase' as const,
            background: dark ? 'rgba(250,249,246,.1)' : 'var(--ink)',
            color: 'var(--white)', padding: '.42rem 1rem',
            border: dark ? '1px solid rgba(250,249,246,.2)' : 'none',
            textDecoration: 'none', transition: 'background .2s',
          }}>Sumate →</Link>
        </div>

      </div>
    </nav>
  )
}
