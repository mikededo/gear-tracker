<script lang="ts">
    import { IconPlus } from '@tabler/icons-svelte';

    import { useCreateSetup } from '$lib/queries/setup';
    import {
        Button,
        buttonVariants,
        Dialog,
        Input,
        Label,
        Textarea
    } from '$lib/ui';

    type Props = { sportId: string };
    const { sportId }: Props = $props();
    import * as v from 'valibot';

    import { goto } from '$app/navigation';
    import { ROUTES } from '$lib/constants';

    const NameSchema = v.pipe(
        v.string(),
        v.regex(/^[a-z0-9 ]+$/i, 'Name should only contain letters and numbers')
    );

    let open = $state(false);
    let nameRef: HTMLInputElement | null = $state(null);
    let descriptionRef: HTMLTextAreaElement | null = $state(null);
    let error = $state({
        id: '',
        message: ''
    });

    const mutation = useCreateSetup();

    const onSubmit = () => {
        if (!nameRef || !descriptionRef) {
            return;
        }

        const name = nameRef.value;
        const maybeName = v.safeParse(NameSchema, name);
        if (maybeName.issues) {
            error = {
                id: 'name',
                message: maybeName.issues[0].message
            };
            nameRef.focus();
            return;
        }

        $mutation.mutate({
            description: descriptionRef.value,
            name,
            slug: name.toLowerCase().replaceAll(' ', '-'),
            sportId
        }, {
            onSuccess: ({ data }) => {
                // Ts check
                if (!data) {
                    return;
                }

                open = false;
                goto(ROUTES.setup(data.user_sports.slug, data.slug));
            }
        });
    };

    const onKeydown = () => {
        if (error.id) {
            error = { id: '', message: '' };
        }
    };
</script>

<Dialog.Root bind:open={open}>
    <Dialog.Trigger class={buttonVariants({ size: 'sm', variant: 'default' })}>
        <IconPlus class="size-4" />
        <span>Create setup</span>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-md">
        <Dialog.Header>
            <Dialog.Title>New setup</Dialog.Title>
        </Dialog.Header>
        <div class="grid gap-4 py-2">
            <div class="flex flex-col gap-2">
                <Label for="name">Name</Label>
                <Input
                    bind:ref={nameRef}
                    autocomplete="off"
                    id="name"
                    required
                    onkeydown={onKeydown}
                    aria-invalid={Boolean(error.id === 'name')}
                />
                {#if error.id === 'name'}
                    <p class="text-xs text-destructive">{error.message}</p>
                {/if}
            </div>
            <div class="flex flex-col gap-2">
                <Label for="description">Description</Label>
                <Textarea
                    bind:ref={descriptionRef}
                    autocomplete="off"
                    onkeydown={onKeydown}
                />
            </div>
        </div>
        <Dialog.Footer>
            <Button loading={$mutation.isPending} onclick={onSubmit}>
                Save changes
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
