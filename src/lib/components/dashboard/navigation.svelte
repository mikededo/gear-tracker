<script lang="ts">
    import type { DashboardData } from '$lib/queries/dashboard';

    import { SportIcon } from '$lib/components/shared';
    import { ROUTES } from '$lib/constants';
    import { m } from '$lib/i18n/messages';
    import { useDashboardQuery } from '$lib/queries/dashboard';
    import { Collapsible, Sidebar } from '$lib/ui';
    import { getSportName } from '$lib/utils';

    type Props = { user: string };
    const { user }: Props = $props();

    const dashboardQuery = $derived(useDashboardQuery(user));
</script>

{#snippet sports_content(sport: string, setups: DashboardData[number]['setups'])}
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

{#snippet sports(data: DashboardData)}
    {#each data as sport}
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
                {@render sports_content(sport.slug, sport.setups)}
            {/snippet}
        </Collapsible.Root>
    {/each}
{/snippet}

<Sidebar.Content>
    <Sidebar.Group>
        <Sidebar.GroupLabel>{m.sports()}</Sidebar.GroupLabel>
        <Sidebar.Menu>
            {#if $dashboardQuery.data?.data}
                {@render sports($dashboardQuery.data?.data)}
            {/if}
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

