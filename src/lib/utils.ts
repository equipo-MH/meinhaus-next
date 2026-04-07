// Costos por sistema y terminación (USD/m²)
export const COSTOS: Record<string, Record<string, number>> = {
  sip:       { gris: 900,  std: 1430, prem: 1700 },
  steel:     { gris: 680,  std: 1155, prem: 1500 },
  madera:    { gris: 800,  std: 1600, prem: 2500 },
  mamp:      { gris: 1000, std: 1455, prem: 1900 },
  container: { gris: 580,  std: 1100, prem: 1400 },
  adobe:     { gris: 350,  std: 750,  prem: 1000 },
  modular:   { gris: 900,  std: 1355, prem: 1700 },
}

// Factor regional
export const ZONA_FACTOR: Record<string, number> = {
  amba: 0, patagonia: 0.09, centro: -0.05,
  noa: -0.12, nea: -0.12, cuyo: -0.03, litoral: -0.02,
}

export const SISTEMA_NOMBRES: Record<string, string> = {
  sip: 'Sistema SIP-TAO', steel: 'Steel Frame', madera: 'Madera',
  mamp: 'Mampostería', container: 'Container / Módulo',
  adobe: 'Adobe / Tierra', modular: 'Modular industrializado', mixto: 'Sistemas mixtos',
}

export const TERM_NOMBRES: Record<string, string> = {
  gris: 'Obra gris', std: 'Estándar · llave en mano', prem: 'Premium',
}

export const ZONA_NOMBRES: Record<string, string> = {
  amba: 'AMBA / Buenos Aires', patagonia: 'Patagonia',
  centro: 'Centro · Córdoba / Rosario', noa: 'NOA / NEA',
  cuyo: 'Cuyo · Mendoza / San Juan', litoral: 'Litoral / La Pampa',
}

export const ZONA_TEMP: Record<string, string> = {
  amba: '+5°C', patagonia: '−15 a −5°C', centro: '+3°C',
  noa: '+12°C', cuyo: '−3°C', nea: '+15°C', litoral: '+2°C',
}

export function formatUSD(n: number): string {
  return n.toLocaleString('es-AR')
}

export function calcularCosto(
  sup: number, sistema: string, term: string, zona: string
): { m2: number; total: number; min: number; max: number } {
  const base = COSTOS[sistema]?.[term] ?? 1200
  const factor = 1 + (ZONA_FACTOR[zona] ?? 0)
  const m2 = Math.round(base * factor)
  const total = Math.round(m2 * sup)
  return { m2, total, min: Math.round(total * 0.87), max: Math.round(total * 1.18) }
}

// Colores por sistema
export const SISTEMA_ACCENT: Record<string, string> = {
  sip: '#9B7C5A', steel: '#4A8A9E', madera: '#7A6B4A',
  mamp: '#8A7A6E', container: '#4A8A7A', adobe: '#9A7A4A',
  modular: '#6A7A9A', mixto: '#8A6A7A',
}

export const CAPA_TIPO_LABEL: Record<string, string> = {
  fachadas: 'Fachadas', cubiertas: 'Cubiertas',
  fundaciones: 'Fundaciones', instalaciones: 'Instalaciones', interiores: 'Interiores',
}
