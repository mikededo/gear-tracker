<script lang="ts">
    import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

    import type { WithElementRef } from '$lib/utils';

    import { cn } from '$lib/utils';

    type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

    type Props = WithElementRef<{ type?: InputType } & Omit<HTMLInputAttributes, 'type'>>;

    let {
        class: className,
        ref = $bindable(null),
        type,
        value = $bindable(),
        ...restProps
    }: Props = $props();
</script>

<input
    class={cn(
        'border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
    )}
    bind:this={ref}
    bind:value
    {type}
    data-slot="input"
    {...restProps}
/>
