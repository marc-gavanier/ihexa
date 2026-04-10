import type { Client, ListClients } from '@/features/client/domain';
import { clientsStore } from '@/features/client/infrastructure/in-memory';
import { filtered, paginate } from '@/libraries/resultset';

import { normalizeSearchText } from './normalize-search-text';

const clientToSearchableText = (client: Client): string =>
  normalizeSearchText(
    [client.name.firstname, client.name.lastname, client.address.street, client.address.city, client.address.zipcode].join(' ')
  );

const matchesSearch = (client: Client, search: string = ''): boolean =>
  normalizeSearchText(search)
    .split(/\s+/)
    .filter(Boolean)
    .some((term) => clientToSearchableText(client).includes(term));

export const listClients: ListClients = async (params) => {
  const allClients = Array.from(clientsStore().values());
  const matchingClients = params?.search ? allClients.filter((client) => matchesSearch(client, params.search)) : allClients;
  return filtered(paginate(matchingClients, params), params);
};
