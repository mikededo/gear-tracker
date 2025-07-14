import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
