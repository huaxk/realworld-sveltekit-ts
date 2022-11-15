<script lang="ts">
	import { api } from '$lib/api';
	import type { Article, SingleArticleResponse, User } from '$lib/generated';

	export let article: Article;
	export let user: User | null;

	async function toggle_favorite() {
		// optimistic UI
		if (article.favorited) {
			article.favoritesCount -= 1;
			article.favorited = false;
			const { data } = await api.del<SingleArticleResponse>(
				`articles/${article.slug}/favorite`,
				user ? user.token : ''
			);
			article = data.article;
		} else {
			article.favoritesCount += 1;
			article.favorited = true;
			const { data } = await api.post<SingleArticleResponse, unknown>(
				`articles/${article.slug}/favorite`,
				undefined,
				user ? user.token : ''
			);
			article = data.article;
		}
	}
</script>

<div class="article-preview">
	<div class="article-meta">
		<a href="/profile/@{article.author.username}">
			<img src={article.author.image} alt={article.author.username} />
		</a>

		<div class="info">
			<a class="author" href="/profile/@{article.author.username}"> {article.author.username} </a>
			<span class="date"> {new Date(article.createdAt).toDateString()} </span>
		</div>

		{#if user}
			<div class="pull-xs-right">
				<button
					class="btn btn-sm {article.favorited ? 'btn-primary' : 'btn-outline-primary'}"
					on:click={toggle_favorite}
				>
					<i class="ion-heart" />
					{article.favoritesCount}
				</button>
			</div>
		{/if}
	</div>

	<a href="/article/{article.slug}" rel="prefetch" class="preview-link">
		<h1>{article.title}</h1>
		<p>{article.description}</p>
		<span>Read more...</span>
		<ul class="tag-list">
			{#each article.tagList as tag}
				<li class="tag-default tag-pill tag-outline"><a href="/?tag={tag}">{tag}</a></li>
			{/each}
		</ul>
	</a>
</div>
