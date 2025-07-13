-- Fix RLS performance issues by optimizing auth function calls
-- This addresses the auth_rls_initplan advisory warnings

-- Drop existing RLS policies
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

drop policy if exists "Users can view own sports" on public.sports;
drop policy if exists "Users can insert own sports" on public.sports;
drop policy if exists "Users can update own sports" on public.sports;
drop policy if exists "Users can delete own sports" on public.sports;

drop policy if exists "Users can view own setups" on public.setups;
drop policy if exists "Users can insert own setups" on public.setups;
drop policy if exists "Users can update own setups" on public.setups;
drop policy if exists "Users can delete own setups" on public.setups;

drop policy if exists "Authenticated users can view gear categories" on public.gear_categories;

drop policy if exists "Users can view own gear items" on public.gear_items;
drop policy if exists "Users can insert own gear items" on public.gear_items;
drop policy if exists "Users can update own gear items" on public.gear_items;
drop policy if exists "Users can delete own gear items" on public.gear_items;

drop policy if exists "Users can view own setup gear" on public.setup_gear;
drop policy if exists "Users can insert own setup gear" on public.setup_gear;
drop policy if exists "Users can update own setup gear" on public.setup_gear;
drop policy if exists "Users can delete own setup gear" on public.setup_gear;

drop policy if exists "Users can view own activities" on public.activities;
drop policy if exists "Users can insert own activities" on public.activities;
drop policy if exists "Users can update own activities" on public.activities;
drop policy if exists "Users can delete own activities" on public.activities;

drop policy if exists "Users can view own activity gear usage" on public.activity_gear_usage;
drop policy if exists "Users can insert own activity gear usage" on public.activity_gear_usage;
drop policy if exists "Users can update own activity gear usage" on public.activity_gear_usage;
drop policy if exists "Users can delete own activity gear usage" on public.activity_gear_usage;

drop policy if exists "Users can view own closet items" on public.closet_items;
drop policy if exists "Users can insert own closet items" on public.closet_items;
drop policy if exists "Users can update own closet items" on public.closet_items;
drop policy if exists "Users can delete own closet items" on public.closet_items;

-- Create optimized RLS policies for profiles
create policy "Users can view own profile" on public.profiles
  for select using ((select auth.uid()) = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile" on public.profiles
  for update using ((select auth.uid()) = id);

-- Create optimized RLS policies for sports
create policy "Users can view own sports" on public.sports
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert own sports" on public.sports
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update own sports" on public.sports
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own sports" on public.sports
  for delete using ((select auth.uid()) = user_id);

-- Create optimized RLS policies for setups
create policy "Users can view own setups" on public.setups
  for select using (
    exists (
      select 1 from public.sports 
      where sports.id = setups.sport_id 
      and sports.user_id = (select auth.uid())
    )
  );

create policy "Users can insert own setups" on public.setups
  for insert with check (
    exists (
      select 1 from public.sports 
      where sports.id = setups.sport_id 
      and sports.user_id = (select auth.uid())
    )
  );

create policy "Users can update own setups" on public.setups
  for update using (
    exists (
      select 1 from public.sports 
      where sports.id = setups.sport_id 
      and sports.user_id = (select auth.uid())
    )
  );

create policy "Users can delete own setups" on public.setups
  for delete using (
    exists (
      select 1 from public.sports 
      where sports.id = setups.sport_id 
      and sports.user_id = (select auth.uid())
    )
  );

-- Create optimized RLS policies for gear_categories
create policy "Authenticated users can view gear categories" on public.gear_categories
  for select using ((select auth.role()) = 'authenticated');

-- Create optimized RLS policies for gear_items
create policy "Users can view own gear items" on public.gear_items
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert own gear items" on public.gear_items
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update own gear items" on public.gear_items
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own gear items" on public.gear_items
  for delete using ((select auth.uid()) = user_id);

-- Create optimized RLS policies for setup_gear
create policy "Users can view own setup gear" on public.setup_gear
  for select using (
    exists (
      select 1 from public.setups
      join public.sports on sports.id = setups.sport_id
      where setups.id = setup_gear.setup_id
      and sports.user_id = (select auth.uid())
    )
  );

create policy "Users can insert own setup gear" on public.setup_gear
  for insert with check (
    exists (
      select 1 from public.setups
      join public.sports on sports.id = setups.sport_id
      where setups.id = setup_gear.setup_id
      and sports.user_id = (select auth.uid())
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
      join public.sports on sports.id = setups.sport_id
      where setups.id = setup_gear.setup_id
      and sports.user_id = (select auth.uid())
    )
  );

create policy "Users can delete own setup gear" on public.setup_gear
  for delete using (
    exists (
      select 1 from public.setups
      join public.sports on sports.id = setups.sport_id
      where setups.id = setup_gear.setup_id
      and sports.user_id = (select auth.uid())
    )
  );

-- Create optimized RLS policies for activities
create policy "Users can view own activities" on public.activities
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert own activities" on public.activities
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update own activities" on public.activities
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own activities" on public.activities
  for delete using ((select auth.uid()) = user_id);

-- Create optimized RLS policies for activity_gear_usage
create policy "Users can view own activity gear usage" on public.activity_gear_usage
  for select using (
    exists (
      select 1 from public.activities
      where activities.id = activity_gear_usage.activity_id
      and activities.user_id = (select auth.uid())
    )
  );

create policy "Users can insert own activity gear usage" on public.activity_gear_usage
  for insert with check (
    exists (
      select 1 from public.activities
      where activities.id = activity_gear_usage.activity_id
      and activities.user_id = (select auth.uid())
    )
    and
    exists (
      select 1 from public.gear_items
      where gear_items.id = activity_gear_usage.gear_item_id
      and gear_items.user_id = (select auth.uid())
    )
  );

create policy "Users can update own activity gear usage" on public.activity_gear_usage
  for update using (
    exists (
      select 1 from public.activities
      where activities.id = activity_gear_usage.activity_id
      and activities.user_id = (select auth.uid())
    )
  );

create policy "Users can delete own activity gear usage" on public.activity_gear_usage
  for delete using (
    exists (
      select 1 from public.activities
      where activities.id = activity_gear_usage.activity_id
      and activities.user_id = (select auth.uid())
    )
  );

-- Create optimized RLS policies for closet_items
create policy "Users can view own closet items" on public.closet_items
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert own closet items" on public.closet_items
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update own closet items" on public.closet_items
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own closet items" on public.closet_items
  for delete using ((select auth.uid()) = user_id);
