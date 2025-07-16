import type { Client } from '$lib/database';

import { getContext, setContext } from 'svelte';

const CLIENT_CONTEXT_KEY = 'supabase:client';

export const setSupabaseClient = (client: Client) => {
  setContext(CLIENT_CONTEXT_KEY, client);
};

export const useSupabaseClient = (): Client => {
  const context = getContext<Client | null>(CLIENT_CONTEXT_KEY);
  if (!context) {
    throw new Error('Supabase client not found in context');
  }

  return context;
};
