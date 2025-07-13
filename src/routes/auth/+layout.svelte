<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = { children: Snippet };
    const { children }: Props = $props();
</script>

<div class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-3xl">
        {@render children()}
    </div>
</div>
