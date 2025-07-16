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

// TODO: Allow user to choose metric/imperial system
export const formatDistance = (distance: number) =>
  distance >= 1000 ? `${(distance / 1000).toFixed(1)}k km` : `${distance} km`;

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

export const percent = (value: number, max: null | number) => max ? Math.min((value / max) * 100, 100) : 0;

export type UsageStatus = 'critical' | 'good' | 'warning';
export const getUsageStatus = (current: number, max: null | number): UsageStatus => {
  if (!max) {
    return 'good';
  }

  const uasge = percent(current, max);
  if (uasge >= 90) {
    return 'critical';
  }

  if (uasge >= 70) {
    return 'warning';
  }

  return 'good';
};

export const getRemainingUsage = (current: number, max: null | number) =>
  max === null ? Infinity : current;

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

