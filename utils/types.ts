export interface Data {
	id: number;
	name: string;
	languages: string[];
	htmlUrl: string;
	avatarUrl: string;
	forks: Fork[];
}
export interface Owner {
	html_url: string;
	name: string;
	avatar_url: string;
}
export interface Fork {
	id: number;
	owner: Owner;
	full_name: string;
}

export interface Languages {
	[language: string]: number;
}

export interface Item {
	id: number;
	full_name: string;
	name: string;
	html_url: string;
	login: string;
	avatar_url: string;
}
