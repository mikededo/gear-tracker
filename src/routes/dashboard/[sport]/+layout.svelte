<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { PageData } from './$types';

    import { Breadcrumb } from '$lib/components';
    import { ROUTES } from '$lib/constants';
    import { useSportQuery } from '$lib/queries/sport';

    type Props = { children: Snippet; data: PageData };
    const { children, data }: Props = $props();

    const query = $derived.by(() => useSportQuery({
        sport: data.sport,
        user: data.user!.id
    }));
</script>

{#if $query.data?.data}
    <Breadcrumb
        href={ROUTES.sport(data.sport)}
        name={$query.data.data.name}
    />
{/if}

{@render children()}
