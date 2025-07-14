<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    import type { WithElementRef, WithoutChildren } from '$lib/utils';

    import { cn } from '$lib/utils';

    let {
        class: className,
        ref = $bindable(null),
        ...restProps
    }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props();
</script>

<div
    class={cn('bg-accent animate-pulse rounded-md', className)}
    bind:this={ref}
    data-slot="skeleton"
    {...restProps}
></div>
