import type { Articulo } from '@/types'

export const ARTICULOS: Articulo[] = [
  {
    id: 'sip-vs-steel-patagonia',
    slug: 'sip-vs-steel-patagonia',
    categoria: 'sip',
    categoriaLabel: 'SIP vs Steel',
    fecha: 'Marzo 2026',
    featured: true,
    titulo: 'SIP vs Steel Frame en Patagonia: análisis técnico honesto',
    extracto: '¿Cuál conviene más para un proyecto en clima patagónico? Comparamos costos reales, performance térmica, velocidad de obra y disponibilidad de mano de obra. Sin sesgo de marca.',
    contenido: `<h2>El contexto importa</h2>
<p>Comparar sistemas constructivos sin definir el contexto es un ejercicio vacío. En Patagonia, el contexto tiene tres variables críticas que hacen la comparación más clara de lo que parece: temperatura mínima de −15°C, viento sostenido de 80–120 km/h y ciclos de helada y deshielo que ningún sistema convencional maneja bien.</p>
<blockquote>"El SIP 90 no es más caro que el Steel Frame cuando medís lo que ahorrás en calefacción."</blockquote>
<h2>Performance térmica: los números reales</h2>
<p>El SIP 90 tiene un valor Rt de 3 m²°C/W. El Steel Frame bien ejecutado con lana mineral entre montantes llega a Rt ≈ 2 sin puente térmico. Si hay puente térmico — que en la práctica ocurre en encuentros y montantes — el valor cae a Rt ≈ 1.2–1.5.</p>
<p>Dato del Oak Ridge National Laboratory: <strong>una pared SIP de 6" tiene 96% mejor R-value efectivo que una pared 2×6 convencional.</strong> La diferencia no es el material. Es que el SIP no tiene cavidades de aire ni puentes térmicos por construcción.</p>
<h3>Infiltración de aire</h3>
<p>Una estructura SIP tiene el 7% de la infiltración de aire de una estructura convencional equivalente. En Patagonia, la infiltración es el principal vector de pérdida de calor — no solo la transmitancia del muro.</p>
<h2>Costos: el número que importa</h2>
<p>El Steel Frame es entre 12–15% más barato en costo de obra que la mampostería. El SIP está en un rango similar al Steel Frame en obra gris.</p>
<p>Sin embargo, el cálculo correcto incluye la diferencia en costo de calefacción durante la vida útil del edificio. En Patagonia, con calefacción por garrafa o gas envasado, un edificio bien aislado puede ahorrar USD 800–1.500 anuales respecto a uno convencional. En 10 años, eso financia la diferencia de costo de sistema.</p>
<h2>Velocidad</h2>
<p>Para 100m², el Steel Frame tarda 4–6 meses. El SIP tarda 4–6 <strong>semanas</strong>. En Steel Frame el montaje de estructura es rápido, pero los cerramientos, aislaciones y terminaciones se hacen in situ capa a capa. En SIP, el panel llega con estructura, aislación y cerramiento integrados.</p>
<h2>Conclusión</h2>
<p>Para Patagonia, el SIP 90 es el sistema de referencia por tres razones: hermeticidad real en clima de viento extremo, Rt=3 sin obra húmeda adicional, y certificación sísmica para zonas de actividad moderada. El Steel Frame es válido — sobre todo cuando la disponibilidad de instaladores SIP es baja — pero requiere más atención a los detalles de aislación.</p>`,
    tags: ['SIP', 'Steel Frame', 'Patagonia', 'Aislación térmica', 'Comparativa'],
  },
  {
    id: 'costos-construccion-2026',
    slug: 'costos-construccion-2026',
    categoria: 'gen',
    categoriaLabel: 'Costos',
    fecha: 'Febrero 2026',
    featured: false,
    titulo: '¿Cuánto cuesta construir en Argentina en 2026?',
    extracto: 'Datos actualizados de costos por m² para todos los sistemas constructivos. Fuentes: APYMECO, CAC, colegios de arquitectos provinciales. Con análisis de variaciones por zona.',
    contenido: `<h2>El problema con los costos de construcción en Argentina</h2>
<p>Hay tres problemas frecuentes al buscar información de costos: los datos están en pesos (obsoletos en semanas), las fuentes mezclan obra gris con llave en mano, y pocas fuentes distinguen entre sistemas constructivos.</p>
<h2>Fuentes utilizadas</h2>
<p>APYMECO (Asociación de Pymes de la Construcción de Buenos Aires), el Índice del Costo de la Construcción del INDEC, los colegios de arquitectos provinciales y relevamientos directos de empresas constructoras.</p>
<h2>Datos consolidados — T1 2026</h2>
<p><strong>Mampostería tradicional:</strong> USD 950–1.100/m² (obra gris) · USD 1.350–1.600/m² (llave en mano). La mano de obra representa el 60–70% del costo total.</p>
<p><strong>Steel Frame:</strong> USD 600–750/m² (obra gris) · USD 1.100–1.200/m² (llave en mano). Reducción de 12–15% vs mampostería.</p>
<p><strong>SIP:</strong> USD ~900/m² (obra gris) · USD 1.300–1.600/m² (llave en mano).</p>
<p><strong>Madera:</strong> USD 1.300–2.500/m² llave en mano, con amplia variación por sistema específico.</p>
<h2>Variaciones por zona</h2>
<p>La zona AMBA tiene la referencia base. Patagonia agrega entre 8–12% por logística y disponibilidad limitada de mano de obra. El Centro (Córdoba, Rosario) tiene costos 5–8% menores. NOA y NEA pueden ser 10–15% más baratos en mampostería por disponibilidad local de materiales, pero más caros en sistemas industrializados por transporte.</p>`,
    tags: ['Costos', 'Presupuesto', 'Argentina 2026', 'Comparativa'],
  },
  {
    id: 'instalaciones-en-sip',
    slug: 'instalaciones-en-sip',
    categoria: 'sip',
    categoriaLabel: 'Guía SIP',
    fecha: 'Enero 2026',
    featured: false,
    titulo: 'Instalaciones en SIP: la regla crítica que nadie explica bien',
    extracto: 'La regla es simple: solo verticales. Pero el 80% de los problemas en obras SIP vienen de no entender por qué y de no planificar las instalaciones antes del montaje.',
    contenido: `<h2>La regla: solo instalaciones verticales dentro del panel</h2>
<p>El panel SIP trabaja como elemento portante porque las fibras de OSB trabajan en dirección vertical. Un corte horizontal interrumpe esa continuidad y puede comprometer la capacidad estructural de ese muro de forma significativa.</p>
<p>Esto significa que <strong>toda canalización eléctrica o de data que pase dentro del panel debe hacerlo en sentido vertical</strong>, desde la cámara técnica hasta el tomacorriente o punto de luz.</p>
<h2>Cómo planificar las instalaciones en un proyecto SIP</h2>
<p>La clave es el orden: las instalaciones se definen en proyecto, no en obra. El proceso correcto es:</p>
<ul>
<li>El arquitecto define puntos de instalaciones en plano</li>
<li>El instalador eléctrico revisa el plano y confirma recorridos</li>
<li>Los vaciados verticales se solicitan a fábrica o se realizan antes del montaje</li>
<li>Una vez montados los paneles, se pasan los caños y cables</li>
<li>Recién después se emboca el interior</li>
</ul>
<h3>La cámara técnica</h3>
<p>La solución más limpia para las distribuciones horizontales es la cámara técnica: una franja horizontal entre la solera superior y el emplacado de yeso, de 30–40 cm de altura. Preverla desde el proyecto no agrega costo: es una decisión de diseño.</p>
<h2>Gas: fuera del panel siempre</h2>
<p>Por normativa nacional, la instalación de gas no puede ir dentro de paneles de EPS. En proyectos residenciales se resuelve en cámara exterior visible o en tabique diferenciado.</p>`,
    tags: ['SIP', 'Instalaciones', 'Guía técnica', 'Electricidad'],
  },
  {
    id: 'normativa-sistemas-no-conv',
    slug: 'normativa-sistemas-no-conv',
    categoria: 'norm',
    categoriaLabel: 'Normativa',
    fecha: 'Diciembre 2025',
    featured: false,
    titulo: 'Sistemas no convencionales en Argentina: qué habilita tu municipio',
    extracto: 'Steel Frame, SIP, container y adobe no son universalmente habilitados por todos los municipios. Guía actualizada del marco normativo nacional y las variaciones más relevantes.',
    contenido: `<h2>El marco general</h2>
<p>Argentina tiene un sistema normativo nacional de base (CIRSOC, IRAM, INPRES) y una capa municipal que puede ser más restrictiva. El primer paso antes de elegir el sistema constructivo es consultar qué habilita el municipio donde se construye.</p>
<h2>Lo que el CAT resuelve</h2>
<p>El Certificado de Aptitud Técnica (CAT) es la herramienta nacional para habilitar sistemas no convencionales. El CAT del sistema SIP-TAO (N°3648) lo habilita en todo el territorio nacional, pero algunos municipios piden documentación adicional para su visado local.</p>
<h3>Steel Frame: la más fácil</h3>
<p>El Steel Frame fue incorporado al CIRSOC 303 y está reconocido como sistema "tradicional" en la mayoría de los códigos. Basta presentar planos y cálculo estructural bajo el reglamento. Es el sistema con menos fricciones burocráticas.</p>
<h3>SIP: habilitado con variaciones</h3>
<p>El CAT N°3648 habilita a nivel nacional. La mayoría de los municipios con experiencia previa en el sistema lo aprueban directamente. En municipios sin antecedentes puede requerir una presentación técnica adicional.</p>
<h3>Container: el más variable</h3>
<p>Algunos municipios aceptan el container sin objeciones si el profesional garantiza aislamiento, ventilación y anclaje permanente. Otros solicitan CAT específico o memoria técnica adicional. Siempre consultar antes de comprar el módulo.</p>`,
    tags: ['Normativa', 'CIRSOC', 'CAT', 'Permisos municipales'],
  },
  {
    id: 'error-elegir-por-precio-m2',
    slug: 'error-elegir-por-precio-m2',
    categoria: 'criterio',
    categoriaLabel: 'Criterio MH',
    fecha: 'Noviembre 2025',
    featured: true,
    titulo: 'El error de elegir por precio por m²',
    extracto: 'Comparar sistemas constructivos solo por el costo de m² es como comparar autos por el color. El precio por m² es una variable, no la variable. Acá están las otras.',
    contenido: `<h2>La pregunta equivocada</h2>
<p>La pregunta más común al evaluar sistemas constructivos es: "¿cuánto sale el m²?" Es una pregunta válida, pero cuando se convierte en el único criterio de comparación, el análisis falla.</p>
<p>El precio por m² varía según qué incluye, en qué zona, con qué mano de obra, en qué etapa del proyecto y con qué nivel de terminaciones. Dos presupuestos de "USD 1.200/m² llave en mano" pueden incluir cosas muy distintas.</p>
<h2>Lo que el precio por m² no dice</h2>
<p><strong>Tiempo de obra:</strong> 4 meses de diferencia entre sistemas, en Argentina con inflación, puede representar un 8–12% adicional del presupuesto solo por el costo de financiación o el diferimiento de la habitabilidad.</p>
<p><strong>Costo operativo:</strong> Un sistema con aislación deficiente puede costar USD 100–200/mes más en calefacción durante toda la vida útil del edificio. En 20 años, eso supera cualquier "ahorro" inicial.</p>
<p><strong>Mantenimiento:</strong> Hay sistemas que requieren repintura cada 5 años, otros cada 20. La diferencia se paga, pero no aparece en el m².</p>
<p><strong>Mano de obra disponible:</strong> Un sistema más barato en papel puede salir más caro en obra si no hay ejecutores capacitados en la zona.</p>
<h2>Cómo comparar bien</h2>
<p>Antes de comparar precios, definir: ¿qué incluye cada presupuesto? ¿hasta qué etapa? ¿con qué nivel de terminaciones? ¿qué queda afuera?</p>
<p>Un presupuesto comparable tiene que especificar: sistema estructural, cerramiento exterior, cerramiento interior, aislaciones, aberturas, instalaciones básicas y terminaciones. Sin eso, es imposible comparar.</p>
<h2>Conclusión</h2>
<p>El precio por m² es una variable de entrada útil para descartar opciones fuera de presupuesto. No es una variable de decisión. La decisión se toma sobre el costo total del proyecto en el tiempo, no sobre el número de carátula del presupuesto.</p>`,
    tags: ['Costos', 'Criterio', 'Presupuesto', 'Decisión'],
  },
]

export const getArticulo = (slug: string) =>
  ARTICULOS.find(a => a.slug === slug) ?? null
