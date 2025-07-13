import type { LayoutLoad } from './$types';

import { redirect } from '@sveltejs/kit';

import { ROUTES } from '$lib/constants';

export const load: LayoutLoad = async ({ parent }) => {
  const { session } = await parent();

  if (session) {
    throw redirect(303, ROUTES.dashboard);
  }
};

