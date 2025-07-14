<script lang="ts">
    import type { DashboardData } from '$lib/queries/dashboard';

    import {
        IconAlertTriangle,
        IconCircleCheck,
        IconCurrencyDollar,
        IconTrendingUp
    } from '@tabler/icons-svelte';

    import { formatCurrency, percent } from '$lib/utils';

    import StatCard from './stat-card.svelte';

    type Props = { data: DashboardData };
    const { data }: Props = $props();

    const getUsageStatus = (current: number, max: null | number) => {
        if (!max) {
            return 'good';
        }

        const uasge = percent(current, max);
        if (uasge >= 90) {
            return 'critical';
        }

        if (uasge >= 70) {
            return 'warning';
        }

        return 'good';
    };

    const {
        criticalItems,
        totalItems,
        totalValue,
        warningItems
    } = $derived.by(() => {
        type Item = (typeof allGearItems)[number];

        const allGearItems = data.flatMap((sport) => sport.setups.flatMap((setup) => setup.gear_items));
        const totalValue = allGearItems.reduce((sum, item) => sum + (item.purchase_price ?? 0), 0);

        const {
            critical: criticalItems,
            warning: warningItems
        } = allGearItems.reduce<{ critical: Item[]; warning: Item[] }>((acc, item) => {
            const usage = getUsageStatus(item.current_usage, item.max_usage);
            if (usage === 'critical') {
                acc.critical.push(item);
            } else if (usage === 'warning') {
                acc.warning.push(item);
            }

            return acc;
        }, { critical: [], warning: [] });

        return {
            allGearItems,
            criticalItems,
            totalItems: allGearItems.length,
            totalValue,
            warningItems
        };
    });

</script>

<section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <!-- TODO: Add i18n -->
    <StatCard
        Icon={IconCurrencyDollar}
        subtitle={`Across ${totalItems} items`}
        title="Gear value"
        value={formatCurrency(totalValue)}
    />
    <StatCard
        Icon={IconTrendingUp}
        subtitle="Active gear items"
        title="Items tracked"
        value={totalItems}
    />
    <StatCard
        Icon={IconAlertTriangle}
        subtitle={`${criticalItems} critical, ${warningItems} warning`}
        title="Needs attention"
        value={criticalItems.length + warningItems.length}
        variant="warning"
    />
    <StatCard
        Icon={IconCircleCheck}
        subtitle="Items in good shape"
        title="Good condition"
        value={totalItems - criticalItems.length - warningItems.length}
        variant="correct"
    />
</section>
