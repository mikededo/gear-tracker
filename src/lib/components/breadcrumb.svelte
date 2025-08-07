<!-- Component renders nothing, just manages state -->
<script lang="ts">
    import { onMount } from 'svelte';

    import { getCrumbs } from '$lib/context/breadcrumbs.svelte';

    type Props = {
        name: string;
        href?: string;
    };
    const { href, name }: Props = $props();

    const breadcrumbs = getCrumbs();
    const crumbId = $derived(Symbol(href ? `${name}:${href}` : name));
    let prevCrumbId: symbol;

    onMount(() => {
        prevCrumbId = crumbId;
        breadcrumbs.crumbs = [...breadcrumbs.crumbs, { href, id: crumbId, name }];

        return () => {
            breadcrumbs.crumbs = breadcrumbs.crumbs.filter(({ id }) => id !== prevCrumbId);
        };
    });

    $effect(() => {
        if (crumbId !== prevCrumbId) {
            const index = breadcrumbs.crumbs.findIndex(({ id }) => id === prevCrumbId);
            if (index >= 0) {
                breadcrumbs.crumbs[index] = { href, id: crumbId, name };
            }
            prevCrumbId = crumbId;
        }
    });
</script>

