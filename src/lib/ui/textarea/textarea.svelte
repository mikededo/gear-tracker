<script lang="ts">
    import type { HTMLTextareaAttributes } from 'svelte/elements';

    import type { WithElementRef, WithoutChildren } from '$lib/utils';

    import { cn } from '$lib/utils';

    import { inputStyles } from '../input';

    let {
        class: className,
        ref = $bindable(null),
        value = $bindable(),
        ...restProps
    }: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<textarea
    class={inputStyles({ class: cn('py-2 min-h-16', className) })}
    bind:this={ref}
    bind:value
    data-slot="textarea"
    {...restProps}
></textarea>
