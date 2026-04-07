import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ARTICULOS } from '@/data/articulos'
import { SISTEMAS } from '@/data/sistemas'

const CAT_COLORS: Record<string, string> = {
  sip: 'var(--rl)', gen: 'var(--mid)',
  norm: 'var(--blue)', tecnica: '#4A8A9E', criterio: 'var(--rust)',
}
const CAT_BORDERS: Record<string, string> = {
  sip: 'rgba(155,124,90,.28)', gen: 'rgba(24,23,19,.12)',
  norm: 'rgba(45,95,138,.28)', tecnica: 'rgba(74,138,158,.28)', criterio: 'rgba(107,79,58,.28)',
}

export default function ArticulosPage() {
  const featured = ARTICULOS.filter(a => a.featured)
  const rest = ARTICULOS.filter(a => !a.featured)
  const allTags = [...new Set(ARTICULOS.flatMap(a => a.tags))].slice(0, 16)

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '4rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rust)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Artículos técnicos
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>
                  Criterio.<br /><em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Por escrito.</em>
                </h1>
              </div>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>
                Análisis, comparativas y guías prácticas. Sin sesgo comercial. Para quienes toman decisiones constructivas reales.
              </p>
            </div>

            <div style={{ display: 'grid' as const, gridTemplateColumns: '2fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
              {/* Main list */}
              <div>
                {/* Featured articles */}
                {featured.map(a => (
                  <Link key={a.id} href={`/articulos/${a.slug}`} style={{ textDecoration: 'none', display: 'block' as const }}>
                    <article style={{
                      background: 'var(--bg2)', marginBottom: '1px',
                      borderLeft: '3px solid transparent', transition: 'all .2s', cursor: 'pointer' as const,
                    }}
                      className="art-card-server art-card-server-featured"
                    >
                      <div style={{ padding: '1.75rem' }}>
                        <div style={{ display: 'flex' as const, gap: '.85rem', alignItems: 'center' as const, marginBottom: '.85rem' }}>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.13em', textTransform: 'uppercase', padding: '.17rem .52rem', border: `1px solid ${CAT_BORDERS[a.categoria]}`, color: CAT_COLORS[a.categoria] }}>{a.categoriaLabel}</span>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--light)' }}>{a.fecha}</span>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--rl)', padding: '.14rem .48rem', border: '1px solid rgba(155,124,90,.2)' }}>Destacado</span>
                        </div>
                        <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.5rem', lineHeight: 1.2 }}>{a.titulo}</h2>
                        <p style={{ fontSize: '.85rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65, marginBottom: '.85rem' }}>{a.extracto}</p>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--rl)' }}>Leer artículo →</span>
                      </div>
                    </article>
                  </Link>
                ))}

                {/* Regular articles */}
                {rest.map(a => (
                  <Link key={a.id} href={`/articulos/${a.slug}`} style={{ textDecoration: 'none', display: 'block' as const }}>
                    <article style={{
                      background: 'var(--bg)', marginBottom: '1px',
                      borderLeft: '3px solid transparent', transition: 'all .2s',
                      padding: '1.75rem', cursor: 'pointer' as const,
                    }}
                      className="art-card-server art-card-server-regular"
                    >
                      <div style={{ display: 'flex' as const, gap: '.85rem', alignItems: 'center' as const, marginBottom: '.85rem' }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.13em', textTransform: 'uppercase', padding: '.17rem .52rem', border: `1px solid ${CAT_BORDERS[a.categoria]}`, color: CAT_COLORS[a.categoria] }}>{a.categoriaLabel}</span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--light)' }}>{a.fecha}</span>
                      </div>
                      <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.5rem', lineHeight: 1.2 }}>{a.titulo}</h2>
                      <p style={{ fontSize: '.82rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65, marginBottom: '.85rem' }}>{a.extracto}</p>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--rl)' }}>Leer →</span>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Sidebar */}
              <div style={{ position: 'sticky' as const, top: 'calc(var(--nav) + 1.5rem)', display: 'flex' as const, flexDirection: 'column' as const, gap: '1.5rem' }}>

                <div style={{ background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', padding: '1.6rem' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.25rem', display: 'flex' as const, alignItems: 'center' as const, gap: '.6rem' }}>
                    <span style={{ width: '14px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Temas
                  </div>
                  <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.35rem' }}>
                    {allTags.map(t => (
                      <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.2rem .58rem', border: '1px solid rgba(24,23,19,.1)', color: 'var(--mid)', cursor: 'pointer' as const }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', padding: '1.6rem' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.25rem', display: 'flex' as const, alignItems: 'center' as const, gap: '.6rem' }}>
                    <span style={{ width: '14px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Sistemas
                  </div>
                  <div style={{ display: 'flex' as const, flexDirection: 'column' as const }}>
                    {SISTEMAS.slice(0, 5).map((s, i) => (
                      <Link key={s.id} href={`/sistemas/${s.slug}`} style={{
                        fontSize: '.82rem', fontWeight: 300, color: 'var(--mid)',
                        padding: '.52rem 0', borderBottom: i < 4 ? '1px solid rgba(24,23,19,.06)' : 'none',
                        textDecoration: 'none', display: 'flex' as const, justifyContent: 'space-between' as const,
                      }}>{s.name}<span style={{ opacity: .4 }}>→</span></Link>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'rgba(155,124,90,.04)', border: '1px solid rgba(155,124,90,.15)', padding: '1.6rem' }}>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink)', marginBottom: '.85rem', lineHeight: 1.5 }}>¿Tenés un proyecto y querés entender qué sistema tiene sentido?</p>
                  <Link href="/selector" style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--rl)', textDecoration: 'none' }}>Usar el selector →</Link>
                </div>

              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
