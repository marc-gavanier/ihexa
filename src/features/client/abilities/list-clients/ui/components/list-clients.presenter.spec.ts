import { filtered, Page, PageSize, paginate } from '@arckit/resultset';
import { describe, expect, it } from 'vitest';
import { Client } from '@/features/client/domain';
import { presentListClients } from './list-clients.presenter';

const CLIENT_JEAN = Client({
  id: '550e8400-e29b-41d4-a716-446655440001',
  name: { firstname: 'Jean', lastname: 'DUPONT' },
  address: { street: '123 Rue de la Paix', city: 'Paris', zipcode: '75001' }
});

const CLIENT_MARIE = Client({
  id: '550e8400-e29b-41d4-a716-446655440002',
  name: { firstname: 'Marie', lastname: 'MARTIN' },
  address: { street: '456 Avenue Foch', city: 'Lyon', zipcode: '69001' }
});

describe('presentListClients', () => {
  it('should return empty tag when no clients and no search', () => {
    const result = presentListClients(filtered(paginate([])), '');

    expect(result).toEqual({ _tag: 'empty' });
  });

  it('should return noResults tag when no clients and search is active', () => {
    const result = presentListClients(filtered(paginate([])), 'xyz');

    expect(result).toEqual({ _tag: 'noResults', search: 'xyz' });
  });

  it('should return results tag with formatted rows', () => {
    const result = presentListClients(filtered(paginate([CLIENT_JEAN])), '');

    expect(result._tag).toBe('results');
    if (result._tag !== 'results') return;

    const [first] = result.rows;
    expect(first).toEqual({
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Jean DUPONT',
      city: 'Paris',
      zipcode: '75001'
    });
  });

  it('should format name as "Firstname LASTNAME"', () => {
    const result = presentListClients(filtered(paginate([CLIENT_JEAN])), '');

    expect(result._tag).toBe('results');
    if (result._tag !== 'results') return;

    const [first] = result.rows;
    expect(first?.name).toBe('Jean DUPONT');
  });

  it('should map multiple clients', () => {
    const result = presentListClients(filtered(paginate([CLIENT_JEAN, CLIENT_MARIE])), '');

    expect(result._tag).toBe('results');
    if (result._tag !== 'results') return;

    expect(result.rows).toHaveLength(2);
    const [first, second] = result.rows;
    expect(first?.name).toBe('Jean DUPONT');
    expect(second?.name).toBe('Marie MARTIN');
  });

  it('should include pagination in results', () => {
    const allClients = Array.from({ length: 25 }, (_, i) =>
      Client({
        id: `550e8400-e29b-41d4-a716-4466554400${String(i + 1).padStart(2, '0')}`,
        name: { firstname: `Client${i + 1}`, lastname: 'TEST' },
        address: { street: '1 Rue A', city: 'Paris', zipcode: '75001' }
      })
    );

    const result = presentListClients(filtered(paginate(allClients, { page: Page(2), pageSize: PageSize(10) })), '');

    expect(result._tag).toBe('results');
    if (result._tag !== 'results') return;

    expect(result.pagination).toEqual({
      totalItems: 25,
      currentPage: 2,
      pageSize: 10,
      totalPages: 3,
      hasMultiplePages: true
    });
  });

  it('should preserve search in results', () => {
    const result = presentListClients(filtered(paginate([CLIENT_JEAN])), 'jean');

    expect(result._tag).toBe('results');
    if (result._tag !== 'results') return;

    expect(result.search).toBe('jean');
  });
});
