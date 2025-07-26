type Slug = string;

export const ROUTES = {
  actions: {
    authSignIn: '/auth?/sign-in',
    authSignUp: '/auth?/sign-up'
  },
  api: { setCookie: '/api/set-cookie' },
  auth: {
    base: '/auth',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up'
  },
  dashboard: '/dashboard',
  landing: '/',
  setup: (sport: Slug, setup: Slug) => `/dashboard/${sport}/${setup}`,
  sport: (sport: Slug) => `/dashboard/${sport}`
};

export const QUERY_KEYS = {
  dashboard: ['dashboard'],
  setup: (sport: Slug, setup: Slug) => ['dashboard', sport, setup],
  sport: (sport: Slug) => ['dashboard', sport]
};

