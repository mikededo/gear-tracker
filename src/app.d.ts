import type { Session, User } from '@supabase/supabase-js';
import type { QueryClient } from '@tanstack/svelte-query';

import type { Client } from '$lib/database/types';

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

export {};
