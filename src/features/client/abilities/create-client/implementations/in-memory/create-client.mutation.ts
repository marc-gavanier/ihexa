import { Either } from 'effect';
import { Client, ClientAlreadyExists, ClientId, type CreateClient } from '@/features/client/domain';
import { clientsStore } from '@/features/client/infrastructure/in-memory';

export const createClient: CreateClient = async (clientToCreate) => {
  const store = clientsStore();

  const clientId = ClientId(clientToCreate.id);

  if (store.has(clientId)) return Either.left(new ClientAlreadyExists({ clientId }));

  const client = Client(clientToCreate);
  store.set(clientId, client);
  return Either.right(client);
};
