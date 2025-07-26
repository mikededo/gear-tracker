<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    import type { WithElementRef, WithoutChildren } from '$lib/utils';

    import { IconDots } from '@tabler/icons-svelte';

    import { cn } from '$lib/utils';

    let {
        class: className,
        ref = $bindable(null),
        ...restProps
    }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
    class={cn('flex size-9 items-center justify-center', className)}
    bind:this={ref}
    role="presentation"
    aria-hidden="true"
    data-slot="breadcrumb-ellipsis"
    {...restProps}
>
    <IconDots class="size-4" />
    <span class="sr-only">More</span>
</span>
