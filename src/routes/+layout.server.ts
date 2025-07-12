import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals: { safeGetSession } }) => ({
  cookies: cookies.getAll(),
  session: await safeGetSession()
});
