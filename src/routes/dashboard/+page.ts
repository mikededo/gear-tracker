import type { PageLoad } from './$types';

import { QUERY_KEYS } from '$lib/constants';
import { getDashboard } from '$lib/queries/dashboard';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient, supabase, user } = await parent();

  queryClient.prefetchQuery({
    queryFn: () => getDashboard(supabase, user!.id),
    queryKey: QUERY_KEYS.dashboard
  });
};
