import type { SistemaKey, SelectorFormData, SelectorResult, PriorityKey, RegionKey } from '@/types'

// ─── SCORING MATRIX (from ChatGPT collaboration) ────────────
type ScoreVars = {
  costo_inicial: number
  tiempo_obra: number
  performance_termica: number
  precision_constructiva: number
  mano_obra_requerida: number
  dependencia_climatica: number
  flexibilidad_diseno: number
  mantenimiento: number
  complejidad_logistica: number
  adecuacion_patagonia: number
}

const SCORING_MATRIX: Record<string, ScoreVars> = {
  sip:       { costo_inicial:4, tiempo_obra:5, performance_termica:5, precision_constructiva:5, mano_obra_requerida:3, dependencia_climatica:5, flexibilidad_diseno:4, mantenimiento:5, complejidad_logistica:3, adecuacion_patagonia:5 },
  steel:     { costo_inicial:4, tiempo_obra:4, performance_termica:4, precision_constructiva:4, mano_obra_requerida:3, dependencia_climatica:4, flexibilidad_diseno:4, mantenimiento:4, complejidad_logistica:3, adecuacion_patagonia:4 },
  madera:    { costo_inicial:4, tiempo_obra:4, performance_termica:4, precision_constructiva:3, mano_obra_requerida:3, dependencia_climatica:3, flexibilidad_diseno:4, mantenimiento:3, complejidad_logistica:4, adecuacion_patagonia:4 },
  mamp:      { costo_inicial:3, tiempo_obra:2, performance_termica:2, precision_constructiva:2, mano_obra_requerida:5, dependencia_climatica:1, flexibilidad_diseno:5, mantenimiento:3, complejidad_logistica:4, adecuacion_patagonia:3 },
  container: { costo_inicial:4, tiempo_obra:5, performance_termica:3, precision_constructiva:4, mano_obra_requerida:2, dependencia_climatica:5, flexibilidad_diseno:2, mantenimiento:3, complejidad_logistica:2, adecuacion_patagonia:3 },
  adobe:     { costo_inicial:5, tiempo_obra:2, performance_termica:4, precision_constructiva:2, mano_obra_requerida:3, dependencia_climatica:2, flexibilidad_diseno:3, mantenimiento:2, complejidad_logistica:5, adecuacion_patagonia:3 },
  modular:   { costo_inicial:4, tiempo_obra:5, performance_termica:4, precision_constructiva:5, mano_obra_requerida:2, dependencia_climatica:5, flexibilidad_diseno:2, mantenimiento:4, complejidad_logistica:2, adecuacion_patagonia:3 },
}

// ─── BASE WEIGHTS ─────────────────────────────────────────
const BASE_WEIGHTS: ScoreVars = {
  costo_inicial:3, tiempo_obra:3, performance_termica:3,
  precision_constructiva:3, mano_obra_requerida:2,
  dependencia_climatica:3, flexibilidad_diseno:2,
  mantenimiento:2, complejidad_logistica:2, adecuacion_patagonia:3,
}

// ─── PRIORITY WEIGHTS ────────────────────────────────────
const PRIORITY_WEIGHTS: Partial<Record<PriorityKey, Partial<ScoreVars>>> = {
  tiempo:        { tiempo_obra:5, dependencia_climatica:5, precision_constructiva:4 },
  confort:       { performance_termica:5, adecuacion_patagonia:5, mantenimiento:4 },
  costo:         { costo_inicial:5, complejidad_logistica:4, mano_obra_requerida:4 },
  mantenimiento: { mantenimiento:5, performance_termica:4, precision_constructiva:3 },
  precision:     { precision_constructiva:5, tiempo_obra:4, performance_termica:3 },
  diseno:        { flexibilidad_diseno:5, precision_constructiva:3, tiempo_obra:3 },
  rentabilidad:  { costo_inicial:4, tiempo_obra:5, mantenimiento:4 },
  evaluando:     {},
}

// ─── REGION WEIGHTS ──────────────────────────────────────
const REGION_WEIGHTS: Partial<Record<RegionKey, Partial<ScoreVars>>> = {
  patagonia: { performance_termica:5, dependencia_climatica:5, adecuacion_patagonia:5, complejidad_logistica:4 },
  amba:      { costo_inicial:4, tiempo_obra:4, flexibilidad_diseno:4 },
  cuyo:      { adecuacion_patagonia:3, performance_termica:4, precision_constructiva:4 },
  centro:    { costo_inicial:3, flexibilidad_diseno:3 },
  noa:       { costo_inicial:5, mantenimiento:3 },
  nea:       { costo_inicial:5, mantenimiento:3, flexibilidad_diseno:3 },
  litoral:   { costo_inicial:3, mantenimiento:3 },
}

// ─── PENALTIES ───────────────────────────────────────────
function applyPenalties(sid: string, data: SelectorFormData): number {
  let penalty = 0
  if (data.timeframe === 'urgente' && sid === 'mamp')     penalty += 15
  if (data.complexity === 'complejo' && sid === 'modular') penalty += 10
  if (data.complexity === 'complejo' && sid === 'container') penalty += 8
  if (data.innovation === 'poco' && (sid === 'sip' || sid === 'modular')) penalty += 5
  if (data.execution === 'gremios' && (sid === 'sip' || sid === 'modular')) penalty += 8
  if (data.region === 'patagonia' && sid === 'mamp')      penalty += 12
  if (data.region === 'patagonia' && sid === 'adobe')     penalty += 8
  if (data.region === 'nea' && sid === 'sip')             penalty += 5
  if (data.region === 'cuyo' && sid === 'adobe')          penalty += 10
  return penalty
}

