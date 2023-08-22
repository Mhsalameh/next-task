import { Octokit } from '@octokit/rest';
import { Data, Fork, Languages, Item } from './types';

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});
export const searchRepos = async (query: string, option: string, page: number) => {
	const queryString = 'q=' + encodeURIComponent(query);
	try {
		const response = await octokit.request(`GET /search/${option}?${queryString}&page=${page}&per_page=6`, {
			headers: {
				Accept: 'application/vnd.github+json',
			},
		});
		const data: Data[] = await Promise.all(
			response.data.items.map(async (item: Item) => {
				if (option === 'repositories') {
					try {
						return {
							name: item.name,
							fullName: item.full_name,
							htmlUrl: item.html_url,
						} as Data;
					} catch (error) {
						throw error;
					}
				} else {
					return {
						name: item.login,
						avatarUrl: item.avatar_url,
						htmlUrl: item.html_url,
					} as Data;
				}
			}),
		);

		return { data: data, totalCount: response.data.total_count };
	} catch (error) {
		throw error;
	}
};

export const getForks = async (fullName: string): Promise<Fork[]> => {
	try {
		const response = await octokit.request(`GET /repos/${fullName}/forks?per_page=3`, {
			headers: {
				Accept: 'application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});

		return response.data;
	} catch (error) {
		const typedError = error as Error;
		throw typedError;
	}
};

export const getLanguages = async (fullName: string): Promise<Languages> => {
	try {
		const response = await octokit.request(`GET /repos/${fullName}/languages`, {
			headers: {
				Accept: 'application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

export default searchRepos;
