'use client'
import { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { PUNTOS_MAPA } from '@/data/puntosMapa'
import { COSTOS, ZONA_FACTOR, ZONA_NOMBRES, ZONA_TEMP, formatUSD, calcularCosto } from '@/lib/utils'

const LAYER_INFO: Record<string, { title: string; body: string; color: string }> = {
  clima:   { title: 'Temperatura · Invierno', body: 'Patagonia: −15 a −5°C. Cuyo: −3 a +2°C. Centro: +2 a +6°C. NOA: +10 a +15°C. Variable clave para la envolvente del edificio.', color: '#3B82F6' },
  sismica: { title: 'Zonificación sísmica · INPRES', body: 'NOA y Cuyo: zonas 3–4. Patagonia: 2–3. Litoral y Buenos Aires: 0–1. Define requisitos estructurales y normativa aplicable.', color: '#EF4444' },
  costos:  { title: 'Costo estimado · Llave en mano', body: 'AMBA: USD 1.350–1.600. Patagonia: +9%. Centro: −5%. NOA/NEA: −12%. Cuyo: −3%. Fuentes: APYMECO, CAC · T1 2026.', color: '#10B981' },
  sip:     { title: 'Disponibilidad SIP-TAO', body: 'Fábrica TAO en Neuquén. Distribución directa a toda Patagonia. TAO Point en General Roca. Llegada a Buenos Aires y Centro.', color: '#9B7C5A' },
  mh:      { title: 'Zona MeinHaus', body: 'Sede: General Roca, Río Negro. Radio directo: toda Patagonia Norte. Proyectos con coordinación técnica a distancia.', color: '#E8531A' },
}

export default function MapaPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markersRef = useRef<unknown[]>([])
  const [activeLayer, setActiveLayer] = useState('clima')
  const [layerInfo, setLayerInfo] = useState(LAYER_INFO['clima'])

  // Calculadora state
  const [sup, setSup] = useState(100)
  const [sis, setSis] = useState('sip')
  const [term, setTerm] = useState('std')
  const [zona, setZona] = useState('patagonia')
  const [result, setResult] = useState<ReturnType<typeof calcularCosto> | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    import('leaflet').then(L => {
      const map = L.map(mapRef.current!, {
        center: [-38.5, -66], zoom: 5, scrollWheelZoom: false,
      })
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap · © CARTO', subdomains: 'abcd', maxZoom: 19,
      }).addTo(map)
      mapInstanceRef.current = map
      pintarPuntos(L, map, 'clima')
    })
  }, [])

  function pintarPuntos(L: unknown, map: unknown, layer: string) {
    const LLib = L as typeof import('leaflet')
    const mapInst = map as import('leaflet').Map
    const info = LAYER_INFO[layer]
    ;(markersRef.current as import('leaflet').Marker[]).forEach(m => mapInst.removeLayer(m))
    markersRef.current = []

    PUNTOS_MAPA.forEach(z => {
      const color = z.mh ? '#E8531A' : info.color
      const sz = z.mh ? 13 : 8
      const icon = LLib.divIcon({
        html: `<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:${color};opacity:${z.mh ? 1 : 0.75};border:2px solid rgba(255,255,255,.25);box-shadow:0 0 8px ${color}55;"></div>`,
        className: '', iconSize: [sz, sz], iconAnchor: [sz / 2, sz / 2],
      })
      const pop = `<div style="font-family:monospace;font-size:11px;line-height:1.6;min-width:175px;">
        <strong style="display:block;margin-bottom:5px;">${z.nombre}</strong>
        <span style="color:#666">Temp.: </span>${z.temp}<br>
        <span style="color:#666">Sismo: </span>${z.sismo}<br>
        <span style="color:#666">Costo m²: </span>${z.costo}<br>
        <span style="color:#666">SIP: </span>${z.sip}
        ${z.mh ? '<br><span style="color:#9B7C5A">★ Sede MeinHaus</span>' : ''}
      </div>`
      const marker = LLib.marker([z.lat, z.lng], { icon }).addTo(mapInst)
        .bindPopup(pop, { closeButton: false })
      markersRef.current.push(marker)
    })
  }

  function switchLayer(layer: string) {
    setActiveLayer(layer)
    setLayerInfo(LAYER_INFO[layer])
    if (mapInstanceRef.current) {
      import('leaflet').then(L => {
        pintarPuntos(L, mapInstanceRef.current, layer)
      })
    }
  }

  function calcular() {
    setResult(calcularCosto(sup, sis, term, zona))
  }

  const lbStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex' as const, alignItems: 'center' as const, gap: '.75rem',
    background: active ? 'var(--ink)' : 'none',
    border: '1px solid rgba(24,23,19,.1)',
    padding: '.58rem .9rem', cursor: 'pointer' as const, textAlign: 'left' as const, width: '100%',
    transition: 'all .2s',
  })

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--sans)', fontSize: '.9rem', fontWeight: 300,
    color: 'var(--ink)', background: 'var(--white)',
    border: '1px solid rgba(24,23,19,.1)', padding: '.7rem .95rem',
    width: '100%', outline: 'none', appearance: 'none' as const,
  }

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            {/* Header */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '4rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--rust)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Mapa constructivo
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>
                  Argentina<br /><em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>por zona.</em>
                </h1>
              </div>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>
                Clima, sismicidad, costos y disponibilidad de sistemas constructivos por región. Primera visualización que cruza todos estos datos.
              </p>
            </div>

            {/* Mapa */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: '260px 1fr', border: '1px solid rgba(24,23,19,.08)', height: '520px', overflow: 'hidden' as const, marginBottom: '5rem' }}>
              <div style={{ background: 'var(--bg2)', borderRight: '1px solid rgba(24,23,19,.08)', padding: '1.5rem', overflowY: 'auto' as const }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--mid)', marginBottom: '1.25rem' }}>Capas</p>
                <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: '.42rem', marginBottom: '1.75rem' }}>
                  {Object.entries(LAYER_INFO).map(([key, info]) => (
                    <button key={key} onClick={() => switchLayer(key)} style={lbStyle(activeLayer === key)}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: info.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: activeLayer === key ? 'var(--white)' : 'var(--mid)' }}>
                        {info.title.split('·')[0].trim()}
                      </span>
                    </button>
                  ))}
                </div>
                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(24,23,19,.08)' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'var(--ink)', marginBottom: '.65rem' }}>{layerInfo.title}</p>
                  <p style={{ fontSize: '.76rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>{layerInfo.body}</p>
                </div>
              </div>
              <div ref={mapRef} style={{ flex: 1, position: 'relative' as const }} />
            </div>

            {/* Calculadora */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--rust)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.75rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Calculadora de referencia
                </div>

                <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '.8rem', marginBottom: '1.2rem' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--mid)', display: 'block' as const, marginBottom: '.48rem' }}>Superficie (m²)</label>
                    <input type="number" value={sup} onChange={e => setSup(parseInt(e.target.value) || 100)} min={20} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--mid)', display: 'block' as const, marginBottom: '.48rem' }}>Sistema</label>
                    <select value={sis} onChange={e => setSis(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' as const }}>
                      <option value="sip">SIP-TAO</option>
                      <option value="steel">Steel Frame</option>
                      <option value="madera">Madera</option>
                      <option value="mamp">Mampostería</option>
                      <option value="container">Container / Módulo</option>
                      <option value="modular">Modular industrializado</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '.8rem', marginBottom: '1.2rem' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--mid)', display: 'block' as const, marginBottom: '.48rem' }}>Terminaciones</label>
                    <select value={term} onChange={e => setTerm(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' as const }}>
                      <option value="gris">Obra gris</option>
                      <option value="std">Estándar</option>
                      <option value="prem">Premium</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--mid)', display: 'block' as const, marginBottom: '.48rem' }}>Zona</label>
                    <select value={zona} onChange={e => setZona(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' as const }}>
                      <option value="amba">AMBA / Buenos Aires</option>
                      <option value="patagonia">Patagonia</option>
                      <option value="centro">Centro · Córdoba / Rosario</option>
                      <option value="noa">NOA / NEA</option>
                      <option value="cuyo">Cuyo · Mendoza / San Juan</option>
                    </select>
                  </div>
                </div>

                <button onClick={calcular} style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, background: 'var(--ink)', color: 'var(--white)', border: 'none', padding: '.9rem 2rem', cursor: 'pointer' as const, width: '100%', marginTop: '.5rem' }}>
                  Calcular estimación →
                </button>
              </div>

              {/* Result */}
              {result ? (
                <div style={{ background: 'var(--bone)', borderLeft: '3px solid var(--rust)', padding: '2.25rem' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--rust)', marginBottom: '1.25rem' }}>Estimación orientativa</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--ink)', lineHeight: 1, marginBottom: '.4rem' }}>USD {formatUSD(result.total)}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.58rem', letterSpacing: '.1em', color: 'var(--mid)', marginBottom: '1.75rem' }}>
                    {sup} m² × USD {formatUSD(result.m2)}/m²
                  </div>
                  <div style={{ display: 'flex' as const, flexDirection: 'column' as const }}>
                    {[
                      ['Rango estimado', `USD ${formatUSD(result.min)} – ${formatUSD(result.max)}`],
                      ['Zona', ZONA_NOMBRES[zona] ?? zona],
                      ['Temperatura invierno', ZONA_TEMP[zona] ?? '—'],
                      ['Ajuste regional', `${ZONA_FACTOR[zona] >= 0 ? '+' : ''}${Math.round(ZONA_FACTOR[zona] * 100)}%`],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex' as const, justifyContent: 'space-between' as const, padding: '.52rem 0', borderBottom: '1px solid rgba(24,23,19,.06)', fontSize: '.8rem', fontWeight: 300, color: 'var(--mid)' }}>
                        <span>{k}</span>
                        <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>{v}</strong>
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: '1.15rem', fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--light)', lineHeight: 1.6 }}>
                    Valores orientativos en USD. No incluyen terreno, honorarios ni permisos. Fuentes: APYMECO, CAC.
                  </p>
                </div>
              ) : (
                <div style={{ background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', padding: '2.5rem', display: 'flex' as const, flexDirection: 'column' as const, justifyContent: 'center' as const, alignItems: 'center' as const, textAlign: 'center' as const, minHeight: '320px' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 300, color: 'var(--mid)', marginBottom: '.65rem' }}>Ingresá los datos</div>
                  <p style={{ fontSize: '.82rem', fontWeight: 300, color: 'var(--light)', maxWidth: '28ch', lineHeight: 1.65 }}>Completá el formulario y calculá el rango de inversión estimado.</p>
                </div>
              )}
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
