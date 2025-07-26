<script lang="ts">
    import { ROUTES } from '$lib/constants';
    import { initCrumbsContext } from '$lib/context/breadcrumbs.svelte';
    import { Breadcrumb } from '$lib/ui';

    const crumbs = initCrumbsContext([{ href: ROUTES.dashboard, name: 'Dashboard' }]);
</script>

<Breadcrumb.Root>
    <Breadcrumb.List>
        {#each crumbs.crumbs as { href, name }, i}
            {@const isLast = i === crumbs.crumbs.length - 1}
            <Breadcrumb.Item>
                {#if isLast}
                    <Breadcrumb.Page>{name}</Breadcrumb.Page>
                {:else}
                    <Breadcrumb.Link {href}>{name}</Breadcrumb.Link>
                {/if}
            </Breadcrumb.Item>
            {#if !isLast}
                <Breadcrumb.Separator />
            {/if}
        {/each}
    </Breadcrumb.List>
</Breadcrumb.Root>
