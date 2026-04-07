'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { supabase, ROL_LABEL, PROVINCIAS_AR, type Rol } from '@/lib/supabase'

interface Profile {
  id: string
  nombre: string
  rol: Rol
  provincia: string
  ciudad: string
  sistemas_que_trabaja: string[]
  anos_experiencia: number | null
  descripcion: string | null
  web: string | null
  instagram: string | null
  fecha_alta: string
}

export default function ComunidadPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroRol, setFiltroRol] = useState<string>('')
  const [filtroProvincia, setFiltroProvincia] = useState<string>('')
  const [filtroSistema, setFiltroSistema] = useState<string>('')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true)
      let query = supabase
        .from('profiles')
        .select('id, nombre, rol, provincia, ciudad, sistemas_que_trabaja, anos_experiencia, descripcion, web, instagram, fecha_alta')
        .eq('visible_publicamente', true)
        .order('fecha_alta', { ascending: false })

      if (filtroRol) query = query.eq('rol', filtroRol)
      if (filtroProvincia) query = query.eq('provincia', filtroProvincia)

      const { data, error } = await query
      if (!error && data) setProfiles(data as Profile[])
      setLoading(false)
    }
    fetchProfiles()
  }, [filtroRol, filtroProvincia])

  const filtered = profiles.filter(p => {
    const matchSistema = !filtroSistema || p.sistemas_que_trabaja?.includes(filtroSistema)
    const matchBusqueda = !busqueda ||
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.ciudad?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    return matchSistema && matchBusqueda
  })

  const filterBtn = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em',
    textTransform: 'uppercase' as const, padding: '.38rem .85rem',
    border: `1px solid ${active ? 'var(--ink)' : 'rgba(24,23,19,.12)'}`,
    background: active ? 'var(--ink)' : 'transparent',
    color: active ? 'var(--white)' : 'var(--mid)',
    cursor: 'pointer', transition: 'all .15s',
  })

  const SISTEMAS_FILTER = ['SIP-TAO', 'Steel Frame', 'Madera', 'Mampostería']

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--rust)', display: 'flex', alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' }} />Red MeinHaus
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>
                  Los que<br /><em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>construyen.</em>
                </h1>
              </div>
              <div>
                <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82, marginBottom: '1.25rem' }}>
                  Profesionales verificados por zona y sistema constructivo. Instaladores, constructores, arquitectos y proveedores.
                </p>
                <Link href="/sumate" style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'var(--ink)', color: 'var(--white)', padding: '.65rem 1.35rem', textDecoration: 'none', display: 'inline-block' }}>
                  + Sumate a la red
                </Link>
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '.85rem', marginBottom: '2rem', alignItems: 'center' as const }}>

              {/* Búsqueda */}
              <input
                value={busqueda} onChange={e => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre, ciudad..."
                style={{ fontFamily: 'var(--sans)', fontSize: '.85rem', fontWeight: 300, color: 'var(--ink)', background: 'var(--white)', border: '1px solid rgba(24,23,19,.12)', padding: '.52rem .95rem', outline: 'none', minWidth: '220px' }}
              />

              {/* Rol */}
              <select value={filtroRol} onChange={e => setFiltroRol(e.target.value)} style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '.52rem .85rem', border: '1px solid rgba(24,23,19,.12)', background: 'var(--white)', color: 'var(--mid)', cursor: 'pointer', outline: 'none', appearance: 'none' as const }}>
                <option value="">Todos los roles</option>
                {Object.entries(ROL_LABEL).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>

              {/* Provincia */}
              <select value={filtroProvincia} onChange={e => setFiltroProvincia(e.target.value)} style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '.52rem .85rem', border: '1px solid rgba(24,23,19,.12)', background: 'var(--white)', color: 'var(--mid)', cursor: 'pointer', outline: 'none', appearance: 'none' as const }}>
                <option value="">Todas las provincias</option>
                {PROVINCIAS_AR.map(p => <option key={p} value={p}>{p}</option>)}
              </select>

              {/* Sistema buttons */}
              <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap' as const }}>
                {SISTEMAS_FILTER.map(s => (
                  <button key={s} onClick={() => setFiltroSistema(filtroSistema === s ? '' : s)}
                    style={filterBtn(filtroSistema === s)}>
                    {s}
                  </button>
                ))}
              </div>

              {(filtroRol || filtroProvincia || filtroSistema || busqueda) && (
                <button onClick={() => { setFiltroRol(''); setFiltroProvincia(''); setFiltroSistema(''); setBusqueda('') }}
                  style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,83,26,.6)' }}>
                  × Limpiar filtros
                </button>
              )}
            </div>

            {/* Count */}
            <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'var(--light)', marginBottom: '1.5rem' }}>
              {loading ? 'Cargando...' : `${filtered.length} profesional${filtered.length !== 1 ? 'es' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
            </div>

            {/* Grid */}
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)' }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ background: 'var(--bg)', padding: '1.75rem', minHeight: '140px' }}>
                    <div style={{ width: '60%', height: '14px', background: 'rgba(24,23,19,.06)', marginBottom: '.65rem' }} />
                    <div style={{ width: '40%', height: '10px', background: 'rgba(24,23,19,.04)', marginBottom: '.4rem' }} />
                    <div style={{ width: '80%', height: '10px', background: 'rgba(24,23,19,.04)' }} />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '4rem 2rem', textAlign: 'center' as const, background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 300, color: 'var(--mid)', marginBottom: '.65rem', fontStyle: 'italic' }}>
                  No hay profesionales con esos filtros todavía.
                </div>
                <Link href="/sumate" style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, color: 'var(--rust)', textDecoration: 'none' }}>
                  Sé el primero en sumarte →
                </Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)' }}>
                {filtered.map(p => (
                  <div key={p.id} style={{ background: 'var(--bg)', padding: '1.75rem', transition: 'background .15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg2)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.75rem' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.2rem' }}>{p.nombre}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'var(--rl)' }}>
                          {ROL_LABEL[p.rol] ?? p.rol}
                        </div>
                      </div>
                      {p.anos_experiencia && (
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--light)', textAlign: 'right' as const }}>
                          {p.anos_experiencia} años
                        </div>
                      )}
                    </div>

                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--light)', marginBottom: '.75rem' }}>
                      {[p.ciudad, p.provincia].filter(Boolean).join(', ')}
                    </div>

                    {p.descripcion && (
                      <p style={{ fontSize: '.8rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.62, marginBottom: '.85rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' as const }}>
                        {p.descripcion}
                      </p>
                    )}

                    {p.sistemas_que_trabaja?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '.3rem', marginBottom: '.85rem' }}>
                        {p.sistemas_que_trabaja.slice(0, 3).map(s => (
                          <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '.18rem .52rem', border: '1px solid rgba(155,124,90,.2)', color: 'var(--rl)' }}>{s}</span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '.65rem', alignItems: 'center' as const }}>
                      {p.web && <a href={p.web} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--rl)', textDecoration: 'none' }}>Web →</a>}
                      {p.instagram && <a href={`https://instagram.com/${p.instagram}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--mid)', textDecoration: 'none' }}>@{p.instagram}</a>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA bottom */}
            <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)' }}>
              <div style={{ background: 'var(--bg2)', padding: '2.25rem' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.65rem' }}>¿Sos profesional del sector?</div>
                <p style={{ fontSize: '.85rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65, marginBottom: '1rem' }}>Sumate al directorio. Sin costo, sin intermediarios.</p>
                <Link href="/sumate" style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, color: 'var(--rl)', textDecoration: 'none' }}>Registrarme →</Link>
              </div>
              <div style={{ background: 'var(--bg2)', padding: '2.25rem' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.65rem' }}>¿Querés construir?</div>
                <p style={{ fontSize: '.85rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65, marginBottom: '1rem' }}>Contanos tu proyecto y te conectamos con las personas correctas.</p>
                <Link href="/quiero-construir" style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, color: 'var(--blue)', textDecoration: 'none' }}>Consultar →</Link>
              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
