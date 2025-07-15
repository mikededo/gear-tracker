-- Restructure sports tables to separate static sports data from user-specific sports activities
-- This addresses the need for i18n support and better data organization
-- Remove sport_type enum usage and update all tables to reference the new static sports table

-- Drop existing RLS policies for sports table before renaming
drop policy if exists "Users can view own sports" on public.sports;
drop policy if exists "Users can insert own sports" on public.sports;
drop policy if exists "Users can update own sports" on public.sports;
drop policy if exists "Users can delete own sports" on public.sports;

-- Rename the current sports table to user_sports (represents user's activities/disciplines)
alter table public.sports rename to user_sports;

-- Rename the index to match the new table name
drop index if exists idx_sports_user_id;
create index idx_user_sports_user_id on public.user_sports(user_id);

-- Drop the trigger for the old table name
drop trigger if exists update_sports_updated_at on public.user_sports;

-- Create enum for the sport icons
create type sport_icon as enum (
  'icon_bike',
  'icon_run',
  'icon_shoe',
  'icon_swim',
  'icon_row',
  'icon_sky'
);

-- Create static sports table for i18n support (without sport_type)
create table public.sports (
  id uuid default uuid_generate_v4() primary key,
  key text not null unique,
  icon sport_icon not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert static sports data
insert into public.sports (key, icon) values
  ('sport_road_cycling', 'icon_bike'),
  ('sport_gravel_cycling', 'icon_bike'),
  ('sport_mtb_cycling', 'icon_bike'),
  ('sport_running', 'icon_run'),
  ('sport_trail_running', 'icon_run'),
  ('sport_swimming', 'icon_swim'),
  ('sport_triathlon', 'icon_bike'),
  ('sport_hiking', 'icon_shoe'),
  ('sport_walking', 'icon_shoe'),
  ('sport_rowing','icon_row'),
  ('sport_cross_country_skiing','icon_sky');

-- Update foreign key constraints to reference the new table structure
-- First, add a sport_id column to user_sports to reference the static sports table
alter table public.user_sports add column sport_id uuid references public.sports(id);

-- Update existing user_sports records to reference the appropriate sport
-- This is a basic mapping based on common sport names - you may need to adjust
update public.user_sports 
set sport_id = (
  select s.id from public.sports s 
  where s.key = case 
    when lower(user_sports.name) like '%road%' and lower(user_sports.name) like '%cycling%' then 'sport_road_cycling'
    when lower(user_sports.name) like '%gravel%' and lower(user_sports.name) like '%cycling%' then 'sport_gravel_cycling'
    when lower(user_sports.name) like '%mtb%' or lower(user_sports.name) like '%mountain%' then 'sport_mtb_cycling'
    when lower(user_sports.name) like '%cycling%' or lower(user_sports.name) like '%bike%' then 'sport_road_cycling'
    when lower(user_sports.name) like '%trail%' and lower(user_sports.name) like '%running%' then 'sport_trail_running'
    when lower(user_sports.name) like '%running%' or lower(user_sports.name) like '%run%' then 'sport_running'
    when lower(user_sports.name) like '%swimming%' or lower(user_sports.name) like '%swim%' then 'sport_swimming'
    when lower(user_sports.name) like '%triathlon%' or lower(user_sports.name) like '%tri%' then 'sport_triathlon'
    when lower(user_sports.name) like '%hiking%' or lower(user_sports.name) like '%hike%' then 'sport_hiking'
    when lower(user_sports.name) like '%walking%' or lower(user_sports.name) like '%walk%' then 'sport_walking'
    when lower(user_sports.name) like '%rowing%' or lower(user_sports.name) like '%row%' then 'sport_rowing'
    when lower(user_sports.name) like '%skiing%' or lower(user_sports.name) like '%ski%' then 'sport_cross_country_skiing'
    else 'sport_road_cycling' -- default fallback
  end
);

-- For any remaining null values, set to default sport
update public.user_sports 
set sport_id = (select id from public.sports where key = 'sport_road_cycling' limit 1)
where sport_id is null;

-- Make sport_id not null after updating existing records
alter table public.user_sports alter column sport_id set not null;

-- Create index for the new foreign key
create index idx_user_sports_sport_id on public.user_sports(sport_id);

-- Update the unique constraint to include sport_id instead of just name
alter table public.user_sports drop constraint sports_user_name_unique;
alter table public.user_sports add constraint user_sports_user_sport_name_unique unique (user_id, sport_id, name);

-- Update foreign key references in other tables
-- Update setups table to reference user_sports instead of sports
alter table public.setups rename column sport_id to user_sport_id;

-- Update the unique constraint in setups table
alter table public.setups drop constraint setups_sport_name_unique;
alter table public.setups add constraint setups_user_sport_name_unique unique (user_sport_id, name);

-- Update indexes
drop index if exists idx_setups_sport_id;
create index idx_setups_user_sport_id on public.setups(user_sport_id);

-- Update profiles table to reference sports instead of using sport_type enum
alter table public.profiles drop column if exists primary_sport;
alter table public.profiles add column primary_sport_id uuid references public.sports(id);

-- Drop the index on the old primary_sport column
drop index if exists idx_profiles_primary_sport;
create index idx_profiles_primary_sport_id on public.profiles(primary_sport_id);

-- Update gear_categories table to reference sports instead of using sport_type enum
alter table public.gear_categories drop column if exists sport_type;
alter table public.gear_categories add column sport_id uuid references public.sports(id);

-- Update existing gear categories to reference the appropriate sport
update public.gear_categories set sport_id = (
  select s.id from public.sports s 
  where s.key = case 
    when gear_categories.key like 'cycling_%' then 'sport_road_cycling'
    when gear_categories.key like 'running_%' then 'sport_running'
    when gear_categories.key like 'swimming_%' then 'sport_swimming'
    when gear_categories.key like 'triathlon_%' then 'sport_triathlon'
    when gear_categories.key like 'hiking_%' then 'sport_hiking'
    when gear_categories.key like 'rowing_%' then 'sport_rowing'
    when gear_categories.key like 'xc_skiing_%' then 'sport_cross_country_skiing'
    when gear_categories.key like 'shared_%' then 'sport_road_cycling' -- Default for shared items
    else 'sport_road_cycling' -- Default fallback
  end
);

-- For any remaining null values in gear_categories, set to default sport
update public.gear_categories 
set sport_id = (select id from public.sports where key = 'sport_road_cycling' limit 1)
where sport_id is null;

-- Make sport_id not null after updating existing records
alter table public.gear_categories alter column sport_id set not null;

-- Create index for the new foreign key
create index idx_gear_categories_sport_id on public.gear_categories(sport_id);

-- Enable RLS on the new static sports table
alter table public.sports enable row level security;

-- Create RLS policies for static sports table (read-only for authenticated users)
create policy "Authenticated users can view sports" on public.sports
  for select using ((select auth.role()) = 'authenticated');

-- Create RLS policies for user_sports table (renamed from sports)
create policy "Users can view own user sports" on public.user_sports
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert own user sports" on public.user_sports
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update own user sports" on public.user_sports
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own user sports" on public.user_sports
  for delete using ((select auth.uid()) = user_id);

-- Update RLS policies for setups table to work with the new structure
drop policy if exists "Users can view own setups" on public.setups;
drop policy if exists "Users can insert own setups" on public.setups;
drop policy if exists "Users can update own setups" on public.setups;
drop policy if exists "Users can delete own setups" on public.setups;

create policy "Users can view own setups" on public.setups
  for select using (
    exists (
      select 1 from public.user_sports 
      where user_sports.id = setups.user_sport_id 
      and user_sports.user_id = (select auth.uid())
    )
  );

create policy "Users can insert own setups" on public.setups
  for insert with check (
    exists (
      select 1 from public.user_sports 
      where user_sports.id = setups.user_sport_id 
      and user_sports.user_id = (select auth.uid())
    )
  );

create policy "Users can update own setups" on public.setups
  for update using (
    exists (
      select 1 from public.user_sports 
      where user_sports.id = setups.user_sport_id 
      and user_sports.user_id = (select auth.uid())
    )
  );

create policy "Users can delete own setups" on public.setups
  for delete using (
    exists (
      select 1 from public.user_sports 
      where user_sports.id = setups.user_sport_id 
      and user_sports.user_id = (select auth.uid())
    )
  );

-- Update RLS policies for setup_gear table to work with the new structure
drop policy if exists "Users can view own setup gear" on public.setup_gear;
drop policy if exists "Users can insert own setup gear" on public.setup_gear;
drop policy if exists "Users can update own setup gear" on public.setup_gear;
drop policy if exists "Users can delete own setup gear" on public.setup_gear;

create policy "Users can view own setup gear" on public.setup_gear
  for select using (
    exists (
      select 1 from public.setups
      join public.user_sports on user_sports.id = setups.user_sport_id
      where setups.id = setup_gear.setup_id
      and user_sports.user_id = (select auth.uid())
    )
  );

create policy "Users can insert own setup gear" on public.setup_gear
  for insert with check (
    exists (
      select 1 from public.setups
      join public.user_sports on user_sports.id = setups.user_sport_id
      where setups.id = setup_gear.setup_id
      and user_sports.user_id = (select auth.uid())
    )
    and
    exists (
      select 1 from public.gear_items
      where gear_items.id = setup_gear.gear_item_id
      and gear_items.user_id = (select auth.uid())
    )
  );

create policy "Users can update own setup gear" on public.setup_gear
  for update using (
    exists (
      select 1 from public.setups
      join public.user_sports on user_sports.id = setups.user_sport_id
      where setups.id = setup_gear.setup_id
      and user_sports.user_id = (select auth.uid())
    )
  );

create policy "Users can delete own setup gear" on public.setup_gear
  for delete using (
    exists (
      select 1 from public.setups
      join public.user_sports on user_sports.id = setups.user_sport_id
      where setups.id = setup_gear.setup_id
      and user_sports.user_id = (select auth.uid())
    )
  );

-- Recreate the timestamp trigger for the renamed table
create trigger update_user_sports_updated_at before update on public.user_sports
  for each row execute procedure public.update_updated_at_column();

-- Finally, drop the sport_type enum since it's no longer needed
drop type if exists sport_type cascade;
