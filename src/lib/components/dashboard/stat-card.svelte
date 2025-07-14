<script lang="ts">
    import type { Icon as TablerIcon } from '@tabler/icons-svelte';
    import type { VariantProps } from 'tailwind-variants';

    import { tv } from 'tailwind-variants';

    import { Card } from '$lib/ui';

    type Props = {
        subtitle: string;
        title: string;
        value: number | string;
        Icon: TablerIcon;
        variant?: VariantProps<typeof styles>['type'];
    };
    const { Icon, subtitle, title, value, variant }: Props = $props();

    const styles = tv({
        variants: {
            type: { correct: 'text-green-500', warning: 'text-orange-500' }
        }
    });
</script>

<Card.Root class="gap-0 py-4">
    <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-sm font-medium uppercase">{title}</Card.Title>
        <Icon class={styles({ class: 'size-4', type: variant })} />
    </Card.Header>
    <Card.Content>
        <p class={styles({ class: 'text-2xl font-bold', type: variant })}>
            {value}
        </p>
        <p class="text-xs text-muted-foreground">{subtitle}</p>
    </Card.Content>
</Card.Root>
