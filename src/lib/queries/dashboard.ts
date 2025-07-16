import type { Client, Result } from '$lib/database';

import { createQuery } from '@tanstack/svelte-query';

import { QUERY_KEYS } from '$lib/constants';
import { useSupabaseClient } from '$lib/context/supabase';

export type DashboardData = Result<typeof getDashboard>;

export const getDashboard = async (client: Client, user: string) => client.from('user_sports')
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
    queryFn: () => getDashboard(supabase, user),
    queryKey: QUERY_KEYS.dashboard
  });
};

