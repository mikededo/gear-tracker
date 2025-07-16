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

    type Props = { icon: SportIconSchemaType };
    const { icon }: Props = $props();
</script>

{#if icon === 'icon_bike'}
    <IconBike />
{:else if icon === 'icon_run'}
    <IconRun />
{:else if icon === 'icon_shoe'}
    <IconShoe />
{:else if icon === 'icon_row'}
    <IconKayak />
{:else if icon === 'icon_sky'}
    <IconSkiJumping />
{:else if icon === 'icon_swim'}
    <IconSwimming />
{/if}

