// ─────────────────────────────────────────────────────────────
// MODELO DE DATOS: PAÍSES
// Arquitectura: Location → Condition → Strategy → System → Layers → Market
// ─────────────────────────────────────────────────────────────

export type KoppenZone =
  | 'Af' | 'Am' | 'Aw'          // Tropical
  | 'BWh' | 'BWk' | 'BSh' | 'BSk' // Árido
  | 'Csa' | 'Csb' | 'Cfa' | 'Cfb' | 'Cfc' // Templado
  | 'Dfa' | 'Dfb' | 'Dfc' | 'Dfd' // Continental
  | 'ET' | 'EF'                  // Polar

export type NormativeSystem =
  | 'CIRSOC'     // Argentina
  | 'NBR'        // Brasil
  | 'NCh'        // Chile
  | 'NTC'        // México
  | 'CTE'        // España
  | 'Eurocodes'  // Europa
  | 'ASTM_IBC'   // USA
  | 'NZS'        // Nueva Zelanda / Australia
  | 'IS'         // India
  | 'GB'         // China
  | 'LOCAL'      // Normativa local sin estándar internacional claro

export type SistemaKey =
  | 'sip' | 'steel' | 'madera' | 'mamp'
  | 'container' | 'adobe' | 'modular' | 'mixto'
  | 'clt' | 'hormigon' | 'bambu' | 'prefab_hormigon'

export type DataStatus = 'full' | 'partial' | 'scaffold'
// full     → datos completos, verificados, con sistemas y normativa
// partial  → datos climáticos OK, sistemas en proceso
// scaffold → país registrado, pendiente de desarrollo

export interface RegionPais {
  id: string
  nombre: string
  nombreEn: string
  koppenZone: KoppenZone[]
  tempMin: string
  tempMax: string
  humedad: string
  viento: string
  nieve: boolean
  sismicidad: 'muy alta' | 'alta' | 'moderada' | 'baja' | 'muy baja'
  sistemasRecomendados: SistemaKey[]
}

export interface Pais {
  iso: string              // ISO 3166-1 alpha-2
  iso3: string             // ISO 3166-1 alpha-3
  nombre: string           // en español
  nombreEn: string         // en inglés
  continente: string
  lat: number              // centroid para el globe
  lng: number
  zoom: number             // zoom level para el globe al seleccionar
  idioma: string[]
  moneda: string           // código ISO 4217
  koppenPredominante: KoppenZone[]
  normativa: NormativeSystem
  sistemasDominantes: SistemaKey[]
  statusData: DataStatus
  descripcionBreve: string  // 1-2 oraciones para el card
  regiones?: RegionPais[]   // solo en países con data 'full'
  // Datos disponibles cuando statusData !== 'scaffold'
  tempRango?: string
  sismicidad?: string
  desafioConstructivo?: string  // el problema constructivo clave del país
  sistemaReferencia?: string    // el sistema más usado localmente
}

// ─── PAÍSES — 25 PRIORITARIOS ──────────────────────────────

