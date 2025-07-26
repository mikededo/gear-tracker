<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { PageData } from './$types';

    import { onDestroy } from 'svelte';

    import { ROUTES } from '$lib/constants';
    import { popCrumb, pushCrumb } from '$lib/context/breadcrumbs.svelte';
    import { useSportQuery } from '$lib/queries/sport';

    type Props = { children: Snippet; data: PageData };
    const { children, data }: Props = $props();

    const query = useSportQuery({
        sport: data.sport,
        user: data.user!.id
    });
    query.subscribe(({ data }) => {
        if (data?.data) {
            const { name, slug } = data.data;
            pushCrumb({ href: ROUTES.sport(slug), name });
        }
    });

    onDestroy(() => {
        popCrumb();
    });
</script>

{@render children()}
