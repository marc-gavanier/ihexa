import { fetchAndMap, withPagination } from './http';
import { applyFilters, applyInclude, applyLabels, applyLocation } from './params';
import type { Filters, IncludeField, Label, LocationFilter, SearchResult } from './types';

export type ExecuteInterceptor = (query: string, run: () => Promise<SearchResult>) => Promise<SearchResult>;

export const createSearch = (intercept?: ExecuteInterceptor) => (query: string) => {
  const params = new Map<string, string>();
  params.set('q', query);

  const run = (): Promise<SearchResult> => fetchAndMap('/search', params);

  const builder = {
    in: (location: LocationFilter) => {
      applyLocation(params, location);
      return builder;
    },
    withLabels: (labels: Label[]) => {
      applyLabels(params, labels);
      return builder;
    },
    withFilters: (filters: Filters) => {
      applyFilters(params, filters);
      return builder;
    },
    include: (fields: IncludeField[]) => {
      applyInclude(params, fields);
      return builder;
    },
    page: (page: number, perPage?: number) => {
      withPagination(params, page, perPage);
      return builder;
    },
    execute: (): Promise<SearchResult> => (intercept ? intercept(query, run) : run())
  };

  return builder;
};

export const search = createSearch();
