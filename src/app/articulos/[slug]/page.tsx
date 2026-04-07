import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ARTICULOS, getArticulo } from '@/data/articulos'

export async function generateStaticParams() {
  return ARTICULOS.map(a => ({ slug: a.slug }))
}

export default async function ArticuloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = getArticulo(slug)
  if (!a) notFound()

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '4rem var(--pad) 6rem' }}>

          <Link href="/articulos" style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--mid)', display: 'flex' as const, alignItems: 'center' as const, gap: '.5rem', marginBottom: '3rem', textDecoration: 'none' }}>
            ← Todos los artículos
          </Link>

          <div style={{ display: 'flex' as const, gap: '.85rem', alignItems: 'center' as const, marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.13em', textTransform: 'uppercase', padding: '.17rem .52rem', border: '1px solid rgba(155,124,90,.28)', color: 'var(--rl)' }}>{a.categoriaLabel}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--light)' }}>{a.fecha}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.05, marginBottom: '1rem' }}>
            {a.titulo}
          </h1>

          <p style={{ fontSize: '1.05rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.72, marginBottom: '3rem', borderBottom: '1px solid rgba(24,23,19,.08)', paddingBottom: '2rem' }}>
            {a.extracto}
          </p>

          <div
            style={{ fontSize: '.95rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.85 }}
            dangerouslySetInnerHTML={{ __html: a.contenido }}
          />

          {/* Tags */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(24,23,19,.08)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '.85rem' }}>Temas</div>
            <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.4rem' }}>
              {a.tags.map(t => (
                <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.2rem .58rem', border: '1px solid rgba(24,23,19,.1)', color: 'var(--mid)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: '2.5rem', padding: '1.65rem', background: 'var(--bg2)', borderLeft: '3px solid var(--rust)' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink)', marginBottom: '.65rem' }}>
              ¿Querés entender qué sistema tiene sentido para tu proyecto?
            </p>
            <Link href="/selector" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--white)', padding: '.85rem 1.75rem', display: 'inline-block' as const, textDecoration: 'none' }}>
              Usar el selector →
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}
