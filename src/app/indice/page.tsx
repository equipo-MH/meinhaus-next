'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface EncuestaDato {
  provincia: string
  rol_reportado: string
  sistema_constructivo: string
  jornal_diario: number | null
  valor_m2_desde: number | null
  valor_m2_hasta: number | null
  unidad_moneda: string
}

interface ZonaStats {
  provincia: string
  n: number
  jornal_promedio: number | null
  m2_promedio: number | null
  sistema_top: string
}

export default function IndicePage() {
  const [datos, setDatos] = useState<EncuestaDato[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetch() {
      const { data, count } = await supabase
        .from('encuestas_economicas')
        .select('provincia, rol_reportado, sistema_constructivo, jornal_diario, valor_m2_desde, valor_m2_hasta, unidad_moneda', { count: 'exact' })
        .not('jornal_diario', 'is', null)
        .limit(500)

      if (data) {
        setDatos(data as EncuestaDato[])
        setTotal(count ?? data.length)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  // Aggregate by province
  const byProvincia = datos.reduce<Record<string, EncuestaDato[]>>((acc, d) => {
    if (!acc[d.provincia]) acc[d.provincia] = []
    acc[d.provincia].push(d)
    return acc
  }, {})

  const stats: ZonaStats[] = Object.entries(byProvincia).map(([prov, items]) => {
    const jornales = items.filter(i => i.jornal_diario && i.unidad_moneda === 'ARS').map(i => i.jornal_diario!)
    const m2s = items.filter(i => i.valor_m2_desde && i.unidad_moneda === 'ARS').map(i => (i.valor_m2_desde! + (i.valor_m2_hasta ?? i.valor_m2_desde!)) / 2)
    const sistConteo = items.reduce<Record<string, number>>((a, i) => { a[i.sistema_constructivo] = (a[i.sistema_constructivo] ?? 0) + 1; return a }, {})
    const sistTop = Object.entries(sistConteo).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

    return {
      provincia: prov,
      n: items.length,
      jornal_promedio: jornales.length > 0 ? Math.round(jornales.reduce((a, b) => a + b, 0) / jornales.length) : null,
      m2_promedio: m2s.length > 0 ? Math.round(m2s.reduce((a, b) => a + b, 0) / m2s.length) : null,
      sistema_top: sistTop,
    }
  }).sort((a, b) => b.n - a.n)

  const hasData = total >= 5

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end', marginBottom: '4rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--rust)', display: 'flex', alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' }} />Índice MeinHaus
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>
                  Lo que<br /><em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>cuesta construir.</em>
                </h1>
              </div>
              <div>
                <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82, marginBottom: '1rem' }}>
                  El primer índice de costos de construcción basado en datos reales de profesionales activos. Jornal por zona, valor del m² por sistema. Construido por la industria, para la industria.
                </p>
                <div style={{ display: 'flex', gap: '.85rem', alignItems: 'center' as const }}>
                  <div style={{ padding: '.65rem 1.25rem', background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'var(--light)', marginBottom: '.2rem' }}>Respuestas</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 300, color: 'var(--ink)' }}>{loading ? '...' : total}</div>
                  </div>
                  <div style={{ padding: '.65rem 1.25rem', background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'var(--light)', marginBottom: '.2rem' }}>Provincias</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 300, color: 'var(--ink)' }}>{loading ? '...' : Object.keys(byProvincia).length}</div>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div style={{ padding: '4rem', textAlign: 'center' as const }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--light)' }}>Cargando datos...</span>
              </div>
            ) : !hasData ? (
              /* Estado inicial — sin datos suficientes */
              <div>
                <div style={{ padding: '3rem 2.5rem', background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', borderLeft: '3px solid var(--rust)', marginBottom: '3rem' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.65rem' }}>
                    El índice está en construcción.
                  </div>
                  <p style={{ fontSize: '.92rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                    Necesitamos más respuestas para publicar datos confiables. Con <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>100 respuestas por zona</strong> podemos mostrar un índice representativo. Hoy tenemos <strong style={{ color: 'var(--rust)', fontWeight: 500 }}>{total} respuesta{total !== 1 ? 's' : ''}</strong>.
                  </p>
                  <Link href="/sumate" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, background: 'var(--ink)', color: 'var(--white)', padding: '.85rem 1.75rem', textDecoration: 'none', display: 'inline-block' }}>
                    Aportar mis datos →
                  </Link>
                </div>

                {/* Barra de progreso */}
                <div style={{ marginBottom: '4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.65rem' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'var(--mid)' }}>Progreso hacia publicación</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'var(--rust)' }}>{total} / 100</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(24,23,19,.08)', position: 'relative' as const }}>
                    <div style={{ height: '100%', background: 'var(--rust)', width: `${Math.min((total / 100) * 100, 100)}%`, transition: 'width .5s' }} />
                  </div>
                </div>

                {/* Qué va a mostrar */}
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--mid)', display: 'flex', alignItems: 'center' as const, gap: '.65rem', marginBottom: '2rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'rgba(24,23,19,.15)', display: 'block' }} />Qué va a mostrar el índice
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)' }}>
                  {[
                    { titulo: 'Jornal promedio por zona', desc: 'Valor real del jornal diario por rol (carpintero, instalador SIP, oficial, etc.) segmentado por provincia.' },
                    { titulo: 'Costo del m² por sistema', desc: 'Rango real de costo de construcción por metro cuadrado, desglosado por sistema constructivo y zona.' },
                    { titulo: 'Comparativa entre regiones', desc: 'Diferencias de costo entre Patagonia, AMBA, NOA, Cuyo y Centro. Tipo índice Big Mac pero de construcción.' },
                  ].map(({ titulo, desc }) => (
                    <div key={titulo} style={{ background: 'var(--bg)', padding: '1.75rem' }}>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.5rem' }}>{titulo}</div>
                      <p style={{ fontSize: '.8rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Con datos suficientes — mostrar índice */
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--mid)', display: 'flex', alignItems: 'center' as const, gap: '.65rem', marginBottom: '2rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' }} />Datos por provincia
                </div>
                <div style={{ background: 'var(--bg)', border: '1px solid rgba(24,23,19,.07)', overflow: 'hidden' as const }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 140px 140px 120px', gap: '1px', background: 'rgba(24,23,19,.07)' }}>
                    {['Provincia', 'N', 'Jornal ARS', 'M² ARS', 'Sistema top'].map(h => (
                      <div key={h} style={{ background: 'var(--bg2)', padding: '.75rem 1.25rem', fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'var(--mid)' }}>{h}</div>
                    ))}
                    {stats.map(s => (
                      <>
                        <div key={s.provincia + 'n'} style={{ background: 'var(--bg)', padding: '.9rem 1.25rem', fontFamily: 'var(--serif)', fontSize: '.95rem', fontWeight: 300, color: 'var(--ink)' }}>{s.provincia}</div>
                        <div style={{ background: 'var(--bg)', padding: '.9rem 1.25rem', fontFamily: 'var(--mono)', fontSize: '.56rem', color: 'var(--light)', display: 'flex', alignItems: 'center' as const }}>{s.n}</div>
                        <div style={{ background: 'var(--bg)', padding: '.9rem 1.25rem', fontFamily: 'var(--mono)', fontSize: '.62rem', color: 'var(--ink)', display: 'flex', alignItems: 'center' as const }}>
                          {s.jornal_promedio ? `$ ${s.jornal_promedio.toLocaleString('es-AR')}` : '—'}
                        </div>
                        <div style={{ background: 'var(--bg)', padding: '.9rem 1.25rem', fontFamily: 'var(--mono)', fontSize: '.62rem', color: 'var(--ink)', display: 'flex', alignItems: 'center' as const }}>
                          {s.m2_promedio ? `$ ${s.m2_promedio.toLocaleString('es-AR')}` : '—'}
                        </div>
                        <div style={{ background: 'var(--bg)', padding: '.9rem 1.25rem', fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--rl)', display: 'flex', alignItems: 'center' as const }}>{s.sistema_top}</div>
                      </>
                    ))}
                  </div>
                </div>
                <p style={{ marginTop: '1.25rem', fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--light)', lineHeight: 1.6 }}>
                  Datos anonimizados y agregados · {total} respuestas · Actualización continua · MeinHaus no verifica individualmente cada dato
                </p>
              </div>
            )}

            {/* CTA */}
            <div style={{ marginTop: '5rem', padding: '2.5rem', background: 'var(--bone)', border: '1px solid rgba(24,23,19,.07)', borderLeft: '3px solid var(--rust)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' as const, flexWrap: 'wrap' as const, gap: '1.5rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.4rem' }}>Ayudá a construir el índice.</div>
                <p style={{ fontSize: '.85rem', fontWeight: 300, color: 'var(--mid)' }}>Si trabajás en construcción, tus datos valen. Son anónimos y ayudan a toda la industria.</p>
              </div>
              <Link href="/sumate" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, background: 'var(--ink)', color: 'var(--white)', padding: '.85rem 1.75rem', textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
                Aportar datos →
              </Link>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
