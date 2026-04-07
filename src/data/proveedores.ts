// ─────────────────────────────────────────────────────────────
// PROVEEDORES DE ARGENTINA — BASE DE DATOS
// Arquitectura: Sistema → Componente → Proveedor → Producto
// Pensado para el futuro "carrito de presupuesto" de MeinHaus
// ─────────────────────────────────────────────────────────────

export type SistemaKey =
  | 'sip' | 'steel' | 'madera' | 'mamp'
  | 'container' | 'adobe' | 'modular' | 'mixto'

export type CapaKey =
  | 'estructura' | 'aislacion' | 'cerramiento_ext' | 'cerramiento_int'
  | 'cubierta' | 'fundacion' | 'instalacion_elec' | 'instalacion_san'
  | 'revestimiento_ext' | 'revestimiento_int' | 'carpinteria'
  | 'fijaciones' | 'sellado' | 'pisos'

export type CoberturaNacional =
  | 'nacional'    // distribución a todo el país
  | 'patagonia'   // foco en Patagonia
  | 'amba'        // GBA y Capital
  | 'regional'    // zona específica

export interface Proveedor {
  id: string
  nombre: string
  tipo: 'fabricante' | 'distribuidor' | 'representante' | 'tao_point'
  web?: string
  whatsapp?: string
  email?: string
  telefono?: string
  direccion?: string
  ciudad?: string
  provincia?: string
  cobertura: CoberturaNacional
  notas?: string
}

export interface ProductoMarca {
  id: string
  nombre: string                    // nombre comercial del producto
  marca: string
  proveedor_id: string              // ref a Proveedor
  sistema: SistemaKey[]             // en qué sistemas se usa
  capa: CapaKey                     // qué capa del edificio resuelve
  descripcion: string
  especificaciones?: Record<string, string>
  modelos?: string[]                // modelos/variantes disponibles
  zona_clima?: string[]             // para qué zonas climáticas es apropiado
  precio_referencia?: string        // orientativo, desactualizable
  unidad?: string                   // m², ml, unidad, kg, etc.
  notas_tecnicas?: string
}

// ─── PROVEEDORES ────────────────────────────────────────────

