-- Migration: 0001_partner_submissions.sql
-- Table: partner_submissions for Zigo Water Founding Boat Partner Waitlist

create table if not exists public.partner_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  reference_code text unique not null,
  captain_name text not null,
  whatsapp_e164 text unique not null,
  referred_by text null,
  boats_count integer not null check (boats_count >= 1),
  boat_types text[] not null,
  boat_type_other text null,
  preferred_jetty text not null,
  jetty_other text null,
  available_days text[] not null,
  pricing jsonb not null default '[]'::jsonb,
  consent boolean not null default true,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Verified', 'Live')),
  utm jsonb null,
  user_agent text null
);

-- Indexing for rapid lookup & admin queries
create index if not exists idx_partner_submissions_whatsapp on public.partner_submissions(whatsapp_e164);
create index if not exists idx_partner_submissions_ref on public.partner_submissions(reference_code);
create index if not exists idx_partner_submissions_status on public.partner_submissions(status);
create index if not exists idx_partner_submissions_jetty on public.partner_submissions(preferred_jetty);
create index if not exists idx_partner_submissions_created_at on public.partner_submissions(created_at desc);

-- Enable Row Level Security (RLS)
alter table public.partner_submissions enable row level security;

-- Policy: Only service_role (server backend) has access.
-- The browser client NEVER connects directly to this table.
create policy "Service role full access"
  on public.partner_submissions
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
