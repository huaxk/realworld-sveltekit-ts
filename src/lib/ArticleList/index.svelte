<script lang="ts">
	import type { Article, User } from '$lib/generated';
	import ArticlePreview from './ArticlePreview.svelte';

	export let user: User | null;
	export let articles: Article[];
</script>

{#if articles.length === 0}
	<div class="article-preview">No articles are here... yet.</div>
{:else}
	<div>
		{#each articles as article (article.slug)}
			<ArticlePreview {article} user={user} />
		{/each}
	</div>
{/if}
