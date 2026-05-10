import type { Filtered, Paginated } from '@arckit/resultset';
import type { Client } from '@/features/client/domain';

export type ClientRow = {
  readonly id: string;
  readonly name: string;
  readonly city: string;
  readonly zipcode: string;
};

export type PaginationViewModel = {
  readonly currentPage: number;
  readonly pageSize: number;
  readonly totalItems: number;
  readonly totalPages: number;
  readonly hasMultiplePages: boolean;
};

export type ListClientsView =
  | { readonly _tag: 'empty' }
  | { readonly _tag: 'noResults'; readonly search: string }
  | {
      readonly _tag: 'results';
      readonly rows: readonly ClientRow[];
      readonly pagination: PaginationViewModel;
      readonly search: string;
    };

const formatClientName = (client: Client): string =>
  client._tag === 'B2CClient' ? `${client.name.firstname} ${client.name.lastname}` : client.denominationSociale;

const toClientRow = (client: Client): ClientRow => ({
  id: client.id,
  name: formatClientName(client),
  city: client.address.city,
  zipcode: client.address.zipcode
});

const computeTotalPages = (totalItems: number, pageSize: number): number => Math.max(1, Math.ceil(totalItems / pageSize));

export const presentPagination = (result: Paginated<unknown>): PaginationViewModel => {
  const totalPages = computeTotalPages(result.totalItems, result.pageSize);
  return {
    currentPage: result.currentPage,
    pageSize: result.pageSize,
    totalItems: result.totalItems,
    totalPages,
    hasMultiplePages: totalPages > 1
  };
};

export const presentListClients = (result: Filtered<Paginated<Client>>, search: string): ListClientsView => {
  if (result.items.length === 0 && search) return { _tag: 'noResults', search };
  if (result.items.length === 0) return { _tag: 'empty' };
  return {
    _tag: 'results',
    rows: result.items.map(toClientRow),
    pagination: presentPagination(result),
    search
  };
};
