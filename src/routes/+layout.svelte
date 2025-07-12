<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { LayoutData } from './$types';
    import '../app.css';

    import { initThemeContext } from '$lib/context/theme.svelte';

    type Props = {
        children: Snippet;
        data: LayoutData;
    };
    const { children, data }: Props = $props();

    initThemeContext(data.theme);
</script>

{@render children()}
