import { mapPayload } from './mappers';
import { buildUrl } from './params';
import type { SearchResult } from './types';

export const fetchAndMap = async (path: string, params: Map<string, string>): Promise<SearchResult> => {
  const response = await fetch(buildUrl(path, params));

  if (!response.ok) {
    const body: { erreur?: string } | null = await response.json().catch(() => null);
    throw new Error(`recherche-entreprises: ${response.status} ${body?.erreur ?? response.statusText}`);
  }

  return mapPayload(await response.json());
};

export const withPagination = (params: Map<string, string>, page: number, perPage?: number): void => {
  params.set('page', String(page));
  if (perPage != null) params.set('per_page', String(perPage));
};
