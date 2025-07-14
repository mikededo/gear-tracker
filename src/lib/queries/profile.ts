import type { Client, Result } from '$lib/database';

export type Profile = Result<typeof getProfile>;

export const getProfile = (client: Client, id: string) =>
  client.from('profiles').select('*').eq('id', id).single();

