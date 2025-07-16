import type { Client, Result } from '$lib/database';

export type DashboardData = Result<typeof getDashboard>;

export const getDashboard = async (client: Client, user: string) => client.from('user_sports')
  .select(`
  id, name, slug,
  sports(*),
  setups(
    id, name, description,
    gear_items(
      *,
      gear_categories(*)
    )
  )
`)
  .eq('user_id', user);

