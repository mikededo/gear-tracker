<script lang="ts">
    import type { PageData } from './$types';

    import { Breadcrumb } from '$lib/components';
    import { ROUTES } from '$lib/constants';
    import { useSetupQuery } from '$lib/queries/setup';

    type Props = { data: PageData };
    const { data }: Props = $props();

    const query = $derived.by(() => useSetupQuery({
        setup: data.setup,
        sport: data.sport,
        user: data.user!.id
    }));
</script>

{#if $query.data?.data}
    <Breadcrumb
        href={ROUTES.setup(data.sport, data.setup)}
        name={$query.data.data.name}
    />

    <h1>{$query.data.data.name}</h1>
{/if}
