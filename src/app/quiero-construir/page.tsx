'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { supabase, PROVINCIAS_AR } from '@/lib/supabase'

const input: React.CSSProperties = {
  fontFamily: 'var(--sans)', fontSize: '.9rem', fontWeight: 300,
  color: 'var(--ink)', background: 'var(--white)',
  border: '1px solid rgba(24,23,19,.12)', padding: '.72rem .95rem',
  width: '100%', outline: 'none', appearance: 'none' as const,
}
const label: React.CSSProperties = {
  fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em',
  textTransform: 'uppercase' as const, color: 'var(--mid)',
  display: 'block', marginBottom: '.45rem',
}

const TIPOS_PROYECTO = [
  'Vivienda unifamiliar', 'Ampliación', 'Casa de campo / chacra',
  'Cabaña / turismo', 'Local comercial', 'Oficinas', 'Galpón / depósito', 'Otro',
]
const SISTEMAS_INTERES = [
  'SIP-TAO (paneles aislantes)', 'Steel Frame', 'Madera',
  'Mampostería tradicional', 'No sé / quiero asesoramiento',
]
const NECESIDADES = [
  'Proyectista / arquitecto', 'Constructor / empresa constructora',
  'Instalador especializado', 'Proveedor de materiales', 'Todo junto',
]

export default function QuieroConstruirPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [provincia, setProvincia] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [tipoProyecto, setTipoProyecto] = useState('')
  const [superficie, setSuperficie] = useState('')
  const [sistemaInteres, setSistemaInteres] = useState('')
  const [presupuesto, setPresupuesto] = useState('')
  const [necesita, setNecesita] = useState<string[]>([])
  const [descripcion, setDescripcion] = useState('')

  const toggleNecesidad = (n: string) =>
    setNecesita(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre || !email || !provincia) { setError('Completá los campos obligatorios'); return }
    setLoading(true); setError('')
    try {
      const { error: err } = await supabase
        .from('solicitudes_obra')
        .insert({
          nombre, email, telefono,
          provincia, ciudad,
          tipo_proyecto: tipoProyecto,
          superficie_m2: superficie ? parseFloat(superficie) : null,
          sistema_interes: sistemaInteres,
          presupuesto_aprox: presupuesto,
          necesita: necesita,
          descripcion,
          estado: 'nuevo',
        })
      if (err) throw err
      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al enviar. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bone)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 var(--pad)' }}>

            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'var(--blue)', display: 'flex', alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                <span style={{ width: '16px', height: '1px', background: 'var(--blue)', display: 'block' }} />Quiero construir
              </div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)', marginBottom: '.85rem' }}>
                Contanos tu proyecto.
              </h1>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>
                Completá este formulario y te conectamos con los profesionales y proveedores adecuados para tu proyecto, en tu zona.
              </p>
            </div>

            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>

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
                    <label style={label}>Provincia *</label>
                    <select value={provincia} onChange={e => setProvincia(e.target.value)} required style={{ ...input, cursor: 'pointer' }}>
                      <option value="">Seleccioná...</option>
                      {PROVINCIAS_AR.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
                  <div>
                    <label style={label}>Ciudad / Localidad</label>
                    <input value={ciudad} onChange={e => setCiudad(e.target.value)} placeholder="General Roca" style={input} />
                  </div>
                  <div>
                    <label style={label}>Tipo de proyecto</label>
                    <select value={tipoProyecto} onChange={e => setTipoProyecto(e.target.value)} style={{ ...input, cursor: 'pointer' }}>
                      <option value="">Seleccioná...</option>
                      {TIPOS_PROYECTO.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
                  <div>
                    <label style={label}>Superficie estimada (m²)</label>
                    <input type="number" value={superficie} onChange={e => setSuperficie(e.target.value)} placeholder="120" min="10" style={input} />
                  </div>
                  <div>
                    <label style={label}>Sistema constructivo de interés</label>
                    <select value={sistemaInteres} onChange={e => setSistemaInteres(e.target.value)} style={{ ...input, cursor: 'pointer' }}>
                      <option value="">Seleccioná...</option>
                      {SISTEMAS_INTERES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={label}>¿Qué necesitás? (podés elegir más de uno)</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '.4rem', marginTop: '.25rem' }}>
                    {NECESIDADES.map(n => (
                      <button key={n} type="button" onClick={() => toggleNecesidad(n)} style={{
                        fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em',
                        textTransform: 'uppercase' as const, padding: '.38rem .85rem',
                        border: `1px solid ${necesita.includes(n) ? 'var(--blue)' : 'rgba(24,23,19,.15)'}`,
                        background: necesita.includes(n) ? 'var(--blue)' : 'transparent',
                        color: necesita.includes(n) ? 'var(--white)' : 'var(--mid)',
                        cursor: 'pointer', transition: 'all .15s',
                      }}>{n}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={label}>Presupuesto aproximado</label>
                  <select value={presupuesto} onChange={e => setPresupuesto(e.target.value)} style={{ ...input, cursor: 'pointer' }}>
                    <option value="">Prefiero no decirlo todavía</option>
                    <option value="menos_50k">Menos de USD 50.000</option>
                    <option value="50k_100k">USD 50.000 – 100.000</option>
                    <option value="100k_200k">USD 100.000 – 200.000</option>
                    <option value="mas_200k">Más de USD 200.000</option>
                  </select>
                </div>

                <div>
                  <label style={label}>Descripción del proyecto</label>
                  <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}
                    placeholder="Contanos qué tenés en mente: tipo de terreno, plazo estimado, requerimientos especiales, preguntas..."
                    style={{ ...input, minHeight: '90px', resize: 'vertical' as const }} />
                </div>

                {error && <div style={{ padding: '.75rem 1rem', background: 'rgba(232,83,26,.06)', border: '1px solid rgba(232,83,26,.25)', fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.1em', color: 'var(--rust)' }}>{error}</div>}

                <button type="submit" disabled={loading} style={{
                  fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.14em',
                  textTransform: 'uppercase' as const,
                  background: loading ? 'var(--mid)' : 'var(--ink)',
                  color: 'var(--white)', border: 'none', padding: '.9rem 2rem',
                  cursor: loading ? 'default' : 'pointer',
                }}>
                  {loading ? 'Enviando...' : 'Enviar consulta →'}
                </button>

                <p style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--light)', lineHeight: 1.6 }}>
                  Respondemos en menos de 48 hs hábiles. No compartimos tus datos con terceros.
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center' as const, padding: '3rem 2rem', background: 'var(--ink)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2.2rem', fontWeight: 300, color: 'var(--white)', marginBottom: '.65rem' }}>
                  Recibimos tu consulta.
                </div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.35)', marginBottom: '2rem' }}>
                  En menos de 48 hs hábiles te contactamos con opciones concretas.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' as const, flexWrap: 'wrap' as const }}>
                  <Link href="/sistemas" style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, color: 'var(--rl)', textDecoration: 'none' }}>
                    Explorar sistemas constructivos →
                  </Link>
                  <Link href="/selector" style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.4)', textDecoration: 'none' }}>
                    Usar el selector →
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
