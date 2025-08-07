<script lang="ts" module>
    import { tv } from 'tailwind-variants';

    export const inputStyles = tv({
        base: [
            'flex h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-base ring-offset-background transition-colors outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'
        ]
    });
</script>

<script lang="ts">
    import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

    import type { WithElementRef } from '$lib/utils';

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
    class={inputStyles({ class: className })}
    bind:this={ref}
    bind:value
    {type}
    data-slot="input"
    {...restProps}
/>
