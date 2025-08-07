<script lang="ts">
    import { Dialog as DialogPrimitive } from 'bits-ui';

    import { cn } from '$lib/utils';

    let {
        class: className,
        ref = $bindable(null),
        ...restProps
    }: DialogPrimitive.TitleProps = $props();
</script>

<DialogPrimitive.Title
    class={cn('text-lg font-semibold leading-none', className)}
    bind:ref
    data-slot="dialog-title"
    {...restProps}
/>
