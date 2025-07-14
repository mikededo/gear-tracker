import type { Client, Result } from '$lib/database';

export type DashboardData = Result<typeof getDashboard>;

export const getDashboard = async (client: Client, user: string) => client.from('sports')
  .select(`
  id, name,
  setups(
    id, name, description,
    gear_items(
      *,
      gear_categories(*)
    )
  )
`)
  .eq('user_id', user);

