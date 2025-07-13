<script lang="ts" module>
    export type ChildrenProps = { error: null | string; loading: boolean };
</script>

<script lang="ts">
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { Snippet } from 'svelte';
    import type { HTMLFormAttributes } from 'svelte/elements';

    import { enhance } from '$app/forms';

    type Props = {
        children: Snippet<[ChildrenProps]>;
    } & Omit<HTMLFormAttributes, 'children' | 'method'>;
    const { children, ...formProps }: Props = $props();

    let loading = $state(false);
    let error: null | string = $state(null);

    const formStateHandler: SubmitFunction = async () => {
        loading = true;

        return ({ result, update }) => {
            if (result.type === 'failure' && result.data) {
                error = result.data.error;
            }

            update({ invalidateAll: true })
                .finally(async () => {
                    loading = false;
                });
        };
    };
</script>

<form use:enhance={formStateHandler} method="POST" {...formProps}>
    {@render children({ error, loading })}
</form>

