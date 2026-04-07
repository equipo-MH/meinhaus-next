import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { CAPAS, TIPOS_CAPA, getCapasPorTipo } from '@/data/capas'
import type { CapaTipo } from '@/types'

export async function generateStaticParams() {
  return TIPOS_CAPA.map(t => ({ tipo: t.id }))
}

const COSTO_LABELS = ['', '$', '$$', '$$$', '$$$$']
const COSTO_DESC = ['', 'Económico', 'Accesible', 'Medio-alto', 'Premium']

export default async function CapaTipoPage({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = await params
  const tipoInfo = TIPOS_CAPA.find(t => t.id === tipo)
  if (!tipoInfo) notFound()

  const capas = getCapasPorTipo(tipo as CapaTipo)

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            {/* Header */}
            <Link href="/capas" style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--mid)', display: 'flex' as const, alignItems: 'center' as const, gap: '.5rem', marginBottom: '2rem', textDecoration: 'none' }}>← Todas las capas</Link>

            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '4rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '2rem', color: 'var(--rust)', marginBottom: '1rem', opacity: .55 }}>{tipoInfo.icon}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rust)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Capas constructivas
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>{tipoInfo.nombre}</h1>
              </div>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>{tipoInfo.descripcion}</p>
            </div>

            {/* Cards */}
            <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: '1px', background: 'rgba(24,23,19,.06)', border: '1px solid rgba(24,23,19,.06)' }}>
              {capas.map(capa => (
                <div key={capa.id} style={{ background: 'var(--bg)', padding: '2rem', transition: 'background .2s' }}
                  className="capa-card"
                >
                  <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                    <div>
                      <div style={{ display: 'flex' as const, gap: '1rem', alignItems: 'center' as const, marginBottom: '.85rem' }}>
                        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 300, color: 'var(--ink)' }}>{capa.nombre}</h3>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.18rem .55rem', border: '1px solid rgba(24,23,19,.1)', color: 'var(--mid)' }}>{COSTO_LABELS[capa.costoRelativo]} {COSTO_DESC[capa.costoRelativo]}</span>
                      </div>
                      <p style={{ fontSize: '.88rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.72, marginBottom: '1.25rem' }}>{capa.descripcion}</p>

                      {/* Cuándo usar */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#3D7A55', marginBottom: '.5rem' }}>Cuándo usar</div>
                        {capa.cuandoUsar.map((item, i) => (
                          <div key={i} style={{ display: 'flex' as const, gap: '.5rem', alignItems: 'flex-start' as const, padding: '.35rem 0', borderBottom: i < capa.cuandoUsar.length - 1 ? '1px solid rgba(24,23,19,.05)' : 'none' }}>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3D7A55', flexShrink: 0, marginTop: '.48rem' }} />
                            <span style={{ fontSize: '.8rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.6 }}>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Limitaciones */}
                      <div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(232,83,26,.6)', marginBottom: '.5rem' }}>Limitaciones</div>
                        {capa.limitaciones.map((item, i) => (
                          <div key={i} style={{ display: 'flex' as const, gap: '.5rem', alignItems: 'flex-start' as const, padding: '.35rem 0', borderBottom: i < capa.limitaciones.length - 1 ? '1px solid rgba(24,23,19,.05)' : 'none' }}>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(232,83,26,.4)', flexShrink: 0, marginTop: '.48rem' }} />
                            <span style={{ fontSize: '.8rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.6 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Specs */}
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '.8rem' }}>
                        <tbody>
                          {capa.specs.map(([k, v]) => (
                            <tr key={k}>
                              <td style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--light)', padding: '.5rem 0', borderBottom: '1px solid rgba(24,23,19,.06)', whiteSpace: 'nowrap' as const, paddingRight: '1rem', width: '40%' }}>{k}</td>
                              <td style={{ padding: '.5rem 0', borderBottom: '1px solid rgba(24,23,19,.06)', color: 'var(--ink)', fontWeight: 400 }}>{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Sistemas compatibles */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '.65rem' }}>Sistemas compatibles</div>
                        <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.35rem' }}>
                          {capa.sistemasCompatibles.map(sid => (
                            <Link key={sid} href={`/sistemas/${sid === 'mamp' ? 'mamposteria' : sid === 'steel' ? 'steel-frame' : sid}`} style={{
                              fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase',
                              padding: '.2rem .58rem', border: '1px solid rgba(24,23,19,.1)', color: 'var(--mid)', textDecoration: 'none',
                            }}>{sid.toUpperCase()}</Link>
                          ))}
                        </div>
                      </div>

                      {/* Mercado AR */}
                      <div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '.65rem' }}>Mercado Argentina · Referencia</div>
                        <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.35rem' }}>
                          {capa.ejemplosMercadoAR.map(marca => (
                            <span key={marca} style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.2rem .58rem', background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', color: 'var(--mid)' }}>{marca}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
