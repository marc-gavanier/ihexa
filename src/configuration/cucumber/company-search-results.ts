import type { CompanySummary } from '@/libraries/recherche-entreprises';

let _searchResults: readonly CompanySummary[] | undefined;

export const setSearchResults = (results: readonly CompanySummary[]): void => {
  _searchResults = results;
};

export const getSearchResults = (): readonly CompanySummary[] | undefined => _searchResults;
