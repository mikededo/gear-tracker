<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    import type { WithElementRef } from '$lib/utils';

    import { cn } from '$lib/utils';

    let {
        children,
        class: className,
        ref = $bindable(null),
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLLIElement>> = $props();
</script>

<li
    class={cn('group/menu-sub-item relative', className)}
    bind:this={ref}
    data-sidebar="menu-sub-item"
    data-slot="sidebar-menu-sub-item"
    {...restProps}
>
    {@render children?.()}
</li>
