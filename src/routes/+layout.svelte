<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { LayoutData } from './$types';
    import '../app.css';

    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

    import { initThemeContext } from '$lib/context/theme.svelte';

    type Props = {
        children: Snippet;
        data: LayoutData;
    };
    const { children, data }: Props = $props();

    initThemeContext(data.theme);
</script>

<QueryClientProvider client={data.queryClient}>
    {@render children()}
    <SvelteQueryDevtools />
</QueryClientProvider>
