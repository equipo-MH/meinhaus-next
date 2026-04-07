// ─── SISTEMAS ───────────────────────────────────────────────
export type SistemaKey =
  | 'sip' | 'steel' | 'madera' | 'mamp'
  | 'container' | 'adobe' | 'modular' | 'mixto'

export interface Sistema {
  id: SistemaKey
  idx: number
  slug: string
  badge: string
  name: string
  desc: string
  costo: string
  tiempo: string
  aislacion: string
  humeda: string
  pros: string[]
  cons: string[]
  specs: [string, string][]
  callout: { type: 'ok'|'warn'|'crit'|'info'; ico: string; title: string; body: string }
  certTags: string[]
  veredicto: {
    patagonia: string
    autoconstruccion: string
    errorTipico: string
    recomendacion: string
  }
}

// ─── CAPAS ──────────────────────────────────────────────────
export type CapaTipo = 'fachadas' | 'cubiertas' | 'fundaciones' | 'interiores' | 'instalaciones'

export interface CapaItem {
  id: string
  nombre: string
  tipo: CapaTipo
  descripcion: string
  cuandoUsar: string[]
  limitaciones: string[]
  costoRelativo: 1|2|3|4  // $ a $$$$
  climasRecomendados: string[]
  sistemasCompatibles: SistemaKey[]
  specs: [string, string][]
  ejemplosMercadoAR: string[]
}

// ─── REGIONES ───────────────────────────────────────────────
export type RegionKey =
  | 'patagonia' | 'amba' | 'centro' | 'cuyo'
  | 'noa' | 'nea' | 'litoral'

export interface Region {
  id: RegionKey
  slug: string
  nombre: string
  descripcion: string
  tempMin: string
  tempMax: string
  amplitudTermica: string
  humedad: string
  viento: string
  nieve: boolean
  sismicidad: string
  logistica: string
  costoConstruccion: string
  sistemasRecomendados: SistemaKey[]
  sistemasLimitados: SistemaKey[]
  estrategiasClaves: string[]
  advertencias: string[]
  notas: string
}

// ─── ARTÍCULOS ──────────────────────────────────────────────
export type ArticuloCategoria = 'sip' | 'gen' | 'norm' | 'tecnica' | 'criterio'

export interface Articulo {
  id: string
  slug: string
  categoria: ArticuloCategoria
  categoriaLabel: string
  fecha: string
  featured: boolean
  titulo: string
  extracto: string
  contenido: string
  tags: string[]
}

// ─── PROVINCIAS ─────────────────────────────────────────────
export interface Provincia {
  id: string
  nombre: string
  region: string
  sip: string
  steel: string
  madera: string
  container: string
  sismo: string
  temp: string
  detalle: {
    colegio: string
    cirsoc: string
    sipCat: string
    notas: string
  }
}

// ─── SELECTOR ───────────────────────────────────────────────
export type PriorityKey =
  | 'tiempo' | 'confort' | 'costo' | 'mantenimiento'
  | 'precision' | 'diseno' | 'rentabilidad' | 'evaluando'

export interface SelectorFormData {
  projectType: string
  region: RegionKey | ''
  surface: number | null
  priority: PriorityKey | ''
  timeframe: string
  complexity: string
  execution: string
  innovation: string
}

export interface SelectorResult {
  recommended: SistemaKey
  alternatives: SistemaKey[]
  summary: string
  reasons: string[]
  warnings: string[]
}

// ─── MAPA ────────────────────────────────────────────────────
export interface PuntoMapa {
  lat: number
  lng: number
  nombre: string
  temp: string
  sismo: string
  costo: string
  sip: string
  mh?: boolean
}
