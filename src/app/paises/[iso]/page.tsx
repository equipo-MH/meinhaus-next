import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SistemaCard from '@/components/SistemaCard'
import Link from 'next/link'
import { PAISES, getPais, STATUS_LABEL, STATUS_COLOR } from '@/data/paises'
import { SISTEMAS } from '@/data/sistemas'

export async function generateStaticParams() {
  return PAISES.filter(p => p.statusData !== 'scaffold').map(p => ({ iso: p.iso.toLowerCase() }))
}

export default async function PaisPage({ params }: { params: Promise<{ iso: string }> }) {
  const { iso } = await params
  const pais = getPais(iso)
  if (!pais || pais.statusData === 'scaffold') notFound()

  const sistemasDisponibles = SISTEMAS.filter(s => pais.sistemasDominantes.includes(s.id))
  const isArgentina = pais.iso === 'AR'

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--dark)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: '4rem 0', borderBottom: '1px solid rgba(250,249,246,.05)' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            <Link href="/paises" style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(250,249,246,.3)', display: 'flex' as const, alignItems: 'center' as const, gap: '.5rem', marginBottom: '2.5rem', textDecoration: 'none' }}>
              ← Todos los países
            </Link>

            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-end' as const }}>
              <div>
                <div style={{ display: 'flex' as const, gap: '.65rem', alignItems: 'center' as const, marginBottom: '1.25rem' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: STATUS_COLOR[pais.statusData] }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(250,249,246,.3)' }}>
                    {STATUS_LABEL[pais.statusData]} · {pais.continente}
                  </span>
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,6vw,6rem)', fontWeight: 300, lineHeight: .92, letterSpacing: '-.02em', color: 'var(--white)', marginBottom: '1rem' }}>
                  {pais.nombre}
                </h1>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(250,249,246,.25)', marginBottom: '1.5rem' }}>
                  {pais.iso3} · Normativa: {pais.normativa} · {pais.moneda}
                </div>
                <p style={{ fontSize: 'clamp(.9rem,1.1vw,.98rem)', fontWeight: 300, color: 'rgba(250,249,246,.45)', lineHeight: 1.8, maxWidth: '52ch' }}>
                  {pais.descripcionBreve}
                </p>
              </div>

              {/* KPIs */}
              <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(250,249,246,.05)', border: '1px solid rgba(250,249,246,.05)' }}>
                {[
                  ['Temperatura', pais.tempRango ?? '—'],
                  ['Sismicidad', pais.sismicidad?.split(' — ')[0] ?? pais.sismicidad ?? '—'],
                  ['Normativa', pais.normativa],
                  ['Sistemas dominantes', pais.sistemasDominantes.slice(0, 2).map(s => s.toUpperCase()).join(', ')],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: 'rgba(250,249,246,.02)', padding: '1.4rem' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(250,249,246,.22)', marginBottom: '.5rem' }}>{k}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Desafío constructivo */}
        {pais.desafioConstructivo && (
          <section style={{ padding: '4rem 0', background: 'var(--dark2)', borderBottom: '1px solid rgba(250,249,246,.05)' }}>
            <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>
              <div style={{ display: 'grid' as const, gridTemplateColumns: '200px 1fr', gap: '4rem', alignItems: 'center' as const }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rl)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rl)', display: 'block' as const }} />Desafío constructivo clave
                </div>
                <blockquote style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.25rem,2vw,1.75rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--white)', lineHeight: 1.3 }}>
                  &ldquo;{pais.desafioConstructivo}&rdquo;
                </blockquote>
              </div>
            </div>
          </section>
        )}

        {/* Sistemas disponibles */}
        {sistemasDisponibles.length > 0 && (
          <section style={{ padding: '5rem 0', borderBottom: '1px solid rgba(250,249,246,.05)' }}>
            <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rl)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rl)', display: 'block' as const }} />Sistemas constructivos en {pais.nombre}
                </div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--white)' }}>
                  Qué se usa y <em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>por qué.</em>
                </h2>
              </div>
              <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(250,249,246,.05)', border: '1px solid rgba(250,249,246,.05)' }}>
                {sistemasDisponibles.map(s => <SistemaCard key={s.id} s={s} />)}
              </div>
            </div>
          </section>
        )}

        {/* Argentina — link to full platform */}
        {isArgentina && (
          <section style={{ padding: '4rem 0', background: 'rgba(155,124,90,.04)', borderBottom: '1px solid rgba(155,124,90,.1)' }}>
            <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--rl)', marginBottom: '1rem', display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'center' as const, gap: '.6rem' }}>
                <span>⬡</span> Argentina — documentación completa disponible
              </div>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'rgba(250,249,246,.45)', lineHeight: 1.72, maxWidth: '52ch', margin: '0 auto 2rem' }}>
                Argentina es el país con mayor nivel de detalle en la plataforma: sistemas, capas constructivas, regiones, normativa provincial y herramientas de cálculo.
              </p>
              <div style={{ display: 'flex' as const, gap: '1rem', justifyContent: 'center' as const, flexWrap: 'wrap' as const }}>
                {[
                  ['Ver sistemas AR', '/sistemas'],
                  ['Capas constructivas', '/capas'],
                  ['Regiones de Argentina', '/regiones'],
                  ['Normativa por provincia', '/normativa'],
                  ['Mapa + Calculadora', '/mapa'],
                ].map(([label, href]) => (
                  <Link key={href} href={href} style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase', padding: '.65rem 1.25rem', border: '1px solid rgba(155,124,90,.25)', color: 'rgba(155,124,90,.8)', textDecoration: 'none' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Próximamente */}
        <section style={{ padding: '4rem 0' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>
            <div style={{ background: 'rgba(250,249,246,.02)', border: '1px solid rgba(250,249,246,.05)', padding: '2.5rem', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(250,249,246,.22)', marginBottom: '1rem' }}>Próximamente</div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(250,249,246,.35)', marginBottom: '1.75rem' }}>
                Normativa local, proveedores, costos por región y casos de obra reales en {pais.nombre}.
              </p>
              <Link href="/contacto" style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--rl)', textDecoration: 'none' }}>
                ¿Trabajás en construcción en {pais.nombre}? Contribuí con datos →
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
