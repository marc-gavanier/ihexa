import { Either } from 'effect';
import { Client, ClientAlreadyExists, ClientId, type CreateClient } from '@/features/client/domain';

const CLIENTS = new Map<ClientId, Client>();

export const createClient: CreateClient = async (clientData) => {
  const clientId = ClientId(clientData.id);

  if (CLIENTS.has(clientId)) return Either.left(new ClientAlreadyExists({ clientId }));

  const client = Client(clientData);
  CLIENTS.set(clientId, client);
  return Either.right(client);
};

export const clearClients = (): void => {
  CLIENTS.clear();
};
