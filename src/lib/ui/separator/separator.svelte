<script lang="ts">
    import { Separator as SeparatorPrimitive } from 'bits-ui';

    import { cn } from '$lib/utils';

    let {
        class: className,
        ref = $bindable(null),
        ...restProps
    }: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
    class={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
        className
    )}
    bind:ref
    data-slot="separator"
    {...restProps}
/>
