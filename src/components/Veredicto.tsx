import type { Sistema } from '@/types'

export default function Veredicto({ s }: { s: Sistema }) {
  const v = s.veredicto

  const hiColor = (val: string) => {
    if (val.startsWith('Alta') || val.startsWith('Alta') || val === 'Altísima') return '#3D7A55'
    if (val.startsWith('Baja') || val === 'Nula') return 'rgba(232,83,26,.65)'
    return '#B89A2E'
  }

  return (
    <div style={{
      background: 'rgba(155,124,90,.04)',
      border: '1px solid rgba(155,124,90,.15)',
      borderLeft: '3px solid var(--rl)',
      padding: '1.65rem',
      marginTop: '1.5rem',
    }}>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: '.54rem',
        letterSpacing: '.16em', textTransform: 'uppercase',
        color: 'var(--rl)', marginBottom: '1rem',
        display: 'flex' as const, alignItems: 'center' as const, gap: '.6rem',
      }}>
        <span>⬡</span> Veredicto MeinHaus
      </div>

      <div style={{
        display: 'grid' as const, gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px', background: 'rgba(155,124,90,.08)',
        marginBottom: '1.25rem',
      }}>
        {[
          ['Compatibilidad Patagonia', v.patagonia, hiColor(v.patagonia)],
          ['Autoconstrucción', v.autoconstruccion, undefined],
          ['Error típico de compra', v.errorTipico, 'rgba(232,83,26,.65)'],
        ].map(([label, val, color]) => (
          <div key={label as string} style={{
            background: 'rgba(155,124,90,.02)', padding: '1rem',
          }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: '.48rem',
              letterSpacing: '.12em', textTransform: 'uppercase',
              color: 'rgba(155,124,90,.55)', marginBottom: '.38rem',
            }}>{label}</div>
            <div style={{
              fontSize: '.8rem', fontWeight: 300,
              color: (color as string) || 'rgba(250,249,246,.65)',
              lineHeight: 1.5,
            }}>{val}</div>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--serif)', fontSize: '1.05rem',
        fontStyle: 'italic', fontWeight: 300,
        color: 'var(--white)', lineHeight: 1.5,
      }}>{v.recomendacion}</p>
    </div>
  )
}
