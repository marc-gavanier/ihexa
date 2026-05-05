import { fetchAndMap, withPagination } from './http';
import { applyFilters, applyInclude, applyLabels, applyLocation } from './params';
import type { Filters, IncludeField, Label, LocationFilter, SearchResult } from './types';

export const search = (query: string) => {
  const params = new Map<string, string>();
  params.set('q', query);

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
    execute: (): Promise<SearchResult> => fetchAndMap('/search', params)
  };

  return builder;
};
