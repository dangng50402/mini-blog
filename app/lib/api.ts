import { fetchWithError } from "./fetcher";
import type { Post, Comment, User } from "./types";

const BASE = "https://jsonplaceholder.typicode.com";

export async function getPosts(): Promise<Post[]> {
  return fetchWithError<Post[]>(`${BASE}/posts`, {
    next: { revalidate: 3600 },
  });
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    return await fetchWithError<Post>(`${BASE}/posts/${id}`, {
      next: { revalidate: 3600 },
    });
  } catch {
    return null;
  }
}

export async function getComments(id: string): Promise<Comment[]> {
  return fetchWithError<Comment[]>(`${BASE}/posts/${id}/comments`, {
    next: { revalidate: 3600 },
  });
}

export async function getUser(userId: number): Promise<User> {
  return fetchWithError<User>(`${BASE}/users/${userId}`, {
    next: { revalidate: 86400 },
  });
}