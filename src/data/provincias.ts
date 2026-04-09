import type { Provincia } from '@/types'

export const PROVINCIAS: Provincia[] = [
  { id: 'rionegro', nombre: 'Río Negro', region: 'Patagonia', sip: 'Habilitado', steel: 'Habilitado', madera: 'Con consulta', container: 'Variable por municipio', sismo: 'Zona 2–3', temp: '−8°C',
      detalle: { colegio: 'Colegio Arquitectos Río Negro · Ley 2.176', cirsoc: '201 · 303 · 601', sipCat: 'CAT N°3648 aceptado con documentación técnica', notas: 'Patagonia tiene experiencia previa con SIP. TAO Point operativo en la ciudad. Caso Casa RoBe aprobado por Municipalidad y Colegio.' } },
  { id: 'neuquen', nombre: 'Neuquén', region: 'Patagonia', sip: 'Habilitado', steel: 'Habilitado', madera: 'Habilitado', container: 'Con CAT específico', sismo: 'Zona 2–3', temp: '−10°C',
    detalle: { colegio: 'Colegio Arquitectos de Neuquén', cirsoc: '201 · 303 · 601', sipCat: 'CAT N°3648 · Fábrica TAO en la provincia', notas: 'Neuquén capital tiene buena adopción de sistemas industrializados. Fábrica TAO en la ciudad.' } },
  { id: 'bsas', nombre: 'Buenos Aires (AMBA)', region: 'Centro', sip: 'Habilitado', steel: 'Habilitado', madera: 'Con consulta', container: 'Con memoria técnica', sismo: 'Zona 0–1', temp: '+5°C',
    detalle: { colegio: 'CPAU · CAPBA', cirsoc: '201 · 303', sipCat: 'CAT N°3648 · Adopción creciente en zona sur GBA', notas: 'Steel Frame ampliamente aceptado. SIP con antecedentes crecientes. Mayor infraestructura de técnicos certificados.' } },
  { id: 'cordoba', nombre: 'Córdoba', region: 'Centro', sip: 'Con documentación', steel: 'Habilitado', madera: 'Habilitado', container: 'Variable', sismo: 'Zona 1', temp: '+3°C',
    detalle: { colegio: 'Colegio Arquitectos de Córdoba', cirsoc: '201 · 303 · 601', sipCat: 'CAT N°3648 · Presentación técnica recomendada', notas: 'Córdoba capital con adopción media. Zona serrana con experiencia en madera.' } },
  { id: 'mendoza', nombre: 'Mendoza', region: 'Cuyo', sip: 'Habilitado con CAS', steel: 'Habilitado', madera: 'Habilitado', container: 'Con CAT', sismo: 'Zona 3–4', temp: '−3°C',
    detalle: { colegio: 'CAM · Colegio Arquitectos de Mendoza', cirsoc: '201 · 303 · 601', sipCat: 'CAT N°3648 + CAS INPRES obligatorio', notas: 'Sismicidad muy alta. La certificación CAS del sistema SIP es obligatoria. El INPRES verifica todos los sistemas.' } },
  { id: 'salta', nombre: 'Salta', region: 'NOA', sip: 'Con CAT', steel: 'Habilitado', madera: 'Con consulta', container: 'Con memoria', sismo: 'Zona 2–3', temp: '+10°C',
    detalle: { colegio: 'Colegio Arquitectos de Salta', cirsoc: '201 · 303', sipCat: 'CAT N°3648 · Presentación caso por caso', notas: 'El CAS Salta publica comparativa mensual de costos sistema húmedo vs seco. Referencia técnica para el NOA.' } },
  { id: 'chubut', nombre: 'Chubut', region: 'Patagonia', sip: 'Habilitado', steel: 'Habilitado', madera: 'Habilitado', container: 'Variable', sismo: 'Zona 1–2', temp: '−12°C',
    detalle: { colegio: 'Colegio Arquitectos de Chubut', cirsoc: '201 · 303 · 601', sipCat: 'CAT N°3648 · Aceptado', notas: 'Clima riguroso hace del SIP el sistema más recomendado. Comodoro Rivadavia con experiencia en sistemas industrializados.' } },
  { id: 'santacruz', nombre: 'Santa Cruz', region: 'Patagonia Sur', sip: 'Habilitado', steel: 'Habilitado', madera: 'Con consulta', container: 'Con CAT', sismo: 'Zona 1–2', temp: '−15°C',
    detalle: { colegio: 'Colegio Arquitectos de Santa Cruz', cirsoc: '201 · 303', sipCat: 'CAT N°3648 · Habilitado', notas: 'El clima más riguroso del país. Río Gallegos: −15°C en invierno. SIP 90 estándar recomendado.' } },
  { id: 'tucuman', nombre: 'Tucumán', region: 'NOA', sip: 'Con CAT', steel: 'Habilitado', madera: 'Habilitado', container: 'Variable', sismo: 'Zona 2', temp: '+12°C',
    detalle: { colegio: 'Colegio Arquitectos de Tucumán', cirsoc: '201 · 303 · 601', sipCat: 'CAT N°3648 · Presentación técnica', notas: 'Clima templado reduce urgencia de aislación. Adopción de industrializados en crecimiento.' } },
]
