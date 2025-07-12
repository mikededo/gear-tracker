-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create sport type enum (focused on endurance sports)
create type sport_type as enum (
  'cycling',
  'running',
  'swimming',
  'triathlon',
  'hiking',
  'walking',
  'rowing',
  'cross_country_skiing',
  'both' -- for shared gear categories
);

-- Create profiles table
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  first_name text,
  last_name text,
  primary_sport sport_type default 'cycling', -- User's primary sport for better UX
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create sports table
create table public.sports (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint sports_user_name_unique unique (user_id, name)
);

-- Create setups table
create table public.setups (
  id uuid default uuid_generate_v4() primary key,
  sport_id uuid references public.sports(id) on delete cascade not null,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint setups_sport_name_unique unique (sport_id, name)
);

-- Create gear_categories table (static data)
create table public.gear_categories (
  id uuid default uuid_generate_v4() primary key,
  key text not null unique, -- Unique identifier for i18n (e.g., 'bikes', 'running_shoes')
  sport_type sport_type not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create gear_items table
create table public.gear_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  category_id uuid references public.gear_categories(id) not null,
  name text not null,
  brand text,
  model text,
  description text,
  purchase_date date,
  purchase_price decimal(10,2),
  current_usage decimal(10,2) default 0 not null,
  max_usage decimal(10,2),
  tracking_unit text not null check (tracking_unit in ('distance', 'hours')) default 'distance',
  is_archived boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create setup_gear junction table
create table public.setup_gear (
  id uuid default uuid_generate_v4() primary key,
  setup_id uuid references public.setups(id) on delete cascade not null,
  gear_item_id uuid references public.gear_items(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint setup_gear_unique unique (setup_id, gear_item_id)
);

-- Create activities table
create table public.activities (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  setup_id uuid references public.setups(id) on delete set null,
  name text not null,
  date date not null,
  duration_hours decimal(5,2),
  distance_km decimal(8,2),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create activity_gear_usage table
create table public.activity_gear_usage (
  id uuid default uuid_generate_v4() primary key,
  activity_id uuid references public.activities(id) on delete cascade not null,
  gear_item_id uuid references public.gear_items(id) on delete cascade not null,
  usage_amount decimal(8,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint activity_gear_usage_unique unique (activity_id, gear_item_id)
);

-- Create closet_items table
create table public.closet_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  brand text,
  type text not null,
  color text,
  size text,
  material text,
  weather_conditions text[],
  sport_types text[],
  is_archived boolean default false not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better performance
create index idx_profiles_primary_sport on public.profiles(primary_sport);
create index idx_sports_user_id on public.sports(user_id);
create index idx_setups_sport_id on public.setups(sport_id);
create index idx_gear_items_user_id on public.gear_items(user_id);
create index idx_gear_items_category_id on public.gear_items(category_id);
create index idx_gear_items_archived on public.gear_items(is_archived);
create index idx_setup_gear_setup_id on public.setup_gear(setup_id);
create index idx_setup_gear_gear_item_id on public.setup_gear(gear_item_id);
create index idx_activities_user_id on public.activities(user_id);
create index idx_activities_setup_id on public.activities(setup_id);
create index idx_activities_date on public.activities(date);
create index idx_activity_gear_usage_activity_id on public.activity_gear_usage(activity_id);
create index idx_activity_gear_usage_gear_item_id on public.activity_gear_usage(gear_item_id);
create index idx_closet_items_user_id on public.closet_items(user_id);
create index idx_closet_items_archived on public.closet_items(is_archived);

-- Insert default gear categories
-- Naming convention: SPORT_CATEGORY (e.g., cycling_bikes, running_shoes, shared_helmets)
insert into public.gear_categories (key, sport_type) values
  -- Cycling gear
  ('cycling_bikes', 'cycling'),
  ('cycling_wheelsets', 'cycling'),
  ('cycling_chains', 'cycling'),
  ('cycling_cassettes', 'cycling'),
  ('cycling_brake_pads', 'cycling'),
  ('cycling_tires', 'cycling'),
  ('cycling_pedals', 'cycling'),
  ('cycling_saddles', 'cycling'),
  ('cycling_handlebars', 'cycling'),
  ('cycling_stems', 'cycling'),
  ('cycling_power_meters', 'cycling'),
  ('cycling_computers', 'cycling'),
  
  -- Running gear
  ('running_shoes', 'running'),
  ('running_insoles', 'running'),
  
  -- Swimming gear
  ('swimming_goggles', 'swimming'),
  ('swimming_suits', 'swimming'),
  ('swimming_caps', 'swimming'),
  
  -- Triathlon gear
  ('triathlon_wetsuits', 'triathlon'),
  ('triathlon_transition_bags', 'triathlon'),
  
  -- Hiking gear
  ('hiking_boots', 'hiking'),
  ('hiking_poles', 'hiking'),
  ('hiking_backpacks', 'hiking'),
  
  -- Rowing gear
  ('rowing_oars', 'rowing'),
  ('rowing_seats', 'rowing'),
  
  -- Cross-country skiing gear
  ('xc_skiing_skis', 'cross_country_skiing'),
  ('xc_skiing_boots', 'cross_country_skiing'),
  ('xc_skiing_poles', 'cross_country_skiing'),
  
  -- Shared gear (usable for multiple sports)
  ('shared_helmets', 'both'),
  ('shared_watches', 'both'),
  ('shared_heart_rate_monitors', 'both');

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.sports enable row level security;
alter table public.setups enable row level security;
alter table public.gear_categories enable row level security;
alter table public.gear_items enable row level security;
alter table public.setup_gear enable row level security;
alter table public.activities enable row level security;
alter table public.activity_gear_usage enable row level security;
alter table public.closet_items enable row level security;

-- Create RLS policies for profiles
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Create RLS policies for sports
create policy "Users can view own sports" on public.sports
  for select using (auth.uid() = user_id);

create policy "Users can insert own sports" on public.sports
  for insert with check (auth.uid() = user_id);

create policy "Users can update own sports" on public.sports
  for update using (auth.uid() = user_id);

create policy "Users can delete own sports" on public.sports
  for delete using (auth.uid() = user_id);

-- Create RLS policies for setups
create policy "Users can view own setups" on public.setups
  for select using (
    exists (
      select 1 from public.sports 
      where sports.id = setups.sport_id 
      and sports.user_id = auth.uid()
    )
  );

create policy "Users can insert own setups" on public.setups
  for insert with check (
    exists (
      select 1 from public.sports 
      where sports.id = setups.sport_id 
      and sports.user_id = auth.uid()
    )
  );

create policy "Users can update own setups" on public.setups
  for update using (
    exists (
      select 1 from public.sports 
      where sports.id = setups.sport_id 
      and sports.user_id = auth.uid()
    )
  );

create policy "Users can delete own setups" on public.setups
  for delete using (
    exists (
      select 1 from public.sports 
      where sports.id = setups.sport_id 
      and sports.user_id = auth.uid()
    )
  );

-- Create RLS policies for gear_categories (read-only for all authenticated users)
create policy "Authenticated users can view gear categories" on public.gear_categories
  for select using (auth.role() = 'authenticated');

-- Create RLS policies for gear_items
create policy "Users can view own gear items" on public.gear_items
  for select using (auth.uid() = user_id);

create policy "Users can insert own gear items" on public.gear_items
  for insert with check (auth.uid() = user_id);

create policy "Users can update own gear items" on public.gear_items
  for update using (auth.uid() = user_id);

create policy "Users can delete own gear items" on public.gear_items
  for delete using (auth.uid() = user_id);

-- Create RLS policies for setup_gear
create policy "Users can view own setup gear" on public.setup_gear
  for select using (
    exists (
      select 1 from public.setups
      join public.sports on sports.id = setups.sport_id
      where setups.id = setup_gear.setup_id
      and sports.user_id = auth.uid()
    )
  );

create policy "Users can insert own setup gear" on public.setup_gear
  for insert with check (
    exists (
      select 1 from public.setups
      join public.sports on sports.id = setups.sport_id
      where setups.id = setup_gear.setup_id
      and sports.user_id = auth.uid()
    )
    and
    exists (
      select 1 from public.gear_items
      where gear_items.id = setup_gear.gear_item_id
      and gear_items.user_id = auth.uid()
    )
  );

create policy "Users can update own setup gear" on public.setup_gear
  for update using (
    exists (
      select 1 from public.setups
      join public.sports on sports.id = setups.sport_id
      where setups.id = setup_gear.setup_id
      and sports.user_id = auth.uid()
    )
  );

create policy "Users can delete own setup gear" on public.setup_gear
  for delete using (
    exists (
      select 1 from public.setups
      join public.sports on sports.id = setups.sport_id
      where setups.id = setup_gear.setup_id
      and sports.user_id = auth.uid()
    )
  );

-- Create RLS policies for activities
create policy "Users can view own activities" on public.activities
  for select using (auth.uid() = user_id);

create policy "Users can insert own activities" on public.activities
  for insert with check (auth.uid() = user_id);

create policy "Users can update own activities" on public.activities
  for update using (auth.uid() = user_id);

create policy "Users can delete own activities" on public.activities
  for delete using (auth.uid() = user_id);

-- Create RLS policies for activity_gear_usage
create policy "Users can view own activity gear usage" on public.activity_gear_usage
  for select using (
    exists (
      select 1 from public.activities
      where activities.id = activity_gear_usage.activity_id
      and activities.user_id = auth.uid()
    )
  );

create policy "Users can insert own activity gear usage" on public.activity_gear_usage
  for insert with check (
    exists (
      select 1 from public.activities
      where activities.id = activity_gear_usage.activity_id
      and activities.user_id = auth.uid()
    )
    and
    exists (
      select 1 from public.gear_items
      where gear_items.id = activity_gear_usage.gear_item_id
      and gear_items.user_id = auth.uid()
    )
  );

create policy "Users can update own activity gear usage" on public.activity_gear_usage
  for update using (
    exists (
      select 1 from public.activities
      where activities.id = activity_gear_usage.activity_id
      and activities.user_id = auth.uid()
    )
  );

create policy "Users can delete own activity gear usage" on public.activity_gear_usage
  for delete using (
    exists (
      select 1 from public.activities
      where activities.id = activity_gear_usage.activity_id
      and activities.user_id = auth.uid()
    )
  );

-- Create RLS policies for closet_items
create policy "Users can view own closet items" on public.closet_items
  for select using (auth.uid() = user_id);

create policy "Users can insert own closet items" on public.closet_items
  for insert with check (auth.uid() = user_id);

create policy "Users can update own closet items" on public.closet_items
  for update using (auth.uid() = user_id);

create policy "Users can delete own closet items" on public.closet_items
  for delete using (auth.uid() = user_id);

-- Create function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
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

-- Create trigger for new user profile creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create function to update gear usage
create or replace function public.update_gear_usage()
returns trigger
language plpgsql
security definer set search_path = public
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

-- Create trigger to automatically update gear usage
create trigger update_gear_usage_trigger
  after insert or update or delete on public.activity_gear_usage
  for each row execute procedure public.update_gear_usage();

-- Create function to update timestamps
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Create triggers for updated_at timestamps
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
