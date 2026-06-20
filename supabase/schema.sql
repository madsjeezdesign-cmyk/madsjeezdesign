-- Ejecutar en Supabase → SQL Editor (proyecto fhvlvuncymvzardotkfd)
-- https://supabase.com/dashboard/project/fhvlvuncymvzardotkfd/sql

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) >= 2),
  company text,
  email text not null check (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  service text not null,
  message text not null check (char_length(message) >= 10),
  read_at timestamptz,
  archived boolean not null default false,
  admin_notes text,
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries add column if not exists read_at timestamptz;
alter table public.contact_inquiries add column if not exists archived boolean not null default false;
alter table public.contact_inquiries add column if not exists admin_notes text;

comment on column public.contact_inquiries.read_at is 'Cuándo se marcó como leído en el panel admin';
comment on column public.contact_inquiries.archived is 'Ocultar del inbox principal';
comment on column public.contact_inquiries.admin_notes is 'Notas internas del estudio';

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);

alter table public.contact_inquiries enable row level security;

-- Sin políticas públicas: solo el service role (API en Railway) inserta filas.

comment on table public.contact_inquiries is 'Consultas del formulario de contacto — MadsJeez Design landing';

create table if not exists public.blog_posts (
  slug text primary key,
  title text not null,
  excerpt text not null default '',
  content text not null,
  cover_image text,
  author text not null default 'MadsJeez Design',
  tags text[] not null default '{}',
  reading_time integer not null default 1,
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_at_idx
  on public.blog_posts (published_at desc);

alter table public.blog_posts enable row level security;

drop policy if exists "blog_posts public read" on public.blog_posts;

create policy "blog_posts public read"
  on public.blog_posts for select
  using (true);

comment on table public.blog_posts is 'Posts del blog — MadsJeez Design. Escritura solo service role; lectura publica.';