export const PROVEEDORES: Proveedor[] = [

  // ── SIP-TAO ──────────────────────────────────────────────
  {
    id: 'tao_central',
    nombre: 'TAO Soluciones Constructivas — Casa Central',
    tipo: 'fabricante',
    web: 'https://taopaneles.com',
    whatsapp: '+5491128888955',
    email: 'ventas@taopaneles.com',
    telefono: '+54 9 11 2888-8955',
    direccion: 'Conquistadores del Desierto 3926',
    ciudad: 'Neuquén Capital',
    provincia: 'Neuquén',
    cobertura: 'nacional',
    notas: 'Fábrica central y casa matriz. Distribución a todo el país. Partner oficial Fischer. Certificaciones: CAT N°3648, CAS INPRES, ISO 9001:2015, IRAM, SIPA, APA.',
  },
  {
    id: 'tao_mdq',
    nombre: 'TAO Fábrica Mar del Plata',
    tipo: 'fabricante',
    web: 'https://taopaneles.com',
    telefono: '223-563-5124',
    direccion: 'Av. J.D. Perón y Magallanes',
    ciudad: 'Mar del Plata',
    provincia: 'Buenos Aires',
    cobertura: 'regional',
    notas: 'Segunda fábrica TAO. Distribución zona centro-sur de Buenos Aires.',
  },
  {
    id: 'tao_point_general_roca',
    nombre: 'TAO Point — General Roca',
    tipo: 'tao_point',
    web: 'https://taopaneles.com/tao-points',
    ciudad: 'General Roca',
    provincia: 'Río Negro',
    cobertura: 'patagonia',
    notas: 'MeinHaus opera como referencia de este TAO Point. Patagonia Norte.',
  },
  {
    id: 'tao_point_neuquen_norte',
    nombre: 'TAO Point — Las Ovejas (Neuquén)',
    tipo: 'tao_point',
    web: 'https://taopaneles.com/tao-points',
    telefono: '2972-401433',
    ciudad: 'Las Ovejas',
    provincia: 'Neuquén',
    cobertura: 'patagonia',
    notas: 'Representantes: Ing. Nicolás Elzegbe Crespo. Ruta 40, KM 2231.',
  },
  {
    id: 'tao_point_jujuy',
    nombre: 'TAO Point — San Salvador de Jujuy',
    tipo: 'tao_point',
    web: 'https://taopaneles.com/tao-points',
    telefono: '388-5196247',
    ciudad: 'San Salvador de Jujuy',
    provincia: 'Jujuy',
    cobertura: 'regional',
    notas: 'Representante: Arq. Carlos Gerbino. Coronel Dávila 559.',
  },
  {
    id: 'tao_point_bariloche',
    nombre: 'TAO Point — Bariloche',
    tipo: 'tao_point',
    web: 'https://taopaneles.com/tao-points',
    telefono: '294-4808530',
    ciudad: 'San Carlos de Bariloche',
    provincia: 'Río Negro',
    cobertura: 'patagonia',
    notas: 'Adolfo Gustavino. Av. Cerro de la Ventana 9246, Bº Villa Lago Gutiérrez.',
  },
  {
    id: 'tao_point_bahia_blanca',
    nombre: 'TAO Point — Bahía Blanca',
    tipo: 'tao_point',
    web: 'https://taopaneles.com/tao-points',
    telefono: '292-6477966',
    ciudad: 'Bahía Blanca',
    provincia: 'Buenos Aires',
    cobertura: 'regional',
    notas: 'Arq. Pablo Antelme. Colectora Dr. Raúl R. Alfonsín 1239.',
  },
  {
    id: 'tao_point_la_pampa',
    nombre: 'TAO Point — La Pampa',
    tipo: 'tao_point',
    web: 'https://taopaneles.com/tao-points',
    telefono: '295-422-1111',
    ciudad: 'Toay',
    provincia: 'La Pampa',
    cobertura: 'regional',
    notas: 'Arq. Nahuel Otero. Siete Colores Nº12, Toay.',
  },
  {
    id: 'tao_point_comodoro',
    nombre: 'TAO Point — Comodoro Rivadavia',
    tipo: 'tao_point',
    web: 'https://taopaneles.com/tao-points',
    telefono: '280-5069244',
    ciudad: 'Comodoro Rivadavia',
    provincia: 'Chubut',
    cobertura: 'patagonia',
    notas: 'Gastón Silvestre Acevedo Díaz. Estivaris 44, piso 5.',
  },
  {
    id: 'tao_point_santiago_del_estero',
    nombre: 'TAO Point — Santiago del Estero',
    tipo: 'tao_point',
    web: 'https://taopaneles.com/tao-points',
    telefono: '385-5867306',
    ciudad: 'Santiago del Estero',
    provincia: 'Santiago del Estero',
    cobertura: 'regional',
    notas: 'Carlos Bugeau. Av. Belgrano Prolongación s/n.',
  },

  // ── STEEL FRAME — PERFILES ───────────────────────────────
  {
    id: 'ternium',
    nombre: 'Ternium Argentina',
    tipo: 'fabricante',
    web: 'https://ar.ternium.com',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante de acero galvanizado G90 base para perfiles Steel Frame. Materia prima de referencia del sistema. Red de distribuidores a nivel nacional.',
  },
  {
    id: 'ad_barbieri',
    nombre: 'AD Barbieri — Perfiles Steel Frame',
    tipo: 'fabricante',
    web: 'https://www.adbarbieri.com',
    ciudad: 'Parque Industrial',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante de perfiles Steel Frame certificados bajo IRAM-IAS U 500-205. Perfiles PGC (C), PGU (U), L, galera y fijaciones. Distribución en todo el país.',
  },
  {
    id: 'insuma_sur',
    nombre: 'Insuma Sur',
    tipo: 'fabricante',
    web: 'https://insumasur.com',
    ciudad: 'Burzaco',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante de perfiles Steel Frame, chapas para techos, aislantes Isover, membranas hidrófugas. Venta online y distribución nacional.',
  },

  // ── PLACAS ───────────────────────────────────────────────
  {
    id: 'durlock',
    nombre: 'Durlock S.A.',
    tipo: 'fabricante',
    web: 'https://durlock.com',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante líder de placas de yeso y cemento para construcción en seco. Perfiles drywall y steel frame. Red de distribuidores oficiales en todo el país.',
  },
  {
    id: 'knauf',
    nombre: 'Knauf Argentina',
    tipo: 'fabricante',
    web: 'https://knauf.com/es-AR',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante alemán de placas de yeso, perfiles, masillas y sistemas de construcción en seco. Competencia directa de Durlock. Fuerte presencia en Argentina.',
  },

  // ── AISLANTES ────────────────────────────────────────────
  {
    id: 'isover',
    nombre: 'Isover Argentina (Saint-Gobain)',
    tipo: 'fabricante',
    web: 'https://www.isover.com.ar',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante mundial de lanas de vidrio y minerales para aislación. Líneas: Fieltro Liviano, Rolac Plata, Acustiver, Isover Tech. Distribuido por Insuma Sur, Axima, Permat y otros.',
  },

  // ── MEMBRANAS ────────────────────────────────────────────
  {
    id: 'megaflex',
    nombre: 'Megaflex',
    tipo: 'fabricante',
    web: 'https://www.megaflex.ar',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante líder de membranas asfálticas impermeabilizantes. Garantía 10 años en productos premium. Distribución nacional.',
  },
  {
    id: 'ormiflex',
    nombre: 'Ormiflex',
    tipo: 'fabricante',
    web: 'https://ormiflex.com.ar',
    ciudad: 'San Andrés',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante de membranas asfálticas desde 1953. Línea de aislantes acústicos. Barrera Acústica con licencia europea. Distribuye a nivel nacional.',
  },

  // ── HORMIGÓN / CEMENTO ───────────────────────────────────
  {
    id: 'loma_negra',
    nombre: 'Loma Negra',
    tipo: 'fabricante',
    web: 'https://www.lomanegra.com',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante líder de cemento en Argentina. Hormigón elaborado H-17 a H-80. Plantas en Buenos Aires y Rosario. Cemento CPN 40 y CPF para fundaciones.',
  },
  {
    id: 'holcim',
    nombre: 'Holcim Argentina',
    tipo: 'fabricante',
    web: 'https://www.holcim.com.ar',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Segundo fabricante de cemento en Argentina. Hormigón elaborado, agregados, revoques Tector. Fuerte presencia en Patagonia y NOA.',
  },
  {
    id: 'sika',
    nombre: 'Sika Argentina',
    tipo: 'fabricante',
    web: 'https://arg.sika.com',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante suizo de químicos para construcción. Aditivos, membranas TPO/PVC, anclajes químicos, adhesivos, reparación de hormigón. Presente en toda Argentina.',
  },

  // ── REVESTIMIENTOS EXTERIORES ────────────────────────────
  {
    id: 'cedral',
    nombre: 'Cedral / Eternit Argentina',
    tipo: 'fabricante',
    web: 'https://durlock.com/productos/tabla-siding-cedral/',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Siding de fibrocemento Cedral. Distribuido por Durlock en Argentina. Aspecto visual de madera, fabricado en cemento. Resistente a humedad e insectos.',
  },
  {
    id: 'weber',
    nombre: 'Weber Argentina (Saint-Gobain)',
    tipo: 'fabricante',
    web: 'https://www.saint-gobain.com/ar',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante de sistemas EIFS/SATE, morteros, adhesivos, revoques. Weber Therm para aislación exterior. Referencia en fachadas ventiladas livianas.',
  },

  // ── ACERO GENERAL ────────────────────────────────────────
  {
    id: 'acindar',
    nombre: 'Acindar (ArcelorMittal)',
    tipo: 'fabricante',
    web: 'https://www.acindar.com.ar',
    ciudad: 'Villa Constitución',
    provincia: 'Santa Fe',
    cobertura: 'nacional',
    notas: 'Fabricante de acero largo para construcción. Mallas electrosoldadas, barras, perfiles. Referencia para armadura de fundaciones y estructuras mixtas.',
  },

  // ── FIJACIONES Y ANCLAJES ────────────────────────────────
  {
    id: 'fischer',
    nombre: 'Fischer Argentina',
    tipo: 'representante',
    web: 'https://www.fischer.com.ar',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Partner oficial TAO. Anclajes mecánicos y químicos para SIP, steel frame y mampostería. Los anclajes FPX y FIS para SIP están especificados en el manual TAO.',
  },

  // ── MADERA ───────────────────────────────────────────────
  {
    id: 'madersul',
    nombre: 'Madersul / Todo Madera',
    tipo: 'distribuidor',
    web: 'https://maderamen.com.ar',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Distribuidor de productos para madera estructural. Referencia para madera laminada, pino, eucaliptus. También distribuye productos TAO.',
  },

  // ── INSTALACIONES ────────────────────────────────────────
  {
    id: 'tigre',
    nombre: 'Tigre Argentina',
    tipo: 'fabricante',
    web: 'https://www.tigre.com.ar',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante de caños PPR para agua fría/caliente, PVC para desagüe cloacal. Referencia para instalaciones sanitarias en todos los sistemas.',
  },
  {
    id: 'pipelife',
    nombre: 'Pipelife Argentina',
    tipo: 'fabricante',
    web: 'https://www.pipelife.com.ar',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cobertura: 'nacional',
    notas: 'Fabricante de caños PVC semipesado para instalaciones eléctricas. Referencia para canalización en SIP y Steel Frame.',
  },

  // ── DISTRIBUIDORES REGIONALES ────────────────────────────
  {
    id: 'axima',
    nombre: 'Axima Materiales',
    tipo: 'distribuidor',
    web: 'https://axima.com.ar',
    cobertura: 'amba',
    notas: 'Distribuidor de Isover, Aislatech y membranas. Buenos Aires y zona AMBA.',
  },
  {
    id: 'permat',
    nombre: 'Permat',
    tipo: 'distribuidor',
    web: 'https://www.permat.com.ar',
    cobertura: 'amba',
    notas: 'Distribuidor de Knauf, Isover y construcción en seco en general. AMBA.',
  },
  {
    id: 'secored',
    nombre: 'Secored',
    tipo: 'distribuidor',
    web: 'https://secored.com.ar',
    cobertura: 'amba',
    notas: 'Distribución especializada en aislantes Isover para construcción en seco.',
  },
]

