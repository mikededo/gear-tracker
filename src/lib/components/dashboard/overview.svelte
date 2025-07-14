<script lang="ts">
    import type { DashboardData } from '$lib/queries/dashboard';

    import {
        IconAlertTriangle,
        IconCircleCheck,
        IconCurrencyDollar,
        IconTrendingUp
    } from '@tabler/icons-svelte';

    import { m } from '$lib/i18n/messages';
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
        subtitle={m.dashboard_overview_value_total_items({ count: totalItems })}
        title={m.dashboard_overview_value_title()}
        value={formatCurrency(totalValue)}
    />
    <StatCard
        Icon={IconTrendingUp}
        subtitle={m.dashboard_overview_active_title()}
        title={m.dashboard_overview_active_subtitle()}
        value={totalItems}
    />
    <StatCard
        Icon={IconAlertTriangle}
        title={m.dashboard_overview_need_attention_title()}
        value={criticalItems.length + warningItems.length}
        variant="warning"
        subtitle={m.dashboard_overview_need_attention_subtitle({
            critical: criticalItems.length,
            warning: warningItems.length
        })}
    />
    <StatCard
        Icon={IconCircleCheck}
        subtitle={m.dashboard_overview_good_condition_subtitle()}
        title={m.dashboard_overview_good_condition_title()}
        value={totalItems - criticalItems.length - warningItems.length}
        variant="correct"
    />
</section>
