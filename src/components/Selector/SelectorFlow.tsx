'use client'
import { useState } from 'react'
import { buildRecommendation } from '@/data/scoring'
import { SISTEMAS } from '@/data/sistemas'
import type { SelectorFormData, SelectorResult, RegionKey, PriorityKey } from '@/types'
import Link from 'next/link'

// ─── STEP DEFINITIONS ────────────────────────────────────────
const STEPS = [
  { step: 0, type: 'intro' },
  {
    step: 1, field: 'projectType', type: 'cards',
    q: '¿Qué querés construir?',
    sub: 'Esto define qué sistemas tienen más sentido desde el inicio.',
    opts: [
      { v: 'vivienda', t: 'Vivienda unifamiliar', s: 'Casa propia' },
      { v: 'ampliacion', t: 'Ampliación', s: 'Sumar metros a lo existente' },
      { v: 'cabana', t: 'Cabaña / fin de semana', s: 'Uso recreativo o turístico' },
      { v: 'modulo', t: 'Módulo / oficina / local', s: 'Uso comercial o productivo' },
      { v: 'desarrollo', t: 'Desarrollo inmobiliario', s: 'Múltiples unidades' },
      { v: 'nave', t: 'Nave / uso industrial', s: 'Estructura de gran escala' },
      { v: 'temporal', t: 'Equipamiento temporal', s: 'Módulo relocatable' },
      { v: 'otro', t: 'Otro', s: 'Uso específico' },
    ],
  },
  {
    step: 2, field: 'region', type: 'cards',
    q: '¿Dónde se va a construir?',
    sub: 'La ubicación modifica clima, logística, disponibilidad y costo.',
    opts: [
      { v: 'patagonia', t: 'Patagonia', s: 'Río Negro · Neuquén · Chubut · Santa Cruz · TDF' },
      { v: 'amba', t: 'AMBA / Buenos Aires', s: 'Capital y Gran Buenos Aires' },
      { v: 'centro', t: 'Centro', s: 'Córdoba · Santa Fe · Entre Ríos' },
      { v: 'cuyo', t: 'Cuyo', s: 'Mendoza · San Juan · San Luis' },
      { v: 'noa', t: 'NOA', s: 'Salta · Jujuy · Tucumán · Catamarca · La Rioja' },
      { v: 'nea', t: 'NEA', s: 'Misiones · Corrientes · Chaco · Formosa' },
      { v: 'litoral', t: 'Litoral / La Pampa', s: 'Costa atlántica y llanura pampeana' },
    ],
  },
  {
    step: 3, field: 'surface', type: 'surface',
    q: '¿Qué superficie estimada tiene el proyecto?',
    sub: 'La escala cambia costo, modulación y conveniencia del sistema.',
    opts: [
      { v: 30, t: 'Hasta 40 m²', s: 'Módulo o espacio pequeño' },
      { v: 60, t: '40 – 80 m²', s: 'Vivienda mínima' },
      { v: 110, t: '80 – 140 m²', s: 'Vivienda estándar' },
      { v: 190, t: '140 – 250 m²', s: 'Vivienda grande' },
      { v: 300, t: 'Más de 250 m²', s: 'Desarrollo o proyecto grande' },
    ],
  },
  {
    step: 4, field: 'priority', type: 'cards',
    q: '¿Qué es más importante para vos?',
    sub: 'No existe un sistema perfecto. Sí existe uno más adecuado para cada prioridad.',
    opts: [
      { v: 'tiempo', t: 'Bajar tiempos de obra', s: 'La velocidad importa' },
      { v: 'confort', t: 'Mejor confort térmico', s: 'Aislación y habitabilidad' },
      { v: 'costo', t: 'Controlar costos', s: 'Previsibilidad presupuestaria' },
      { v: 'mantenimiento', t: 'Bajo mantenimiento', s: 'Durabilidad a largo plazo' },
      { v: 'precision', t: 'Mayor precisión', s: 'Calidad de ejecución' },
      { v: 'diseno', t: 'Flexibilidad de diseño', s: 'Formas y configuraciones libres' },
      { v: 'rentabilidad', t: 'Maximizar rentabilidad', s: 'Retorno de inversión' },
      { v: 'evaluando', t: 'Todavía estoy evaluando', s: 'Quiero conocer las opciones' },
    ],
  },
  {
    step: 5, field: 'timeframe', type: 'cards',
    q: '¿En cuánto tiempo querés resolverlo?',
    sub: 'El plazo cambia cuando entra en juego la obra húmeda y el clima.',
    opts: [
      { v: 'urgente', t: 'Lo antes posible', s: 'Urgente' },
      { v: '3a6', t: '3 a 6 meses', s: 'Plazo corto' },
      { v: '6a12', t: '6 a 12 meses', s: 'Plazo normal' },
      { v: 'mas12', t: 'Más de 12 meses', s: 'Sin apuro' },
      { v: 'flexible', t: 'Flexible', s: 'El tiempo no es el factor' },
    ],
  },
  {
    step: 6, field: 'complexity', type: 'cards',
    q: '¿Qué tipo de proyecto imaginás?',
    sub: 'La complejidad impacta modulación, desperdicio y costo real.',
    opts: [
      { v: 'simple', t: 'Simple y racional', s: 'Líneas rectas, modulación lógica' },
      { v: 'intermedio', t: 'Intermedio', s: 'Algo de diseño sin extremos' },
      { v: 'complejo', t: 'Complejo / muy personalizado', s: 'Formas libres o muchos espacios' },
      { v: 'indefinido', t: 'Aún no está definido', s: 'En etapa de ideación' },
    ],
  },
  {
    step: 7, field: 'execution', type: 'cards',
    q: '¿Cómo pensás encararlo?',
    sub: 'No todos los sistemas toleran igual la fragmentación de la obra.',
    opts: [
      { v: 'llave', t: 'Llave en mano', s: 'Un responsable único' },
      { v: 'gremios', t: 'Por gremios / etapas', s: 'Coordinación por el dueño' },
      { v: 'local', t: 'Con constructor local', s: 'Profesional de la zona' },
      { v: 'tecnico', t: 'Con apoyo técnico', s: 'Seguimiento sin ejecución directa' },
      { v: 'nodefinido', t: 'Aún no lo definí', s: 'Sin decisión tomada' },
    ],
  },
  {
    step: 8, field: 'innovation', type: 'cards',
    q: '¿Qué tan abierto estás a sistemas no tradicionales?',
    sub: 'Esto ajusta cómo presentamos la recomendación, no el criterio técnico.',
    opts: [
      { v: 'mucho', t: 'Muy abierto', s: 'Me interesan las alternativas' },
      { v: 'algo', t: 'Algo abierto', s: 'Puedo evaluar con criterio' },
      { v: 'poco', t: 'Prefiero lo conocido', s: 'El ladrillo me da más confianza' },
      { v: 'noseguro', t: 'No estoy seguro', s: 'Quiero entender antes de opinar' },
    ],
  },
  { step: 9, type: 'result' },
  { step: 10, type: 'lead' },
]

