import type { PuntoMapa } from '@/types'

export const PUNTOS_MAPA: PuntoMapa[] = [
  { lat:-34.6, lng:-58.4, nombre:'Buenos Aires / AMBA', temp:'+5°C', sismo:'Baja', costo:'USD 1.350–1.600', sip:'Media' },
  { lat:-31.4, lng:-64.2, nombre:'Córdoba', temp:'+3°C', sismo:'Baja', costo:'USD 1.280–1.500', sip:'Media' },
  { lat:-32.9, lng:-68.8, nombre:'Mendoza', temp:'−3°C', sismo:'Muy alta', costo:'USD 1.300–1.550', sip:'Media' },
  { lat:-24.8, lng:-65.4, nombre:'Salta', temp:'+10°C', sismo:'Alta', costo:'USD 1.200–1.400', sip:'Baja' },
  { lat:-39.0, lng:-67.6, nombre:'Patagonia · MeinHaus', temp:'−8°C', sismo:'Moderada', costo:'USD 1.450–1.750', sip:'Alta · TAO Point', mh:true },
  { lat:-38.9, lng:-68.1, nombre:'Neuquén · Fábrica TAO', temp:'−10°C', sismo:'Moderada', costo:'USD 1.400–1.700', sip:'Máxima · Origen' },
  { lat:-41.1, lng:-71.3, nombre:'San Carlos de Bariloche', temp:'−8°C', sismo:'Moderada', costo:'USD 1.550–1.900', sip:'Media-alta' },
  { lat:-53.2, lng:-70.9, nombre:'Río Gallegos', temp:'−15°C', sismo:'Moderada', costo:'USD 1.600–2.000', sip:'Media' },
  { lat:-26.2, lng:-58.2, nombre:'Chaco · NEA', temp:'+15°C', sismo:'Baja', costo:'USD 1.150–1.350', sip:'Baja' },
  { lat:-27.5, lng:-65.5, nombre:'Santiago del Estero', temp:'+12°C', sismo:'Baja', costo:'USD 1.200–1.380', sip:'Baja' },
  { lat:-38.7, lng:-72.6, nombre:'Neuquén Cordillera', temp:'−12°C', sismo:'Alta', costo:'USD 1.500–1.800', sip:'Media' },
]
