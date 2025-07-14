<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    import type { WithElementRef } from '$lib/utils';

    import { Skeleton } from '$lib/ui/skeleton/index';
    import { cn } from '$lib/utils';

    type Props = {
        showIcon?: boolean;
    } & WithElementRef<HTMLAttributes<HTMLElement>>;
    let {
        children,
        class: className,
        ref = $bindable(null),
        showIcon = false,
        ...restProps
    }: Props = $props();
</script>

<div
    class={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
    bind:this={ref}
    data-sidebar="menu-skeleton"
    data-slot="sidebar-menu-skeleton"
    {...restProps}
>
    {#if showIcon}
        <Skeleton class="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />
    {/if}
    <Skeleton
        class="h-4 max-w-(--skeleton-width) flex-1"
        style="--skeleton-width: {Math.floor(Math.random() * 40) + 50}%;"
        data-sidebar="menu-skeleton-text"
    />
    {@render children?.()}
</div>
