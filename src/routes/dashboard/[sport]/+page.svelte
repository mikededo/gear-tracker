<script lang="ts">
    import type { SportSetup } from '$lib/queries/sport';

    import type { PageData } from './$types';

    import {
        IconAlertTriangle,
        IconCircleCheck,
        IconClock,
        IconCurrencyDollar,
        IconEdit,
        IconSettings,
        IconTarget,
        IconWaveSawTool
    } from '@tabler/icons-svelte';

    import { SetupGear, SportIcon, StatCard } from '$lib/components/shared';
    import { ROUTES } from '$lib/constants';
    import { useSportQuery } from '$lib/queries/sport';
    import { Badge, Button, Card, Progress } from '$lib/ui';
    import { formatCurrency, getUsageStatus, percent } from '$lib/utils';

    type Props = { data: PageData };
    const { data }: Props = $props();

    const getSetupUsageRate = (setup: SportSetup) => {
        const itemsWithMaxUsage = setup.gear_items.filter((item) => item.max_usage);
        if (itemsWithMaxUsage.length === 0) {
            return 0;
        }

        const totalUsageRate = itemsWithMaxUsage.reduce(
            (sum, item) => sum + percent(item.current_usage, item.max_usage),
            0
        );
        return totalUsageRate / itemsWithMaxUsage.length;
    };

    const query = useSportQuery({
        sport: data.sport,
        user: data.user!.id
    });
    const {
        averageUsage,
        criticalItems,
        goodItems,
        totalItems,
        totalSetups,
        totalValue,
        warningItems
    } = $derived.by(() => {
        const { data: sport, error } = $query.data ?? {};
        if (error || !sport) {
            return {
                averageUsage: 0,
                criticalItems: 0,
                goodItems: 0,
                totalItems: 0,
                totalSetups: 0,
                totalValue: 0,
                warningItems: 0
            };
        }

        const allGearItems = sport.setups.flatMap((setup) => setup.gear_items);
        const totalValue = allGearItems.reduce((sum, item) => sum + (item.purchase_price ?? 0), 0);
        const totalItems = allGearItems.length;
        const totalSetups = sport.setups.length;

        const criticalItems = allGearItems.filter(
            (item) => getUsageStatus(item.current_usage, item.max_usage) === 'critical'
        ).length;
        const warningItems = allGearItems.filter(
            (item) => getUsageStatus(item.current_usage, item.max_usage) === 'warning'
        ).length;
        const itemsWithMaxUsage = allGearItems.filter((item: any) => item.max_usage);
        const averageUsage = itemsWithMaxUsage.reduce(
            (sum, item) => sum + percent(item.current_usage, item.max_usage),
            0
        ) / itemsWithMaxUsage.length;

        return {
            averageUsage,
            criticalItems,
            goodItems: totalItems - criticalItems - warningItems,
            totalItems,
            totalSetups,
            totalValue,
            warningItems
        };
    });
</script>

{#if $query.data?.data}
    {@const sport = $query.data.data}
    <div class="space-y-6">
        <div class="flex items-start justify-between space-x-4">
            <div>
                <h1 class="flex items-center text-lg font-bold md:text-2xl">
                    <SportIcon class="mr-2 size-5 text-primary md:size-6" icon={sport.icon} />
                    {sport.name}
                </h1>
                <p class="text-sm">
                    {totalSetups} setup {totalSetups !== 1 ? 's' : ''} &centerdot; {totalItems} gear items
                </p>
            </div>

            <div class="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                    <IconSettings class="mr-2 size-4" />
                    <span>Edit sport</span>
                </Button>
                <!-- <CreateSetupModal sports={[sport]} onCreateSetup={onCreateSetup} /> -->
            </div>
        </div>

        <div class="grip-cols-1 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <StatCard
                Icon={IconCurrencyDollar}
                subtitle="Total value"
                title="Across all setups"
                value={formatCurrency(totalValue)}
            />
            <StatCard
                Icon={IconWaveSawTool}
                subtitle="Average usage"
                title="Across all setups"
                value={`${averageUsage.toFixed(2)}%`}
            />
            <StatCard
                Icon={IconAlertTriangle}
                subtitle="Need replacement"
                title="Critical items"
                value={criticalItems}
                variant="critical"
            />
            <StatCard
                Icon={IconClock}
                subtitle="Monitor closely"
                title="Warning items"
                value={warningItems}
                variant="warning"
            />
            <StatCard
                Icon={IconCircleCheck}
                subtitle="Healthy items"
                title="Good condition"
                value={goodItems}
                variant="correct"
            />
        </div>

        <Card.Root class="gap-4">
            <Card.Header>
                <Card.Title class="flex items-center">
                    <IconTarget class="mr-2 size-5 text-primary" />
                    <span>Usage overview</span>
                </Card.Title>
                <Card.Description>Usage rates across all setups in this sport</Card.Description>
            </Card.Header>
            <Card.Content>
                <div class="space-y-4">
                    {#each sport.setups as setup}
                        {@render setup_overview(setup, sport.slug)}
                    {/each}
                </div>
            </Card.Content>
        </Card.Root>

        <div class="space-y-4">
            <h2 class="text-2xl font-semibold">Setups</h2>

            {#each sport.setups as setup}
                {@render setup_display(setup, sport.slug)}
            {/each}
        </div>
    </div>
{/if}

{#snippet setup_overview(setup: SportSetup, sportSlug: string)}
    {@const usageRate = getSetupUsageRate(setup)}
    {@const setupValue = setup.gear_items.reduce((sum: number, item: any) => sum + item.purchase_price, 0)}

    <div class="flex items-center space-x-4 rounded-lg bg-gray-50 p-4">
        <div class="flex-1">
            <div class="mb-2 flex items-center justify-between">
                <a
                    class="font-medium text-gray-900 transition-colors hover:text-blue-600"
                    href={ROUTES.setup(sportSlug, setup.slug)}
                >
                    {setup.name}
                </a>
                <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600">{formatCurrency(setupValue)}</span>
                    <Badge class="text-xs" variant="outline">
                        {setup.gear_items.length} items
                    </Badge>
                </div>
            </div>
            <Progress class="mb-1 h-2" value={usageRate} />
            <div class="flex justify-between text-xs text-gray-500">
                <span>
                    {usageRate.toFixed(1)}
                    % average usage
                </span>
                <span>{setup.description}</span>
            </div>
        </div>
    </div>
{/snippet}

{#snippet setup_display(setup: SportSetup, sportSlug: string)}
    <div class="space-y-4">
        <div class="flex flex-col justify-between">
            <div class="flex items-center gap-2">
                <a
                    class="text-lg font-semibold underline-offset-2 hover:underline"
                    href={ROUTES.setup(sportSlug, setup.slug)}
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

                <div class="ml-auto flex items-center gap-1">
                    <Button class="ml-auto" size="icon" variant="ghost">
                        <IconSettings class="size-4" />
                    </Button>
                    <Button size="sm">
                        <IconEdit class="size-4" />
                        <span>Edit gear</span>
                    </Button>
                </div>
            </div>
            <p class="text-sm text-gray-600">{setup.description}</p>
        </div>

        <SetupGear items={setup.gear_items} setup={setup.slug} sport={sportSlug} />
    </div>
{/snippet}
