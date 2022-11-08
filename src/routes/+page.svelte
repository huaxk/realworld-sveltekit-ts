<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	const { user } = data;
</script>

<svelte:head>
	<title>hello world</title>
</svelte:head>
<h1>Welcome to SvelteKit!!!</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
${user?.username}
