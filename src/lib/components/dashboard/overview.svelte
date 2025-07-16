<script lang="ts">
    import {
        IconAlertTriangle,
        IconCircleCheck,
        IconCurrencyDollar,
        IconTrendingUp
    } from '@tabler/icons-svelte';

    import { m } from '$lib/i18n/messages';
    import { useDashboardQuery } from '$lib/queries/dashboard';
    import { formatCurrency, getUsageStatus } from '$lib/utils';

    import StatCard from './stat-card.svelte';

    type Props = { user: string };
    const { user }: Props = $props();

    const dashboardQuery = $derived(useDashboardQuery(user));

    const { criticalItems, totalItems, totalValue, warningItems } = $derived.by(() => {
        const { data: dashboard, error } = $dashboardQuery.data ?? {};
        if (error || !dashboard) {
            return {
                criticalItems: 0,
                totalItems: 0,
                totalValue: 0,
                warningItems: 0
            };
        }

        const allGearItems = dashboard.flatMap((sport) => sport.setups.flatMap((setup) => setup.gear_items));
        const totalValue = allGearItems.reduce((sum, item) => sum + (item.purchase_price ?? 0), 0);

        const {
            critical: criticalItems,
            warning: warningItems
        } = allGearItems.reduce((acc, item) => {
            const usage = getUsageStatus(item.current_usage, item.max_usage);
            if (usage === 'critical') {
                return { ...acc, critical: acc.critical + 1 };
            }
            if (usage === 'warning') {
                return { ...acc, warning: acc.warning + 1 };
            }

            return acc;
        }, { critical: 0, warning: 0 });

        return {
            criticalItems,
            totalItems: allGearItems.length,
            totalValue,
            warningItems
        };
    });
</script>

<section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        value={criticalItems + warningItems}
        variant="warning"
        subtitle={m.dashboard_overview_need_attention_subtitle({
            critical: criticalItems,
            warning: warningItems
        })}
    />
    <StatCard
        Icon={IconCircleCheck}
        subtitle={m.dashboard_overview_good_condition_subtitle()}
        title={m.dashboard_overview_good_condition_title()}
        value={totalItems - criticalItems - warningItems}
        variant="correct"
    />
</section>
