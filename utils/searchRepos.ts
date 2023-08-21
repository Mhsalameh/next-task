import { Octokit } from "@octokit/rest";
import { Data, Fork } from "./types";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});
export const searchRepos = async (
  query: string,
  option: string,
  page: number
) => {
  try {
    const response = await octokit.request(
      `GET /search/${option}?q=${query}&sort=stars&order=desc&page=${page}&per_page=6`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const data: Data[] = await Promise.all(
      response.data.items.map(async (item: any) => {
        if (option === "repositories") {
          try {
            const forks: Fork[] = await getForks(item.full_name);
            return {
              id: item.id,
              name: item.name,
              language: item.language,
              htmlUrl: item.html_url,
              forks: forks,
            } as Data;
          } catch (error) {
            console.log(error);
          }
        } else {
          return {
            id: item.id,
            name: item.login,
            avatarUrl: item.avatar_url,
            htmlUrl: item.html_url,
          } as Data;
        }
      })
    );
    return { data: data, totalCount: response.data.total_count };
  } catch (error) {
    return { data: [], totalCount: 0 };
  }
};

const getForks = async (fullName: string): Promise<Fork[]> => {
  try {
    const response = await octokit.request(
      `GET /repos/${fullName}/forks?per_page=3`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default searchRepos;
