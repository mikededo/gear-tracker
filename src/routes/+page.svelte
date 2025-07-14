<script lang="ts">
    import type { PageData } from './$types';

    import { IconChartBar } from '@tabler/icons-svelte';

    import { ROUTES } from '$lib/constants';
    import { m } from '$lib/i18n/messages';
    import { Button } from '$lib/ui';

    type Props = { data: PageData };
    const { data }: Props = $props();
    const session = data.session;
</script>

<section class="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
    <h1 class="mb-4 text-4xl font-bold">
        {#if session}
            {m.landing_title_li()}
        {:else}
            {m.landing_title_lo()}
        {/if}
    </h1>
    <p class="mb-8 max-w-xl text-lg text-muted-foreground">
        {m.landing_subtitle()}
    </p>

    <div class="flex justify-center gap-4">
        {#if session}
            <Button href={ROUTES.dashboard} size="lg">
                {m.open_dashboard()}
                <IconChartBar />
            </Button>
        {:else}
            <Button href={ROUTES.auth.signUp} size="lg">
                {m.sign_up()}
            </Button>
            <Button href={ROUTES.auth.signIn} size="lg" variant="outline">
                {m.sign_in()}
            </Button>
        {/if}
    </div>
</section>
