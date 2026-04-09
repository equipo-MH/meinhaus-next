# AGENTS.md — MeinHaus Next

## Proyecto

MeinHaus es una plataforma de construcción eficiente con sede en Patagonia, Argentina. Conecta profesionales de oficios con clientes. Este repositorio es la web pública y futura plataforma, construida con Next.js (App Router).

## Stack

- **Framework:** Next.js (App Router)
- **Estilos:** Tailwind CSS v4
- **Tipografía:** Satoshi (cargada vía font-face)
- **Deploy:** Vercel
- **Lenguaje:** TypeScript

## Estructura de /src

```
src/
├── app/          # Rutas y layouts (App Router)
├── components/   # Componentes reutilizables
├── data/         # Datos estáticos, taxonomías, contenido
├── lib/          # Utilidades, helpers, configuración
└── types/        # Tipos TypeScript
```

## Convenciones

- Componentes en PascalCase: `HeroSection.tsx`, `ServiceCard.tsx`
- Un componente por archivo
- Estilos con clases de Tailwind, sin CSS externo salvo excepciones justificadas
- Datos estáticos en `/data`, no hardcodeados en componentes
- Tipos compartidos en `/types`
- Idioma del código: inglés para variables, funciones y props. Contenido visible al usuario en español

## Comandos

```bash
npm install        # Instalar dependencias
npm run dev        # Dev server
npm run build      # Build de producción
npm run lint       # ESLint
```

## Reglas para agentes

- No instalar dependencias nuevas sin justificación
- No modificar layout.tsx ni configuraciones globales salvo que la tarea lo requiera explícitamente
- Mantener los componentes pequeños y con responsabilidad única
- Si un componente supera ~150 líneas, proponer separación
- Respetar la estructura existente de carpetas
- Todo nuevo componente debe ser tipado (sin `any`)
- Commits en español, formato: "v[N]: descripción breve del cambio"
