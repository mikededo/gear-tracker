<script lang="ts">
    import type { WithoutChildrenOrChild } from '$lib/utils';

    import { Progress as ProgressPrimitive } from 'bits-ui';

    import { cn } from '$lib/utils';

    let {
        class: className,
        max = 100,
        ref = $bindable(null),
        value,
        ...restProps
    }: WithoutChildrenOrChild<ProgressPrimitive.RootProps> = $props();
</script>

<ProgressPrimitive.Root
    class={cn('relative bg-slate-500/15 h-2 w-full overflow-hidden rounded-full', className)}
    bind:ref
    {max}
    {value}
    data-slot="progress"
    {...restProps}
>
    <div
        class="h-full w-full flex-1 rounded-full transition-all"
        style="background-color: var(--progress-background, var(--primary)); transform: translateX(-{100 - (100 * (value ?? 0)) / (max ?? 1)}%)"
        data-slot="progress-indicator"
    ></div>
</ProgressPrimitive.Root>
