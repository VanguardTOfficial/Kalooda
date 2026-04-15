-- Issue: Configurable delivery zones with PostGIS polygons (Nazareth launch)

create extension if not exists postgis;

create table if not exists public.delivery_zones (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text not null,
  is_active boolean not null default true,
  boundary geometry(polygon, 4326) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists delivery_zones_boundary_gix
  on public.delivery_zones using gist (boundary);

alter table public.delivery_zones enable row level security;

drop policy if exists "delivery_zones_select_active_public" on public.delivery_zones;
create policy "delivery_zones_select_active_public"
  on public.delivery_zones for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "delivery_zones_insert_super_admin" on public.delivery_zones;
create policy "delivery_zones_insert_super_admin"
  on public.delivery_zones for insert
  to authenticated
  with check (public.is_super_admin());

drop policy if exists "delivery_zones_update_super_admin" on public.delivery_zones;
create policy "delivery_zones_update_super_admin"
  on public.delivery_zones for update
  to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "delivery_zones_delete_super_admin" on public.delivery_zones;
create policy "delivery_zones_delete_super_admin"
  on public.delivery_zones for delete
  to authenticated
  using (public.is_super_admin());

create or replace function public.is_point_in_active_delivery_zone(
  p_lat double precision,
  p_lng double precision
)
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.delivery_zones dz
    where dz.is_active = true
      and st_contains(
        dz.boundary,
        st_setsrid(st_point(p_lng, p_lat), 4326)
      )
  );
$$;

grant execute on function public.is_point_in_active_delivery_zone(double precision, double precision)
  to anon, authenticated;

insert into public.delivery_zones (name_en, name_ar, is_active, boundary)
values (
  'Nazareth',
  'الناصرة',
  true,
  st_geomfromtext(
    'POLYGON((
      35.2730 32.7280,
      35.3340 32.7280,
      35.3340 32.7140,
      35.3180 32.6900,
      35.2920 32.6760,
      35.2680 32.6940,
      35.2620 32.7150,
      35.2730 32.7280
    ))',
    4326
  )
)
on conflict do nothing;
