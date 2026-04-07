'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { PAISES, CONTINENTES, STATUS_LABEL, STATUS_COLOR, getPaisesPorContinente } from '@/data/paises'
import type { Pais } from '@/data/paises'

// Dynamic import — Three.js requiere browser, no puede correr en SSR
const Globe3D = dynamic(() => import('@/components/Globe/Globe3D'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '600px', display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'center' as const, background: 'var(--dark)' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.25)' }}>
        Cargando globe...
      </span>
    </div>
  ),
})

const KOPPEN_LABEL: Record<string, string> = {
  Af: 'Tropical húmedo', Am: 'Monzónico', Aw: 'Tropical seco',
  BWh: 'Desierto cálido', BWk: 'Desierto frío', BSh: 'Semiárido cálido', BSk: 'Semiárido frío',
  Csa: 'Mediterráneo', Csb: 'Mediterráneo templado', Cfa: 'Subtropical húmedo', Cfb: 'Oceánico', Cfc: 'Sub-oceánico',
  Dfa: 'Continental húmedo', Dfb: 'Continental fresco', Dfc: 'Sub-ártico', Dfd: 'Ártico húmedo',
  ET: 'Tundra / Polar', EF: 'Glaciar',
}

export default function PaisesPage() {
  const [selectedIso, setSelectedIso] = useState<string | null>('AR')
  const [hoveredIso, setHoveredIso] = useState<string | null>(null)
  const [activeContinente, setActiveContinente] = useState<string | null>(null)

  const selectedPais = PAISES.find(p => p.iso === selectedIso) ?? null
  const hoveredPais = hoveredIso ? (PAISES.find(p => p.iso === hoveredIso) ?? null) : null
  const displayPais = hoveredPais ?? selectedPais

  const filteredPaises = activeContinente
    ? getPaisesPorContinente(activeContinente)
    : PAISES

  function handleSelect(iso: string) {
    const pais = PAISES.find(p => p.iso === iso)
    if (!pais) return
    setSelectedIso(iso)
  }

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--dark)', minHeight: '100vh' }}>

        {/* Header */}
        <section style={{ padding: '4rem 0 3rem', borderBottom: '1px solid rgba(250,249,246,.05)' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>
            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--rl)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rl)', display: 'block' as const }} />Construcción en el mundo
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--white)' }}>
                  Cada lugar<br /><em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>su lógica.</em>
                </h1>
              </div>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'rgba(250,249,246,.42)', lineHeight: 1.82 }}>
                La primera variable de cualquier decisión constructiva es el lugar. Clima, sismicidad, normativa y disponibilidad de materiales definen qué sistemas tienen sentido antes de que se dibuje un plano.
              </p>
            </div>
          </div>
        </section>

        {/* Globe + Panel */}
        <section style={{ borderBottom: '1px solid rgba(250,249,246,.05)' }}>
          <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 380px', minHeight: '600px' }}>

            {/* Globe */}
            <div style={{ position: 'relative' as const, background: 'var(--dark)', borderRight: '1px solid rgba(250,249,246,.05)' }}>
              <div style={{ height: '600px' }}>
                <Globe3D
                  paises={PAISES}
                  selectedIso={selectedIso}
                  onSelect={handleSelect}
                  onHover={setHoveredIso}
                />
              </div>

              {/* Legend */}
              <div style={{ position: 'absolute' as const, bottom: '1.25rem', left: '1.25rem', display: 'flex' as const, flexDirection: 'column' as const, gap: '.4rem' }}>
                {[
                  { color: STATUS_COLOR.full, label: 'Datos completos' },
                  { color: STATUS_COLOR.partial, label: 'En desarrollo' },
                  { color: 'rgba(250,249,246,.15)', label: 'Próximamente' },
                ].map(({ color, label }) => (
                  <div key={label} style={{ display: 'flex' as const, alignItems: 'center' as const, gap: '.5rem' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: color, flexShrink: 0, display: 'block' as const }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.3)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <div style={{ background: 'var(--dark2)', padding: '2.5rem 2rem', display: 'flex' as const, flexDirection: 'column' as const, justifyContent: 'space-between' as const }}>
              {displayPais ? (
                <>
                  <div>
                    {/* Status */}
                    <div style={{ display: 'flex' as const, gap: '.65rem', alignItems: 'center' as const, marginBottom: '1.5rem' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: STATUS_COLOR[displayPais.statusData], flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.3)' }}>
                        {STATUS_LABEL[displayPais.statusData]}
                      </span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.2)' }}>
                        {displayPais.continente}
                      </span>
                    </div>

                    {/* Name */}
                    <h2 style={{ fontFamily: 'var(--serif)', fontSize: '2.2rem', fontWeight: 300, color: 'var(--white)', lineHeight: .95, marginBottom: '.5rem' }}>
                      {displayPais.nombre}
                    </h2>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.25)', marginBottom: '1.5rem' }}>
                      {displayPais.iso} · {displayPais.idioma.join(', ')} · {displayPais.moneda}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '.85rem', fontWeight: 300, color: 'rgba(250,249,246,.45)', lineHeight: 1.72, marginBottom: '1.75rem' }}>
                      {displayPais.descripcionBreve}
                    </p>

                    {/* Data rows */}
                    <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: 0, marginBottom: '1.75rem' }}>
                      {[
                        ['Temperatura', displayPais.tempRango ?? '—'],
                        ['Sismicidad', displayPais.sismicidad ?? '—'],
                        ['Normativa', displayPais.normativa],
                        ['Sistema de referencia', displayPais.sistemaReferencia ?? '—'],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex' as const, justifyContent: 'space-between' as const, padding: '.5rem 0', borderBottom: '1px solid rgba(250,249,246,.04)', gap: '1rem' }}>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.22)', flexShrink: 0 }}>{k}</span>
                          <span style={{ fontSize: '.78rem', fontWeight: 300, color: 'rgba(250,249,246,.55)', textAlign: 'right' as const, lineHeight: 1.4 }}>{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* Köppen */}
                    <div style={{ marginBottom: '1.75rem' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.22)', marginBottom: '.65rem' }}>Zona climática Köppen</div>
                      <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.35rem' }}>
                        {displayPais.koppenPredominante.map(k => (
                          <span key={k} style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '.2rem .55rem', border: '1px solid rgba(250,249,246,.1)', color: 'rgba(250,249,246,.4)' }}>
                            {k} · {KOPPEN_LABEL[k] ?? k}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sistemas dominantes */}
                    <div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.22)', marginBottom: '.65rem' }}>Sistemas dominantes</div>
                      <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.35rem' }}>
                        {displayPais.sistemasDominantes.map(sid => (
                          <span key={sid} style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '.2rem .55rem', border: '1px solid rgba(155,124,90,.2)', color: 'rgba(155,124,90,.65)' }}>
                            {sid.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(250,249,246,.05)' }}>
                    {displayPais.statusData !== 'scaffold' ? (
                      <Link href={`/paises/${displayPais.iso.toLowerCase()}`} style={{ display: 'block' as const, fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'var(--rl)', color: 'var(--white)', padding: '.85rem 1.75rem', textDecoration: 'none', textAlign: 'center' as const }}>
                        Explorar {displayPais.nombre} →
                      </Link>
                    ) : (
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.2)', textAlign: 'center' as const, padding: '.85rem' }}>
                        Contenido en desarrollo
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex' as const, flexDirection: 'column' as const, alignItems: 'center' as const, justifyContent: 'center' as const, height: '100%', textAlign: 'center' as const }}>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(250,249,246,.3)', marginBottom: '.65rem' }}>Seleccioná un país</p>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.18)' }}>Click en cualquier punto del globe</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Country list */}
        <section style={{ padding: '5rem 0' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            {/* Continente filter */}
            <div style={{ display: 'flex' as const, gap: '.4rem', flexWrap: 'wrap' as const, marginBottom: '2.5rem' }}>
              <button onClick={() => setActiveContinente(null)} style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '.38rem .85rem', border: '1px solid rgba(250,249,246,.12)', background: !activeContinente ? 'var(--rl)' : 'transparent', color: !activeContinente ? 'var(--white)' : 'rgba(250,249,246,.4)', cursor: 'pointer' as const }}>
                Todos
              </button>
              {CONTINENTES.map(c => (
                <button key={c} onClick={() => setActiveContinente(c === activeContinente ? null : c)} style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '.38rem .85rem', border: '1px solid rgba(250,249,246,.12)', background: activeContinente === c ? 'var(--rl)' : 'transparent', color: activeContinente === c ? 'var(--white)' : 'rgba(250,249,246,.4)', cursor: 'pointer' as const }}>
                  {c}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(250,249,246,.04)', border: '1px solid rgba(250,249,246,.04)' }}>
              {filteredPaises.map(pais => {
                const isSelected = pais.iso === selectedIso
                return (
                  <div
                    key={pais.iso}
                    onClick={() => handleSelect(pais.iso)}
                    style={{
                      background: isSelected ? 'rgba(155,124,90,.08)' : 'rgba(250,249,246,.01)',
                      padding: '1.4rem', cursor: 'pointer' as const,
                      borderLeft: isSelected ? '2px solid var(--rl)' : '2px solid transparent',
                      transition: 'all .15s',
                    }}
                    onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'rgba(250,249,246,.04)' }}
                    onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'rgba(250,249,246,.01)' }}
                  >
                    <div style={{ display: 'flex' as const, justifyContent: 'space-between' as const, alignItems: 'flex-start' as const, marginBottom: '.5rem' }}>
                      <span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 300, color: isSelected ? 'var(--rl)' : 'var(--white)', lineHeight: 1.15 }}>{pais.nombre}</span>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: STATUS_COLOR[pais.statusData], flexShrink: 0, marginTop: '.28rem' }} />
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.22)', marginBottom: '.5rem' }}>
                      {pais.iso} · {pais.normativa}
                    </div>
                    <div style={{ fontSize: '.72rem', fontWeight: 300, color: 'rgba(250,249,246,.28)', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' as const }}>
                      {pais.descripcionBreve}
                    </div>
                  </div>
                )
              })}
            </div>

            <p style={{ marginTop: '1.5rem', fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.18)', textAlign: 'center' as const }}>
              {PAISES.filter(p => p.statusData === 'full').length} países completos · {PAISES.filter(p => p.statusData === 'partial').length} en desarrollo · {PAISES.filter(p => p.statusData === 'scaffold').length} próximamente
            </p>

          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
