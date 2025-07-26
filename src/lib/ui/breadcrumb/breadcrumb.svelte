<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    import type { WithElementRef } from '$lib/utils';

    let {
        children,
        class: className,
        ref = $bindable(null),
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<nav
    class={className}
    bind:this={ref}
    aria-label="breadcrumb"
    data-slot="breadcrumb"
    {...restProps}
>
    {@render children?.()}
</nav>
