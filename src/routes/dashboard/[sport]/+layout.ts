import type { LayoutLoad } from './$types';

import { redirect } from '@sveltejs/kit';

import { QUERY_KEYS, ROUTES } from '$lib/constants';
import { getSport } from '$lib/queries/sport';

export const load: LayoutLoad = async ({ params, parent }) => {
  const { queryClient, supabase, user } = await parent();

  if (!user) {
    throw redirect(303, ROUTES.landing);
  }

  await queryClient.ensureQueryData({
    queryFn: () => getSport(supabase, { sport: params.sport, user: user.id }),
    queryKey: QUERY_KEYS.sport(params.sport)
  });

  return { sport: params.sport };
};
