import { Either } from 'effect';
import { type ClientId, ClientNotFound, type GetClientById } from '@/features/client/domain';
import { clientsStore } from '@/features/client/infrastructure/in-memory';

export const getClientById: GetClientById = async (id: ClientId) => {
  const client = clientsStore().get(id);
  return client ? Either.right(client) : Either.left(new ClientNotFound({ clientId: id }));
};
