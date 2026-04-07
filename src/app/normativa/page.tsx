'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { PROVINCIAS } from '@/data/provincias'
import type { Provincia } from '@/types'

const MARCO_NACIONAL = [
  { cod: 'CIRSOC 201', titulo: 'Reglamento Mampostería', color: 'var(--blue)', desc: 'Construcción en ladrillo y hormigón armado. El reglamento base de la construcción tradicional en Argentina.' },
  { cod: 'CIRSOC 303', titulo: 'Reglamento Steel Frame', color: 'var(--blue)', desc: 'Construcción con perfiles de acero galvanizado. Reconocido como sistema tradicional en la mayoría de los códigos municipales.' },
  { cod: 'CAT N°3648', titulo: 'Sistema SIP-TAO', color: 'var(--rl)', desc: 'Certificado de Aptitud Técnica. Emitido por INTI / Ministerio de Desarrollo Territorial. Habilita uso en todo el territorio nacional.' },
  { cod: 'CIRSOC 601', titulo: 'Reglamento Madera', color: 'var(--blue)', desc: 'Estructuras de madera. Entramados, poste y viga. La adopción varía por municipio.' },
  { cod: 'CAS · INPRES', titulo: 'Aptitud Sísmica SIP', color: '#3D7A55', desc: 'Certificación del INPRES para sistema SIP-TAO en zonas sísmicas 1 a 4. Obligatoria en Cuyo y NOA.' },
  { cod: 'CAT Específico', titulo: 'Sistemas no convencionales', color: 'var(--mid)', desc: 'Adobe, quincha, containers y sistemas híbridos requieren CAT propio para ser habilitados. Varía por municipio.' },
]

export default function NormativaPage() {
  const [selected, setSelected] = useState<Provincia | null>(null)

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '4rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--blue)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--blue)', display: 'block' as const }} />Normativa y marco legal
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>
                  Construir<br /><em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>legalmente.</em>
                </h1>
              </div>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>
                Marcos normativos, certificaciones y requisitos municipales. Antes de elegir el sistema, entendé qué habilita tu municipio.
              </p>
            </div>

            {/* Marco nacional */}
            <div style={{ background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', padding: '2.25rem', marginBottom: '4rem' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--blue)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '2rem' }}>
                <span style={{ width: '16px', height: '1px', background: 'var(--blue)', display: 'block' as const }} />Marco normativo nacional
              </div>
              <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)' }}>
                {MARCO_NACIONAL.map(m => (
                  <div key={m.cod} style={{ background: 'var(--bg)', padding: '1.4rem' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: m.color, marginBottom: '.65rem' }}>{m.cod}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.35rem' }}>{m.titulo}</div>
                    <div style={{ fontSize: '.78rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Provincias */}
            <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--mid)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '2rem' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Situación por provincia · Hacé click para ver el detalle
            </div>

            <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)', marginBottom: selected ? '2.5rem' : 0 }}>
              {PROVINCIAS.map(prov => {
                const isSelected = selected?.id === prov.id
                return (
                  <div key={prov.id}
                    onClick={() => setSelected(isSelected ? null : prov)}
                    style={{
                      background: isSelected ? 'var(--bone)' : 'var(--bg)',
                      padding: '1.65rem', cursor: 'pointer' as const,
                      borderBottom: isSelected ? '2px solid var(--rust)' : '2px solid transparent',
                      transition: 'all .2s',
                    }}
                    onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'var(--bg2)' }}
                    onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)' }}
                  >
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.4rem' }}>{prov.nombre}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'var(--light)', marginBottom: '.85rem' }}>{prov.region}</div>
                    <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.3rem' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '.16rem .48rem', border: '1px solid rgba(61,122,85,.25)', color: '#3D7A55' }}>SIP: {prov.sip}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '.16rem .48rem', border: '1px solid rgba(61,122,85,.25)', color: '#3D7A55' }}>Steel: {prov.steel}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '.16rem .48rem', border: '1px solid rgba(45,95,138,.2)', color: 'var(--blue)' }}>Sismo: {prov.sismo}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Detalle provincia */}
            {selected && (
              <div style={{ padding: '2.25rem', background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', borderLeft: '3px solid var(--rust)' }}>
                <div style={{ display: 'flex' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const, marginBottom: '1.75rem' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--ink)' }}>{selected.nombre} · Información normativa</div>
                  <button onClick={() => setSelected(null)} style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, background: 'none', border: 'none', cursor: 'pointer' as const, color: 'var(--mid)' }}>Cerrar ×</button>
                </div>
                <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--mid)', marginBottom: '.9rem' }}>Datos generales</h4>
                    {[['Región', selected.region], ['Temp. invierno', selected.temp], ['Zona sísmica', selected.sismo], ['Colegio profesional', selected.detalle.colegio], ['CIRSOC aplicable', selected.detalle.cirsoc]].map(([k, v]) => (
                      <div key={k as string} style={{ display: 'flex' as const, justifyContent: 'space-between' as const, padding: '.52rem 0', borderBottom: '1px solid rgba(24,23,19,.06)', fontSize: '.8rem', fontWeight: 300 }}>
                        <span style={{ color: 'var(--mid)' }}>{k}</span>
                        <span style={{ color: 'var(--ink)', fontWeight: 400 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--mid)', marginBottom: '.9rem' }}>Situación por sistema</h4>
                    {[
                      ['SIP-TAO', selected.detalle.sipCat, selected.sip === 'Habilitado' ? '#3D7A55' : '#B89A2E'],
                      ['Steel Frame', selected.steel, '#3D7A55'],
                      ['Madera', selected.madera, selected.madera === 'Habilitado' ? '#3D7A55' : '#B89A2E'],
                      ['Container', selected.container, selected.container.includes('Con') ? '#B89A2E' : '#3D7A55'],
                    ].map(([k, v, c]) => (
                      <div key={k as string} style={{ display: 'flex' as const, justifyContent: 'space-between' as const, padding: '.52rem 0', borderBottom: '1px solid rgba(24,23,19,.06)', fontSize: '.8rem', fontWeight: 300 }}>
                        <span style={{ color: 'var(--mid)' }}>{k}</span>
                        <span style={{ color: c as string, fontWeight: 400 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'var(--bg3)', borderLeft: '2px solid var(--rust)', fontSize: '.82rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>
                  {selected.detalle.notas}
                </div>
              </div>
            )}

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
