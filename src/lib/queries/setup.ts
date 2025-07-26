
import type { Client } from '$lib/database';

import { createQuery } from '@tanstack/svelte-query';

import { QUERY_KEYS } from '$lib/constants';
import { useSupabaseClient } from '$lib/context/supabase';

type GetSlugArgs = {
  setup: string;
  user: string;
  sport: string;
};
export const getSetup = async (client: Client, { setup, sport, user }: GetSlugArgs) =>
  client.from('setups')
    .select('*, user_sports(slug, user_id)')
    .eq('user_sports.user_id', user)
    .eq('user_sports.slug', sport)
    .eq('slug', setup)
    .single();

export const useSetupQuery = (args: GetSlugArgs) => {
  const supabase = useSupabaseClient();

  return createQuery({
    queryFn: () => getSetup(supabase, args),
    queryKey: QUERY_KEYS.setup(args.sport, args.setup)
  });
};