// ─── INITIAL STATE ───────────────────────────────────────────
const INITIAL: SelectorFormData = {
  projectType: '', region: '' as RegionKey | '',
  surface: null, priority: '' as PriorityKey | '',
  timeframe: '', complexity: '', execution: '', innovation: '',
}

// ─── STYLES ──────────────────────────────────────────────────
const s = {
  tag: { fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--rl)', marginBottom: '1rem' },
  h: { fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.08, marginBottom: '.75rem' },
  sub: { fontSize: '.88rem', fontWeight: 300, color: 'rgba(250,249,246,.38)', lineHeight: 1.72, marginBottom: '2.25rem', maxWidth: '50ch' },
  err: { fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(232,83,26,.7)', marginTop: '.75rem' },
}

export default function SelectorFlow() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<SelectorFormData>(INITIAL)
  const [result, setResult] = useState<SelectorResult | null>(null)
  const [err, setErr] = useState('')
  const [leadSent, setLeadSent] = useState(false)

  const pct = step === 0 ? 0 : Math.round((step / 9) * 100)
  const stepDef = STEPS[step]

  function pick(field: keyof SelectorFormData, val: string | number) {
    setData(d => ({ ...d, [field]: val }))
    setErr('')
    // Auto-advance for card steps
    setTimeout(() => {
      const sd = STEPS[step]
      if (sd?.type === 'cards') advance({ ...data, [field]: val })
    }, 320)
  }

  function validate(): boolean {
    const sd = STEPS[step]
    if (!sd || sd.type === 'intro' || sd.type === 'result' || sd.type === 'lead') return true
    const field = (sd as { field: string }).field as keyof SelectorFormData
    if (field === 'surface') {
      if (!data.surface || data.surface <= 0) { setErr('Por favor, ingresá una superficie.'); return false }
    } else {
      if (!data[field]) { setErr('Por favor, elegí una opción para continuar.'); return false }
    }
    return true
  }

  function advance(d: SelectorFormData = data) {
    if (step === 8) {
      setResult(buildRecommendation(d))
    }
    setStep(s => Math.min(s + 1, 10))
    setErr('')
  }

  function next() {
    if (!validate()) return
    advance()
  }

  function prev() {
    setStep(s => Math.max(s - 1, 1))
    setErr('')
  }

  function reset() {
    setStep(0)
    setData(INITIAL)
    setResult(null)
    setLeadSent(false)
    setErr('')
  }

  // ── RENDER ─────────────────────────────────────────────────
  return (
    <div style={{ minHeight: 'calc(100svh - var(--nav))', background: 'var(--dark)', display: 'flex' as const, flexDirection: 'column' as const }}>
      {/* Progress bar */}
      {step > 0 && (
        <div style={{ background: 'var(--dark2)', borderBottom: '1px solid rgba(250,249,246,.05)', padding: '1.25rem var(--pad)' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex' as const, flexDirection: 'column' as const, gap: '.65rem' }}>
            <div style={{ height: '2px', background: 'rgba(250,249,246,.08)', position: 'relative' as const, overflow: 'hidden' as const }}>
              <div style={{ height: '100%', background: 'var(--rl)', width: `${pct}%`, transition: 'width .4s ease' }} />
            </div>
            <div style={{ display: 'flex' as const, justifyContent: 'space-between' as const, fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.28)' }}>
              <span>Paso {step} de 9</span>
              <span>Qué sistema te conviene</span>
            </div>
          </div>
        </div>
      )}

      {/* Step body */}
      <div style={{ flex: 1, display: 'flex' as const, flexDirection: 'column' as const, alignItems: 'center' as const, justifyContent: 'center' as const, padding: '4rem var(--pad)' }}>
        <div style={{ width: '100%', maxWidth: '680px' }}>

          {/* INTRO */}
          {stepDef?.type === 'intro' && (
            <div>
              <div style={s.tag}>Diagnóstico constructivo</div>
              <h2 style={s.h}>Decidir cómo construir<br />importa más de lo que parece</h2>
              <p style={s.sub}>Este diagnóstico cruza tipo de proyecto, ubicación, presupuesto, tiempos y prioridades para sugerir los sistemas más convenientes. Sin sesgo comercial.</p>
              <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: '.55rem', marginBottom: '2rem' }}>
                {['Toma menos de 2 minutos', 'Compara 7 sistemas constructivos', 'Entrega una recomendación argumentada', 'No requiere datos personales para ver el resultado'].map(t => (
                  <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(155,124,90,.6)' }}>✓ {t}</span>
                ))}
              </div>
              <div style={{ display: 'flex' as const, gap: '.9rem', flexWrap: 'wrap' as const }}>
                <button onClick={() => setStep(1)} style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'var(--rl)', color: 'var(--white)', padding: '.85rem 1.75rem', border: 'none', cursor: 'pointer' as const }}>Empezar diagnóstico →</button>
                <Link href="/sistemas" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'transparent', color: 'rgba(250,249,246,.5)', padding: '.85rem 1.75rem', border: '1px solid rgba(250,249,246,.2)' }}>Ver sistemas primero</Link>
              </div>
            </div>
          )}

          {/* CARDS / SURFACE */}
          {(stepDef?.type === 'cards' || stepDef?.type === 'surface') && (
            <div>
              <div style={s.tag}>Paso {step} de 9</div>
              <h2 style={s.h}>{(stepDef as { q: string }).q}</h2>
              <p style={s.sub}>{(stepDef as { sub: string }).sub}</p>

              {stepDef?.type === 'cards' && (
                <div style={{
                  display: 'grid' as const,
                  gridTemplateColumns: (stepDef as { opts: unknown[] }).opts.length <= 5 ? '1fr 1fr' : 'repeat(4,1fr)',
                  gap: '1px', background: 'rgba(250,249,246,.05)',
                  border: '1px solid rgba(250,249,246,.05)',
                }}>
                  {(stepDef as { opts: { v: string; t: string; s: string }[]; field: string }).opts.map(opt => {
                    const field = (stepDef as { field: string }).field as keyof SelectorFormData
                    const selected = data[field] === opt.v
                    return (
                      <button key={opt.v} onClick={() => pick(field, opt.v)} style={{
                        background: selected ? 'rgba(155,124,90,.08)' : 'rgba(250,249,246,.02)',
                        padding: '1.2rem 1.4rem', cursor: 'pointer' as const, textAlign: 'left' as const,
                        border: 'none', borderLeft: selected ? '3px solid var(--rl)' : '3px solid transparent',
                        transition: 'all .15s',
                      }}>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: 300, color: 'var(--white)', marginBottom: '.2rem', lineHeight: 1.15 }}>{opt.t}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.28)' }}>{opt.s}</div>
                      </button>
                    )
                  })}
                </div>
              )}

              {stepDef?.type === 'surface' && (
                <>
                  <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(250,249,246,.05)', border: '1px solid rgba(250,249,246,.05)', marginBottom: '1.25rem' }}>
                    {(stepDef as { opts: { v: number; t: string; s: string }[] }).opts.map(opt => {
                      const selected = data.surface === opt.v
                      return (
                        <button key={opt.v} onClick={() => pick('surface', opt.v)} style={{
                          background: selected ? 'rgba(155,124,90,.08)' : 'rgba(250,249,246,.02)',
                          padding: '1.2rem 1.4rem', cursor: 'pointer' as const, textAlign: 'left' as const,
                          border: 'none', borderLeft: selected ? '3px solid var(--rl)' : '3px solid transparent',
                          transition: 'all .15s',
                        }}>
                          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: 300, color: 'var(--white)', marginBottom: '.2rem' }}>{opt.t}</div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.28)' }}>{opt.s}</div>
                        </button>
                      )
                    })}
                  </div>
                  <div style={{ display: 'flex' as const, alignItems: 'center' as const, gap: '1rem' }}>
                    <input
                      type="number" placeholder="o escribí el número exacto"
                      value={data.surface ?? ''}
                      onChange={e => setData(d => ({ ...d, surface: parseInt(e.target.value) || null }))}
                      style={{ fontFamily: 'var(--sans)', fontSize: '.9rem', fontWeight: 300, background: 'rgba(250,249,246,.04)', border: '1px solid rgba(250,249,246,.1)', color: 'var(--white)', padding: '.7rem .95rem', width: '260px', outline: 'none' }}
                    />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.28)' }}>m²</span>
                  </div>
                </>
              )}

              {err && <div style={s.err}>{err}</div>}

              <div style={{ display: 'flex' as const, gap: '1rem', alignItems: 'center' as const, marginTop: '2.25rem', flexWrap: 'wrap' as const }}>
                {step > 1 && (
                  <button onClick={prev} style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'transparent', color: 'rgba(250,249,246,.4)', padding: '.85rem 1.75rem', border: '1px solid rgba(250,249,246,.15)', cursor: 'pointer' as const }}>← Volver</button>
                )}
                <button onClick={next} style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'var(--rl)', color: 'var(--white)', padding: '.85rem 1.75rem', border: 'none', cursor: 'pointer' as const }}>Continuar →</button>
              </div>
            </div>
          )}

          {/* RESULT */}
          {stepDef?.type === 'result' && result && (
            <ResultScreen result={result} onLead={() => setStep(10)} onReset={reset} />
          )}

          {/* LEAD */}
          {stepDef?.type === 'lead' && (
            <div style={{ maxWidth: '500px' }}>
              <div style={s.tag}>Último paso</div>
              <h2 style={s.h}>Recibí el diagnóstico completo</h2>
              <p style={s.sub}>Te enviamos el resumen y los sistemas recomendados. Sin spam.</p>
              {!leadSent ? (
                <form onSubmit={e => { e.preventDefault(); setLeadSent(true) }}>
                  {[['Nombre', 'text', 'Tu nombre', true], ['Email', 'email', 'tu@email.com', false], ['WhatsApp', 'tel', '+54 9 11 xxxxxxxx', false]].map(([label, type, ph, req]) => (
                    <div key={label as string} style={{ marginBottom: '.8rem' }}>
                      <label style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.35)', display: 'block' as const, marginBottom: '.48rem' }}>{label}</label>
                      <input type={type as string} placeholder={ph as string} required={req as boolean}
                        style={{ fontFamily: 'var(--sans)', fontSize: '.9rem', fontWeight: 300, background: 'rgba(250,249,246,.04)', border: '1px solid rgba(250,249,246,.1)', color: 'var(--white)', padding: '.7rem .95rem', width: '100%', outline: 'none' }} />
                    </div>
                  ))}
                  <div style={{ display: 'flex' as const, gap: '.9rem', flexWrap: 'wrap' as const, marginTop: '1.25rem' }}>
                    <button type="submit" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'var(--rl)', color: 'var(--white)', padding: '.85rem 1.75rem', border: 'none', cursor: 'pointer' as const }}>Enviar diagnóstico →</button>
                    <button type="button" onClick={() => setStep(9)} style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'transparent', color: 'rgba(250,249,246,.4)', padding: '.85rem 1.75rem', border: '1px solid rgba(250,249,246,.15)', cursor: 'pointer' as const }}>Seguir sin enviar</button>
                  </div>
                </form>
              ) : (
                <div style={{ padding: '1.5rem', background: 'rgba(155,124,90,.08)', border: '1px solid rgba(155,124,90,.2)' }}>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: 300, color: 'var(--white)', marginBottom: '.4rem' }}>Diagnóstico enviado. Revisá tu correo.</p>
                  <small style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(155,124,90,.55)' }}>Respondemos en menos de 48 hs</small>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// ─── RESULT SCREEN ───────────────────────────────────────────
