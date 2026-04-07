'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { TIPOS_CAPA, CAPAS } from '@/data/capas'

export default function CapasPage() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '4rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rust)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Capas constructivas
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>
                  Más allá del sistema.<br /><em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>El edificio completo.</em>
                </h1>
              </div>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>
                El sistema estructural es la columna vertebral. Pero un edificio es fachadas, cubiertas, fundaciones, instalaciones e interiores. Cada capa tiene sus propias variables, materiales y lógicas.
              </p>
            </div>

            {/* Tipos grid */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(5,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)', marginBottom: '5rem' }}>
              {TIPOS_CAPA.map(tipo => (
                <Link key={tipo.id} href={`/capas/${tipo.id}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{ background: 'var(--bg)', padding: '2.5rem 1.75rem', cursor: 'pointer' as const, height: '100%', borderBottom: '2px solid transparent', transition: 'all .2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bone)'; (e.currentTarget as HTMLDivElement).style.borderBottomColor = 'var(--rust)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)'; (e.currentTarget as HTMLDivElement).style.borderBottomColor = 'transparent' }}
                  >
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '1.6rem', color: 'var(--rust)', marginBottom: '1.25rem', opacity: .55 }}>{tipo.icon}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.5rem' }}>{tipo.nombre}</div>
                    <div style={{ fontSize: '.8rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{tipo.descripcion}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--rl)' }}>
                      {CAPAS.filter(c => c.tipo === tipo.id).length} soluciones →
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Info block */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '3rem', padding: '3rem', background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '1rem' }}>Sistema × Capa</h3>
                <p style={{ fontSize: '.88rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>
                  No todos los sistemas son compatibles con todas las capas. Una cubierta de membrana en un edificio de steel frame tiene una lógica diferente a la misma cubierta sobre mampostería. Las fichas de cada capa indican los sistemas compatibles.
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '1rem' }}>Marcas disponibles en Argentina</h3>
                <p style={{ fontSize: '.88rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>
                  Cada ficha incluye referencias de productos y marcas disponibles en el mercado argentino. No es una recomendación comercial — es una referencia para que la búsqueda de opciones empiece con nombres reales.
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