// ─── COMPONENTES POR SISTEMA ────────────────────────────────

export const COMPONENTES_SISTEMA: Record<SistemaKey, ComponenteSistema[]> = {

  // ──────────────────────────────────────────────────────────
  sip: [
    {
      capa: 'estructura',
      nombre: 'Panel SIP-TAO (muro)',
      descripcion: 'Panel estructural OSB + EPS + OSB. El elemento central del sistema. Llega con estructura, aislación y cerramiento integrados.',
      marca_referencia: 'TAO Soluciones Constructivas',
      proveedores: ['tao_central', 'tao_mdq', 'tao_point_general_roca', 'tao_point_neuquen_norte', 'tao_point_bariloche', 'tao_point_comodoro', 'tao_point_bahia_blanca', 'tao_point_la_pampa', 'tao_point_jujuy', 'tao_point_santiago_del_estero'],
      modelos: ['SIP 70 (92mm · Rt=2)', 'SIP 90 (112mm · Rt=3)'],
      unidad: 'm²',
      obligatorio: true,
      notas: 'El panel es el núcleo del kit SIP-TAO. Se fabrica a medida según proyecto.',
    },
    {
      capa: 'cubierta',
      nombre: 'Panel YANE-TAO (techo/entrepiso)',
      descripcion: 'Panel de cubierta y entrepiso TAO. Dos tableros (OSB, cemento o yeso) con núcleo EPS. Específico para techos y entrepisos.',
      marca_referencia: 'TAO Soluciones Constructivas',
      proveedores: ['tao_central', 'tao_mdq'],
      modelos: ['YANE 50mm', 'YANE 70mm', 'YANE 90mm'],
      unidad: 'm²',
      obligatorio: true,
      notas: 'Reemplaza la estructura de techo convencional. Llega cortado y numerado.',
    },
    {
      capa: 'cerramiento_int',
      nombre: 'Panel INTERIA-TAO (interior)',
      descripcion: 'Placa de yeso más EPS para revestimiento interior. Mejora aislación térmica y acústica de muros sin valor estructural.',
      marca_referencia: 'TAO Soluciones Constructivas',
      proveedores: ['tao_central', 'tao_mdq'],
      modelos: ['INTERIA 25mm', 'INTERIA 40mm', 'INTERIA 50mm'],
      unidad: 'm²',
      obligatorio: false,
    },
    {
      capa: 'fijaciones',
      nombre: 'Anclajes Fischer para SIP',
      descripcion: 'Sistema de anclaje mecánico y químico específico para paneles SIP. Partner oficial TAO-Fischer.',
      marca_referencia: 'Fischer Argentina',
      proveedores: ['fischer'],
      modelos: ['FPX (mecánico OSB)', 'FIS V (químico estructural)', 'FBN (anclaje platea)'],
      unidad: 'unidad',
      obligatorio: true,
      notas: 'Especificados en el manual TAO. No reemplazar por anclajes genéricos.',
    },
    {
      capa: 'sellado',
      nombre: 'Cinta selladora de juntas OSB',
      descripcion: 'Cinta de butilo o acrílica para sellado hermético de juntas entre paneles. Crítica para la hermeticidad del sistema.',
      marca_referencia: 'Sika / Fischer',
      proveedores: ['sika', 'fischer'],
      modelos: ['Sikaflex 11FC', 'Sika Boom N'],
      unidad: 'ml',
      obligatorio: true,
      notas: 'La hermeticidad del SIP depende en parte del sellado correcto de juntas. No improvisar con productos no compatibles.',
    },
    {
      capa: 'cerramiento_int',
      nombre: 'Placa de yeso interior',
      descripcion: 'Emplacado interior de yeso-cartón sobre panel SIP. Terminación, aislación acústica adicional y protección al fuego.',
      marca_referencia: 'Durlock / Knauf',
      proveedores: ['durlock', 'knauf'],
      modelos: ['Placa STD 12.5mm', 'Placa RH (antihumedad) 12.5mm', 'Placa RF (ignífuga) 12.5mm'],
      unidad: 'm²',
      obligatorio: true,
    },
    {
      capa: 'instalacion_elec',
      nombre: 'Caños semipesados PVC (canalización SIP)',
      descripcion: 'Caños PVC ø20 y ø25mm para instalación eléctrica vertical dentro del panel. Regla crítica: SOLO instalaciones verticales en SIP.',
      marca_referencia: 'Pipelife / Awaduct',
      proveedores: ['pipelife'],
      modelos: ['Caño PVC SP ø20mm', 'Caño PVC SP ø25mm'],
      unidad: 'ml',
      obligatorio: true,
      notas: 'Las canalizaciones horizontales van en cámara técnica sobre solera. Nunca cortar el panel horizontalmente.',
    },
    {
      capa: 'fundacion',
      nombre: 'Platea de hormigón armado',
      descripcion: 'Fundación estándar para SIP. H-17 mínimo, H-25 recomendado en Patagonia. Con EPS bajo polietileno para aislación.',
      marca_referencia: 'Loma Negra / Holcim',
      proveedores: ['loma_negra', 'holcim', 'acindar'],
      modelos: ['Hormigón H-17', 'Hormigón H-25', 'Malla sima ø5 15×15'],
      unidad: 'm³',
      obligatorio: true,
    },
  ],

  // ──────────────────────────────────────────────────────────
  steel: [
    {
      capa: 'estructura',
      nombre: 'Perfiles Steel Frame PGC (montante C)',
      descripcion: 'Perfil de acero galvanizado G90 tipo "C". Elemento estructural principal. Usado como montante de paneles, viga, puntal y atiesador.',
      marca_referencia: 'AD Barbieri / Insuma Sur',
      proveedores: ['ad_barbieri', 'insuma_sur'],
      modelos: ['PGC 70mm × 0.9mm', 'PGC 90mm × 0.9mm', 'PGC 100mm × 1.2mm', 'PGC 140mm × 1.2mm'],
      unidad: 'ml',
      obligatorio: true,
      notas: 'Normativa: CIRSOC 303 · IRAM-IAS U 500-205. El espesor depende del cálculo estructural.',
    },
    {
      capa: 'estructura',
      nombre: 'Perfiles Steel Frame PGU (guía/solera U)',
      descripcion: 'Perfil "U" para vinculación estructural. Solera superior e inferior de paneles.',
      marca_referencia: 'AD Barbieri / Insuma Sur',
      proveedores: ['ad_barbieri', 'insuma_sur'],
      modelos: ['PGU 70mm', 'PGU 90mm', 'PGU 100mm', 'PGU 140mm'],
      unidad: 'ml',
      obligatorio: true,
    },
    {
      capa: 'estructura',
      nombre: 'Cinta plana (fleje de acero galvanizado)',
      descripcion: 'Fleje galvanizado para estabilización de paneles y arriostrado diagonal.',
      marca_referencia: 'AD Barbieri / Ternium',
      proveedores: ['ad_barbieri', 'ternium'],
      modelos: ['Fleje 32mm × 0.9mm'],
      unidad: 'ml',
      obligatorio: true,
    },
    {
      capa: 'cerramiento_ext',
      nombre: 'OSB 11mm (tablero exterior)',
      descripcion: 'Tablero de madera orientada para cerramiento exterior y rigidización del panel. Primera capa exterior del muro steel frame.',
      marca_referencia: 'Insuma Sur / varios',
      proveedores: ['insuma_sur'],
      modelos: ['OSB 11mm · 1220×2440mm'],
      unidad: 'm²',
      obligatorio: true,
    },
    {
      capa: 'aislacion',
      nombre: 'Lana de vidrio Isover (entre montantes)',
      descripcion: 'Fieltro de lana de vidrio hidrorepelente para relleno entre montantes. Aislación térmica y acústica del muro steel frame.',
      marca_referencia: 'Isover Argentina',
      proveedores: ['isover', 'insuma_sur', 'axima'],
      modelos: ['Fieltro Liviano 50mm (e=50, ancho=40cm)', 'Fieltro Liviano 80mm', 'Rolac Plata Muro 50mm (c/aluminio)'],
      unidad: 'm²',
      obligatorio: true,
      notas: 'El ancho 40cm coincide con la modulación estándar de montantes. Rolac Plata incorpora barrera de vapor.',
    },
    {
      capa: 'cerramiento_ext',
      nombre: 'Membrana hidrófuga (barrera de viento/agua)',
      descripcion: 'Membrana transpirable al vapor pero impermeable al agua. Va entre OSB y el revestimiento exterior.',
      marca_referencia: 'Insuma Sur / Sika',
      proveedores: ['insuma_sur', 'sika'],
      modelos: ['Manta Hidrófuga Insuma Sur', 'Sikagard Wrap', 'DuPont Tyvek'],
      unidad: 'm²',
      obligatorio: true,
      notas: 'Crítica para evitar condensación intersticial en climas húmedos y patagónicos.',
    },
    {
      capa: 'cerramiento_ext',
      nombre: 'Placa cementicia exterior (Superboard)',
      descripcion: 'Placa de cemento para cerramiento exterior del panel steel frame. Resistente a humedad e impactos. Base para terminaciones exteriores.',
      marca_referencia: 'Durlock (Superboard)',
      proveedores: ['durlock'],
      modelos: ['Superboard Estructural 10mm (diafragma)', 'Superboard Paredes Exteriores 8mm', 'Tabla Siding Cedral'],
      unidad: 'm²',
      obligatorio: false,
      notas: 'La Superboard Estructural es la única placa cementicia certificada como diafragma de rigidización para steel frame.',
    },
    {
      capa: 'cerramiento_int',
      nombre: 'Placa de yeso interior (Durlock/Knauf)',
      descripcion: 'Cerramiento interior del panel. Terminación, protección al fuego y aislación acústica adicional.',
      marca_referencia: 'Durlock / Knauf',
      proveedores: ['durlock', 'knauf'],
      modelos: ['Placa STD 12.5mm', 'Placa RH 12.5mm', 'Placa RF 12.5mm (ignífuga)'],
      unidad: 'm²',
      obligatorio: true,
    },
    {
      capa: 'fundacion',
      nombre: 'Platea de hormigón',
      descripcion: 'Fundación para steel frame. Similar a SIP.',
      marca_referencia: 'Loma Negra / Holcim',
      proveedores: ['loma_negra', 'holcim', 'acindar'],
      modelos: ['Hormigón H-17', 'Hormigón H-25'],
      unidad: 'm³',
      obligatorio: true,
    },
  ],

  // ──────────────────────────────────────────────────────────
  madera: [
    {
      capa: 'estructura',
      nombre: 'Madera aserrada estructural (pino/eucaliptus)',
      descripcion: 'Madera de primera calidad para platform frame. Seca (humedad <19%), sin nudos estructurales, tratada contra insectos y hongos.',
      marca_referencia: 'Madersul / proveedores locales',
      proveedores: ['madersul'],
      modelos: ['Pino 2"×4" (38×89mm)', 'Pino 2"×6" (38×140mm)', 'Eucaliptus grandis aserrado'],
      unidad: 'ml',
      obligatorio: true,
      notas: 'La disponibilidad varía por región. En Patagonia: pino. En NEA: eucaliptus. En NOA: algarrobo o pino importado.',
    },
    {
      capa: 'estructura',
      nombre: 'Madera laminada estructural (GL)',
      descripcion: 'Madera laminada encolada para vigas y columnas de mayor sección y luz. Permite grandes voladizos.',
      marca_referencia: 'Madersul / varios',
      proveedores: ['madersul'],
      modelos: ['GL 120×240mm', 'GL 140×280mm', 'GL 160×320mm'],
      unidad: 'ml',
      obligatorio: false,
    },
    {
      capa: 'aislacion',
      nombre: 'Lana de vidrio / celulosa entre cabios',
      descripcion: 'Aislación entre montantes de madera. Lana de vidrio Isover o celulosa soplada.',
      marca_referencia: 'Isover',
      proveedores: ['isover', 'insuma_sur'],
      modelos: ['Fieltro Liviano 80mm', 'Fieltro Liviano 100mm (en cabio)'],
      unidad: 'm²',
      obligatorio: true,
    },
    {
      capa: 'cerramiento_ext',
      nombre: 'OSB 11mm (cerramiento exterior)',
      descripcion: 'Tablero OSB como cerramiento exterior de entramado de madera.',
      marca_referencia: 'Insuma Sur / varios',
      proveedores: ['insuma_sur'],
      modelos: ['OSB 11mm', 'OSB 15mm'],
      unidad: 'm²',
      obligatorio: true,
    },
    {
      capa: 'fundacion',
      nombre: 'Platea de hormigón',
      descripcion: 'Fundación para estructura de madera.',
      marca_referencia: 'Loma Negra / Holcim',
      proveedores: ['loma_negra', 'holcim'],
      modelos: ['H-17', 'H-25'],
      unidad: 'm³',
      obligatorio: true,
    },
  ],

  // ──────────────────────────────────────────────────────────
  mamp: [
    {
      capa: 'estructura',
      nombre: 'Ladrillo hueco cerámico',
      descripcion: 'Ladrillo hueco 18×18×33cm. Elemento base de la mampostería tradicional argentina.',
      marca_referencia: 'Cerro Negro / Canteras del Norte / local',
      proveedores: [],
      modelos: ['Ladrillo 8 agujeros 18×18×33cm', 'Ladrillo 6 agujeros 12×18×33cm'],
      unidad: 'unidad',
      obligatorio: true,
      notas: 'Los fabricantes son locales/regionales. Verificar disponibilidad y calidad según zona.',
    },
    {
      capa: 'estructura',
      nombre: 'Cemento Portland normal (CPN)',
      descripcion: 'Base de morteros de asiento, hormigón de columnas y vigas.',
      marca_referencia: 'Loma Negra / Holcim',
      proveedores: ['loma_negra', 'holcim'],
      modelos: ['CPN 40', 'CPF 40 (fundaciones)'],
      unidad: 'bolsa 50kg',
      obligatorio: true,
    },
    {
      capa: 'estructura',
      nombre: 'Acero en barra (armadura)',
      descripcion: 'Barras de acero ADN 420 para columnas, vigas, losa y fundación.',
      marca_referencia: 'Acindar / Ternium',
      proveedores: ['acindar', 'ternium'],
      modelos: ['Barra ø8mm', 'Barra ø10mm', 'Barra ø12mm', 'Barra ø16mm'],
      unidad: 'kg',
      obligatorio: true,
    },
    {
      capa: 'revestimiento_ext',
      nombre: 'Revoque exterior (3 capas)',
      descripcion: 'Sistema de revoque: grueso hidrófugo + fino + enlucido o texturado.',
      marca_referencia: 'Weber / Holcim Tector / Sika',
      proveedores: ['weber', 'holcim', 'sika'],
      modelos: ['Weber Rev exterior', 'Tector Revoque grueso', 'Sika Monocolor'],
      unidad: 'kg / m²',
      obligatorio: true,
    },
    {
      capa: 'cubierta',
      nombre: 'Membrana asfáltica',
      descripcion: 'Impermeabilización de techo plano. 4kg mínimo sobre losa con aislación previa.',
      marca_referencia: 'Megaflex / Ormiflex',
      proveedores: ['megaflex', 'ormiflex'],
      modelos: ['Megaflex No Crack 450 c/aluminio 4kg', 'Megaflex MGX 400', 'Ormiflex Cinta Roja 40kg'],
      unidad: 'm²',
      obligatorio: true,
    },
  ],

  // ──────────────────────────────────────────────────────────
  container: [
    {
      capa: 'estructura',
      nombre: 'Container ISO 20 pies',
      descripcion: 'Contenedor metálico ISO 20 pies (6m). Base del módulo. Requiere tratamiento anticorrosión antes de la aislación.',
      marca_referencia: 'varios importadores',
      proveedores: [],
      modelos: ['ISO 20 pies estándar', 'ISO 40 pies estándar', 'High Cube 40 pies (2.9m altura)'],
      unidad: 'unidad',
      obligatorio: true,
    },
    {
      capa: 'aislacion',
      nombre: 'Poliuretano proyectado (PUR)',
      descripcion: 'Sistema de aislación proyectado sobre la caja metálica. La solución más eficiente para container en climas fríos.',
      marca_referencia: 'Sika / Weber / Isolant',
      proveedores: ['sika'],
      modelos: ['PUR proyectado 50mm', 'PUR proyectado 80mm (Patagonia)'],
      unidad: 'm²',
      obligatorio: true,
      notas: 'Para Patagonia se recomienda mínimo 80mm. El PUR resuelve puentes térmicos de la estructura metálica del container.',
    },
    {
      capa: 'cerramiento_int',
      nombre: 'Placa de yeso interior (sobre PUR)',
      descripcion: 'Terminación interior del módulo sobre la capa de PUR.',
      marca_referencia: 'Durlock / Knauf',
      proveedores: ['durlock', 'knauf'],
      modelos: ['Placa STD 12.5mm', 'Placa RH 12.5mm'],
      unidad: 'm²',
      obligatorio: true,
    },
  ],

  // ──────────────────────────────────────────────────────────
  adobe: [
    {
      capa: 'estructura',
      nombre: 'Adobe crudo (tierra + paja)',
      descripcion: 'Ladrillo de tierra cruda con paja. Fabricación local o in situ. Verificar composición del suelo (contenido de arcilla ideal: 15–25%).',
      marca_referencia: 'Fabricación local',
      proveedores: [],
      modelos: ['Adobe estándar 30×15×10cm', 'Adobe grande 40×20×12cm'],
      unidad: 'unidad',
      obligatorio: true,
    },
    {
      capa: 'estructura',
      nombre: 'Acero en barra (refuerzo sísmico)',
      descripcion: 'Armado mínimo para zonas sísmicas. Columnas de bambú o barra en encuentros.',
      marca_referencia: 'Acindar / local',
      proveedores: ['acindar'],
      modelos: ['Barra ø8mm', 'Cañas de bambú'],
      unidad: 'ml',
      obligatorio: false,
      notas: 'Obligatorio en zonas sísmicas (Cuyo, NOA). Consultar CIRSOC para requisitos mínimos.',
    },
  ],

  // ──────────────────────────────────────────────────────────
  modular: [
    {
      capa: 'estructura',
      nombre: 'Estructura metálica modular (taller)',
      descripcion: 'Módulo volumétrico completo fabricado en planta. Estructura de acero con cerramientos incorporados.',
      marca_referencia: 'varios fabricantes (mercado en desarrollo)',
      proveedores: ['ternium'],
      modelos: ['Módulo estándar 3×9m', 'Módulo 4×12m', 'Módulo custom'],
      unidad: 'unidad',
      obligatorio: true,
      notas: 'El mercado modular en Argentina está en desarrollo. Verificar fabricantes con track record real.',
    },
  ],

  // ──────────────────────────────────────────────────────────
  mixto: [
    {
      capa: 'estructura',
      nombre: 'Kit mixto SIP + estructura metálica',
      descripcion: 'Combinación de paneles SIP con columnas metálicas TCL o UPN. Caso de referencia: Casa RoBe, General Roca.',
      marca_referencia: 'TAO + Ternium',
      proveedores: ['tao_central', 'ternium'],
      modelos: ['SIP 70 + columnas TCL 80×4mm', 'SIP 90 + UPN 100'],
      unidad: 'm²',
      obligatorio: true,
    },
  ],
}

