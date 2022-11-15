import { api } from '$lib/api';
import type { TagsResponse, MultipleArticlesResponse } from '$lib/generated';
import type { PageServerLoad } from './$types';
import { page_size } from '$lib/constants';

export const load: PageServerLoad = async ({ url: { searchParams }, locals }) => {
	const tab = searchParams.get('tab') || 'all';
	const tag = searchParams.get('tag');
	const page = (searchParams.get('page') || 1) as number;

	const endpoint = tab === 'feed' ? 'articles/feed' : 'articles';

	const q = new URLSearchParams();

	q.set('limit', `${page_size}`);
	q.set('offset', `${(page - 1) * page_size}`);

	if (tag) {
		q.set('tag', tag);
	}

	const token = locals.user && locals.user.token || undefined;

	const [{ articles, pages }, tags] = await Promise.all([
		api.get<MultipleArticlesResponse>(`${endpoint}?${q}`, token)
			.then((r) => {
				const pages = r.data.articlesCount;
				return {
					articles: r.data.articles,
					pages: Math.ceil(pages / page_size)
				};
			}),
		api.get<TagsResponse>('/tags').then((r) => r.data.tags)
	]);

	return {
		articles,
		pages,
		tags,
		user: locals.user
	};
};