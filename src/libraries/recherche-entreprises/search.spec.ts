import { describe, expect, it } from 'vitest';
import { createSearch } from './search';
import type { SearchResult } from './types';

const emptyResult: SearchResult = { companies: [], total: 0, page: 1, perPage: 10, totalPages: 0 };

describe('createSearch interceptor seam', () => {
  it('routes execute through the interceptor', async () => {
    const { promise, resolve } = Promise.withResolvers<string>();
    const search = createSearch((query) => {
      resolve(query);
      return Promise.resolve(emptyResult);
    });
    await search('acme').include(['headquarters']).execute();
    expect(await promise).toBe('acme');
  });

  it('returns the value produced by the interceptor', async () => {
    const search = createSearch(() => Promise.resolve({ ...emptyResult, total: 7 }));
    expect((await search('acme').execute()).total).toBe(7);
  });
});
