<script lang="ts">
    import type { HTMLLiAttributes } from 'svelte/elements';

    import type { WithElementRef } from '$lib/utils';

    import { IconChevronRight } from '@tabler/icons-svelte';

    import { cn } from '$lib/utils';

    let {
        children,
        class: className,
        ref = $bindable(null),
        ...restProps
    }: WithElementRef<HTMLLiAttributes> = $props();
</script>

<li
    class={cn('[&>svg]:size-3.5', className)}
    bind:this={ref}
    role="presentation"
    aria-hidden="true"
    data-slot="breadcrumb-separator"
    {...restProps}
>
    {#if children}
        {@render children?.()}
    {:else}
        <IconChevronRight />
    {/if}
</li>
