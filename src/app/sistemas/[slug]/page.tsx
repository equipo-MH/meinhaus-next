import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Veredicto from '@/components/Veredicto'
import SistemaCard from '@/components/SistemaCard'
import Link from 'next/link'
import { SISTEMAS, getSistema } from '@/data/sistemas'

export async function generateStaticParams() {
  return SISTEMAS.map(s => ({ slug: s.slug }))
}

const CALLOUT_COLORS = {
  ok: { bg: 'rgba(61,122,85,.06)', border: '#3D7A55', hdr: '#3D7A55' },
  warn: { bg: 'rgba(184,154,46,.05)', border: '#B89A2E', hdr: '#B89A2E' },
  crit: { bg: 'rgba(232,83,26,.05)', border: '#E8531A', hdr: '#E8531A' },
  info: { bg: 'rgba(45,95,138,.06)', border: '#2D5F8A', hdr: '#2D5F8A' },
}

export default async function SistemaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSistema(slug)
  if (!s) notFound()

  const co = s.callout
  const coColors = CALLOUT_COLORS[co.type]
  const accent = '#9B7C5A'

  return (
    <>
      <Nav />

      {/* Hero */}
      <section style={{ minHeight: '52vh', background: 'var(--dark)', display: 'flex' as const, flexDirection: 'column' as const, justifyContent: 'flex-end' as const, padding: 'calc(var(--nav) + 3rem) var(--pad) 4rem' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
          <Link href="/sistemas" style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(250,249,246,.35)', display: 'flex' as const, alignItems: 'center' as const, gap: '.5rem', marginBottom: '2rem', textDecoration: 'none' }}>← Todos los sistemas</Link>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rl)', marginBottom: '.9rem' }}>{s.badge}</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,6vw,6.5rem)', fontWeight: 300, lineHeight: .92, letterSpacing: '-.02em', color: 'var(--white)', marginBottom: '1.4rem' }}>{s.name}</h1>
          <p style={{ fontSize: 'clamp(.9rem,1.2vw,1rem)', fontWeight: 300, color: 'rgba(250,249,246,.42)', maxWidth: '52ch', lineHeight: 1.8, marginBottom: '2.5rem' }}>{s.desc}</p>
          <div style={{ display: 'flex' as const, gap: '3rem', flexWrap: 'wrap' as const }}>
            {[
              [s.costo, 'Costo m² referencia'],
              [s.tiempo, 'Tiempo obra 100m²'],
              [s.aislacion, 'Aislación térmica'],
              [s.humeda, 'Obra húmeda'],
            ].map(([val, label]) => (
              <div key={label as string}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(250,249,246,.3)', marginTop: '.28rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <div style={{ background: 'var(--dark)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)', display: 'grid' as const, gridTemplateColumns: '240px 1fr', gap: 0 }}>

          {/* Side nav */}
          <div style={{ position: 'sticky' as const, top: 'var(--nav)', height: 'calc(100vh - var(--nav))', background: 'var(--dark2)', borderRight: '1px solid rgba(250,249,246,.05)', padding: '2rem 0', overflowY: 'auto' as const, flexShrink: 0 }}>
            {[
              ['Descripción', '#descripcion'],
              ['Pros y contras', '#proscons'],
              ['Especificaciones', '#specs'],
              ...(s.id === 'sip' ? [['Diagrama de sección', '#diagram']] : []),
              ['Veredicto MeinHaus', '#veredicto'],
              ['Otros sistemas', '#otros'],
            ].map(([label, href]) => (
              <a key={href as string} href={href as string} style={{
                fontFamily: 'var(--mono)', fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase',
                color: 'rgba(250,249,246,.3)', padding: '.48rem 1.5rem', display: 'block' as const,
                borderLeft: '2px solid transparent', textDecoration: 'none', transition: 'color .15s',
              }}
                className="sistema-nav-link"
              >{label}</a>
            ))}
          </div>

          {/* Main content */}
          <div style={{ padding: '4rem var(--pad) 6rem', maxWidth: '860px' }}>

            {/* Description + Callout */}
            <section id="descripcion" style={{ marginBottom: '4rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(250,249,246,.05)' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--white)', marginBottom: '1.25rem' }}>
                Descripción del <em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>sistema</em>
              </h2>
              <p style={{ fontSize: '.9rem', fontWeight: 300, color: 'rgba(250,249,246,.45)', lineHeight: 1.82, marginBottom: '1.5rem' }}>{s.desc}</p>
              <div style={{ display: 'flex' as const, gap: '1rem', padding: '1.1rem 1.35rem', borderLeft: `3px solid ${coColors.border}`, background: coColors.bg }}>
                <span style={{ fontSize: '.95rem', flexShrink: 0 }}>{co.ico}</span>
                <div>
                  <h5 style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.14em', textTransform: 'uppercase', color: coColors.hdr, marginBottom: '.35rem', fontWeight: 500 }}>{co.title}</h5>
                  <p style={{ fontSize: '.82rem', fontWeight: 300, color: 'rgba(250,249,246,.5)', lineHeight: 1.72 }}>{co.body}</p>
                </div>
              </div>
            </section>

            {/* Pros / Cons */}
            <section id="proscons" style={{ marginBottom: '4rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(250,249,246,.05)' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--white)', marginBottom: '1.25rem' }}>
                Pros y <em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>contras</em>
              </h2>
              <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(250,249,246,.05)', border: '1px solid rgba(250,249,246,.05)' }}>
                {[
                  { title: 'Ventajas', items: s.pros, dotColor: '#3D7A55' },
                  { title: 'Limitaciones', items: s.cons, dotColor: 'rgba(232,83,26,.5)' },
                ].map(({ title, items, dotColor }) => (
                  <div key={title} style={{ background: 'var(--dark2)', padding: '1.6rem' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.16em', textTransform: 'uppercase', color: dotColor, marginBottom: '1rem' }}>{title}</div>
                    {items.map((item, i) => (
                      <div key={i} style={{ display: 'flex' as const, alignItems: 'flex-start' as const, gap: '.6rem', padding: '.5rem 0', borderBottom: i < items.length - 1 ? '1px solid rgba(250,249,246,.04)' : 'none' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: dotColor, flexShrink: 0, marginTop: '.42rem' }} />
                        <span style={{ fontSize: '.82rem', fontWeight: 300, color: 'rgba(250,249,246,.5)', lineHeight: 1.65 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* Specs */}
            <section id="specs" style={{ marginBottom: '4rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(250,249,246,.05)' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--white)', marginBottom: '1.25rem' }}>
                Especificaciones <em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>técnicas</em>
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82rem' }}>
                <thead>
                  <tr>
                    {['Parámetro', 'Valor / Referencia'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(250,249,246,.22)', textAlign: 'left' as const, padding: '.6rem 1rem', borderBottom: '1px solid rgba(250,249,246,.08)', background: 'rgba(250,249,246,.02)', fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.specs.map(([k, v]) => (
                    <tr key={k}>
                      <td style={{ fontFamily: 'var(--mono)', fontSize: '.58rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'rgba(250,249,246,.26)', padding: '.65rem 1rem', borderBottom: '1px solid rgba(250,249,246,.04)', whiteSpace: 'nowrap' as const }}>{k}</td>
                      <td style={{ padding: '.65rem 1rem', borderBottom: '1px solid rgba(250,249,246,.04)', color: 'rgba(250,249,246,.5)', fontWeight: 300 }}>
                        <strong style={{ color: 'var(--white)', fontWeight: 400 }}>{v}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* SIP Diagram */}
              {s.id === 'sip' && (
                <div id="diagram" style={{ marginTop: '2.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--mono)', fontSize: '.64rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(250,249,246,.25)', marginBottom: '.9rem', display: 'flex' as const, alignItems: 'center' as const, gap: '.75rem' }}>
                    Sección transversal SIP 90
                    <span style={{ flex: 1, height: '1px', background: 'rgba(250,249,246,.05)', display: 'block' as const }} />
                  </h3>
                  <div style={{ display: 'flex' as const, gap: '3px', height: '100px', marginBottom: '1.5rem' }}>
                    {[
                      { w: '6px', bg: 'rgba(45,95,138,.35)', border: 'rgba(45,95,138,.3)', label: 'Memb.' },
                      { w: '26px', bg: 'rgba(176,103,74,.22)', border: 'rgba(176,103,74,.28)', label: 'OSB·E' },
                      { flex: 1, bg: 'rgba(250,249,246,.02)', border: 'rgba(250,249,246,.05)', center: true },
                      { w: '20px', bg: 'rgba(176,103,74,.15)', border: 'rgba(176,103,74,.18)', label: 'OSB·I' },
                      { w: '13px', bg: 'rgba(250,249,246,.05)', border: 'rgba(250,249,246,.04)', label: 'Yeso' },
                    ].map((layer, i) => (
                      <div key={i} style={{ flex: (layer as { flex?: number }).flex ?? 'none', width: (layer as { w?: string }).w, background: layer.bg, border: `1px solid ${layer.border}`, display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'center' as const, flexDirection: 'column' as const }}>
                        {(layer as { center?: boolean }).center ? (
                          <div style={{ textAlign: 'center' as const }}>
                            <span style={{ fontFamily: 'var(--serif)', fontSize: '.95rem', fontWeight: 300, color: 'var(--rl)', display: 'block' as const }}>90 mm · Rt=3</span>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: '.38rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(250,249,246,.2)', display: 'block' as const, marginTop: '.2rem' }}>EPS 20 kg/m³</span>
                          </div>
                        ) : (
                          <span style={{ fontFamily: 'var(--mono)', fontSize: '.38rem', letterSpacing: '.07em', textTransform: 'uppercase', writingMode: 'vertical-rl' as const, color: 'rgba(250,249,246,.22)' }}>{(layer as { label?: string }).label}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.4rem' }}>
                    {s.certTags.map(t => (
                      <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.28rem .75rem', border: '1px solid rgba(155,124,90,.22)', color: 'rgba(155,124,90,.7)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Veredicto */}
            <section id="veredicto" style={{ marginBottom: '4rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(250,249,246,.05)' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--white)', marginBottom: '1.25rem' }}>
                Veredicto <em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>MeinHaus</em>
              </h2>
              <p style={{ fontSize: '.9rem', fontWeight: 300, color: 'rgba(250,249,246,.45)', lineHeight: 1.82, marginBottom: '1.5rem' }}>
                Nuestra posición honesta sobre este sistema, basada en criterio técnico y experiencia constructiva en Patagonia. Tenemos sesgo hacia SIP porque trabajamos con él. Lo declaramos explícito.
              </p>
              <Veredicto s={s} />
              <Link href="/selector" style={{ display: 'inline-flex' as const, alignItems: 'center' as const, gap: '.5rem', fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase', background: 'var(--rl)', color: 'var(--white)', padding: '.85rem 1.75rem', marginTop: '1.25rem', textDecoration: 'none' }}>
                ¿Te conviene este sistema? → Usar el selector
              </Link>
            </section>

            {/* Otros sistemas */}
            <section id="otros" style={{ marginBottom: 0 }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--white)', marginBottom: '1.25rem' }}>
                Otros <em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>sistemas</em>
              </h2>
              <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(250,249,246,.04)' }}>
                {SISTEMAS.filter(x => x.id !== s.id).slice(0, 4).map(x => (
                  <SistemaCard key={x.id} s={x} compact />
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
