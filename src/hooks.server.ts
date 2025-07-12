import type { Handle } from '@sveltejs/kit';

import { paraglideMiddleware } from '$lib/i18n/server';

const handleParaglide: Handle = ({ event, resolve }) => paraglideMiddleware(event.request, ({ locale, request }) => {
  event.request = request;

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
  });
});

export const handle: Handle = handleParaglide;
