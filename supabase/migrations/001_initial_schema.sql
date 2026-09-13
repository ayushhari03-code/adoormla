-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================
-- ADMIN AUTHORIZATION
-- ==========================================
create table if not exists public.admins (
    user_id uuid references auth.users(id) on delete cascade primary key,
    created_at timestamptz default now()
);

-- Enable RLS on admins table (locked down)
alter table public.admins enable row level security;

-- Nobody can insert/update/delete via public API.
-- Only superusers/service role (via Supabase dashboard) can modify this table.
create policy "Admins are viewable by everyone" on public.admins for select using (true);

-- Helper function to check if the current user is an admin
create or replace function public.is_admin()
returns boolean as $$
begin
    return exists (
        select 1 from public.admins where user_id = auth.uid()
    );
end;
$$ language plpgsql security definer;

-- ==========================================
-- 1. POSTS TABLE
-- ==========================================
create table if not exists public.posts (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    slug text not null unique,
    content text not null,
    excerpt text,
    category text,
    cover_image_url text,
    published boolean default false,
    published_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    created_by uuid references auth.users(id) on delete set null
);

-- ==========================================
-- 2. POST IMAGES TABLE
-- ==========================================
create table if not exists public.post_images (
    id uuid primary key default gen_random_uuid(),
    post_id uuid references public.posts(id) on delete cascade not null,
    image_url text not null,
    alt_text text,
    display_order integer default 0,
    created_at timestamptz default now()
);

-- ==========================================
-- 3. EVENTS TABLE
-- ==========================================
create table if not exists public.events (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    slug text not null unique,
    description text not null,
    event_date timestamptz not null,
    location text,
    cover_image_url text,
    published boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    created_by uuid references auth.users(id) on delete set null
);

-- ==========================================
-- 4. PROJECTS TABLE
-- ==========================================
create table if not exists public.projects (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    slug text not null unique,
    description text not null,
    cover_image_url text,
    status text,
    published boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    created_by uuid references auth.users(id) on delete set null
);

-- ==========================================
-- 5. GALLERY TABLE
-- ==========================================
create table if not exists public.gallery (
    id uuid primary key default gen_random_uuid(),
    title text,
    description text,
    image_url text not null,
    category text not null,
    display_order integer default 0,
    published boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    created_by uuid references auth.users(id) on delete set null
);

-- ==========================================
-- TRIGGERS
-- ==========================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_posts_updated_at before update on public.posts for each row execute procedure public.handle_updated_at();
create trigger set_events_updated_at before update on public.events for each row execute procedure public.handle_updated_at();
create trigger set_projects_updated_at before update on public.projects for each row execute procedure public.handle_updated_at();
create trigger set_gallery_updated_at before update on public.gallery for each row execute procedure public.handle_updated_at();

-- ==========================================
-- ENABLE RLS ON ALL TABLES
-- ==========================================
alter table public.posts enable row level security;
alter table public.post_images enable row level security;
alter table public.events enable row level security;
alter table public.projects enable row level security;
alter table public.gallery enable row level security;

-- ==========================================
-- PUBLIC POLICIES (SELECT published only)
-- ==========================================
create policy "Allow public to read published posts" on public.posts for select using (published = true);
create policy "Allow public to read images of published posts" on public.post_images for select using (
    exists (select 1 from public.posts where posts.id = post_images.post_id and posts.published = true)
);
create policy "Allow public to read published events" on public.events for select using (published = true);
create policy "Allow public to read published projects" on public.projects for select using (published = true);
create policy "Allow public to read published gallery items" on public.gallery for select using (published = true);

-- ==========================================
-- ADMIN POLICIES (Strictly locked to public.is_admin())
-- ==========================================
create policy "Admins can manage posts" on public.posts for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage post_images" on public.post_images for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage events" on public.events for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage gallery" on public.gallery for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ==========================================
-- STORAGE BUCKET CONFIGURATION
-- ==========================================
insert into storage.buckets (id, name, public) values ('website-images', 'website-images', true) on conflict (id) do nothing;

-- ==========================================
-- STORAGE POLICIES
-- ==========================================
create policy "Public Access to images" on storage.objects for select using ( bucket_id = 'website-images' );

-- Admins can manage images
create policy "Admins can upload images" on storage.objects for insert to authenticated with check ( bucket_id = 'website-images' and public.is_admin() );
create policy "Admins can update images" on storage.objects for update to authenticated using ( bucket_id = 'website-images' and public.is_admin() );
create policy "Admins can delete images" on storage.objects for delete to authenticated using ( bucket_id = 'website-images' and public.is_admin() );
