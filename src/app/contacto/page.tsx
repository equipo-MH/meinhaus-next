'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--sans)', fontSize: '.9rem', fontWeight: 300,
  color: 'var(--ink)', background: 'var(--white)',
  border: '1px solid rgba(24,23,19,.1)', padding: '.7rem .95rem',
  width: '100%', outline: 'none', transition: 'border-color .2s',
}

export default function ContactoPage() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 'var(--nav)', background: 'var(--bone)', minHeight: '100vh' }}>
        <section style={{ padding: '5rem 0 7rem' }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}>

            <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

              {/* Left */}
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rust)', display: 'flex' as const, alignItems: 'center' as const, gap: '.65rem', marginBottom: '1.1rem' }}>
                  <span style={{ width: '16px', height: '1px', background: 'var(--rust)', display: 'block' as const }} />Contacto
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,4.5vw,4.2rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)', marginBottom: '1.4rem' }}>
                  Hablemos del<br /><em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>proyecto.</em>
                </h1>
                <p style={{ fontSize: '.98rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.82, marginBottom: '3rem' }}>
                  Si tenés un proyecto y querés entender si el sistema MeinHaus tiene sentido, escribinos. Sin humo, sin promesas vacías.
                </p>

                {/* Contact links */}
                <div style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: '.9rem' }}>
                  {[
                    { icon: 'W', label: '+54 9 11 6218-1345 — WhatsApp', href: 'https://wa.me/5491162181345' },
                    { icon: '@', label: 'equipo@meinhaus.com.ar', href: 'mailto:equipo@meinhaus.com.ar' },
                    { icon: 'ig', label: '@meinhaus.ar — Instagram', href: 'https://instagram.com/meinhaus.ar' },
                    { icon: '→', label: 'estudiomeinhaus.com — El estudio', href: 'https://estudiomeinhaus.com' },
                  ].map(({ icon, label, href }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex' as const, alignItems: 'center' as const, gap: '.85rem',
                      color: 'var(--ink)', textDecoration: 'none', transition: 'color .2s',
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--rust)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)' }}
                    >
                      <span style={{ width: '32px', height: '32px', border: '1px solid rgba(24,23,19,.1)', display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'center' as const, flexShrink: 0, fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'var(--mid)' }}>{icon}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', letterSpacing: '.04em' }}>{label}</span>
                    </a>
                  ))}
                </div>

                {/* Info blocks */}
                <div style={{ marginTop: '3rem', display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(24,23,19,.08)', border: '1px solid rgba(24,23,19,.08)' }}>
                  {[
                    ['Ubicación', 'General Roca, Río Negro, Patagonia Argentina'],
                    ['Respuesta', 'Menos de 48 hs hábiles'],
                    ['Radio de obra', 'Patagonia Norte y coordinación técnica a distancia'],
                    ['Plataforma', 'meinhaus.com.ar — Sistemas constructivos AR'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ background: 'var(--bg)', padding: '1.25rem' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: '.35rem' }}>{k}</div>
                      <div style={{ fontSize: '.82rem', fontWeight: 300, color: 'var(--mid)', lineHeight: 1.55 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Form */}
              <div>
                {!sent ? (
                  <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: 'flex' as const, flexDirection: 'column' as const, gap: '.8rem' }}>

                    <div>
                      <label style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mid)', display: 'block' as const, marginBottom: '.48rem' }}>Nombre *</label>
                      <input type="text" required placeholder="Tu nombre completo" style={inputStyle} />
                    </div>

                    <div style={{ display: 'grid' as const, gridTemplateColumns: '1fr 1fr', gap: '.8rem' }}>
                      <div>
                        <label style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mid)', display: 'block' as const, marginBottom: '.48rem' }}>Email *</label>
                        <input type="email" required placeholder="tu@email.com" style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mid)', display: 'block' as const, marginBottom: '.48rem' }}>WhatsApp</label>
                        <input type="tel" placeholder="+54 9 11 xxxxxxxx" style={inputStyle} />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mid)', display: 'block' as const, marginBottom: '.48rem' }}>Tipo de consulta</label>
                      <select style={{ ...inputStyle, cursor: 'pointer' as const, appearance: 'none' as const }}>
                        <option>Vivienda nueva — Sistema SIP</option>
                        <option>Ampliación / reforma</option>
                        <option>Proyecto comercial o productivo</option>
                        <option>Consulta técnica sobre sistemas</option>
                        <option>Otro</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mid)', display: 'block' as const, marginBottom: '.48rem' }}>Descripción del proyecto *</label>
                      <textarea required placeholder="Ubicación, superficie estimada, tipo de proyecto, plazo esperado..." style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' as const }} />
                    </div>

                    <button type="submit" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--white)', border: 'none', padding: '.9rem 2rem', cursor: 'pointer' as const, marginTop: '.5rem', transition: 'background .2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--rust)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink)' }}
                    >
                      Enviar consulta →
                    </button>

                    <p style={{ fontFamily: 'var(--mono)', fontSize: '.52rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--light)', lineHeight: 1.6 }}>
                      Respondemos en menos de 48 hs hábiles. No usamos los datos para spam.
                    </p>
                  </form>
                ) : (
                  <div style={{ padding: '3rem 2.25rem', background: 'var(--ink)', textAlign: 'center' as const }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 300, color: 'var(--white)', marginBottom: '.65rem' }}>Recibimos tu consulta.</div>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(250,249,246,.32)', marginBottom: '2rem' }}>Respondemos en menos de 48 hs hábiles</p>
                    <Link href="/selector" style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--rl)', textDecoration: 'none' }}>
                      Mientras tanto → usar el selector
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
