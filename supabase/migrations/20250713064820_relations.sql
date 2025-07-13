-- Modify setup_gear table to use composite primary key for better many-to-many relationship detection

-- Drop the existing unique constraint since we'll be using the composite key as primary
alter table public.setup_gear drop constraint setup_gear_unique;

-- Drop the existing primary key
alter table public.setup_gear drop constraint setup_gear_pkey;

-- Drop the id column
alter table public.setup_gear drop column id;

-- Add the composite primary key
alter table public.setup_gear add constraint setup_gear_pkey primary key (setup_id, gear_item_id);

-- Update the RLS policies to work without the id column
-- (The existing policies should still work since they don't reference the id)

-- Recreate indexes for performance (optional, but recommended)
-- The primary key constraint automatically creates an index, but we might want additional ones
create index if not exists idx_setup_gear_gear_item_id on public.setup_gear(gear_item_id);