<script lang="ts">
    import type { UsageStatus } from '$lib/utils';

    import {
        IconAlertTriangle,
        IconCircleCheck,
        IconClock
    } from '@tabler/icons-svelte';
    import { tv } from 'tailwind-variants';

    type Props = { status: UsageStatus; class?: string };
    const { status, ...restProps }: Props = $props();

    const styles = tv({
        base: 'ml-2 size-4 flex-shrink-0',
        variants: {
            status: { critical: 'text-destructive', good: 'text-good', warning: 'text-warning' }
        }
    });
    const Icon = $derived.by(() => {
        switch (status) {
            case 'critical':
                return IconAlertTriangle;
            case 'warning':
                return IconClock;
            default:
                return IconCircleCheck;
        }
    });
</script>

<Icon class={styles({ class: restProps.class, status })} />

