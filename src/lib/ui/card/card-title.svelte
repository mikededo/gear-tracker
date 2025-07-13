<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    import type { WithElementRef } from '$lib/utils';

    import { cn } from '$lib/utils';

    let {
        children,
        class: className,
        ref = $bindable(null),
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
    class={cn('font-semibold leading-none', className)}
    bind:this={ref}
    data-slot="card-title"
    {...restProps}
>
    {@render children?.()}
</div>