// ─── CAPAS COMPLEMENTARIAS (aplican a múltiples sistemas) ────

export const CAPAS_COMPLEMENTARIAS: ComponenteSistema[] = [
  // ── CUBIERTAS GENERALES ──────────────────────────────────
  {
    capa: 'cubierta',
    nombre: 'Chapa zinc-alum sinusoidal (cubierta inclinada)',
    descripcion: 'Chapa metálica ondulada para cubierta inclinada. Sistema más común en Argentina para construcción industrializada.',
    marca_referencia: 'Insuma Sur / Ternium',
    proveedores: ['insuma_sur', 'ternium'],
    modelos: ['Chapa sinusoidal prepintada C25', 'Chapa trapezoidal T-101', 'Chapa galvanizada lisa'],
    unidad: 'm²',
    obligatorio: false,
    aplicaSistemas: ['sip', 'steel', 'madera'],
  },
  {
    capa: 'cubierta',
    nombre: 'Panel sándwich de techo (chapa + EPS + chapa)',
    descripcion: 'Panel de cubierta con aislación incorporada. Alternativa al YANE-TAO en proyectos steel frame.',
    marca_referencia: 'Insuma Sur / Termotecho',
    proveedores: ['insuma_sur'],
    modelos: ['Panel sándwich 50mm', 'Panel sándwich 75mm', 'Panel sándwich 100mm'],
    unidad: 'm²',
    obligatorio: false,
    aplicaSistemas: ['steel', 'madera', 'container'],
  },
  {
    capa: 'cubierta',
    nombre: 'Membrana asfáltica (techo plano)',
    descripcion: 'Impermeabilización de cubierta plana. Mínimo 4kg. Requiere aislación previa.',
    marca_referencia: 'Megaflex / Ormiflex',
    proveedores: ['megaflex', 'ormiflex'],
    modelos: [
      'Megaflex No Crack 450 4kg c/aluminio — exposición directa',
      'Megaflex GEOTRANS — transitable',
      'Megaflex MGX 400 — bajo carpeta',
      'Ormiflex Cinta Roja 40kg c/aluminio',
      'Ormiflex Barrera Acústica — aislación acústica',
    ],
    unidad: 'm²',
    obligatorio: false,
    aplicaSistemas: ['mamp', 'steel', 'modular'],
  },
  {
    capa: 'cubierta',
    nombre: 'Aislante EPS bajo membrana (cubierta invertida)',
    descripcion: 'EPS 30-50mm bajo polietileno sobre losa, como base aislante antes de la membrana.',
    marca_referencia: 'Isover / Ormipol',
    proveedores: ['isover', 'ormiflex'],
    modelos: ['EPS 30mm 20kg/m³', 'EPS 50mm 20kg/m³'],
    unidad: 'm²',
    obligatorio: false,
    aplicaSistemas: ['mamp'],
  },

  // ── REVESTIMIENTOS EXTERIORES ────────────────────────────
  {
    capa: 'revestimiento_ext',
    nombre: 'Siding Cedral fibrocemento',
    descripcion: 'Tabla de fibrocemento con aspecto de madera para fachada. Sistema en seco, sin obra húmeda.',
    marca_referencia: 'Cedral / Eternit (distribuido por Durlock)',
    proveedores: ['cedral', 'durlock'],
    modelos: [
      'Cedral Lap — perfil horizontal solapado',
      'Cedral Click — sistema machiembrado',
      'Cedral Board — plano',
    ],
    unidad: 'm²',
    obligatorio: false,
    aplicaSistemas: ['sip', 'steel', 'madera'],
  },
  {
    capa: 'revestimiento_ext',
    nombre: 'Sistema EIFS/SATE (fachada con aislación)',
    descripcion: 'EPS adherido + malla + revoque delgado. Suma aislación y terminación en una sola capa. Base: Weber Therm o Sika Therm.',
    marca_referencia: 'Weber / Sika',
    proveedores: ['weber', 'sika'],
    modelos: [
      'Weber Therm Comfort (EPS 40mm)',
      'Weber Therm Premium (EPS 60mm)',
      'Sika Armatec (malla + adhesivo)',
    ],
    unidad: 'm²',
    obligatorio: false,
    aplicaSistemas: ['steel', 'mamp'],
    notas: 'Muy recomendado para mejorar aislación en steel frame. Requiere membrana hidrófuga previa.',
  },

  // ── PISOS ────────────────────────────────────────────────
  {
    capa: 'pisos',
    nombre: 'Piso flotante laminado HDF',
    descripcion: 'Piso laminado AC3/AC4 sobre barrera de vapor. Instalación en seco, sin adhesivo.',
    marca_referencia: 'Genova / Sencys / Pergo',
    proveedores: [],
    modelos: ['Laminado AC3 7mm', 'Laminado AC4 12mm', 'LVP vinílico 6mm (resistente agua)'],
    unidad: 'm²',
    obligatorio: false,
    aplicaSistemas: ['sip', 'steel', 'madera', 'modular'],
  },
  {
    capa: 'pisos',
    nombre: 'Barrera de vapor bajo piso',
    descripcion: 'Polietileno 200 micrones entre platea y piso flotante. Evita humedad ascendente.',
    marca_referencia: 'Insuma Sur / Ormiflex',
    proveedores: ['insuma_sur', 'ormiflex'],
    modelos: ['Polietileno 200 micrones'],
    unidad: 'm²',
    obligatorio: true,
    aplicaSistemas: ['sip', 'steel', 'madera', 'mamp'],
  },

  // ── INSTALACIONES ────────────────────────────────────────
  {
    capa: 'instalacion_san',
    nombre: 'Caños PPR termofusión (agua fría/caliente)',
    descripcion: 'Sistema de cañerías de polipropileno random para distribución de agua. Requiere soldadura por termofusión.',
    marca_referencia: 'Tigre / Awaduct',
    proveedores: ['tigre'],
    modelos: ['PPR ø20mm', 'PPR ø25mm', 'PPR ø32mm'],
    unidad: 'ml',
    obligatorio: true,
    aplicaSistemas: ['sip', 'steel', 'madera', 'mamp', 'container', 'modular'],
    notas: 'En SIP: agua fría y caliente solo por tabiques interiores o fachada interna. Gas SIEMPRE por fuera del panel.',
  },
  {
    capa: 'instalacion_san',
    nombre: 'Caños PVC desagüe cloacal',
    descripcion: 'Caño PVC 110mm para troncal cloacal y 63mm para ramales.',
    marca_referencia: 'Tigre / Pipelife',
    proveedores: ['tigre', 'pipelife'],
    modelos: ['PVC 110mm troncal', 'PVC 63mm ramal', 'PVC 40mm ventilación'],
    unidad: 'ml',
    obligatorio: true,
    aplicaSistemas: ['sip', 'steel', 'madera', 'mamp', 'container', 'modular'],
  },
]

