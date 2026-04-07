import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SistemaCard from '@/components/SistemaCard'
import Link from 'next/link'
import { SISTEMAS } from '@/data/sistemas'

export default function SistemasPage() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--dark)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            {/* Header */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '4rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rl)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rl)', display: 'block' as const }} />Sistemas constructivos
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--white)' }}>
                  Todos.<br /><em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>Sin filtros.</em>
                </h1>
              </div>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'rgba(250,249,246,.42)', lineHeight: 1.82 }}>
                8 sistemas con datos reales, pros y contras honestos, Veredicto MeinHaus y documentación técnica.
                No hay un sistema mejor — hay uno más adecuado para cada contexto.
              </p>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(250,249,246,.05)', border: '1px solid rgba(250,249,246,.05)', marginBottom: '5rem' }}>
              {SISTEMAS.map(s => <SistemaCard key={s.id} s={s} />)}
            </div>

            {/* Comparador */}
            <div style={{ marginBottom: '4rem' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mid)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '2rem' }}>
                <span style={{ width: '16px', height: '1px', background: 'rgba(250,249,246,.1)', display: 'block' as const }} />Comparativa completa · Fuentes: APYMECO, CAC, La Nación, CAS Salta · USD · T1 2026
              </div>

              <div style={{ overflowX: 'auto' as const }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '860px' }}>
                  <thead>
                    <tr>
                      {['Variable', 'SIP-TAO ★', 'Steel Frame', 'Madera', 'Mampostería', 'Container', 'Adobe', 'Modular'].map((h, i) => (
                        <th key={h} style={{
                          fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.15em', textTransform: 'uppercase',
                          color: i === 1 ? 'var(--rl)' : 'rgba(250,249,246,.26)',
                          textAlign: 'left' as const, padding: '.68rem 1rem',
                          borderBottom: '1px solid rgba(250,249,246,.08)',
                          background: 'var(--dark2)', fontWeight: 400, whiteSpace: 'nowrap' as const,
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Costo m² obra gris', '~900', '600–750', '700–1.000', '950–1.100', '500–700', '200–400', '800–1.000'],
                      ['Costo m² llave en mano', '1.300–1.600', '1.100–1.200', '1.300–2.500', '1.350–1.600', '1.000–1.300', '600–900', '1.200–1.500'],
                      ['Tiempo obra 100m²', '4–6 semanas', '4–6 meses', '6–16 sem.', '8–12 meses', '2–4 meses', '4–8 meses', '60–90 días'],
                      ['Aislación térmica', 'Rt=3 · Excelente', 'Buena', 'Excelente', 'Deficiente', 'Requiere mejora', 'Muy buena', 'Configurable'],
                      ['Obra húmeda', 'No', 'No', 'Mínima', 'Sí', 'No', 'Sí', 'No'],
                      ['Invierno', 'Sin restricción', 'Sin restricción', 'Sin restricción', 'Limitada', 'Sin restricción', 'Limitada', 'Sin restricción'],
                      ['Sismorresistencia', 'Cert. CAS', 'CIRSOC 303', 'Buena', 'CIRSOC 201', 'Con anclaje', 'Variable', 'Alta'],
                      ['Disponibilidad Patagonia', 'Alta · Neuquén', 'Alta', 'Media', 'Alta', 'Media', 'Alta', 'Baja'],
                    ].map(([label, ...vals]) => (
                      <tr key={label}>
                        <td style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.07em', textTransform: 'uppercase', color: 'rgba(250,249,246,.24)', padding: '.62rem 1rem', borderBottom: '1px solid rgba(250,249,246,.04)', whiteSpace: 'nowrap' as const }}>{label}</td>
                        {vals.map((v, i) => (
                          <td key={i} style={{
                            padding: '.62rem 1rem', borderBottom: '1px solid rgba(250,249,246,.04)',
                            fontSize: '.8rem', fontWeight: 300,
                            background: i === 0 ? 'rgba(155,124,90,.04)' : 'transparent',
                            borderLeft: i === 0 ? '2px solid rgba(155,124,90,.18)' : 'none',
                            color: i === 0 ? 'rgba(250,249,246,.8)' : 'rgba(250,249,246,.5)',
                          }}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: '1.25rem', fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(250,249,246,.18)' }}>
                ★ MeinHaus opera con SIP-TAO · Valores orientativos en USD · No incluyen terreno ni honorarios
              </p>
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center' as const, padding: '3rem', background: 'rgba(155,124,90,.04)', border: '1px solid rgba(155,124,90,.15)' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--white)', marginBottom: '1.5rem' }}>¿No sabés cuál conviene para tu proyecto?</p>
              <Link href="/selector" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase', background: 'var(--rl)', color: 'var(--white)', padding: '.85rem 2rem', display: 'inline-block' as const }}>Usar el selector →</Link>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
