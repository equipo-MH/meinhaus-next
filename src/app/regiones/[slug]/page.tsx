import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SistemaCard from '@/components/SistemaCard'
import Link from 'next/link'
import { REGIONES, getRegion } from '@/data/regiones'
import { SISTEMAS } from '@/data/sistemas'

export async function generateStaticParams() {
  return REGIONES.map(r => ({ slug: r.slug }))
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = getRegion(slug)
  if (!r) notFound()

  const recomendados = SISTEMAS.filter(s => r.sistemasRecomendados.includes(s.id))
  const limitados = SISTEMAS.filter(s => r.sistemasLimitados.includes(s.id))

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            {/* Back */}
            <Link href="/regiones" style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--mid)', display: 'flex' as const, alignItems: 'center' as const, gap: '.5rem', marginBottom: '2rem', textDecoration: 'none' }}>
              ← Todas las regiones
            </Link>

            {/* Hero text */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '4rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--blue)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--blue)', display: 'block' as const }} />Construir en Argentina
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>
                  {r.nombre}
                </h1>
              </div>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>
                {r.descripcion}
              </p>
            </div>

            {/* Datos climáticos */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)', marginBottom: '3.5rem' }}>
              {[
                ['Temperatura mínima', r.tempMin],
                ['Temperatura máxima', r.tempMax],
                ['Amplitud térmica', r.amplitudTermica],
                ['Humedad', r.humedad],
                ['Viento', r.viento],
                ['Nieve', r.nieve ? 'Sí' : 'No'],
                ['Sismicidad', r.sismicidad],
                ['Logística', r.logistica],
              ].map(([k, v]) => (
                <div key={k as string} style={{ background: 'var(--bg)', padding: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: '.4rem' }}>{k}</div>
                  <div style={{ fontSize: '.88rem', fontWeight: 400, color: 'var(--ink)' }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Dos columnas */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>

              {/* Estrategias */}
              <div style={{ background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', padding: '2rem' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '1.25rem', display: 'flex' as const, alignItems: 'center' as const, gap: '.6rem' }}>
                  <span style={{ width: '14px', height: '1px', background: 'var(--blue)', display: 'block' as const }} />Estrategias clave
                </div>
                {r.estrategiasClaves.map((item, i) => (
                  <div key={i} style={{ display: 'flex' as const, gap: '.65rem', alignItems: 'flex-start' as const, padding: '.55rem 0', borderBottom: i < r.estrategiasClaves.length - 1 ? '1px solid rgba(24,23,19,.06)' : 'none' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--blue)', flexShrink: 0, marginTop: '.48rem' }} />
                    <span style={{ fontSize: '.85rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Advertencias */}
              <div style={{ background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', padding: '2rem' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(232,83,26,.65)', marginBottom: '1.25rem', display: 'flex' as const, alignItems: 'center' as const, gap: '.6rem' }}>
                  <span style={{ width: '14px', height: '1px', background: 'rgba(232,83,26,.5)', display: 'block' as const }} />Advertencias
                </div>
                {r.advertencias.map((item, i) => (
                  <div key={i} style={{ display: 'flex' as const, gap: '.65rem', alignItems: 'flex-start' as const, padding: '.55rem 0', borderBottom: i < r.advertencias.length - 1 ? '1px solid rgba(24,23,19,.06)' : 'none' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(232,83,26,.4)', flexShrink: 0, marginTop: '.48rem' }} />
                    <span style={{ fontSize: '.85rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Costo */}
            <div style={{ background: 'var(--bone)', border: '1px solid rgba(24,23,19,.07)', borderLeft: '3px solid var(--rust)', padding: '1.65rem', marginBottom: '4rem' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '.65rem' }}>Costo de construcción referencial</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.75rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.35rem' }}>{r.costoConstruccion}</div>
              <div style={{ fontSize: '.8rem', fontWeight: 300, color: 'var(--mid)' }}>Fuentes: APYMECO, CAC, La Nación · T1 2026 · No incluye terreno ni honorarios</div>
            </div>

            {/* Sistemas recomendados */}
            {recomendados.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#3D7A55', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.75rem' }}>
                  <span style={{ width: '16px', height: '1px', background: '#3D7A55', display: 'block' as const }} />Sistemas recomendados para {r.nombre}
                </div>
                <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)' }}>
                  {recomendados.map(s => <SistemaCard key={s.id} s={s} compact />)}
                </div>
              </div>
            )}

            {/* Sistemas con limitaciones */}
            {limitados.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(232,83,26,.65)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.75rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'rgba(232,83,26,.4)', display: 'block' as const }} />Sistemas con limitaciones en esta región
                </div>
                <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)', opacity: .65 }}>
                  {limitados.map(s => <SistemaCard key={s.id} s={s} compact />)}
                </div>
              </div>
            )}

            {/* Nota MH */}
            {r.notas && (
              <div style={{ padding: '1.5rem', background: 'rgba(155,124,90,.04)', border: '1px solid rgba(155,124,90,.15)', borderLeft: '3px solid var(--rl)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--rl)', marginBottom: '.65rem', display: 'flex' as const, alignItems: 'center' as const, gap: '.5rem' }}>⬡ Nota MeinHaus</div>
                <p style={{ fontSize: '.88rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.72 }}>{r.notas}</p>
              </div>
            )}

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
