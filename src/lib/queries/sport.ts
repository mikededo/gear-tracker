import type { Client } from '$lib/database';

import { createQuery } from '@tanstack/svelte-query';

import { QUERY_KEYS } from '$lib/constants';
import { useSupabaseClient } from '$lib/context/supabase';

import { getDashboard } from './dashboard';

type GetSportArgs = {
  user: string;
  sport: string;
};
export const getSport = async (client: Client, { sport, user }: GetSportArgs) =>
  getDashboard(client, user).eq('slug', sport).single();

export const useSportQuery = ({ sport, user }: GetSportArgs) => {
  const supabase = useSupabaseClient();

  return createQuery({
    queryFn: () => getSport(supabase, { sport, user }),
    queryKey: QUERY_KEYS.sport(sport)
  });
};
