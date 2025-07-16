-- Add slug to sports table
alter table public.sports add column slug text;

update public.sports 
set slug = lower(replace(replace(replace(key, 'sport_', ''), ' ', '-'), '_', '-'));

alter table public.sports alter column slug set not null;
alter table public.sports add constraint sports_slug_unique unique (slug);

-- Add slug to setups table
alter table public.setups add column slug text;

update public.setups
set slug = lower(replace(replace(name, ' ', '-'), '_', '-'));

alter table public.setups alter column slug set not null;
alter table public.setups add constraint setups_slug_unique unique (slug, user_id);

-- Add slug to user_sports table
alter table public.user_sports add column slug text;

update public.user_sports
set slug = lower(replace(replace(name, ' ', '-'), '_', '-'));

alter table public.user_sports alter column slug set not null;
alter table public.user_sports add constraint user_sports_slug_unique unique (slug, user_id);
