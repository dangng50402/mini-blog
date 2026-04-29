export async function fetchWithError<T>(
  url: string,
  options?: RequestInit & { next?: { revalidate?: number } }
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText} — ${url}`);
  }

  return res.json() as Promise<T>;
}