// ─── TIPOS ────────────────────────────────────────────────

export interface ComponenteSistema {
  capa: CapaKey
  nombre: string
  descripcion: string
  marca_referencia: string
  proveedores: string[]            // IDs de Proveedor
  modelos?: string[]
  unidad?: string
  obligatorio?: boolean
  notas?: string
  aplicaSistemas?: SistemaKey[]    // para capas complementarias
}

// ─── HELPERS ──────────────────────────────────────────────

export const getProveedor = (id: string): Proveedor | null =>
  PROVEEDORES.find(p => p.id === id) ?? null

export const getProveedoresPorSistema = (sistema: SistemaKey): Proveedor[] => {
  const componentes = COMPONENTES_SISTEMA[sistema] ?? []
  const ids = [...new Set(componentes.flatMap(c => c.proveedores))]
  return ids.map(id => PROVEEDORES.find(p => p.id === id)).filter(Boolean) as Proveedor[]
}

export const getTAOPoints = (): Proveedor[] =>
  PROVEEDORES.filter(p => p.tipo === 'tao_point')

export const getProveedoresByCobertura = (cobertura: CoberturaNacional): Proveedor[] =>
  PROVEEDORES.filter(p => p.cobertura === cobertura || p.cobertura === 'nacional')

export const CAPA_LABEL: Record<CapaKey, string> = {
  estructura: 'Estructura',
  aislacion: 'Aislación',
  cerramiento_ext: 'Cerramiento exterior',
  cerramiento_int: 'Cerramiento interior',
  cubierta: 'Cubierta / Techo',
  fundacion: 'Fundación',
  instalacion_elec: 'Instalación eléctrica',
  instalacion_san: 'Instalación sanitaria',
  revestimiento_ext: 'Revestimiento exterior',
  revestimiento_int: 'Revestimiento interior',
  carpinteria: 'Carpintería',
  fijaciones: 'Fijaciones y anclajes',
  sellado: 'Sellado y juntas',
  pisos: 'Pisos',
}
