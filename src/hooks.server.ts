import type { Handle } from '@sveltejs/kit';

import { createServerClient } from '@supabase/ssr';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { getThemeCookie, THEME_COOKIE } from '$lib/context/theme.svelte';
import { paraglideMiddleware } from '$lib/i18n/server';

const paraglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ locale, request }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
    });
  });

// See: https://supabase.com/docs/guides/auth/server-side/sveltekit
const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, options, value }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  event.locals.safeGetSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    if (!session) {
      return { session: null, user: null };
    }

    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      // JWT validation has failed
      return { session: null, user: null };
    }

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;

  if (!event.locals.session && event.url.pathname.startsWith('/private')) {
    redirect(303, '/auth');
  }

  if (event.locals.session && event.url.pathname === '/auth') {
    redirect(303, '/private');
  }

  return resolve(event);
};

const theme: Handle = ({ event, resolve }) => {
  const cookie = getThemeCookie(event.cookies);
  event.cookies.set(THEME_COOKIE, cookie, {
    path: '/'
  });

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%theme%', cookie)
  });
};

export const handle: Handle = sequence(paraglide, supabase, authGuard, theme);
