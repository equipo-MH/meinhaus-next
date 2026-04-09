# AGENTS.md — MeinHaus Platform

## Proyecto
MeinHaus es una plataforma digital de construcción con base en Patagonia, Argentina.
Conecta profesionales del oficio (albañiles, carpinteros, instaladores, etc.) con clientes que quieren construir bien.
Repo: `equipo-MH/meinhaus-next`
Deploy: Vercel → `meinhaus-next.vercel.app`

## Stack
- Next.js 15, TypeScript, Tailwind CSS v4
- Supabase (PostgreSQL + RLS + Auth)
- Vercel (hosting)
- Node.js, PowerShell (entorno local Windows)

## Estructura clave
- `src/app/` — rutas de Next.js (App Router)
- `src/app/globals.css` — variables CSS, tokens de diseño, fuente Satoshi
- `src/app/page.tsx` — landing principal
- `src/app/registro-oficio/page.tsx` — formulario de registro para profesionales
- `src/app/quiero-construir/page.tsx` — formulario para clientes
- `src/lib/supabase.ts` — cliente Supabase + constantes (ROL_LABEL, etc.)

## Sistema de diseño
- Fondo dark: `#0D0D0B`
- Texto: `#F2EDE6` (off-white cálido)
- Acento oro: `#C8A96E`
- Tipografía UI: Satoshi (font-face embebido en globals.css)
- Tipografía display: Cormorant Garamond (serif)
- Tokens en `--sans`, `--serif`, `--mono`, `--bg`, `--ink`, `--orange`, etc.

## Base de datos (Supabase)
Tablas principales:
- `profiles` — profesionales del oficio. Campos: nombre, email, telefono, provincia, ciudad, oficio_principal, sistemas, descripcion, badge (gris/oro/verde)
- `solicitudes_obra` — clientes que quieren construir
- `contact_requests` — solicitudes de contacto oficio↔cliente
- `organizations` — empresas/cuadrillas

## Reglas de código
1. **Nunca mencionar "General Roca"** — usar siempre "Patagonia"
2. TypeScript estricto — no usar `any` sin justificación
3. Componentes en español (nombres de variables, comentarios)
4. No instalar dependencias sin consultar — el stack está definido
5. Tailwind utility classes únicamente — no CSS inline salvo variables CSS
6. Formularios guardan en Supabase con manejo de errores
7. No lanzar rutas con auth hasta que Supabase Auth esté completamente implementado
8. Encoding: todos los archivos en UTF-8 — no romper caracteres como ñ, tildes

## Convenciones de commit
- `v{número}: descripción breve` — ej: `v23: fix encoding layout.tsx`
- Siempre hacer `npm run build` antes de commitear

## Tareas seguras para el agente
- Reemplazos de texto en archivos `.tsx` / `.ts`
- Ajustes de estilo dentro del sistema de diseño existente
- Agregar campos a formularios existentes
- Correcciones de encoding o typos
- Refactors de componentes sin cambiar lógica de negocio

## Tareas que requieren revisión humana
- Cambios en esquema de Supabase (SQL migrations)
- Modificar RLS policies
- Agregar nuevas rutas con lógica de auth
- Cambiar el sistema de badges o verificación
- Tocar `src/lib/supabase.ts`