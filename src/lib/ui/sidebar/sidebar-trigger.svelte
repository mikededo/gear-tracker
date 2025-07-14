<script lang="ts">
    import type { ComponentProps } from 'svelte';

    import { IconMenuDeep } from '@tabler/icons-svelte';

    import { Button } from '$lib/ui/button/index';
    import { cn } from '$lib/utils';

    import { useSidebar } from './context.svelte';

    type Props = { onclick?: (e: MouseEvent) => void } & ComponentProps<typeof Button>;
    let {
        class: className,
        onclick,
        ref = $bindable(null),
        ...restProps
    }: Props = $props();

    const sidebar = useSidebar();

    const onClick = (e: MouseEvent) => {
        onclick?.(e);
        sidebar.toggle();
    };
</script>

<Button
    class={cn('size-7', className)}
    size="icon"
    type="button"
    variant="ghost"
    onclick={onClick}
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    {...restProps}
>
    <IconMenuDeep class="!size-5 scale-x-[-1]" />
    <!-- FIXME: Add locales -->
    <span class="sr-only">Toggle Sidebar</span>
</Button>
