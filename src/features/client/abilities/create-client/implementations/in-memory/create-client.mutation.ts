import { Either } from 'effect';
import { ClientAlreadyExists, ClientId, ClientToCreate, type CreateClient } from '@/features/client/domain';

const CLIENTS = new Map<ClientId, ClientToCreate>();

export const createClient: CreateClient = async (clientData) => {
  const clientId = ClientId(clientData.id);

  if (CLIENTS.has(clientId)) return Either.left(new ClientAlreadyExists({ clientId }));

  const clientToCreate = ClientToCreate(clientData);
  CLIENTS.set(clientId, clientToCreate);
  return Either.right(clientToCreate);
};

export const clearClients = (): void => {
  CLIENTS.clear();
};
