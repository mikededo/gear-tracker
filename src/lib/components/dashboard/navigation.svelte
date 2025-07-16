<script lang="ts">
    import type { SportsSchemaType } from '$lib/database';

    import { createQuery } from '@tanstack/svelte-query';

    import { SportIcon } from '$lib/components/shared';
    import { QUERY_KEYS, ROUTES } from '$lib/constants';
    import { useSupabaseClient } from '$lib/context/supabase';
    import { m } from '$lib/i18n/messages';
    import { getDashboard } from '$lib/queries/dashboard';
    import { Collapsible, Sidebar } from '$lib/ui';
    import { getSportName } from '$lib/utils';

    type Props = { user: string };
    const { user }: Props = $props();

    type NavigationSetup = { id: string; name: string; slug: string };
    type NavigationMap = Map<
        string,
        { setups: NavigationSetup[]; sport: SportsSchemaType }
    >;
    let navigation: NavigationMap = $state(new Map());

    const supabase = useSupabaseClient();

    const dashboardQuery = $derived(createQuery({
        queryFn: () => getDashboard(supabase, user),
        queryKey: QUERY_KEYS.dashboard
    }));
    dashboardQuery.subscribe(({ data }) => {
        const { data: dashboard, error } = data ?? {};
        if (error || !dashboard) {
            return;
        }

        navigation = dashboard.reduce<NavigationMap>(
            (acc, { id, name, slug, sports: sport }) => {
                const value = { id, name, slug };
                const items = acc.get(sport.id);

                if (items) {
                    items.setups.push(value);
                } else {
                    acc.set(sport.id, { setups: [value], sport });
                }
                return acc;
            },
            new Map()
        );
    });
</script>

{#snippet sports_content(sport: string, setups: NavigationSetup[])}
    <Collapsible.Content>
        <Sidebar.MenuSub>
            {#each setups as setup}
                <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton>
                        {#snippet child({ props })}
                            <a href={ROUTES.setup(sport, setup.slug)} {...props}>
                                {setup.name}
                            </a>
                        {/snippet}
                    </Sidebar.MenuSubButton>
                </Sidebar.MenuSubItem>
            {/each}
        </Sidebar.MenuSub>
    </Collapsible.Content>
{/snippet}

{#snippet sports()}
    {#each navigation.values() as { setups, sport }(sport.id)}
        <Collapsible.Root open>
            {#snippet child({ props })}
                <Sidebar.MenuItem {...props}>
                    <Collapsible.Trigger>
                        {#snippet child({ props })}
                            <Sidebar.MenuButton {...props}>
                                <SportIcon icon={sport.icon} />
                                {getSportName(sport.key)}
                            </Sidebar.MenuButton>
                        {/snippet}
                    </Collapsible.Trigger>
                </Sidebar.MenuItem>
                {@render sports_content(sport.slug, setups)}
            {/snippet}
        </Collapsible.Root>
    {/each}
{/snippet}

<Sidebar.Content>
    <Sidebar.Group>
        <Sidebar.GroupLabel>{m.sports()}</Sidebar.GroupLabel>
        <Sidebar.Menu>
            {@render sports()}
        </Sidebar.Menu>
    </Sidebar.Group>
    <Sidebar.Group>
        <Sidebar.GroupLabel>{m.closet()}</Sidebar.GroupLabel>
        <Sidebar.Menu>
            <!-- TODO: Update with user's data -->
        </Sidebar.Menu>
    </Sidebar.Group>
    <Sidebar.Rail />
</Sidebar.Content>

