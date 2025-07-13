<script lang="ts">
    import { AuthForm } from '$lib/components';
    import { ROUTES } from '$lib/constants';
    import { m } from '$lib/i18n/messages';
    import {
        Button,
        Card,
        CardContent,
        Input,
        Label
    } from '$lib/ui';
</script>

<div class="flex flex-col gap-6">
    <Card class="overflow-hidden p-0">
        <CardContent class="grid p-0 md:grid-cols-2">
            <AuthForm class="p-6 md:p-8" action={ROUTES.actions.authSignIn}>
                <div class="flex flex-col gap-6">
                    <div class="flex w-full flex-col items-center gap-2 text-center">
                        <h1 class="text-2xl font-bold">{m.auth_sign_in_title()}</h1>
                        <p class="text-sm text-balance text-muted-foreground">
                            {m.auth_sign_in_subtitle()}
                        </p>
                    </div>

                    <div class="flex flex-col gap-3">
                        <Label for="email">{m.auth_email_label()}</Label>
                        <Input
                            autocomplete="email"
                            name="email"
                            placeholder={m.auth_email_placeholder()}
                            type="email"
                            required
                        />
                    </div>

                    <div class="grid gap-3">
                        <div class="flex items-center">
                            <Label for="password">{m.auth_password_label()}</Label>
                            <a class="ml-auto text-sm underline-offset-2 hover:underline" href="##">
                                {m.auth_sign_in_forgot_password()}
                            </a>
                        </div>

                        <Input
                            autocomplete="new-password"
                            name="password"
                            placeholder={m.auth_password_placeholder()}
                            type="password"
                            required
                        />
                    </div>

                    <Button class="w-full" type="submit">{m.sign_in()}</Button>
                    <div class="text-center text-sm">
                        {m.auth_sign_in_go_to_sign_up()}
                        <a class="underline underline-offset-4" href={ROUTES.auth.signUp}> {m.sign_up()}</a>
                    </div>
                </div>
            </AuthForm>

            <div class="relative hidden bg-muted md:block">
                <img
                    class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    alt="placeholder"
                    src="/placeholder.svg"
                />
            </div>
        </CardContent>
    </Card>

    <div
        class="text-center text-xs text-balance text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary"
    >
        By clicking continue, you agree to our <a href="##">Terms of Service</a> and
        <a href="##">Privacy Policy</a>.
    </div>
</div>
