import type { Icon as IconType } from '@lucide/svelte';
import type { Session, User } from '@supabase/supabase-js';
import type { QueryClient } from '@tanstack/svelte-query';
import type { ComponentProps } from 'svelte';

import type { Client } from '$lib/database/types';

declare global {
  type LucideIcon = typeof IconType;
  type LucideIconProps = { class?: string } & ComponentProps<LucideIcon>;

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
