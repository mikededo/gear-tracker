import type { DashboardData } from '$lib/queries/dashboard';
import type { Profile } from '$lib/queries/profile';

import type { LayoutLoad } from './$types';

import { fail } from '@sveltejs/kit';

import { QUERY_KEYS } from '$lib/constants';
import { getDashboard } from '$lib/queries/dashboard';
import { getProfile } from '$lib/queries/profile';

type Data<T> = { data: T; error?: null } | { error: Error; data?: null };

export const load: LayoutLoad = async ({ parent }) => {
  const { queryClient, supabase, user } = await parent();

  const [
    { data: profile, error: profileError },
    { data: dashboard, error: dashboardError }
  ] = await Promise.all<[Data<Profile>, Data<DashboardData>]>([
    await queryClient.fetchQuery({
      queryFn: () => getProfile(supabase, user!.id),
      queryKey: ['profile', user!.id]
    }),
    await queryClient.fetchQuery({
      queryFn: () => getDashboard(supabase, user!.id),
      queryKey: QUERY_KEYS.dashboard
    })
  ]);

  if (profileError || dashboardError) {
    throw fail(500, { message: 'Failed to load dashboard' });
  }

  return {
    dashboard,
    profile
  };
};

