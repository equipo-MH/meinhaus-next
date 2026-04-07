'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SistemaCard from '@/components/SistemaCard'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { SISTEMAS } from '@/data/sistemas'

const GlobeHero = dynamic(() => import('@/components/GlobeHero'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '100svh', background: '#0e0e0c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'rgba(250,249,246,.2)' }}>Cargando...</span>
    </div>
  ),
})

const HERO = "/images/hero.jpg"
const OBRA_J = "/images/obra-junta.jpg"
const TER_LUNA = "/images/terreno-luna.jpg"
const STUDIO = "/images/estudio.jpg"

export default function Home() {
  return (
    <>
      <Nav />

      {/* HERO — Globe interactivo */}
      <GlobeHero />

      {/* STATS */}
      <div style={{ background: 'var(--dark2)', display: 'grid' as const, gridTemplateColumns: 'repeat(5,1fr)', borderTop: '1px solid rgba(250,249,246,.04)' }}>
        {[
          ['8', 'Sistemas constructivos documentados'],
          ['3,5M', 'Hogares con déficit · Argentina'],
          ['96%', 'Mejor R-value real SIP vs convencional · ORNL'],
          ['USD 1.350', 'Costo m² promedio llave en mano 2026'],
          ['10 pasos', 'Selector con criterio técnico real'],
        ].map(([val, label]) => (
          <div key={val} style={{ padding: '1.3rem var(--pad)', borderRight: '1px solid rgba(250,249,246,.04)' }}>
            <strong style={{ display: 'block' as const, fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1, marginBottom: '.28rem' }}>{val}</strong>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(250,249,246,.22)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* SELECTOR ENTRY */}
      <section style={{ padding: '7rem 0', background: 'var(--dark2)', borderBottom: '1px solid rgba(250,249,246,.04)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>
          <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' as const }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rl)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                <span style={{ width: '16px', height: '1px', background: 'var(--rl)', display: 'block' as const }} />El core del producto
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--white)', marginBottom: '1.5rem' }}>
                ¿Qué sistema<br /><em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>te conviene?</em>
              </h2>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'rgba(250,249,246,.42)', lineHeight: 1.82, marginBottom: '1rem' }}>No existe un sistema perfecto. Sí existe uno más adecuado para cada proyecto. El selector cruza tipo de proyecto, zona, presupuesto, tiempos y prioridades para darte una recomendación argumentada.</p>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'rgba(250,249,246,.42)', lineHeight: 1.82, marginBottom: '2rem' }}>Toma menos de 2 minutos. El resultado es técnico, no publicitario.</p>
              <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: '.65rem', marginBottom: '2rem' }}>
                {['Compara 7 sistemas constructivos', 'Ajusta por zona, clima y sismicidad', 'Entrega ranking con justificación técnica', 'Advierte sobre errores típicos de cada sistema'].map(t => (
                  <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(155,124,90,.6)' }}>✓ {t}</span>
                ))}
              </div>
              <Link href="/selector" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase', background: 'var(--rl)', color: 'var(--white)', padding: '.85rem 1.75rem', display: 'inline-block' as const }}>Empezar diagnóstico →</Link>
            </div>
            <div style={{ background: 'rgba(250,249,246,.02)', border: '1px solid rgba(250,249,246,.05)', padding: '2rem' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.54rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(250,249,246,.25)', marginBottom: '1.5rem' }}>Flujo del selector</div>
              {['Tipo de proyecto', 'Ubicación y zona climática', 'Superficie estimada', 'Prioridad principal', 'Presupuesto orientativo', 'Plazo esperado', 'Complejidad del diseño', 'Modalidad de ejecución', 'Apertura a innovación', 'Resultado + recomendación'].map((step, i) => (
                <div key={step} style={{ display: 'flex' as const, alignItems: 'center' as const, gap: '1rem', padding: '.65rem 0', borderBottom: '1px solid rgba(250,249,246,.04)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.12em', color: 'rgba(155,124,90,.5)', flexShrink: 0 }}>0{i + 1}</span>
                  <span style={{ fontSize: '.82rem', fontWeight: 300, color: 'rgba(250,249,246,.42)' }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SISTEMAS */}
      <section style={{ padding: '7rem 0', background: 'var(--dark)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>
          <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '4rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rl)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                <span style={{ width: '16px', height: '1px', background: 'var(--rl)', display: 'block' as const }} />Sistemas constructivos
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--white)' }}>
                Todos los sistemas.<br /><em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>Con criterio.</em>
              </h2>
            </div>
            <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'rgba(250,249,246,.42)', lineHeight: 1.82 }}>8 sistemas con datos reales, pros y contras honestos, Veredicto MeinHaus. Hacé click en cualquiera para entrar al detalle.</p>
          </div>
          <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(250,249,246,.05)', border: '1px solid rgba(250,249,246,.05)' }}>
            {SISTEMAS.map(s => <SistemaCard key={s.id} s={s} />)}
          </div>
        </div>
      </section>

      {/* SIP FEATURE */}
      <section style={{ padding: '7rem 0', background: 'var(--dark2)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>
          <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' as const }}>
            <div>
              <div style={{ display: 'inline-flex' as const, alignItems: 'center' as const, gap: '.65rem', background: 'rgba(155,124,90,.08)', border: '1px solid rgba(155,124,90,.2)', padding: '.45rem 1rem', marginBottom: '1.75rem' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--rl)' }}>⬡ Nuestra especialidad · Sistema SIP-TAO</span>
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4vw,3.8rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--white)', marginBottom: '1.5rem' }}>
                La diferencia no está<br />en el panel.<br /><em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>En cómo se usa.</em>
              </h2>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'rgba(250,249,246,.42)', lineHeight: 1.82, marginBottom: '1rem' }}>
                Un panel SIP de 6&quot; tiene R-value real <strong style={{ color: 'var(--white)', fontWeight: 400 }}>96% mayor</strong> que una pared 2×6 con aislación convencional R-19. Dato del Oak Ridge National Laboratory.
              </p>
              <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'rgba(250,249,246,.42)', lineHeight: 1.82, marginBottom: '2rem' }}>
                Una estructura SIP tiene solo <strong style={{ color: 'var(--white)', fontWeight: 400 }}>7% de la infiltración de aire</strong> de una convencional. No es el material: es la hermeticidad del sistema.
              </p>
              <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(250,249,246,.04)', border: '1px solid rgba(250,249,246,.04)', marginBottom: '1.75rem' }}>
                {[['18 tn', 'Carga compresión · IRAM 11585'], ['Rt=3', 'Resistencia térmica SIP 90'], ['7%', 'Infiltración vs convencional']].map(([val, label]) => (
                  <div key={val} style={{ background: 'rgba(250,249,246,.02)', padding: '1.4rem 1.2rem', textAlign: 'center' as const }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 300, color: 'var(--rl)', lineHeight: 1, marginBottom: '.3rem' }}>{val}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(250,249,246,.22)', lineHeight: 1.5 }}>{label}</div>
                  </div>
                ))}
              </div>
              <Link href="/sistemas/sip" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase', background: 'var(--rl)', color: 'var(--white)', padding: '.85rem 1.75rem', display: 'inline-block' as const }}>Ver documentación SIP →</Link>
            </div>
            <div style={{ position: 'relative' as const }}>
              <img src={OBRA_J} alt="Obra SIP MeinHaus Patagonia" style={{ width: '100%', height: '520px', objectFit: 'cover' as const, display: 'block' as const }} />
              <div style={{ position: 'absolute' as const, bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(29,29,27,.75))', padding: '1.75rem 1.5rem .85rem' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.13em', textTransform: 'uppercase', color: 'rgba(250,249,246,.5)' }}>Sellado de junta OSB · SIP-TAO · General Roca, Patagonia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPAS TEASER */}
      <section style={{ padding: '7rem 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>
          <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' as const, marginBottom: '4rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rust)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Capas constructivas
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)' }}>
                Más allá<br />del <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>sistema.</em>
              </h2>
            </div>
            <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82 }}>Fachadas, cubiertas, fundaciones, instalaciones e interiores. Las capas que se combinan con el sistema para resolver el edificio completo.</p>
          </div>
          <div style={{ display: 'grid' as const, gridTemplateColumns: 'repeat(5,1fr)', gap: '1px', background: 'rgba(24,23,19,.07)', border: '1px solid rgba(24,23,19,.07)' }}>
            {[
              ['▤', 'Fachadas', 'Revestimientos exteriores, sistemas ventilados, EIFS y siding', '/capas/fachadas'],
              ['△', 'Cubiertas', 'Techos planos, inclinados, panel sándwich y membranas', '/capas/cubiertas'],
              ['▣', 'Fundaciones', 'Platea, pilotines, bases aisladas y anclajes al terreno', '/capas/fundaciones'],
              ['⌁', 'Instalaciones', 'Eléctrica, sanitaria, gas y climatización', '/capas/instalaciones'],
              ['▧', 'Interiores', 'Placas, pisos, cielorrasos y revestimientos', '/capas/interiores'],
            ].map(([icon, name, desc, href]) => (
              <Link key={name} href={href} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg)', padding: '2rem 1.65rem', cursor: 'pointer' as const, height: '100%', borderBottom: '2px solid transparent', transition: 'background .2s, border-color .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bone)'; (e.currentTarget as HTMLDivElement).style.borderBottomColor = 'var(--rust)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)'; (e.currentTarget as HTMLDivElement).style.borderBottomColor = 'transparent' }}
                >
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', color: 'var(--rust)', marginBottom: '1rem', opacity: .6 }}>{icon}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '.5rem' }}>{name}</div>
                  <div style={{ fontSize: '.77rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.65 }}>{desc}</div>
                  <div style={{ marginTop: '1rem', fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--rl)' }}>Explorar →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <div style={{ height: '62vh', position: 'relative' as const, overflow: 'hidden' as const, display: 'flex' as const, alignItems: 'center' as const }}>
        <div style={{ position: 'absolute' as const, inset: 0, backgroundImage: `url(${TER_LUNA})`, backgroundSize: 'cover' as const, backgroundPosition: 'center 40%' }} />
        <div style={{ position: 'absolute' as const, inset: 0, background: 'rgba(29,29,27,.56)' }} />
        <div style={{ position: 'relative' as const, zIndex: 2, padding: '0 var(--pad)', maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
          <blockquote style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3.5vw,3.8rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--white)', maxWidth: '20ch', lineHeight: 1.18 }}>
            "La construcción industrializada no es el futuro. Es el presente que todavía no se adoptó."
          </blockquote>
        </div>
      </div>

      {/* ESTUDIO */}
      <section style={{ padding: 0 }}>
        <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', minHeight: '72vh' }}>
          <div style={{ overflow: 'hidden' as const }}>
            <img src={STUDIO} alt="Estudio MeinHaus" style={{ width: '100%', height: '100%', objectFit: 'cover' as const, display: 'block' as const }} />
          </div>
          <div style={{ background: 'var(--dark2)', display: 'flex' as const, flexDirection: 'column' as const, justifyContent: 'center' as const, padding: '5rem var(--pad)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rl)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--rl)', display: 'block' as const }} />El estudio detrás
            </div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--white)', marginBottom: '1.5rem' }}>
              MeinHaus<br /><em style={{ fontStyle: 'italic', color: 'var(--rl)' }}>Estudio + Taller.</em>
            </h2>
            <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'rgba(250,249,246,.42)', lineHeight: 1.82, marginBottom: '1rem' }}>
              Esta plataforma la construye el mismo estudio que diseña y ejecuta proyectos con sistema SIP en Patagonia.
            </p>
            <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'rgba(250,249,246,.42)', lineHeight: 1.82, marginBottom: '2rem' }}>
              Fundado por Mariano Serdoch, diseñador industrial. General Roca, Río Negro.
            </p>
            <a href="https://estudiomeinhaus.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex' as const, alignItems: 'center' as const, gap: '.65rem', fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--white)', border: '1px solid rgba(250,249,246,.18)', padding: '.75rem 1.65rem' }}>
              Ver proyectos y equipo → estudiomeinhaus.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
