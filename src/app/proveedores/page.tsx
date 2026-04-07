'use client'
import { useState, useMemo } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import {
  PROVEEDORES, COMPONENTES_SISTEMA, CAPAS_COMPLEMENTARIAS,
  getProveedor, getTAOPoints, CAPA_LABEL,
  type SistemaKey, type ComponenteSistema, type Proveedor,
} from '@/data/proveedores'

const SISTEMAS_LABEL: Record<SistemaKey, string> = {
  sip: 'Sistema SIP-TAO', steel: 'Steel Frame', madera: 'Madera',
  mamp: 'Mampostería', container: 'Container / Módulo',
  adobe: 'Adobe / Tierra', modular: 'Modular industrializado', mixto: 'Sistemas mixtos',
}
const SISTEMA_KEYS = Object.keys(SISTEMAS_LABEL) as SistemaKey[]

// ─── CARRITO ──────────────────────────────────────────────

interface CarritoItem {
  id: string
  nombre: string
  marca: string
  proveedor: string
  unidad: string
  capa: string
  qty: number
}

function CarritoPanel({
  items, onRemove, onQty
}: {
  items: CarritoItem[]
  onRemove: (id: string) => void
  onQty: (id: string, qty: number) => void
}) {
  if (items.length === 0) return (
    <div style={{ background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', padding: '2rem', textAlign: 'center' as const }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--mid)', marginBottom: '.5rem' }}>Carrito vacío</div>
      <p style={{ fontSize: '.78rem', fontWeight: 300, color: 'var(--light)' }}>Agregá componentes desde la lista de sistemas</p>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)', marginBottom: '1.5rem' }}>
        {items.map(item => (
          <div key={item.id} style={{ background: 'var(--bg)', padding: '1rem 1.25rem', display: 'grid' as const, gridTemplateColumns: '1fr auto auto', gap: '1rem', alignItems: 'center' as const }}>
            <div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '.95rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.2rem' }}>{item.nombre}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--light)' }}>
                {item.marca} · {CAPA_LABEL[item.capa as keyof typeof CAPA_LABEL] ?? item.capa}
              </div>
            </div>
            <div style={{ display: 'flex' as const, alignItems: 'center' as const, gap: '.5rem' }}>
              <input
                type="number"
                value={item.qty}
                min={1}
                onChange={e => onQty(item.id, parseInt(e.target.value) || 1)}
                style={{ width: '60px', fontFamily: 'var(--mono)', fontSize: '.72rem', textAlign: 'center' as const, border: '1px solid rgba(24,23,19,.1)', padding: '.35rem .5rem', background: 'var(--white)' }}
              />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--mid)' }}>{item.unidad}</span>
            </div>
            <button onClick={() => onRemove(item.id)} style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(232,83,26,.6)', background: 'none', border: 'none', cursor: 'pointer' as const }}>× quitar</button>
          </div>
        ))}
      </div>

      {/* Contactos de proveedores involucrados */}
      <div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--mid)', marginBottom: '1rem', display: 'flex' as const, alignItems: 'center' as const, gap: '.6rem' }}>
          <span style={{ width: '14px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Contactos de proveedores en tu lista
        </div>
        <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: '1px', background: 'rgba(24,23,19,.06)', border: '1px solid rgba(24,23,19,.06)' }}>
          {[...new Set(items.map(i => i.proveedor))].map(pid => {
            const prov = getProveedor(pid)
            if (!prov) return null
            return (
              <div key={pid} style={{ background: 'var(--bg)', padding: '1rem 1.25rem' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '.95rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.35rem' }}>{prov.nombre}</div>
                <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.65rem' }}>
                  {prov.web && <a href={prov.web} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--rl)', textDecoration: 'none' }}>Web →</a>}
                  {prov.whatsapp && <a href={`https://wa.me/${prov.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#3D7A55' }}>WhatsApp →</a>}
                  {prov.email && <a href={`mailto:${prov.email}`} style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--mid)' }}>{prov.email}</a>}
                  {prov.telefono && <span style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', color: 'var(--mid)' }}>{prov.telefono}</span>}
                  {(prov.ciudad || prov.provincia) && <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', color: 'var(--light)' }}>{[prov.ciudad, prov.provincia].filter(Boolean).join(', ')}</span>}
                </div>
              </div>
            )
          })}
        </div>
        <p style={{ marginTop: '1rem', fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--light)', lineHeight: 1.6 }}>
          Los precios no están incluidos. Contactá directamente a cada proveedor para cotización actualizada.
        </p>
      </div>
    </div>
  )
}

// ─── COMPONENTE CARD ────────────────────────────────────────

function ComponenteCard({
  comp, sistema, onAdd, inCart
}: {
  comp: ComponenteSistema
  sistema: SistemaKey
  onAdd: (item: CarritoItem) => void
  inCart: boolean
}) {
  const provs = comp.proveedores
    .map(id => getProveedor(id))
    .filter(Boolean) as Proveedor[]

  const mainProv = provs[0]

  return (
    <div style={{
      background: 'var(--bg)', padding: '1.65rem',
      borderLeft: `2px solid ${comp.obligatorio ? 'var(--rust)' : 'rgba(24,23,19,.1)'}`,
      transition: 'background .2s',
    }}>
      <div style={{ display: 'flex' as const, justifyContent: 'space-between' as const, alignItems: 'flex-start' as const, marginBottom: '.85rem', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex' as const, gap: '.65rem', alignItems: 'center' as const, marginBottom: '.45rem', flexWrap: 'wrap' as const }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, padding: '.15rem .5rem', border: `1px solid rgba(24,23,19,.1)`, color: 'var(--mid)' }}>
              {CAPA_LABEL[comp.capa] ?? comp.capa}
            </span>
            {comp.obligatorio && (
              <span style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--rust)', padding: '.15rem .5rem', border: '1px solid rgba(107,79,58,.2)' }}>Obligatorio</span>
            )}
          </div>
          <h4 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.35rem' }}>{comp.nombre}</h4>
          <p style={{ fontSize: '.8rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65, marginBottom: '.75rem' }}>{comp.descripcion}</p>
        </div>

        <button
          onClick={() => mainProv && onAdd({
            id: `${sistema}-${comp.capa}-${comp.nombre.slice(0, 20)}`,
            nombre: comp.nombre,
            marca: comp.marca_referencia,
            proveedor: mainProv.id,
            unidad: comp.unidad ?? 'unidad',
            capa: comp.capa,
            qty: 1,
          })}
          disabled={!mainProv || inCart}
          style={{
            fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const,
            padding: '.45rem .9rem', cursor: mainProv && !inCart ? 'pointer' : 'default',
            background: inCart ? 'rgba(61,122,85,.06)' : 'var(--ink)',
            color: inCart ? '#3D7A55' : 'var(--white)',
            border: inCart ? '1px solid rgba(61,122,85,.2)' : 'none',
            flexShrink: 0,
          }}
        >
          {inCart ? '✓ Agregado' : '+ Agregar'}
        </button>
      </div>

      {/* Modelos */}
      {comp.modelos && comp.modelos.length > 0 && (
        <div style={{ marginBottom: '.85rem' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'var(--light)', marginBottom: '.45rem' }}>Modelos / variantes</div>
          <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.3rem' }}>
            {comp.modelos.map(m => (
              <span key={m} style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '.2rem .55rem', background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', color: 'var(--mid)' }}>{m}</span>
            ))}
          </div>
        </div>
      )}

      {/* Proveedores */}
      {provs.length > 0 && (
        <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.5rem', alignItems: 'center' as const }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--light)' }}>Proveedor:</span>
          {provs.map(prov => (
            <a key={prov.id} href={prov.web ?? '#'} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--rl)', textDecoration: 'none', padding: '.18rem .55rem', border: '1px solid rgba(155,124,90,.2)' }}>
              {prov.nombre.split(' ')[0]} {prov.tipo === 'tao_point' ? '— TAO Point' : ''} →
            </a>
          ))}
        </div>
      )}

      {comp.notas && (
        <div style={{ marginTop: '.85rem', padding: '.75rem 1rem', background: 'rgba(184,154,46,.04)', borderLeft: '2px solid rgba(184,154,46,.3)', fontSize: '.78rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>
          ⚠ {comp.notas}
        </div>
      )}
    </div>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────

export default function ProveedoresPage() {
  const [activeSistema, setActiveSistema] = useState<SistemaKey>('sip')
  const [showCart, setShowCart] = useState(false)
  const [carrito, setCarrito] = useState<CarritoItem[]>([])
  const [activeCapa, setActiveCapa] = useState<string | null>(null)

  const addToCart = (item: CarritoItem) => {
    setCarrito(c => c.find(x => x.id === item.id) ? c : [...c, item])
    setShowCart(true)
  }
  const removeFromCart = (id: string) => setCarrito(c => c.filter(x => x.id !== id))
  const updateQty = (id: string, qty: number) => setCarrito(c => c.map(x => x.id === id ? { ...x, qty } : x))

  const componentes = COMPONENTES_SISTEMA[activeSistema] ?? []
  const capas = [...new Set(componentes.map(c => c.capa))]
  const filtered = activeCapa ? componentes.filter(c => c.capa === activeCapa) : componentes
  const cartIds = new Set(carrito.map(c => c.id))

  const taoPoints = getTAOPoints()

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            {/* Header */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '3rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--rust)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Proveedores · Argentina
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>
                  Cada componente.<br /><em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Su proveedor.</em>
                </h1>
              </div>
              <div>
                <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82, marginBottom: '1rem' }}>
                  Todos los elementos que componen cada sistema constructivo, con las marcas y proveedores disponibles en Argentina. Armá tu lista y accedé a los contactos directos.
                </p>
                <div style={{ display: 'flex' as const, gap: '.65rem', alignItems: 'center' as const }}>
                  <button
                    onClick={() => setShowCart(!showCart)}
                    style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: carrito.length > 0 ? 'var(--ink)' : 'transparent', color: carrito.length > 0 ? 'var(--white)' : 'var(--mid)', padding: '.65rem 1.25rem', border: '1px solid rgba(24,23,19,.15)', cursor: 'pointer' as const }}>
                    {carrito.length > 0 ? `Ver lista (${carrito.length})` : 'Lista vacía'}
                  </button>
                  {carrito.length > 0 && (
                    <button onClick={() => setCarrito([])} style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, background: 'none', border: 'none', cursor: 'pointer' as const, color: 'rgba(232,83,26,.6)' }}>× Vaciar</button>
                  )}
                </div>
              </div>
            </div>

            {/* Layout */}
            <div style={{ display: 'grid' as const, gridTemplateColumns: showCart ? '1fr 360px' : '1fr', gap: '3rem', alignItems: 'start' }}>

              {/* Left — Selector + componentes */}
              <div>
                {/* Sistema tabs */}
                <div style={{ display: 'flex' as const, gap: '1px', flexWrap: 'wrap' as const, background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)', marginBottom: '2rem' }}>
                  {SISTEMA_KEYS.map(k => (
                    <button key={k}
                      onClick={() => { setActiveSistema(k); setActiveCapa(null) }}
                      style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '.65rem 1.15rem', cursor: 'pointer' as const, border: 'none', background: activeSistema === k ? 'var(--ink)' : 'var(--bg)', color: activeSistema === k ? 'var(--white)' : 'var(--mid)', transition: 'all .15s' }}>
                      {SISTEMAS_LABEL[k]}
                    </button>
                  ))}
                </div>

                {/* Capa filter */}
                <div style={{ display: 'flex' as const, gap: '.4rem', flexWrap: 'wrap' as const, marginBottom: '1.75rem' }}>
                  <button onClick={() => setActiveCapa(null)} style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '.32rem .75rem', border: '1px solid rgba(24,23,19,.1)', background: !activeCapa ? 'var(--rust)' : 'transparent', color: !activeCapa ? 'var(--white)' : 'var(--mid)', cursor: 'pointer' as const }}>
                    Todos ({componentes.length})
                  </button>
                  {capas.map(c => (
                    <button key={c} onClick={() => setActiveCapa(c === activeCapa ? null : c)} style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '.32rem .75rem', border: '1px solid rgba(24,23,19,.1)', background: activeCapa === c ? 'var(--rust)' : 'transparent', color: activeCapa === c ? 'var(--white)' : 'var(--mid)', cursor: 'pointer' as const }}>
                      {CAPA_LABEL[c as keyof typeof CAPA_LABEL] ?? c}
                    </button>
                  ))}
                </div>

                {/* Componentes */}
                <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: '1px', background: 'rgba(24,23,19,.06)', border: '1px solid rgba(24,23,19,.06)', marginBottom: '3rem' }}>
                  {filtered.map(comp => (
                    <ComponenteCard
                      key={`${comp.capa}-${comp.nombre}`}
                      comp={comp}
                      sistema={activeSistema}
                      onAdd={addToCart}
                      inCart={cartIds.has(`${activeSistema}-${comp.capa}-${comp.nombre.slice(0, 20)}`)}
                    />
                  ))}
                </div>

                {/* Capas complementarias */}
                {!activeCapa && (
                  <>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--mid)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.75rem' }}>
                      <span style={{ width: '16px', height: '1px', background: 'rgba(24,23,19,.15)', display: 'block' as const }} />Capas complementarias (aplican a múltiples sistemas)
                    </div>
                    <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: '1px', background: 'rgba(24,23,19,.06)', border: '1px solid rgba(24,23,19,.06)' }}>
                      {CAPAS_COMPLEMENTARIAS.map(comp => (
                        <ComponenteCard
                          key={`comp-${comp.capa}-${comp.nombre}`}
                          comp={comp}
                          sistema={activeSistema}
                          onAdd={addToCart}
                          inCart={cartIds.has(`${activeSistema}-${comp.capa}-${comp.nombre.slice(0, 20)}`)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right — Carrito */}
              {showCart && (
                <div style={{ position: 'sticky' as const, top: 'calc(var(--nav) + 1.5rem)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--ink)', marginBottom: '1.25rem', display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'space-between' as const }}>
                    <span style={{ display: 'flex' as const, alignItems: 'center' as const, gap: '.6rem' }}>
                      <span style={{ width: '14px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Mi lista de materiales
                    </span>
                    <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' as const, fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--light)' }}>cerrar ×</button>
                  </div>
                  <CarritoPanel items={carrito} onRemove={removeFromCart} onQty={updateQty} />
                </div>
              )}
            </div>

            {/* TAO Points */}
            <div style={{ marginTop: '5rem' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--rl)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '2rem' }}>
                <span style={{ width: '16px', height: '1px', background: 'var(--rl)', display: 'block' as const }} />TAO Points — Representantes en Argentina
              </div>
              <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)' }}>
                {taoPoints.map(tp => (
                  <div key={tp.id} style={{ background: 'var(--bg)', padding: '1.5rem' }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.4rem' }}>{tp.nombre.replace('TAO Point — ', '')}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--light)', marginBottom: '.75rem' }}>{tp.provincia}</div>
                    {tp.notas && <p style={{ fontSize: '.75rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.6, marginBottom: '.65rem' }}>{tp.notas}</p>}
                    {tp.telefono && <a href={`tel:${tp.telefono}`} style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--rl)', textDecoration: 'none', display: 'block' as const }}>{tp.telefono}</a>}
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{ marginTop: '3rem', padding: '1.65rem', background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', borderLeft: '3px solid rgba(24,23,19,.12)' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'var(--mid)', marginBottom: '.5rem' }}>Nota sobre esta información</p>
              <p style={{ fontSize: '.82rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.72 }}>
                Los proveedores, marcas y modelos listados son referencias técnicas basadas en investigación propia al T1 2026. Los precios no están incluidos — varían con el tipo de cambio y disponibilidad. Contactá directamente a cada proveedor para cotización actualizada. Si representás una empresa constructora y querés asociarte a MeinHaus, <Link href="/contacto" style={{ color: 'var(--rust)', textDecoration: 'none' }}>escribinos</Link>.
              </p>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
