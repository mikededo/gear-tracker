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

<section class="flex flex-col gap-6">
    <Card class="overflow-hidden p-0">
        <CardContent class="grid p-0 md:grid-cols-2">
            <AuthForm class="p-6 md:p-8" action={ROUTES.auth.signUp}>
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col items-center gap-2 text-center">
                        <h1 class="text-2xl font-bold">{m.auth_sign_up_title()}</h1>
                        <p class="text-sm text-balance text-muted-foreground">
                            {m.auth_sign_up_subtitle()}
                        </p>
                    </div>

                    <div class="flex gap-3">
                        <div class="flex flex-col gap-3">
                            <Label for="first_name">{m.auth_sign_up_first_name_label()}</Label>
                            <Input
                                name="first_name"
                                placeholder={m.auth_sign_up_first_name_placeholder()}
                                type="text"
                                required
                            />
                        </div>
                        <div class="flex flex-col gap-3">
                            <Label for="last_name">{m.auth_sign_up_last_name_label()}</Label>
                            <Input
                                name="last_name"
                                placeholder={m.auth_sign_up_last_name_placeholder()}
                                type="text"
                                required
                            />
                        </div>
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

                    <div class="flex flex-col gap-3">
                        <Label for="password">{m.auth_password_label()}</Label>
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
                        {m.auth_sign_up_go_to_sign_in()}
                        <a class="underline underline-offset-4" href="/auth/sign-in"> {m.sign_in()}</a>
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
</section>
