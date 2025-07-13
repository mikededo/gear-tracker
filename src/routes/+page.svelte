<script lang="ts">
    import { ROUTES } from '$lib/constants';
    import { m } from '$lib/i18n/messages';
    import { Button } from '$lib/ui';
</script>

<section class="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
    <h1 class="mb-4 text-4xl font-bold">Welcome to Gear Tracker</h1>
    <p class="mb-8 max-w-xl text-lg text-muted-foreground">
        Effortlessly track, manage, and optimize your gear. Sign up to get started or sign in if you already have an account.
    </p>

    <div class="flex justify-center gap-4">
        <Button href={ROUTES.auth.signUp} size="lg" variant="default">
            {m.sign_up()}
        </Button>
        <Button href={ROUTES.auth.signIn} size="lg" variant="outline">
            {m.sign_in()}
        </Button>
    </div>
</section>
