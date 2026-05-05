import { fetchAndMap, withPagination } from './http';
import { applyInclude, applyLabels } from './params';
import type { IncludeField, Label, SearchResult } from './types';

export const nearPoint = (lat: number, long: number) => {
  const params = new Map<string, string>();
  params.set('lat', String(lat));
  params.set('long', String(long));

  const builder = {
    radius: (km: number) => {
      params.set('radius', String(km));
      return builder;
    },
    withLabels: (labels: Label[]) => {
      applyLabels(params, labels);
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
    execute: (): Promise<SearchResult> => fetchAndMap('/near_point', params)
  };

  return builder;
};
