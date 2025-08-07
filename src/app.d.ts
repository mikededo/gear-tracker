import type { Session, User } from '@supabase/supabase-js';
import type { QueryClient } from '@tanstack/svelte-query';
import type { ClassValue as ClsxClassValue } from 'clsx';

import type { Client } from '$lib/database/types';

export default CurrencyDollar;

declare global {
  namespace App {
    interface Locals {
      queryClient: QueryClient;
      safeGetSession: () => Promise<{ user: null | User; session: null | Session }>;
      session: null | Session;
      supabase: Client;
      user: null | User;
    }
    interface PageData {
      session: null | Session;
    }

  // interface Error {}
  // interface PageState {}
  // interface Platform {}
  }
}

declare module 'tailwind-merge' {
  export type ClassNameValue = ClsxClassValue;
}

export {};
