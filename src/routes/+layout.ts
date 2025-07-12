import type { LayoutLoad } from './$types';

import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { QueryClient } from '@tanstack/svelte-query';

import { browser } from '$app/environment';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { getThemeCookie } from '$lib/context/theme.svelte';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  /**
   * Declare a dependency so the layout can be invalidated, for example, on
   * session refresh.
   */
  depends('supabase:auth');

  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, { global: { fetch } })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
          getAll() {
            return data.cookies;
          }
        },
        global: { fetch }
      });

  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();

  const queryClient = new QueryClient({
    defaultOptions: { queries: { enabled: browser } }
  });

  return {
    queryClient,
    session,
    supabase,
    theme: getThemeCookie(data.cookies),
    user
  };
};

