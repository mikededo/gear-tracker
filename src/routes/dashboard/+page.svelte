<script lang="ts">
    import type { PageData } from './$types';

    import { Overview } from '$lib/components/dashboard';

    type Props = { data: PageData };
    const { data }: Props = $props();

    const user = data.profile;
</script>

<h1 class="text-2xl font-semibold">
    Welcome {user?.first_name}
</h1>

<Overview data={data.dashboard} />

