<script lang="ts" module>
    import type { VariantProps } from 'tailwind-variants';

    import { tv } from 'tailwind-variants';

    export const badgeVariants = tv({
        base: 'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
        defaultVariants: {
            variant: 'default'
        },
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
                destructive:
                    'border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/70 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
                outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90'
            }
        }
    });

    export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';

    import type { WithElementRef } from '$lib/utils';

    import { cn } from '$lib/utils';

    let {
        children,
        class: className,
        href,
        ref = $bindable(null),
        variant = 'default',
        ...restProps
    }: {
        variant?: BadgeVariant;
    } & WithElementRef<HTMLAnchorAttributes> = $props();
</script>

<svelte:element
    this={href ? 'a' : 'span'}
    class={cn(badgeVariants({ variant }), className)}
    bind:this={ref}
    {href}
    data-slot="badge"
    {...restProps}
>
    {@render children?.()}
</svelte:element>
