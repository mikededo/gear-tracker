import type { Client, Result } from '$lib/database';

import { createQuery } from '@tanstack/svelte-query';

import { QUERY_KEYS } from '$lib/constants';
import { useSupabaseClient } from '$lib/context/supabase';

export type DashboardData = Result<typeof getDashboard>;
export type DashboardSetup = DashboardData[number]['setups'][number];
export type DashboardSetupGear = DashboardData[number]['setups'][number]['gear_items'][number];
export type DashboardSport = DashboardData[number];

export const getDashboard = (client: Client, user: string) => client.from('user_sports')
  .select(`
  id, name, slug,
  ...sports(key, icon),
  setups(
    id, name, slug, description,
    gear_items(
      *,
      gear_categories(*)
    )
  )
`)
  .eq('user_id', user);

export const useDashboardQuery = (user: string) => {
  const supabase = useSupabaseClient();

  return createQuery({
    queryFn: async () => await getDashboard(supabase, user),
    queryKey: QUERY_KEYS.dashboard
  });
};

