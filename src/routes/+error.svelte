<script lang="ts" context="module">
  import { page } from "$app/stores";
</script>

<script lang="ts">
  // import { dev } from "$app/environment";
</script>

<svelte:head>
  <title>{$page.status}</title>
</svelte:head>

<div>
  <h1>{$page.status}</h1>

  <p>{$page.error?.message}</p>
</div>