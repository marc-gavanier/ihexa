import { Either } from 'effect';
import { ClientId } from '@/features/client/domain';
import { clientsStore } from '@/features/client/infrastructure/in-memory';
import {
  ClientAlreadyExists,
  type CreateB2BClient,
  type CreateB2CClient,
  type CreateClient,
  SiretAlreadyExists,
  toB2BClient,
  toB2CClient
} from '../../domain';

const siretExists = (siret: string): boolean =>
  Array.from(clientsStore().values()).some((client) => 'siret' in client && client.siret === siret);

export const createB2CClient: CreateB2CClient = async (clientToCreate) => {
  const store = clientsStore();
  const clientId = ClientId(clientToCreate.id);

  if (store.has(clientId)) return Either.left(new ClientAlreadyExists({ clientId }));

  const client = toB2CClient(clientToCreate);
  store.set(clientId, client);
  return Either.right(client);
};

export const createB2BClient: CreateB2BClient = async (clientToCreate) => {
  const store = clientsStore();
  const clientId = ClientId(clientToCreate.id);

  if (store.has(clientId)) return Either.left(new ClientAlreadyExists({ clientId }));
  if (siretExists(clientToCreate.siret)) return Either.left(new SiretAlreadyExists({ siret: clientToCreate.siret }));

  const client = toB2BClient(clientToCreate);
  store.set(clientId, client);
  return Either.right(client);
};

export const createClient: CreateClient = (clientToCreate) =>
  'siret' in clientToCreate ? createB2BClient(clientToCreate) : createB2CClient(clientToCreate);
