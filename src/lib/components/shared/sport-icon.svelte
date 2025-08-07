<script lang="ts">
    import type { SportIconSchemaType } from '$lib/database';

    import {
        IconBike,
        IconKayak,
        IconRun,
        IconShoe,
        IconSkiJumping,
        IconSwimming
    } from '@tabler/icons-svelte';

    type Props = { icon: SportIconSchemaType; class?: string };
    const { icon, ...restProps }: Props = $props();
    const Icon = $derived.by(() => {
        switch (icon) {
            case 'icon_row':
                return IconKayak;
            case 'icon_run':
                return IconRun;
            case 'icon_shoe':
                return IconShoe;
            case 'icon_sky':
                return IconSkiJumping;
            case 'icon_swim':
                return IconSwimming;
            case 'icon_bike':
            default:
                return IconBike;
        }
    });
</script>

<Icon class={restProps.class} />