function ResultScreen({ result, onLead, onReset }: {
  result: SelectorResult
  onLead: () => void
  onReset: () => void
}) {
  const top = SISTEMAS.find(s => s.id === result.recommended) ?? SISTEMAS[0]
  const alts = result.alternatives.map(id => SISTEMAS.find(s => s.id === id)).filter(Boolean)

  return (
    <div style={{ maxWidth: '820px', width: '100%' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--rl)', marginBottom: '1.25rem' }}>Diagnóstico completado · Resultado</div>

      {/* Main recommendation */}
      <div style={{ background: 'rgba(155,124,90,.06)', border: '1px solid rgba(155,124,90,.2)', borderLeft: '4px solid var(--rl)', padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'var(--rl)', marginBottom: '.65rem' }}>Sistema más recomendable para tu caso</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1, marginBottom: '.65rem' }}>{top.name}</div>
        <div style={{ fontSize: '.88rem', fontWeight: 300, color: 'rgba(250,249,246,.5)', lineHeight: 1.75 }}>{top.desc}</div>
      </div>

      {/* Ranking */}
      <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(250,249,246,.04)', border: '1px solid rgba(250,249,246,.04)', marginBottom: '1.5rem' }}>
        {[{ rank: 'Recomendado', sis: top, highlight: true }, ...alts.slice(0, 2).map((s, i) => ({ rank: i === 0 ? 'Alternativa sólida' : 'Opción posible', sis: s!, highlight: false }))].map(({ rank, sis, highlight }) => (
          <div key={sis.id} style={{ background: 'rgba(250,249,246,.02)', padding: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.25)', marginBottom: '.55rem' }}>{rank}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 300, color: highlight ? 'var(--rl)' : 'var(--white)', marginBottom: '.3rem' }}>{sis.name}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.32)' }}>{sis.costo} · {sis.tiempo}</div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{ background: 'rgba(250,249,246,.02)', border: '1px solid rgba(250,249,246,.04)', padding: '1.5rem', marginBottom: '1.5rem', fontSize: '.88rem', fontWeight: 300, color: 'rgba(250,249,246,.5)', lineHeight: 1.82 }}>
        {result.summary}
      </div>

      {/* Reasons + Warnings */}
      <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(250,249,246,.04)', border: '1px solid rgba(250,249,246,.04)', marginBottom: '1.75rem' }}>
        {[
          { hdr: 'Por qué conviene', items: result.reasons, dotColor: '#3D7A55' },
          { hdr: 'Advertencias', items: result.warnings, dotColor: 'rgba(232,83,26,.5)' },
        ].map(({ hdr, items, dotColor }) => (
          <div key={hdr} style={{ background: 'rgba(250,249,246,.02)', padding: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: dotColor, marginBottom: '.85rem' }}>{hdr}</div>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex' as const, gap: '.6rem', alignItems: 'flex-start' as const, padding: '.45rem 0', borderBottom: i < items.length - 1 ? '1px solid rgba(250,249,246,.04)' : 'none' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: dotColor, flexShrink: 0, marginTop: '.48rem' }} />
                <span style={{ fontSize: '.82rem', fontWeight: 300, color: 'rgba(250,249,246,.5)', lineHeight: 1.65 }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex' as const, flexWrap: 'wrap' as const, gap: '.9rem' }}>
        <Link href={`/sistemas/${top.slug}`} style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'var(--rl)', color: 'var(--white)', padding: '.85rem 1.75rem' }}>Ver detalle del sistema →</Link>
        <Link href="/mapa" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'var(--ink)', color: 'var(--white)', padding: '.85rem 1.75rem' }}>Calcular inversión →</Link>
        <button onClick={onLead} style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase' as const, background: 'transparent', color: 'rgba(250,249,246,.5)', padding: '.85rem 1.75rem', border: '1px solid rgba(250,249,246,.2)', cursor: 'pointer' as const }}>Recibir diagnóstico por mail</button>
        <button onClick={onReset} style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase' as const, background: 'transparent', color: 'rgba(250,249,246,.22)', padding: '.5rem 0', border: 'none', cursor: 'pointer' as const }}>↺ Volver a empezar</button>
      </div>
    </div>
  )
}
