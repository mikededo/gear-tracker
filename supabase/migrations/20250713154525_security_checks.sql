-- Fix function search path security issues
-- This addresses the function_search_path_mutable security warnings

-- Drop triggers that depend on the functions first
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists update_gear_usage_trigger on public.activity_gear_usage;
drop trigger if exists update_profiles_updated_at on public.profiles;
drop trigger if exists update_sports_updated_at on public.sports;
drop trigger if exists update_setups_updated_at on public.setups;
drop trigger if exists update_gear_items_updated_at on public.gear_items;
drop trigger if exists update_activities_updated_at on public.activities;
drop trigger if exists update_closet_items_updated_at on public.closet_items;

-- Drop and recreate handle_new_user function with secure search_path
drop function if exists public.handle_new_user();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  return new;
end;
$$;

-- Drop and recreate update_gear_usage function with secure search_path
drop function if exists public.update_gear_usage();

create or replace function public.update_gear_usage()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  -- Update gear item usage when activity gear usage is inserted or updated
  if TG_OP = 'INSERT' then
    update public.gear_items
    set current_usage = current_usage + new.usage_amount,
        updated_at = now()
    where id = new.gear_item_id;
    return new;
  elsif TG_OP = 'UPDATE' then
    update public.gear_items
    set current_usage = current_usage - old.usage_amount + new.usage_amount,
        updated_at = now()
    where id = new.gear_item_id;
    return new;
  elsif TG_OP = 'DELETE' then
    update public.gear_items
    set current_usage = current_usage - old.usage_amount,
        updated_at = now()
    where id = old.gear_item_id;
    return old;
  end if;
  return null;
end;
$$;

-- Drop and recreate update_updated_at_column function with secure search_path
drop function if exists public.update_updated_at_column();

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Recreate all triggers since we dropped them
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger update_gear_usage_trigger
  after insert or update or delete on public.activity_gear_usage
  for each row execute procedure public.update_gear_usage();

create trigger update_profiles_updated_at before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

create trigger update_sports_updated_at before update on public.sports
  for each row execute procedure public.update_updated_at_column();

create trigger update_setups_updated_at before update on public.setups
  for each row execute procedure public.update_updated_at_column();

create trigger update_gear_items_updated_at before update on public.gear_items
  for each row execute procedure public.update_updated_at_column();

create trigger update_activities_updated_at before update on public.activities
  for each row execute procedure public.update_updated_at_column();

create trigger update_closet_items_updated_at before update on public.closet_items
  for each row execute procedure public.update_updated_at_column();
