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
