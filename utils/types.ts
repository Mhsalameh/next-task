import { OctokitResponse } from "@octokit/types";

export interface Data {
    id: number;
    name: string;
    language: string;
    htmlUrl: string;
    avatarUrl: string;
    forks: Fork[];
  }
export interface Owner{
    html_url: string;
    name: string;
    avatar_url: string;
} 
  export interface Fork {
    id: number;
    owner: Owner;
  }
  