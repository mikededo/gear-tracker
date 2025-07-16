import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { m } from '$lib/i18n/messages';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = { ref?: null | U } & T;

// TODO: Allow user to define currency
export const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency'
}).format(amount);

export const percent = (value: number, max: null | number) => max ? Math.min((value / max) * 100, 100) : 0;

export const getSportName = (key: string) => {
  switch (key) {
    case 'sport_cross_country_skiing':
      return m.sport_cross_country_skiing();
    case 'sport_gravel_cycling':
      return m.sport_gravel_cycling();
    case 'sport_hiking':
      return m.sport_hiking();
    case 'sport_mtb_cycling':
      return m.sport_mtb_cycling();
    case 'sport_road_cycling':
      return m.sport_road_cycling();
    case 'sport_rowing':
      return m.sport_rowing();
    case 'sport_running':
      return m.sport_running();
    case 'sport_swimming':
      return m.sport_swimming();
    case 'sport_trail_running':
      return m.sport_trail_running();
    case 'sport_triathlon':
      return m.sport_triathlon();
    case 'sport_walking':
      return m.sport_walking();
    default:
      return m.sport_unknown();
  }
};

