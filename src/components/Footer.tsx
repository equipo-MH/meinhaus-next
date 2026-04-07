import Link from 'next/link'

const LOGO = "/images/logo.png"

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--dark)',
      borderTop: '1px solid rgba(250,249,246,.04)',
      padding: '2.5rem var(--pad)',
    }}>
      <div style={{
        maxWidth: 'var(--max)', margin: '0 auto',
        display: 'grid' as const,
        gridTemplateColumns: '1fr auto auto',
        alignItems: 'center' as const, gap: '3rem',
      }}>
        <div>
          <img src={LOGO} alt="MeinHaus" style={{ height: '26px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
          <div style={{ display: 'flex' as const, gap: '.4rem', marginTop: '.3rem' }}>
            {['Diseño', '·', 'Construcción', '·', 'Sistemas', '·', 'Patagonia'].map((t, i) => (
              <span key={i} style={{
                fontFamily: 'var(--mono)', fontSize: '.48rem',
                letterSpacing: '.16em', textTransform: 'uppercase' as const,
                color: t === 'Sistemas' ? 'rgba(155,124,90,.45)' : t === '·' ? 'rgba(250,249,246,.08)' : 'rgba(250,249,246,.16)',
              }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex' as const, gap: '1.5rem', flexWrap: 'wrap' as const }}>
          {[
            ['Sistemas', '/sistemas'], ['Capas', '/capas'], ['Regiones', '/regiones'],
            ['Artículos', '/articulos'], ['Normativa', '/normativa'],
            ['Mapa', '/mapa'], ['Selector', '/selector'],
            ['El estudio', 'https://estudiomeinhaus.com'],
          ].map(([label, href]) => (
            <Link key={href} href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              style={{
                fontFamily: 'var(--mono)', fontSize: '.52rem',
                letterSpacing: '.1em', textTransform: 'uppercase' as const,
                color: 'rgba(250,249,246,.22)',
              }}>{label}</Link>
          ))}
        </div>

        <div style={{
          fontFamily: 'var(--mono)', fontSize: '.48rem',
          letterSpacing: '.08em', color: 'rgba(250,249,246,.12)',
        }}>
          © 2026 MeinHaus · General Roca, Río Negro
        </div>
      </div>
    </footer>
  )
}