// ─── RESULT CONTENT ──────────────────────────────────────
const REASONS: Partial<Record<string, string[]>> = {
  sip:       ['Mejor performance térmica para clima de la zona', 'Construcción en seco — sin dependencia del clima en obra', 'Alta precisión de ejecución y hermeticidad real'],
  steel:     ['Buen balance entre costo, velocidad y disponibilidad', 'Sin obra húmeda — mayor previsibilidad de plazos', 'Amplia red de instaladores certificados en todo el país'],
  madera:    ['Excelente aislación térmica y acústica', 'Tiempo de obra significativamente menor que mampostería', 'Alta valoración estética y de mercado premium'],
  mamp:      ['Alta disponibilidad de mano de obra local', 'Sin restricciones normativas en ningún municipio', 'Facilidad para modificaciones y ampliaciones futuras'],
  container: ['Máxima velocidad cuando el proyecto lo permite', '100% relocatable si el proyecto lo requiere', 'Fabricación en taller con mínimo impacto en sitio'],
  adobe:     ['Costo de materiales mínimo para el caso', 'Excelente masa térmica para la zona', 'Materiales disponibles localmente'],
  modular:   ['Alta velocidad y precisión de fabricación', 'Control de calidad en planta industrial', 'Proceso escalable si hay más unidades'],
}

const WARNINGS: Partial<Record<string, string[]>> = {
  sip:       ['Requiere proyecto y coordinación técnica previa al montaje', 'No conviene improvisar instalaciones en obra'],
  steel:     ['La aislación depende de la correcta ejecución de las capas', 'Prever solución de puente térmico en encuentros metálicos'],
  madera:    ['Requiere madera seca y tratada — verificar con proveedor', 'Mantenimiento exterior periódico necesario'],
  mamp:      ['Tiempo de obra más largo — exposición inflacionaria mayor', 'Aislación térmica deficiente sin mejoras adicionales'],
  container: ['La aislación térmica debe resolverse cuidadosamente', 'Consultar normativa municipal antes de iniciar'],
  adobe:     ['Requiere mano de obra especializada en bioconstrucción', 'CAT específico puede ser necesario según municipio'],
  modular:   ['Verificar disponibilidad de transporte y montaje en la zona', 'Mercado joven — pocas empresas con track record sólido'],
}

const SUMMARY_REGION: Partial<Record<RegionKey, string>> = {
  patagonia: 'en Patagonia, con temperaturas extremas y viento constante',
  amba: 'en el AMBA, con alta disponibilidad de mano de obra',
  centro: 'en zona centro, con clima templado',
  cuyo: 'en Cuyo, con alta sismicidad y amplitud térmica extrema',
  noa: 'en el NOA',
  nea: 'en el NEA, con clima cálido y húmedo',
  litoral: 'en zona litoral',
}

const SUMMARY_PRIORITY: Partial<Record<PriorityKey, string>> = {
  tiempo: 'velocidad de obra',
  confort: 'confort térmico',
  costo: 'control de costos',
  mantenimiento: 'bajo mantenimiento',
  precision: 'precisión constructiva',
  diseno: 'flexibilidad de diseño',
  rentabilidad: 'rentabilidad de la inversión',
  evaluando: 'criterio general',
}

const SIS_NOMBRES: Record<string, string> = {
  sip: 'Sistema SIP', steel: 'Steel Frame', madera: 'Madera',
  mamp: 'Mampostería', container: 'Container / Módulo',
  adobe: 'Adobe / Tierra', modular: 'Modular industrializado',
}

// ─── MAIN ENGINE ─────────────────────────────────────────
export function buildRecommendation(data: SelectorFormData): SelectorResult {
  const weights = { ...BASE_WEIGHTS }

  // Apply priority weights
  if (data.priority && PRIORITY_WEIGHTS[data.priority as PriorityKey]) {
    Object.entries(PRIORITY_WEIGHTS[data.priority as PriorityKey]!).forEach(([k, v]) => {
      (weights as Record<string, number>)[k] = v
    })
  }

  // Apply region weights (max of existing and region weight)
  if (data.region && REGION_WEIGHTS[data.region as RegionKey]) {
    Object.entries(REGION_WEIGHTS[data.region as RegionKey]!).forEach(([k, v]) => {
      (weights as Record<string, number>)[k] = Math.max((weights as Record<string, number>)[k], v)
    })
  }

  // Score each system
  const scores = Object.keys(SCORING_MATRIX).map(sid => {
    const matrix = SCORING_MATRIX[sid]
    let score = Object.keys(weights).reduce((sum, key) => {
      return sum + (matrix[key as keyof ScoreVars] * (weights as Record<string, number>)[key])
    }, 0)
    score -= applyPenalties(sid, data)
    return { sid, score }
  })

  scores.sort((a, b) => b.score - a.score)

  const recommended = scores[0].sid as SistemaKey
  const alternatives = scores.slice(1, 3).map(s => s.sid as SistemaKey)

  const regionText = SUMMARY_REGION[data.region as RegionKey] ?? ''
  const priorityText = SUMMARY_PRIORITY[data.priority as PriorityKey] ?? 'criterio general'
  const summary = `Para un proyecto ${data.projectType ? `de ${data.projectType}` : ''} ${regionText}, con prioridad en ${priorityText}, ${SIS_NOMBRES[recommended]} aparece como la opción más conveniente según los parámetros ingresados.`

  return {
    recommended,
    alternatives,
    summary,
    reasons: REASONS[recommended] ?? ['Sistema adecuado para las condiciones del proyecto'],
    warnings: WARNINGS[recommended] ?? [],
  }
}
