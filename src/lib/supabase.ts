import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Types ────────────────────────────────────────────────

export type Rol =
  | 'instalador_sip'
  | 'instalador_steel'
  | 'constructor'
  | 'arquitecto'
  | 'proyectista'
  | 'proveedor'
  | 'estudio'
  | 'otro'

export const ROL_LABEL: Record<Rol, string> = {
  instalador_sip: 'Instalador SIP',
  instalador_steel: 'Instalador Steel Frame',
  constructor: 'Constructor / Contratista',
  arquitecto: 'Arquitecto',
  proyectista: 'Proyectista técnico',
  proveedor: 'Proveedor de materiales',
  estudio: 'Estudio de arquitectura',
  otro: 'Otro',
}

export const SISTEMAS_TRABAJO = [
  'SIP-TAO', 'Steel Frame', 'Madera', 'Mampostería',
  'Container / Módulo', 'Adobe', 'Modular industrializado',
]

export const PROVINCIAS_AR = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut',
  'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy',
  'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén',
  'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz',
  'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán',
]
