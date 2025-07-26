<script lang="ts">
    import type { PageData } from './$types';

    import { onDestroy } from 'svelte';

    import { popCrumb, pushCrumb } from '$lib/context/breadcrumbs.svelte';
    import { useSetupQuery } from '$lib/queries/setup';

    type Props = { data: PageData };
    const { data }: Props = $props();

    const query = useSetupQuery({
        setup: data.setup,
        sport: data.sport,
        user: data.user!.id
    });
    query.subscribe(({ data }) => {
        if (data?.data) {
            pushCrumb({ name: data.data.name });
        }
    });

    onDestroy(() => {
        popCrumb();
    });
</script>

{#if $query.data?.data}
    <h1>{$query.data.data.name}</h1>
{/if}
