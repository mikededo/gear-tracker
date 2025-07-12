import type { Cookies } from '@sveltejs/kit';

import * as v from 'valibot';

export const THEME_COOKIE = 'theme';

const ThemeModeSchema = v.picklist(['dark', 'light', 'system']);
export type ThemeMode = v.InferOutput<typeof ThemeModeSchema>;
type ThemeState = { theme: ThemeMode };

const appState: ThemeState = $state({
  theme: 'system'
});

export const useThemeContext = () => appState;
export const initThemeContext = (theme: ThemeMode) => {
  appState.theme = theme ?? appState.theme;
};

// This is to allow both cookies as they are or after having called `getAll`
type ValidCookies = Array<{ name: string; value: string }> | Cookies;
export const getThemeCookie = (cookies: ValidCookies): ThemeMode => {
  const cookieValue = Array.isArray(cookies)
    ? cookies.find(({ name }) => name === THEME_COOKIE)?.value
    : cookies.get(THEME_COOKIE);

  const result = v.safeParse(ThemeModeSchema, cookieValue);
  return result.success ? result.output : 'system';
};
export const getTheme = () => appState.theme;
export const changeTheme = (value: ThemeMode) => {
  if (document) {
    document.documentElement.className = value;
  }

  appState.theme = value;

  // Cookies can only be updated on the server
  fetch('/api/set-cookie', {
    body: JSON.stringify({ name: THEME_COOKIE, value }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  });
};

