<script lang="ts">
    import type { DashboardSetupGear } from '$lib/queries/dashboard';
    import type { UsageStatus } from '$lib/utils';

    import { IconArrowNarrowRight } from '@tabler/icons-svelte';
    import { cubicOut } from 'svelte/easing';

    import { StatusIcon } from '$lib/components/shared';
    import { ROUTES } from '$lib/constants';
    import { Badge, Button, Card, fadeSlide, Progress } from '$lib/ui';
    import {
        formatCurrency,
        formatDistance,
        formatDuration,
        getRemainingUsage,
        getUsageStatus,
        percent
    } from '$lib/utils';

    const MAX_ITEMS_SHOWN = 3;

    type Props = { items: DashboardSetupGear[]; setup: string; sport: string };
    const { items, setup, sport }: Props = $props();

    type UsageProps = {
        max: number;
        percent: number;
        remaining: number;
        status: UsageStatus;
        unit: string;
        usage: number;
    };
</script>

{#snippet usage({ max, percent, remaining, status, unit, usage }: UsageProps)}
    {@const formatter = unit ? formatDistance : formatDuration}

    <div class="space-y-1">
        <div class="flex justify-between text-xs">
            <span class="text-gray-600">Usage</span>
            <span class="font-medium">
                {#if max === Infinity}
                    {formatter(usage)}
                {:else}
                    {formatter(usage)} / {formatter(max)}
                {/if}
            </span>
        </div>
        <Progress
            class="h-2"
            style="--progress-background: var(--{status === 'critical' ? 'destructive' : status})"
            value={percent}
        />
        <div class="text-right text-xs text-gray-500">
            {#if max === Infinity}
                No usage limit!
            {:else}
                {percent.toFixed(1)}% used &centerdot;
                {formatter(remaining)} remaining
            {/if}
        </div>
    </div>
{/snippet}

<div class="flex flex-col gap-4 pb-4" transition:fadeSlide={{ duration: 300, easing: cubicOut }}>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each items.slice(0, MAX_ITEMS_SHOWN) as item}
            {@const status = getUsageStatus(item.current_usage, item.max_usage)}

            <Card.Root class="gap-2">
                <Card.Header>
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <Card.Title class="text-sm leading-tight font-medium">
                                {item.name}
                            </Card.Title>
                            <Card.Description class="text-xs">
                                {item.brand} {item.model}
                            </Card.Description>
                        </div>
                        <StatusIcon {status} />
                    </div>
                </Card.Header>

                <Card.Content class="space-y-1.5">
                    {@render usage({
                        max: item.max_usage ?? Infinity,
                        percent: item.max_usage ? percent(item.current_usage, item.max_usage) : Infinity,
                        remaining: item.max_usage ? getRemainingUsage(item.current_usage, item.max_usage) : Infinity,
                        status,
                        unit: item.tracking_unit,
                        usage: item.current_usage
                    })}

                    {#if item.purchase_price}
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-gray-600">Value</span>
                            <span class="font-medium">{formatCurrency(item.purchase_price)}</span>
                        </div>
                    {/if}

                    {#if item.purchase_date}
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-gray-600">Purchased</span>
                            <span class="font-medium">
                                {new Date(item.purchase_date).toLocaleDateString()}
                            </span>
                        </div>

                    {/if}

                    {#if status === 'critical'}
                        <Badge class="w-full justify-center text-xs" variant="destructive">
                            Replacement Needed
                        </Badge>
                    {:else if status === 'warning'}
                        <Badge
                            class="w-full justify-center bg-warning/25 text-xs text-warning"
                            variant="secondary"
                        >
                            Monitor Closely
                        </Badge>
                    {/if}
                </Card.Content>
            </Card.Root>
        {/each}
    </div>

    {#if items.length > 3}
        <div class="ml-auto text-center">
            <Button href={ROUTES.setup(sport, setup)} size="sm" variant="ghost">
                View all {items.length} items
                <IconArrowNarrowRight class="stroke-[1.5]" />
            </Button>
        </div>
    {/if}
</div>
