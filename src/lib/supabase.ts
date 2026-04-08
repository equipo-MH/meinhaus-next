import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Types ────────────────────────────────────────────────

export type Rol =
  | 'instalador_sip'
  | 'instalador_steel_frame'
  | 'instalador_madera'
  | 'instalador_block_ladrillo'
  | 'instalador_steel_deck'
  | 'albanil'
  | 'armador'
  | 'hormigonero'
  | 'calculista'
  | 'vidriero'
  | 'fabricante_aberturas'
  | 'carpintero_metal'
  | 'electricista'
  | 'plomero'
  | 'gasista'
  | 'instalador_climatizacion'
  | 'instalador_solar'
  | 'yesero'
  | 'pintor'
  | 'colocador_ceramico'
  | 'colocador_pisos'
  | 'impermeabilizador'
  | 'arquitecto'
  | 'proyectista'
  | 'disenador_interiores'
  | 'disenador_industrial'
  | 'fabricante_mobiliario'
  | 'carpintero_muebles'
  | 'agrimensor'
  | 'piloto_drone'
  | 'logistica_larga_distancia'
  | 'flete_corta_distancia'
  | 'banios_quimicos'
  | 'limpieza_obra'
  | 'constructora'
  | 'estudio'
  | 'proveedor'
  | 'otro'

export const ROL_LABEL: Record<Rol, string> = {
  instalador_sip: 'Instalador SIP',
  instalador_steel_frame: 'Instalador Steel Frame',
  instalador_madera: 'Instalador madera',
  instalador_block_ladrillo: 'Constructor block / ladrillo',
  instalador_steel_deck: 'Instalador Steel Deck',
  albanil: 'Albañil',
  armador: 'Armador de hierro',
  hormigonero: 'Hormigonero',
  calculista: 'Calculista estructural',
  vidriero: 'Vidriero',
  fabricante_aberturas: 'Fabricante de aberturas',
  carpintero_metal: 'Carpintero metálico',
  electricista: 'Electricista',
  plomero: 'Plomero / sanitarista',
  gasista: 'Gasista matriculado',
  instalador_climatizacion: 'Instalador de climatización',
  instalador_solar: 'Instalador solar / termosolar',
  yesero: 'Yesero / durlock',
  pintor: 'Pintor',
  colocador_ceramico: 'Colocador cerámico',
  colocador_pisos: 'Colocador de pisos',
  impermeabilizador: 'Impermeabilizador',
  arquitecto: 'Arquitecto',
  proyectista: 'Proyectista técnico',
  disenador_interiores: 'Diseñador de interiores',
  disenador_industrial: 'Diseñador industrial',
  fabricante_mobiliario: 'Fabricante de mobiliario a medida',
  carpintero_muebles: 'Carpintero de muebles',
  agrimensor: 'Agrimensor',
  piloto_drone: 'Piloto de drone',
  logistica_larga_distancia: 'Logística larga distancia',
  flete_corta_distancia: 'Flete corta distancia',
  banios_quimicos: 'Baños químicos',
  limpieza_obra: 'Limpieza de obra',
  constructora: 'Constructora / contratista',
  estudio: 'Estudio de arquitectura',
  proveedor: 'Proveedor de materiales',
  otro: 'Otro',
}

export const ROL_CATEGORIAS: { label: string; roles: Rol[] }[] = [
  {
    label: 'Construcción por sistema',
    roles: ['instalador_sip', 'instalador_steel_frame', 'instalador_madera', 'instalador_block_ladrillo', 'instalador_steel_deck'],
  },
  {
    label: 'Estructura y fundaciones',
    roles: ['albanil', 'armador', 'hormigonero', 'calculista'],
  },
  {
    label: 'Cerramientos y aberturas',
    roles: ['vidriero', 'fabricante_aberturas', 'carpintero_metal'],
  },
  {
    label: 'Instalaciones',
    roles: ['electricista', 'plomero', 'gasista', 'instalador_climatizacion', 'instalador_solar'],
  },
  {
    label: 'Terminaciones',
    roles: ['yesero', 'pintor', 'colocador_ceramico', 'colocador_pisos', 'impermeabilizador'],
  },
  {
    label: 'Diseño y proyecto',
    roles: ['arquitecto', 'proyectista', 'disenador_interiores', 'disenador_industrial'],
  },
  {
    label: 'Mobiliario',
    roles: ['fabricante_mobiliario', 'carpintero_muebles'],
  },
  {
    label: 'Medición y relevamiento',
    roles: ['agrimensor', 'piloto_drone'],
  },
  {
    label: 'Logística y servicios de obra',
    roles: ['logistica_larga_distancia', 'flete_corta_distancia', 'banios_quimicos', 'limpieza_obra'],
  },
  {
    label: 'Organizaciones',
    roles: ['constructora', 'estudio', 'proveedor', 'otro'],
  },
]

export const SISTEMAS_TRABAJO = [
  'SIP-TAO',
  'Steel Frame',
  'Madera',
  'Mampostería',
  'Container / Módulo',
  'Adobe',
  'Modular industrializado',
]

export const PROVINCIAS_AR = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut',
  'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy',
  'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén',
  'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz',
  'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán',
]