<script lang="ts">
    import type { DashboardSetup } from '$lib/queries/dashboard';

    import {
        IconChevronDown,
        IconPlus
    } from '@tabler/icons-svelte';
    import { SvelteSet } from 'svelte/reactivity';

    import { SetupGear, SportIcon } from '$lib/components/shared';
    import { ROUTES } from '$lib/constants';
    import { useDashboardQuery } from '$lib/queries/dashboard';
    import { Badge, Button, Card } from '$lib/ui';
    import { getRemainingUsage, getSportName, percent } from '$lib/utils';

    type Props = { user: string };
    const { user }: Props = $props();

    const collapsedSetups = new SvelteSet();

    const dashboardQuery = $derived(useDashboardQuery(user));

    const getSetupUsageRate = (setup: DashboardSetup) => {
        const itemsWithMaxUsage = setup.gear_items.filter((item) => item.max_usage);
        if (itemsWithMaxUsage.length === 0) {
            return 0;
        }

        const totalUsageRate = itemsWithMaxUsage.reduce(
            (sum: number, item: any) => sum + percent(item.current_usage, item.max_usage),
            0
        );

        return totalUsageRate / itemsWithMaxUsage.length;
    };

    const onToggleSetup = (id: string) => () => {
        if (collapsedSetups.has(id)) {
            collapsedSetups.delete(id);
        } else {
            collapsedSetups.add(id);
        }
    };
</script>

<div class="space-y-6">
    {#each ($dashboardQuery.data?.data ?? []) as sport}
        <Card.Root class="gap-4 overflow-hidden py-0">
            <Card.Header class="flex items-center justify-between border-b bg-primary/10 !py-4">
                <a
                    class="flex items-center gap-2 text-xl font-semibold underline-offset-2 hover:underline"
                    href={ROUTES.sport(sport.slug)}
                >
                    <SportIcon icon={sport.icon} />
                    {getSportName(sport.key)}
                </a>
                <Button size="sm">
                    <IconPlus class="size-4" />
                    Add setup
                </Button>
            </Card.Header>

            <Card.Content>
                {#each sport.setups as setup}
                    {@render setup_content(setup, sport.slug)}
                {/each}
            </Card.Content>
        </Card.Root>
    {/each}
</div>

{#snippet setup_content(setup: DashboardSetup, sport: string)}
    {@const isCollapsed = collapsedSetups.has(setup.id)}
    <!-- Sort gear items by remaining usage (least remaining first) -->
    {@const sortedGearItems = [...setup.gear_items].sort((a, b) => {
        const remainingA = getRemainingUsage(a.current_usage, a.max_usage);
        const remainingB = getRemainingUsage(b.current_usage, b.max_usage);
        return remainingA - remainingB;
    })}

    <div class="mb-4 flex justify-between">
        <div class="flex flex-col justify-between">
            <div class="flex items-center gap-2">
                <a
                    class="text-lg font-semibold underline-offset-2 hover:underline"
                    href={ROUTES.setup(sport, setup.slug)}
                >
                    {setup.name}
                </a>

                <div class="flex items-center space-x-1">
                    <Badge class="text-xs" variant="outline">
                        {getSetupUsageRate(setup).toFixed(1)}% avg usage
                    </Badge>
                    <Badge class="text-xs" variant="outline">
                        {setup.gear_items.length} items
                    </Badge>
                </div>
            </div>
            <p class="text-sm text-gray-600">{setup.description}</p>
        </div>

        <Button
            size="icon"
            variant="ghost"
            onclick={onToggleSetup(setup.id)}
        >
            <IconChevronDown class="size-5 transition-transform {isCollapsed ? 'rotate-90' : ''}" />
        </Button>
    </div>

    {#if !isCollapsed}
        <SetupGear
            items={sortedGearItems}
            setup={setup.slug}
            {sport}
        />
    {/if}
{/snippet}
