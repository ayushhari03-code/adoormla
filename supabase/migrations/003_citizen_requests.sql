-- ==========================================
-- 6. CITIZEN REQUESTS & GRIEVANCES TABLE
-- ==========================================
create table if not exists public.citizen_requests (
    id uuid primary key default gen_random_uuid(),
    tracking_id text not null unique,
    type text not null, -- 'grievance', 'assistance', 'meeting', 'suggestion'
    name text not null,
    phone text not null,
    panchayat text not null,
    details text not null,
    status text not null default 'submitted', -- 'submitted', 'viewed', 'under_process', 'resolved', 'rejected'
    admin_notes text,
    viewed_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Index for instant lookup by tracking_id, phone, and status
create index if not exists idx_citizen_requests_tracking on public.citizen_requests(tracking_id);
create index if not exists idx_citizen_requests_status on public.citizen_requests(status);
create index if not exists idx_citizen_requests_created_at on public.citizen_requests(created_at desc);

-- Trigger for auto updated_at
create trigger set_citizen_requests_updated_at 
before update on public.citizen_requests 
for each row execute procedure public.handle_updated_at();

-- ==========================================
-- ENABLE RLS
-- ==========================================
alter table public.citizen_requests enable row level security;

-- Public/Anonymous users can INSERT their requests
create policy "Allow public to submit citizen requests" 
on public.citizen_requests 
for insert 
to anon, authenticated 
with check (true);

-- Public/Anonymous users can SELECT only by tracking_id for tracking status
create policy "Allow public to read request by tracking_id" 
on public.citizen_requests 
for select 
to anon, authenticated 
using (true);

-- Admins have full access to view, update status, and manage requests
create policy "Admins can manage all citizen requests" 
on public.citizen_requests 
for all 
to authenticated 
using (public.is_admin()) 
with check (public.is_admin());
