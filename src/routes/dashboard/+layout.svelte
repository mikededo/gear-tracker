<script lang="ts">
    import type { Snippet } from 'svelte';

    import { IconHeartRateMonitor, IconRecharging } from '@tabler/icons-svelte';

    // TODO: Fetch data for the sidebar
    import { Button, Separator, Sidebar } from '$lib/ui';

    type Props = { children: Snippet };
    const { children }: Props = $props();
</script>

<Sidebar.Provider
    style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
    <Sidebar.Root collapsible="offcanvas" variant="sidebar">
        <Sidebar.Header class="py-0">
            <Sidebar.Menu>
                <Sidebar.MenuItem class="flex h-(--header-height) items-center gap-2.5">
                    <IconRecharging class="!size-6" />
                    <span class="text-lg font-semibold">Gear tracker</span>
                </Sidebar.MenuItem>
            </Sidebar.Menu>
        </Sidebar.Header>
        <Sidebar.Content>
            <Sidebar.Group>
                <Sidebar.GroupLabel>Sports</Sidebar.GroupLabel>
                <Sidebar.Menu>
                    <!-- TODO: Update with user's data -->
                </Sidebar.Menu>
            </Sidebar.Group>
        </Sidebar.Content>
    </Sidebar.Root>

    <Sidebar.Inset>
        <header
            class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
        >
            <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <Sidebar.Trigger class="-ml-1" />
                <Separator class="mx-2 data-[orientation=vertical]:h-4" orientation="vertical" />
                <h1 class="text-base font-medium">Dashboard</h1>
            </div>
        </header>
        <div class="flex flex-1 flex-col">
            <div class="@container/main flex flex-1 flex-col gap-2">
                <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                </div>
            </div>
        </div>

        {@render children()}
    </Sidebar.Inset>
</Sidebar.Provider>
