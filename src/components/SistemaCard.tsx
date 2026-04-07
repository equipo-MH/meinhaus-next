'use client'
import Link from 'next/link'
import type { Sistema } from '@/types'

const ACCENTS: Record<string, string> = {
  sip: '#9B7C5A', steel: '#4A8A9E', madera: '#7A6B4A', mamp: '#8A7A6E',
  container: '#4A8A7A', adobe: '#9A7A4A', modular: '#6A7A9A', mixto: '#8A6A7A',
}
const VAL_COLORS: Record<string, string> = {
  g: '#3D7A55', m: '#B89A2E', b: 'rgba(250,249,246,.28)',
}

function valClass(s: Sistema, field: string): string {
  if (field === 'tiempo') return s.idx === 3 ? 'b' : 'g'
  if (field === 'aislacion') return (s.idx === 3 || s.idx === 4) ? 'm' : 'g'
  return ''
}

export default function SistemaCard({ s, compact }: { s: Sistema; compact?: boolean }) {
  const accent = ACCENTS[s.id] ?? '#9B7C5A'

  return (
    <Link href={`/sistemas/${s.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'var(--dark2)', padding: compact ? '1.4rem 1.4rem' : '1.85rem 1.6rem',
        position: 'relative' as const, overflow: 'hidden' as const,
        cursor: 'pointer' as const, height: '100%',
        borderBottom: `2px solid transparent`,
        transition: 'background .25s, border-color .25s',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.background = 'var(--dark3)'
          ;(e.currentTarget as HTMLDivElement).style.borderBottomColor = accent
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.background = 'var(--dark2)'
          ;(e.currentTarget as HTMLDivElement).style.borderBottomColor = 'transparent'
        }}
      >
        <div style={{
          fontFamily: 'var(--mono)', fontSize: '.5rem',
          letterSpacing: '.14em', color: 'rgba(250,249,246,.18)',
          marginBottom: '.8rem',
        }}>0{s.idx + 1}</div>

        <div style={{
          display: 'inline-block' as const, fontFamily: 'var(--mono)',
          fontSize: '.48rem', letterSpacing: '.1em', textTransform: 'uppercase',
          padding: '.16rem .52rem', border: `1px solid ${accent}44`,
          color: accent, marginBottom: '.95rem',
        }}>{s.badge}</div>

        <div style={{
          fontFamily: 'var(--serif)', fontSize: '1.2rem',
          fontWeight: 300, color: 'var(--white)',
          marginBottom: '.5rem', lineHeight: 1.15,
        }}>{s.name}</div>

        {!compact && (
          <div style={{
            fontSize: '.77rem', fontWeight: 300,
            color: 'rgba(250,249,246,.32)', lineHeight: 1.65,
            marginBottom: '1.2rem',
          }}>{s.desc}</div>
        )}

        <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: 0 }}>
          {[
            ['Costo m²', s.costo, ''],
            ['Tiempo 100m²', s.tiempo, valClass(s, 'tiempo')],
            ['Aislación', s.aislacion, valClass(s, 'aislacion')],
          ].map(([k, v, vc]) => (
            <div key={k as string} style={{
              display: 'flex' as const, justifyContent: 'space-between' as const,
              fontFamily: 'var(--mono)', fontSize: '.5rem',
              letterSpacing: '.06em', textTransform: 'uppercase',
              padding: '.3rem 0', borderBottom: '1px solid rgba(250,249,246,.04)',
            }}>
              <span style={{ color: 'rgba(250,249,246,.2)' }}>{k}</span>
              <span style={{ color: vc ? VAL_COLORS[vc as string] : accent }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '1.1rem', fontFamily: 'var(--mono)',
          fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase',
          color: 'rgba(250,249,246,.22)',
        }}>Ver detalle →</div>
      </div>
    </Link>
  )
}
