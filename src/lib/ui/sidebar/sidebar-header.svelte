<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    import type { WithElementRef } from '$lib/utils';

    import { cn } from '$lib/utils';

    let {
        children,
        class: className,
        ref = $bindable(null),
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div
    class={cn('flex flex-col gap-2 py-2 px-4', className)}
    bind:this={ref}
    data-sidebar="header"
    data-slot="sidebar-header"
    {...restProps}
>
    {@render children?.()}
</div>
