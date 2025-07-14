<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    import type { WithElementRef } from '$lib/utils';

    import { Tooltip } from '$lib/ui/tooltip';
    import { cn } from '$lib/utils';

    import {
        SIDEBAR_COOKIE_MAX_AGE,
        SIDEBAR_COOKIE_NAME,
        SIDEBAR_WIDTH,
        SIDEBAR_WIDTH_ICON
    } from './constants';
    import { setSidebar } from './context.svelte';

    type Props = {
        onOpenChange?: (open: boolean) => void;
        open?: boolean;
    } & WithElementRef<HTMLAttributes<HTMLDivElement>>;
    let {
        children,
        class: className,
        onOpenChange = () => {},
        open = $bindable(true),
        ref = $bindable(null),
        style,
        ...restProps
    }: Props = $props();

    const sidebar = setSidebar({
        open: () => open,
        setOpen: (value: boolean) => {
            open = value;
            onOpenChange(value);

            document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        }
    });
</script>

<svelte:window onkeydown={sidebar.handleShortcutKeydown} />

<Tooltip.Provider delayDuration={0}>
    <div
        class={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
            className
        )}
        bind:this={ref}
        style="--sidebar-width: {SIDEBAR_WIDTH}; --sidebar-width-icon: {SIDEBAR_WIDTH_ICON}; {style}"
        data-slot="sidebar-wrapper"
        {...restProps}
    >
        {@render children?.()}
    </div>
</Tooltip.Provider>
