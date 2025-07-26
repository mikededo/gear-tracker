<script lang="ts">
    import type { PageData } from './$types';

    import { useSportQuery } from '$lib/queries/sport';

    type Props = { data: PageData };
    const { data }: Props = $props();

    const query = useSportQuery({
        sport: data.sport,
        user: data.user!.id
    });
</script>

{#if $query.data?.data}
    <h1>{$query.data.data.name}</h1>
{/if}
