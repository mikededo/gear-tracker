
import type { Client } from '$lib/database';

import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

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

type CreateSetupArgs = {
  name: string;
  slug: string;
  description: string;
  sportId: string;
};
export const createSetup = (client: Client, {
  description,
  name,
  slug,
  sportId
}: CreateSetupArgs) =>
  client.from('setups').insert({
    description,
    name,
    slug,
    user_sport_id: sportId
  }).select('*, user_sports(slug, user_id)').single();

export const useCreateSetup = () => {
  const client = useQueryClient();
  const supabase = useSupabaseClient();

  return createMutation({
    mutationFn: async (args: CreateSetupArgs) => await createSetup(supabase, args),
    onSuccess: ({ data }) => {
      // Ts check
      if (!data) {
        return;
      }

      client.invalidateQueries({ queryKey: QUERY_KEYS.sport(data.user_sports.slug) });
      client.invalidateQueries({ exact: true, queryKey: QUERY_KEYS.dashboard });
    }
  });
};
