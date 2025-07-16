import type { LayoutLoad } from './$types';

import { fail } from '@sveltejs/kit';

import { getProfile } from '$lib/queries/profile';

export const load: LayoutLoad = async ({ parent }) => {
  const { queryClient, supabase, user } = await parent();

  const { data, error } = await queryClient.fetchQuery({
    queryFn: () => getProfile(supabase, user!.id),
    queryKey: ['profile', user!.id]
  });

  if (error) {
    throw fail(500, { message: error.message });
  }

  return { profile: data };
};

