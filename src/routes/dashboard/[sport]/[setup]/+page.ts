import type { PageLoad } from './$types';

import { redirect } from '@sveltejs/kit';

import { QUERY_KEYS, ROUTES } from '$lib/constants';
import { getSetup } from '$lib/queries/setup';

export const load: PageLoad = async ({ params, parent }) => {
  const { queryClient, supabase, user } = await parent();

  if (!user) {
    throw redirect(303, ROUTES.landing);
  }

  await queryClient.ensureQueryData({
    queryFn: () => getSetup(supabase, { ...params, user: user.id }),
    queryKey: QUERY_KEYS.setup(params.sport, params.setup)
  });

  return { ...params };
};
