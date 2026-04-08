-- ─────────────────────────────────────────────────────────────
-- MEINHAUS PLATFORM — SUPABASE SCHEMA
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- ─────────────────────────────────────────────────────────────

-- 1. PROFILES — Profesionales de la red
-- ─────────────────────────────────────
create table if not exists profiles (
  id                    uuid default gen_random_uuid() primary key,
  nombre                text not null,
  email                 text not null,
  telefono              text,
  rol                   text not null,
  provincia             text not null,
  ciudad                text,
  sistemas_que_trabaja  text[],
  anos_experiencia      integer,
  descripcion           text,
  web                   text,
  instagram             text,
  visible_publicamente  boolean default true,
  validado              boolean default false,
  fecha_alta            timestamptz default now()
);

-- Index for fast filtering
create index if not exists profiles_provincia_idx on profiles(provincia);
create index if not exists profiles_rol_idx on profiles(rol);
create index if not exists profiles_visible_idx on profiles(visible_publicamente);

-- RLS: anyone can read public profiles, anyone can insert
alter table profiles enable row level security;

create policy "Public profiles are readable by everyone"
  on profiles for select
  using (visible_publicamente = true);

create policy "Anyone can register"
  on profiles for insert
  with check (true);


-- 2. ENCUESTAS ECONOMICAS — Datos del Índice MeinHaus
-- ────────────────────────────────────────────────────
create table if not exists encuestas_economicas (
  id                    uuid default gen_random_uuid() primary key,
  profile_id            uuid references profiles(id) on delete set null,
  provincia             text,
  ciudad                text,
  rol_reportado         text,
  jornal_diario         numeric,
  unidad_moneda         text default 'ARS',
  sistema_constructivo  text,
  valor_m2_desde        numeric,
  valor_m2_hasta        numeric,
  tipo_obra             text,
  fecha_relevamiento    timestamptz default now()
);

-- RLS: anyone can read aggregated data, anyone can insert
alter table encuestas_economicas enable row level security;

create policy "Anyone can read survey data"
  on encuestas_economicas for select
  using (true);

create policy "Anyone can submit survey"
  on encuestas_economicas for insert
  with check (true);


-- 3. SOLICITUDES DE OBRA — Clientes que quieren construir
-- ────────────────────────────────────────────────────────
create table if not exists solicitudes_obra (
  id                    uuid default gen_random_uuid() primary key,
  nombre                text not null,
  email                 text not null,
  telefono              text,
  provincia             text not null,
  ciudad                text,
  tipo_proyecto         text,
  superficie_m2         numeric,
  sistema_interes       text,
  presupuesto_aprox     text,
  necesita              text[],
  descripcion           text,
  estado                text default 'nuevo',
  fecha                 timestamptz default now()
);

-- RLS: only authenticated users (admin) can read, anyone can insert
alter table solicitudes_obra enable row level security;

create policy "Anyone can submit a project request"
  on solicitudes_obra for insert
  with check (true);

-- Admin reads: temporarily allow all reads for setup
-- (restrict later when auth is configured)
create policy "Temporary public read for setup"
  on solicitudes_obra for select
  using (true);


-- ─────────────────────────────────────────────────────────────
-- VERIFICACION: correr esto para confirmar que las tablas existen
-- ─────────────────────────────────────────────────────────────
-- select table_name from information_schema.tables
-- where table_schema = 'public'
-- order by table_name;