export const PAISES: Pais[] = [

  // ──────────────────────────────────────────────────────────
  // LATAM — DATOS COMPLETOS / PARCIALES
  // ──────────────────────────────────────────────────────────
  {
    iso: 'AR', iso3: 'ARG',
    nombre: 'Argentina', nombreEn: 'Argentina',
    continente: 'América del Sur',
    lat: -38.4, lng: -63.6, zoom: 4,
    idioma: ['es'], moneda: 'ARS',
    koppenPredominante: ['BSk', 'Cfa', 'ET'],
    normativa: 'CIRSOC',
    sistemasDominantes: ['mamp', 'sip', 'steel'],
    statusData: 'full',
    descripcionBreve: 'País de referencia de la plataforma. Alta diversidad climática — desde el calor seco del NOA hasta los −15°C de la Patagonia. Normativa CIRSOC bien estructurada.',
    tempRango: '−15°C a +45°C',
    sismicidad: 'Variable — muy alta en Cuyo y NOA, baja en Patagonia sur',
    desafioConstructivo: 'Eficiencia térmica en climas extremos y alta variabilidad normativa municipal',
    sistemaReferencia: 'Mampostería tradicional (dominante) · SIP (en crecimiento en Patagonia)',
  },
  {
    iso: 'CL', iso3: 'CHL',
    nombre: 'Chile', nombreEn: 'Chile',
    continente: 'América del Sur',
    lat: -35.7, lng: -71.5, zoom: 4,
    idioma: ['es'], moneda: 'CLP',
    koppenPredominante: ['BSk', 'Csb', 'ET', 'Dfb'],
    normativa: 'NCh',
    sistemasDominantes: ['mamp', 'madera', 'steel', 'sip'],
    statusData: 'partial',
    descripcionBreve: 'Una de las zonas sísmicas más activas del mundo. La normativa de madera es de las más desarrolladas de LATAM. SIP con adopción creciente desde la VI Región al sur.',
    tempRango: '−10°C a +40°C',
    sismicidad: 'Muy alta — todo el territorio. Sistema sísmico de referencia mundial.',
    desafioConstructivo: 'Sismorresistencia como variable dominante en cualquier decisión constructiva',
    sistemaReferencia: 'Madera (sur) · Mampostería confinada (centro-norte)',
  },
  {
    iso: 'BR', iso3: 'BRA',
    nombre: 'Brasil', nombreEn: 'Brazil',
    continente: 'América del Sur',
    lat: -14.2, lng: -51.9, zoom: 4,
    idioma: ['pt'], moneda: 'BRL',
    koppenPredominante: ['Af', 'Am', 'Aw', 'Cfa'],
    normativa: 'NBR',
    sistemasDominantes: ['mamp', 'hormigon', 'steel', 'modular'],
    statusData: 'partial',
    descripcionBreve: 'El mayor mercado de construcción de LATAM. Alta diversidad climática entre el Amazonas tropical y el Sur subtropical. La norma NBR está en proceso de incorporar sistemas industrializados.',
    tempRango: '+5°C a +42°C',
    sismicidad: 'Muy baja — país estable sísmicamente',
    desafioConstructivo: 'Calor extremo y humedad en el norte. Déficit habitacional de 8 millones de unidades.',
    sistemaReferencia: 'Mampostería + hormigón (dominante en todo el país)',
  },
  {
    iso: 'UY', iso3: 'URY',
    nombre: 'Uruguay', nombreEn: 'Uruguay',
    continente: 'América del Sur',
    lat: -32.5, lng: -55.8, zoom: 5,
    idioma: ['es'], moneda: 'UYU',
    koppenPredominante: ['Cfa'],
    normativa: 'LOCAL',
    sistemasDominantes: ['mamp', 'steel', 'sip'],
    statusData: 'scaffold',
    descripcionBreve: 'Mercado pequeño pero con alta adopción de sistemas industrializados. Normativa en proceso de actualización para SIP y steel frame.',
    tempRango: '+2°C a +38°C',
    sismicidad: 'Muy baja',
    desafioConstructivo: 'Costo de mano de obra alto, incentivo hacia industrialización',
    sistemaReferencia: 'Mampostería · Steel frame en desarrollo',
  },
  {
    iso: 'PY', iso3: 'PRY',
    nombre: 'Paraguay', nombreEn: 'Paraguay',
    continente: 'América del Sur',
    lat: -23.4, lng: -58.4, zoom: 5,
    idioma: ['es', 'gn'], moneda: 'PYG',
    koppenPredominante: ['Aw', 'Cfa'],
    normativa: 'LOCAL',
    sistemasDominantes: ['mamp', 'madera'],
    statusData: 'scaffold',
    descripcionBreve: 'Clima subtropical con veranos muy calurosos. Alta disponibilidad de madera nativa. Mercado con crecimiento en steel frame.',
    tempRango: '+8°C a +44°C',
    sismicidad: 'Muy baja',
    desafioConstructivo: 'Calor extremo y ventilación como variables críticas de diseño',
    sistemaReferencia: 'Mampostería y madera local',
  },
  {
    iso: 'BO', iso3: 'BOL',
    nombre: 'Bolivia', nombreEn: 'Bolivia',
    continente: 'América del Sur',
    lat: -16.3, lng: -63.6, zoom: 5,
    idioma: ['es'], moneda: 'BOB',
    koppenPredominante: ['BSk', 'ET', 'Aw'],
    normativa: 'LOCAL',
    sistemasDominantes: ['mamp', 'adobe'],
    statusData: 'scaffold',
    descripcionBreve: 'Alta diversidad climática por altitud — del altiplano frío (3500+ msnm) a los llanos tropicales. Adobe tiene fuerte tradición constructiva.',
    tempRango: '−10°C a +40°C (según altitud)',
    sismicidad: 'Moderada',
    desafioConstructivo: 'Altitud extrema + amplitud térmica en Altiplano. Logística compleja.',
    sistemaReferencia: 'Adobe y mampostería en Altiplano · Madera en llanos',
  },
  {
    iso: 'PE', iso3: 'PER',
    nombre: 'Perú', nombreEn: 'Peru',
    continente: 'América del Sur',
    lat: -9.2, lng: -75.0, zoom: 5,
    idioma: ['es'], moneda: 'PEN',
    koppenPredominante: ['BWh', 'Aw', 'ET'],
    normativa: 'LOCAL',
    sistemasDominantes: ['mamp', 'hormigon', 'steel'],
    statusData: 'scaffold',
    descripcionBreve: 'País de alta sismicidad con experiencia en construcción antisísmica. Costa desértica, sierra fría, selva tropical: tres contextos constructivos completamente distintos.',
    tempRango: '−5°C a +35°C (según zona)',
    sismicidad: 'Alta — todo el territorio costero y andino',
    desafioConstructivo: 'Sismorresistencia + diversidad climática extrema',
    sistemaReferencia: 'Mampostería confinada (norma E.070)',
  },
  {
    iso: 'CO', iso3: 'COL',
    nombre: 'Colombia', nombreEn: 'Colombia',
    continente: 'América del Sur',
    lat: 4.6, lng: -74.3, zoom: 5,
    idioma: ['es'], moneda: 'COP',
    koppenPredominante: ['Af', 'Am', 'BSh'],
    normativa: 'LOCAL',
    sistemasDominantes: ['mamp', 'hormigon', 'steel'],
    statusData: 'scaffold',
    descripcionBreve: 'Uno de los mercados de construcción de mayor crecimiento en LATAM. Alta sismicidad en las regiones andinas. Clima tropical dominante.',
    tempRango: '+10°C a +35°C',
    sismicidad: 'Alta en zonas andinas',
    desafioConstructivo: 'Sismicidad + crecimiento urbano acelerado + déficit habitacional',
    sistemaReferencia: 'Mampostería + hormigón armado',
  },
  {
    iso: 'MX', iso3: 'MEX',
    nombre: 'México', nombreEn: 'Mexico',
    continente: 'América del Norte',
    lat: 23.6, lng: -102.5, zoom: 4,
    idioma: ['es'], moneda: 'MXN',
    koppenPredominante: ['BSh', 'BSk', 'Aw', 'Cfa'],
    normativa: 'NTC',
    sistemasDominantes: ['mamp', 'hormigon', 'steel', 'modular'],
    statusData: 'partial',
    descripcionBreve: 'Gran mercado con NTC Ciudad de México como referencia sísmica de clase mundial post 1985. Steel frame y modular con crecimiento en industria y vivienda masiva.',
    tempRango: '−5°C a +45°C',
    sismicidad: 'Muy alta en zona pacífica y centro',
    desafioConstructivo: 'Sismicidad crítica + diversidad climática + escala del mercado',
    sistemaReferencia: 'Mampostería confinada · Hormigón · Steel frame en crecimiento',
  },

  // ──────────────────────────────────────────────────────────
  // EUROPA
  // ──────────────────────────────────────────────────────────
  {
    iso: 'ES', iso3: 'ESP',
    nombre: 'España', nombreEn: 'Spain',
    continente: 'Europa',
    lat: 40.2, lng: -3.7, zoom: 5,
    idioma: ['es', 'ca', 'eu', 'gl'], moneda: 'EUR',
    koppenPredominante: ['Csa', 'Csb', 'BSk', 'Cfb'],
    normativa: 'CTE',
    sistemasDominantes: ['mamp', 'hormigon', 'steel', 'madera'],
    statusData: 'partial',
    descripcionBreve: 'El Código Técnico de la Edificación (CTE) es uno de los más completos de Europa. Alta adopción de CLT y madera en el norte. El SATE (EIFS) es el estándar de rehabilitación energética.',
    tempRango: '−10°C a +45°C',
    sismicidad: 'Moderada en sur y sureste (Granada, Murcia)',
    desafioConstructivo: 'Rehabilitación energética del parque existente. Eficiencia como mandato regulatorio.',
    sistemaReferencia: 'Hormigón + ladrillo (dominante) · CLT y madera estructural en crecimiento',
  },
  {
    iso: 'DE', iso3: 'DEU',
    nombre: 'Alemania', nombreEn: 'Germany',
    continente: 'Europa',
    lat: 51.2, lng: 10.4, zoom: 5,
    idioma: ['de'], moneda: 'EUR',
    koppenPredominante: ['Cfb'],
    normativa: 'Eurocodes',
    sistemasDominantes: ['madera', 'steel', 'sip', 'prefab_hormigon'],
    statusData: 'scaffold',
    descripcionBreve: 'Referencia mundial en construcción en madera y eficiencia energética. Passivhaus nació acá. Prefabricación de madera (Holzbau) con tradición centenaria.',
    tempRango: '−15°C a +35°C',
    sismicidad: 'Baja a moderada (zona del Rin)',
    desafioConstructivo: 'Estándares energéticos Passivhaus. Alta industrialización requerida.',
    sistemaReferencia: 'Holzbau (madera estructural) · Prefabricado hormigón · Masivbau (mampostería)',
  },
  {
    iso: 'FR', iso3: 'FRA',
    nombre: 'Francia', nombreEn: 'France',
    continente: 'Europa',
    lat: 46.2, lng: 2.2, zoom: 5,
    idioma: ['fr'], moneda: 'EUR',
    koppenPredominante: ['Cfb', 'Csa'],
    normativa: 'Eurocodes',
    sistemasDominantes: ['mamp', 'hormigon', 'madera', 'steel'],
    statusData: 'scaffold',
    descripcionBreve: 'Amplio mercado con regulación RE2020 que impone restricciones de carbono. CLT y construcción en madera con fuerte impulso regulatorio reciente.',
    tempRango: '−10°C a +40°C',
    sismicidad: 'Moderada en zonas alpinas y pirenaicas',
    desafioConstructivo: 'Cumplimiento RE2020 + descarbonización del sector',
    sistemaReferencia: 'Hormigón + ladrillo · CLT en crecimiento por regulación',
  },
  {
    iso: 'PT', iso3: 'PRT',
    nombre: 'Portugal', nombreEn: 'Portugal',
    continente: 'Europa',
    lat: 39.4, lng: -8.2, zoom: 5,
    idioma: ['pt'], moneda: 'EUR',
    koppenPredominante: ['Csa', 'Csb'],
    normativa: 'Eurocodes',
    sistemasDominantes: ['mamp', 'hormigon', 'steel'],
    statusData: 'scaffold',
    descripcionBreve: 'Mercado con fuerte crecimiento. Sismicidad significativa en Lisboa y Algarve. Alta tradición en azulejo y mampostería.',
    tempRango: '−2°C a +40°C',
    sismicidad: 'Alta en zona de Lisboa y sur',
    desafioConstructivo: 'Sismicidad + rehabilitación del parque histórico',
    sistemaReferencia: 'Mampostería + hormigón armado',
  },

  // ──────────────────────────────────────────────────────────
  // NORTEAMÉRICA
  // ──────────────────────────────────────────────────────────
  {
    iso: 'US', iso3: 'USA',
    nombre: 'Estados Unidos', nombreEn: 'United States',
    continente: 'América del Norte',
    lat: 37.1, lng: -95.7, zoom: 4,
    idioma: ['en'], moneda: 'USD',
    koppenPredominante: ['Cfa', 'BSk', 'Dfb', 'Csb'],
    normativa: 'ASTM_IBC',
    sistemasDominantes: ['madera', 'steel', 'sip', 'modular'],
    statusData: 'partial',
    descripcionBreve: 'El mercado SIP más desarrollado del mundo. El platform frame de madera es el estándar residencial. ORNL y SIPA son las referencias técnicas globales para sistemas de panel.',
    tempRango: '−30°C a +48°C',
    sismicidad: 'Muy alta en Costa Oeste · Baja en Centro y Este',
    desafioConstructivo: 'Diversidad climática extrema. Tornados, huracanes, terremotos: el país donde más sistemas se han probado.',
    sistemaReferencia: 'Platform frame madera (dominante residencial) · SIP en crecimiento',
  },
  {
    iso: 'CA', iso3: 'CAN',
    nombre: 'Canadá', nombreEn: 'Canada',
    continente: 'América del Norte',
    lat: 56.1, lng: -106.3, zoom: 4,
    idioma: ['en', 'fr'], moneda: 'CAD',
    koppenPredominante: ['Dfb', 'Dfc', 'ET'],
    normativa: 'ASTM_IBC',
    sistemasDominantes: ['madera', 'sip', 'steel', 'modular'],
    statusData: 'scaffold',
    descripcionBreve: 'Clima continental extremo. Vasta disponibilidad de madera. El National Building Code soporta SIP desde los 90s. Alta adopción de plataforma de madera y CLT en zonas de altura.',
    tempRango: '−40°C a +38°C',
    sismicidad: 'Alta en Columbia Británica y Vancouver',
    desafioConstructivo: 'Frío extremo + requisitos energéticos muy exigentes',
    sistemaReferencia: 'Platform frame madera · SIP en zonas frías',
  },

  // ──────────────────────────────────────────────────────────
  // OCEANÍA
  // ──────────────────────────────────────────────────────────
  {
    iso: 'AU', iso3: 'AUS',
    nombre: 'Australia', nombreEn: 'Australia',
    continente: 'Oceanía',
    lat: -25.3, lng: 133.8, zoom: 4,
    idioma: ['en'], moneda: 'AUD',
    koppenPredominante: ['BWh', 'BSh', 'Cfa', 'Cfb'],
    normativa: 'NZS',
    sistemasDominantes: ['madera', 'steel', 'sip'],
    statusData: 'scaffold',
    descripcionBreve: 'Altísima adopción de steel frame liviano y timber frame. NCC (National Construction Code) muy actualizado. Clima mayormente árido excepto costa este.',
    tempRango: '−5°C a +50°C',
    sismicidad: 'Baja en general · Moderada en zonas del oeste',
    desafioConstructivo: 'Calor extremo + riesgo de incendio forestal como variable de diseño',
    sistemaReferencia: 'Light steel frame · Timber frame en costa este',
  },
  {
    iso: 'NZ', iso3: 'NZL',
    nombre: 'Nueva Zelanda', nombreEn: 'New Zealand',
    continente: 'Oceanía',
    lat: -40.9, lng: 174.9, zoom: 5,
    idioma: ['en', 'mi'], moneda: 'NZD',
    koppenPredominante: ['Cfb'],
    normativa: 'NZS',
    sistemasDominantes: ['madera', 'steel', 'sip'],
    statusData: 'scaffold',
    descripcionBreve: 'Uno de los países sísmicamente más activos del planeta. Timber frame es el sistema residencial estándar. NZS 3604 como referencia técnica global.',
    tempRango: '+2°C a +30°C',
    sismicidad: 'Muy alta — todo el territorio',
    desafioConstructivo: 'Sismorresistencia como variable primaria de diseño',
    sistemaReferencia: 'Timber frame (NZS 3604) · Steel frame',
  },

  // ──────────────────────────────────────────────────────────
  // ASIA / ORIENTE MEDIO
  // ──────────────────────────────────────────────────────────
  {
    iso: 'JP', iso3: 'JPN',
    nombre: 'Japón', nombreEn: 'Japan',
    continente: 'Asia',
    lat: 36.2, lng: 138.3, zoom: 5,
    idioma: ['ja'], moneda: 'JPY',
    koppenPredominante: ['Cfa', 'Dfb'],
    normativa: 'LOCAL',
    sistemasDominantes: ['madera', 'steel', 'modular', 'sip'],
    statusData: 'scaffold',
    descripcionBreve: 'Referencia mundial en construcción sismorresistente y prefabricación. La industria de viviendas modulares y prefabricadas más avanzada del planeta.',
    tempRango: '−15°C a +38°C',
    sismicidad: 'Muy alta — todo el archipiélago',
    desafioConstructivo: 'Sismicidad extrema + tifones + densidad urbana',
    sistemaReferencia: 'Madera tradicional (Kigumi) · Modular prefab industrial · Steel',
  },
  {
    iso: 'AE', iso3: 'ARE',
    nombre: 'Emiratos Árabes Unidos', nombreEn: 'United Arab Emirates',
    continente: 'Asia',
    lat: 23.4, lng: 53.8, zoom: 6,
    idioma: ['ar'], moneda: 'AED',
    koppenPredominante: ['BWh'],
    normativa: 'LOCAL',
    sistemasDominantes: ['hormigon', 'steel', 'modular'],
    statusData: 'scaffold',
    descripcionBreve: 'Clima desértico extremo (+50°C en verano). Construcción de alta gama con hormigón y acero. Fuerte adopción de modular para proyectos de infraestructura.',
    tempRango: '+12°C a +50°C',
    sismicidad: 'Baja',
    desafioConstructivo: 'Calor extremo + refrigeración como costo operativo dominante',
    sistemaReferencia: 'Hormigón armado + cortina de vidrio',
  },

  // ──────────────────────────────────────────────────────────
  // ÁFRICA
  // ──────────────────────────────────────────────────────────
  {
    iso: 'ZA', iso3: 'ZAF',
    nombre: 'Sudáfrica', nombreEn: 'South Africa',
    continente: 'África',
    lat: -30.6, lng: 22.9, zoom: 5,
    idioma: ['en', 'af'], moneda: 'ZAR',
    koppenPredominante: ['BSh', 'Csa', 'Cfb'],
    normativa: 'LOCAL',
    sistemasDominantes: ['mamp', 'steel', 'sip'],
    statusData: 'scaffold',
    descripcionBreve: 'Mercado emergente con alta adopción de light steel frame. Norma SANS desarrollada. Contextos climáticos muy variados entre el norte árido y el Cabo templado.',
    tempRango: '+5°C a +40°C',
    sismicidad: 'Baja en general',
    desafioConstructivo: 'Déficit habitacional masivo + costo de materiales',
    sistemaReferencia: 'Mampostería · Light steel frame en crecimiento',
  },

  // ──────────────────────────────────────────────────────────
  // PAÍSES ADICIONALES — SCAFFOLD
  // ──────────────────────────────────────────────────────────
  {
    iso: 'EC', iso3: 'ECU',
    nombre: 'Ecuador', nombreEn: 'Ecuador',
    continente: 'América del Sur',
    lat: -1.8, lng: -78.2, zoom: 6,
    idioma: ['es'], moneda: 'USD',
    koppenPredominante: ['Af', 'Am', 'ET'],
    normativa: 'LOCAL',
    sistemasDominantes: ['mamp', 'hormigon', 'madera'],
    statusData: 'scaffold',
    descripcionBreve: 'Alta sismicidad en los Andes. Diversidad climática extrema entre costa, sierra y Amazonía.',
    tempRango: '−5°C a +35°C',
    sismicidad: 'Alta en zona andina',
    desafioConstructivo: 'Sismicidad + humedad en costa y Amazonía',
    sistemaReferencia: 'Mampostería confinada',
  },
  {
    iso: 'VE', iso3: 'VEN',
    nombre: 'Venezuela', nombreEn: 'Venezuela',
    continente: 'América del Sur',
    lat: 6.4, lng: -66.6, zoom: 5,
    idioma: ['es'], moneda: 'VES',
    koppenPredominante: ['Aw', 'Am'],
    normativa: 'LOCAL',
    sistemasDominantes: ['mamp', 'hormigon'],
    statusData: 'scaffold',
    descripcionBreve: 'Clima tropical con gran variación por altitud. Déficit constructivo significativo.',
    tempRango: '+15°C a +38°C',
    sismicidad: 'Alta en zona occidental y costera',
    desafioConstructivo: 'Sismicidad + contexto económico',
    sistemaReferencia: 'Mampostería + hormigón',
  },
  {
    iso: 'IN', iso3: 'IND',
    nombre: 'India', nombreEn: 'India',
    continente: 'Asia',
    lat: 20.6, lng: 79.1, zoom: 4,
    idioma: ['hi', 'en'], moneda: 'INR',
    koppenPredominante: ['Aw', 'BSh', 'Cfa'],
    normativa: 'IS',
    sistemasDominantes: ['mamp', 'hormigon', 'steel', 'modular'],
    statusData: 'scaffold',
    descripcionBreve: 'El mayor déficit habitacional del mundo. Modular y prefabricado con fuerte impulso gubernamental. Clima monzónico dominante.',
    tempRango: '0°C a +48°C',
    sismicidad: 'Alta en norte y noreste (Himalaya)',
    desafioConstructivo: 'Escala del déficit habitacional + clima extremo + sismicidad',
    sistemaReferencia: 'Mampostería + hormigón armado · Prefabricado en crecimiento masivo',
  },
]

// ─── HELPERS ────────────────────────────────────────────────

export const getPais = (iso: string): Pais | null =>
  PAISES.find(p => p.iso.toLowerCase() === iso.toLowerCase()) ?? null

export const getPaisesPorContinente = (continente: string): Pais[] =>
  PAISES.filter(p => p.continente === continente)

export const getPaisesConData = (): Pais[] =>
  PAISES.filter(p => p.statusData === 'full' || p.statusData === 'partial')

export const CONTINENTES = [...new Set(PAISES.map(p => p.continente))].sort()

export const STATUS_LABEL: Record<DataStatus, string> = {
  full: 'Completo',
  partial: 'En desarrollo',
  scaffold: 'Próximamente',
}
export const STATUS_COLOR: Record<DataStatus, string> = {
  full: '#3D7A55',
  partial: '#B89A2E',
  scaffold: 'rgba(24,23,19,.25)',
}
