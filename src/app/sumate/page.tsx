'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { supabase, ROL_LABEL, SISTEMAS_TRABAJO, PROVINCIAS_AR, type Rol } from '@/lib/supabase'

const input: React.CSSProperties = {
  fontFamily: 'var(--sans)', fontSize: '.9rem', fontWeight: 300,
  color: 'var(--ink)', background: 'var(--white)',
  border: '1px solid rgba(24,23,19,.12)', padding: '.72rem .95rem',
  width: '100%', outline: 'none', transition: 'border-color .2s',
  appearance: 'none' as const,
}

const label: React.CSSProperties = {
  fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em',
  textTransform: 'uppercase' as const, color: 'var(--mid)',
  display: 'block', marginBottom: '.45rem',
}

type Step = 'perfil' | 'encuesta' | 'done'

export default function SumatePage() {
  const [step, setStep] = useState<Step>('perfil')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [profileId, setProfileId] = useState<string | null>(null)

  // Perfil fields
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [rol, setRol] = useState<Rol>('instalador_sip')
  const [provincia, setProvincia] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [sistemas, setSistemas] = useState<string[]>([])
  const [experiencia, setExperiencia] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [web, setWeb] = useState('')
  const [instagram, setInstagram] = useState('')
  const [visible, setVisible] = useState(true)

  // Encuesta fields
  const [jornal, setJornal] = useState('')
  const [moneda, setMoneda] = useState('ARS')
  const [m2desde, setM2desde] = useState('')
  const [m2hasta, setM2hasta] = useState('')
  const [sistemaEnc, setSistemaEnc] = useState('SIP-TAO')
  const [tipoObra, setTipoObra] = useState('vivienda_nueva')

  const toggleSistema = (s: string) =>
    setSistemas(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  async function submitPerfil(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre || !email || !provincia || !ciudad) {
      setError('Completá los campos obligatorios'); return
    }
    setLoading(true); setError('')
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .insert({
          nombre, email, telefono, rol,
          provincia, ciudad,
          sistemas_que_trabaja: sistemas,
          anos_experiencia: experiencia ? parseInt(experiencia) : null,
          descripcion, web, instagram,
          visible_publicamente: visible,
        })
        .select('id')
        .single()

      if (err) throw err
      setProfileId(data.id)
      setStep('encuesta')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  async function submitEncuesta(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const { error: err } = await supabase
        .from('encuestas_economicas')
        .insert({
          profile_id: profileId,
          provincia, ciudad,
          rol_reportado: rol,
          jornal_diario: jornal ? parseFloat(jornal) : null,
          unidad_moneda: moneda,
          sistema_constructivo: sistemaEnc,
          valor_m2_desde: m2desde ? parseFloat(m2desde) : null,
          valor_m2_hasta: m2hasta ? parseFloat(m2hasta) : null,
          tipo_obra: tipoObra,
        })

      if (err) throw err
      setStep('done')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar.')
    } finally {
      setLoading(false)
    }
  }

  async function skipEncuesta() {
    setStep('done')
  }

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bone)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 var(--pad)' }}>

            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--rust)', display: 'flex', alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' }} />
                Red MeinHaus
              </div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)', marginBottom: '.85rem' }}>
                Sumate a la red.
              </h1>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>
                Registrate como profesional del sector. Instaladores, constructores, arquitectos, proyectistas y proveedores. Sin costo, sin humo.
              </p>
            </div>

            {/* Steps indicator */}
            <div style={{ display: 'flex', alignItems: 'center' as const, gap: '.65rem', marginBottom: '2.5rem' }}>
              {(['perfil', 'encuesta', 'done'] as Step[]).map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center' as const, gap: '.65rem' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: step === s ? 'var(--ink)' : (
                      (step === 'encuesta' && s === 'perfil') || step === 'done' ? 'var(--rust)' : 'transparent'
                    ),
                    border: `1px solid ${step === s ? 'var(--ink)' : 'rgba(24,23,19,.2)'}`,
                    display: 'flex', alignItems: 'center' as const, justifyContent: 'center' as const,
                    fontFamily: 'var(--mono)', fontSize: '.52rem', color: step === s ? 'var(--white)' : 'var(--mid)',
                  }}>
                    {(step === 'encuesta' && s === 'perfil') || step === 'done' ? '✓' : i + 1}
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: step === s ? 'var(--ink)' : 'var(--light)' }}>
                    {s === 'perfil' ? 'Tu perfil' : s === 'encuesta' ? 'Datos de mercado' : 'Listo'}
                  </span>
                  {i < 2 && <span style={{ color: 'rgba(24,23,19,.15)', fontSize: '.8rem' }}>—</span>}
                </div>
              ))}
            </div>

            {/* ─── STEP 1: PERFIL ─── */}
            {step === 'perfil' && (
              <form onSubmit={submitPerfil} style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
                  <div>
                    <label style={label}>Nombre y apellido *</label>
                    <input value={nombre} onChange={e => setNombre(e.target.value)} required placeholder="Juan Pérez" style={input} />
                  </div>
                  <div>
                    <label style={label}>Email *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="tu@email.com" style={input} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
                  <div>
                    <label style={label}>Teléfono / WhatsApp</label>
                    <input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="+54 9 11 xxxx-xxxx" style={input} />
                  </div>
                  <div>
                    <label style={label}>Rol principal *</label>
                    <select value={rol} onChange={e => setRol(e.target.value as Rol)} style={{ ...input, cursor: 'pointer' }}>
                      {Object.entries(ROL_LABEL).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
                  <div>
                    <label style={label}>Provincia *</label>
                    <select value={provincia} onChange={e => setProvincia(e.target.value)} required style={{ ...input, cursor: 'pointer' }}>
                      <option value="">Seleccioná...</option>
                      {PROVINCIAS_AR.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={label}>Ciudad / Localidad *</label>
              <input value={ciudad} onChange={e => setCiudad(e.target.value)} required placeholder="Patagonia" style={input} />
                  </div>
                </div>

                <div>
                  <label style={label}>Sistemas con los que trabajás</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '.4rem', marginTop: '.25rem' }}>
                    {SISTEMAS_TRABAJO.map(s => (
                      <button key={s} type="button" onClick={() => toggleSistema(s)} style={{
                        fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em',
                        textTransform: 'uppercase' as const, padding: '.38rem .85rem',
                        border: `1px solid ${sistemas.includes(s) ? 'var(--ink)' : 'rgba(24,23,19,.15)'}`,
                        background: sistemas.includes(s) ? 'var(--ink)' : 'transparent',
                        color: sistemas.includes(s) ? 'var(--white)' : 'var(--mid)',
                        cursor: 'pointer', transition: 'all .15s',
                      }}>{s}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
                  <div>
                    <label style={label}>Años de experiencia</label>
                    <input type="number" value={experiencia} onChange={e => setExperiencia(e.target.value)} min="0" max="50" placeholder="8" style={input} />
                  </div>
                  <div>
                    <label style={label}>Instagram (sin @)</label>
                    <input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="meinhaus.ar" style={input} />
                  </div>
                </div>

                <div>
                  <label style={label}>Web / Portfolio</label>
                  <input value={web} onChange={e => setWeb(e.target.value)} placeholder="https://tuportfolio.com" style={input} />
                </div>

                <div>
                  <label style={label}>Descripción breve</label>
                  <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Qué hacés, en qué zona operás, qué tipo de proyectos tomás..." style={{ ...input, minHeight: '80px', resize: 'vertical' as const }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' as const, gap: '.75rem' }}>
                  <input type="checkbox" id="visible" checked={visible} onChange={e => setVisible(e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--ink)' }} />
                  <label htmlFor="visible" style={{ ...label, marginBottom: 0, cursor: 'pointer' }}>
                    Quiero aparecer en el directorio público de MeinHaus
                  </label>
                </div>

                {error && <div style={{ padding: '.75rem 1rem', background: 'rgba(232,83,26,.06)', border: '1px solid rgba(232,83,26,.25)', fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.1em', color: 'var(--rust)' }}>{error}</div>}

                <button type="submit" disabled={loading} style={{
                  fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.14em',
                  textTransform: 'uppercase' as const, background: loading ? 'var(--mid)' : 'var(--ink)',
                  color: 'var(--white)', border: 'none', padding: '.9rem 2rem',
                  cursor: loading ? 'default' : 'pointer', marginTop: '.5rem',
                }}>
                  {loading ? 'Guardando...' : 'Continuar →'}
                </button>

                <p style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--light)', lineHeight: 1.6 }}>
                  Los datos marcados con * son obligatorios. Tu información no se comparte con terceros.
                </p>
              </form>
            )}

            {/* ─── STEP 2: ENCUESTA ─── */}
            {step === 'encuesta' && (
              <div>
                <div style={{ padding: '1.5rem', background: 'var(--bg2)', border: '1px solid rgba(24,23,19,.07)', borderLeft: '3px solid var(--rust)', marginBottom: '2rem' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'var(--rust)', marginBottom: '.5rem' }}>⬡ Índice MeinHaus</div>
                  <p style={{ fontSize: '.88rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.72 }}>
                    Estamos construyendo el primer índice real de costos de construcción por zona en Argentina. Con tus datos (que se publican de forma anónima y agregada) ayudás a que toda la industria tenga información real.
                  </p>
                </div>

                <form onSubmit={submitEncuesta} style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
                    <div>
                      <label style={label}>Jornal diario ({moneda})</label>
                      <input type="number" value={jornal} onChange={e => setJornal(e.target.value)} placeholder="15000" style={input} />
                    </div>
                    <div>
                      <label style={label}>Moneda</label>
                      <select value={moneda} onChange={e => setMoneda(e.target.value)} style={{ ...input, cursor: 'pointer' }}>
                        <option value="ARS">ARS — Pesos argentinos</option>
                        <option value="USD">USD — Dólares</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={label}>Sistema constructivo que más trabajás</label>
                    <select value={sistemaEnc} onChange={e => setSistemaEnc(e.target.value)} style={{ ...input, cursor: 'pointer' }}>
                      {SISTEMAS_TRABAJO.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={label}>Tipo de obra habitual</label>
                    <select value={tipoObra} onChange={e => setTipoObra(e.target.value)} style={{ ...input, cursor: 'pointer' }}>
                      <option value="vivienda_nueva">Vivienda nueva</option>
                      <option value="ampliacion">Ampliación / reforma</option>
                      <option value="comercial">Comercial / productivo</option>
                      <option value="industrial">Industrial / galpón</option>
                      <option value="mixto">Mixto</option>
                    </select>
                  </div>

                  <div>
                    <label style={label}>Valor de m² construido — rango estimado ({moneda})</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
                      <input type="number" value={m2desde} onChange={e => setM2desde(e.target.value)} placeholder="Desde" style={input} />
                      <input type="number" value={m2hasta} onChange={e => setM2hasta(e.target.value)} placeholder="Hasta" style={input} />
                    </div>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--light)', marginTop: '.4rem' }}>
                      Costo final llave en mano, terminaciones estándar
                    </p>
                  </div>

                  {error && <div style={{ padding: '.75rem 1rem', background: 'rgba(232,83,26,.06)', border: '1px solid rgba(232,83,26,.25)', fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.1em', color: 'var(--rust)' }}>{error}</div>}

                  <div style={{ display: 'flex', gap: '.85rem' }}>
                    <button type="submit" disabled={loading} style={{
                      fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.14em',
                      textTransform: 'uppercase' as const, background: loading ? 'var(--mid)' : 'var(--ink)',
                      color: 'var(--white)', border: 'none', padding: '.9rem 2rem',
                      cursor: loading ? 'default' : 'pointer', flex: 1,
                    }}>
                      {loading ? 'Guardando...' : 'Enviar datos →'}
                    </button>
                    <button type="button" onClick={skipEncuesta} style={{
                      fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.12em',
                      textTransform: 'uppercase' as const, background: 'transparent',
                      color: 'var(--light)', border: '1px solid rgba(24,23,19,.12)',
                      padding: '.9rem 1.5rem', cursor: 'pointer',
                    }}>
                      Omitir
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ─── STEP 3: DONE ─── */}
            {step === 'done' && (
              <div style={{ textAlign: 'center' as const, padding: '3rem 2rem', background: 'var(--ink)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2.2rem', fontWeight: 300, color: 'var(--white)', marginBottom: '.65rem' }}>
                  Bienvenido a la red.
                </div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.35)', marginBottom: '2rem' }}>
                  Tu perfil fue registrado. Te contactamos a la brevedad.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' as const, flexWrap: 'wrap' as const }}>
                  <Link href="/comunidad" style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, color: 'var(--rl)', textDecoration: 'none' }}>
                    Ver el directorio →
                  </Link>
                  <Link href="/indice" style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.4)', textDecoration: 'none' }}>
                    Ver el índice MeinHaus →
                  </Link>
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
