<script lang="ts" module>
    import type { VariantProps } from 'tailwind-variants';

    import { tv } from 'tailwind-variants';

    export const sheetVariants = tv({
        base: 'fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500',
        defaultVariants: {
            side: 'right'
        },
        variants: {
            side: {
                bottom: 'inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
                left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
                right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
                top: 'inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top'
            }
        }
    });

    export type Side = VariantProps<typeof sheetVariants>['side'];
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { WithoutChildrenOrChild } from '$lib/utils';

    import { IconX } from '@tabler/icons-svelte';
    import { Dialog as SheetPrimitive } from 'bits-ui';

    import { cn } from '$lib/utils';

    import SheetOverlay from './sheet-overlay.svelte';

    type Props = {
        children: Snippet;
        side?: Side;
        portalProps?: SheetPrimitive.PortalProps;
    } & WithoutChildrenOrChild<SheetPrimitive.ContentProps>;
    let {
        children,
        class: className,
        portalProps,
        ref = $bindable(null),
        side = 'right',
        ...restProps
    }: Props = $props();
</script>

<!-- FIXME: Add locales -->
<SheetPrimitive.Portal {...portalProps}>
    <SheetOverlay />
    <SheetPrimitive.Content
        class={cn(sheetVariants({ side }), className)}
        bind:ref
        data-slot="sheet-content"
        {...restProps}
    >
        {@render children?.()}
        <SheetPrimitive.Close
            class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none"
        >
            <IconX class="!size-4" />
            <span class="sr-only">Close</span>
        </SheetPrimitive.Close>
    </SheetPrimitive.Content>
</SheetPrimitive.Portal>
