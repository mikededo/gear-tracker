<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { LayoutData } from './$types';

    import { IconRecharging } from '@tabler/icons-svelte';

    import { Navigation } from '$lib/components/dashboard';
    import { m } from '$lib/i18n/messages';
    import { Separator, Sidebar } from '$lib/ui';

    type Props = { children: Snippet; data: LayoutData };
    const { children, data }: Props = $props();
</script>

<Sidebar.Provider
    style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
    <Sidebar.Root collapsible="offcanvas" variant="sidebar">
        <Sidebar.Header class="flex h-12 justify-center">
            <div class="flex items-center gap-2.5">
                <IconRecharging class="!size-6" />
                <span class="text-lg font-semibold">Gear tracker</span>
            </div>
        </Sidebar.Header>
        <Navigation user={data.user!.id} />
    </Sidebar.Root>

    <Sidebar.Inset>
        <header
            class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
        >
            <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <Sidebar.Trigger class="-ml-1" />
                <Separator class="mx-2 data-[orientation=vertical]:h-4" orientation="vertical" />
                <p class="text-base font-medium">{m.dashboard()}</p>
            </div>
        </header>
        <div class="flex flex-1 flex-col">
            <main class="@container/main flex flex-1 flex-col gap-2">
                <div class="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
                    {@render children()}
                </div>
            </main>
        </div>
    </Sidebar.Inset>
</Sidebar.Provider>
