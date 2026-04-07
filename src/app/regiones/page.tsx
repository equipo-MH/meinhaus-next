import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { REGIONES } from '@/data/regiones'
import { SISTEMA_NOMBRES } from '@/lib/utils'

export default function RegionesPage() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '4rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--blue)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--blue)', display: 'block' as const }} />Construir en Argentina
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>
                  El contexto importa.<br /><em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>Por región.</em>
                </h1>
              </div>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>
                No es lo mismo construir en Patagonia que en el NOA. El clima, la sismicidad, la logística y la disponibilidad de mano de obra cambian la ecuación completa. Cada región tiene su propia lógica constructiva.
              </p>
            </div>

            <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)' }}>
              {REGIONES.map(r => (
                <Link key={r.id} href={`/regiones/${r.slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{ background: 'var(--bg)', padding: '2rem', cursor: 'pointer' as const, borderBottom: '2px solid transparent', transition: 'all .2s', height: '100%' }}
                    className="region-card"
                  >
                    <div style={{ display: 'flex' as const, justifyContent: 'space-between' as const, alignItems: 'flex-start' as const, marginBottom: '1rem' }}>
                      <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)' }}>{r.nombre}</h3>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--light)' }}>{r.tempMin} / {r.tempMax}</span>
                    </div>

                    <p style={{ fontSize: '.8rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{r.descripcion}</p>

                    <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(24,23,19,.06)', marginBottom: '1.25rem' }}>
                      {[
                        ['Sismicidad', r.sismicidad],
                        ['Costo m²', r.costoConstruccion.split('/')[0]],
                      ].map(([k, v]) => (
                        <div key={k} style={{ background: 'var(--bg2)', padding: '.75rem .85rem' }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: '.25rem' }}>{k}</div>
                          <div style={{ fontSize: '.78rem', fontWeight: 300, color: 'var(--ink)' }}>{v}</div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '.5rem' }}>Sistemas recomendados</div>
                      <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.3rem' }}>
                        {r.sistemasRecomendados.slice(0, 3).map(sid => (
                          <span key={sid} style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.08em', textTransform: 'uppercase', padding: '.16rem .48rem', border: '1px solid rgba(155,124,90,.25)', color: 'var(--rl)' }}>
                            {sid === 'sip' ? 'SIP' : sid === 'steel' ? 'Steel Frame' : sid === 'mamp' ? 'Mampostería' : sid.charAt(0).toUpperCase() + sid.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginTop: '1.25rem', fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--rl)' }}>Ver detalle →</div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
