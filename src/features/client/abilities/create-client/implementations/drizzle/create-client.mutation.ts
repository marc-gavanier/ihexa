import { Either } from 'effect';
import { db } from '@/configuration/drizzle';
import { clientFromDomain, clientsTable } from '@/features/client/db';
import { ClientId } from '@/features/client/domain';
import {
  ClientAlreadyExists,
  type CreateB2BClient,
  type CreateB2CClient,
  type CreateClient,
  SiretAlreadyExists,
  toB2BClient,
  toB2CClient
} from '../../domain';

export const createB2CClient: CreateB2CClient = async (clientToCreate) => {
  const client = toB2CClient(clientToCreate);
  const [row] = await db.insert(clientsTable).values(clientFromDomain(client)).onConflictDoNothing().returning();
  if (!row) return Either.left(new ClientAlreadyExists({ clientId: ClientId(clientToCreate.id) }));
  return Either.right(client);
};

export const createB2BClient: CreateB2BClient = async (clientToCreate) => {
  const client = toB2BClient(clientToCreate);
  const [row] = await db.insert(clientsTable).values(clientFromDomain(client)).onConflictDoNothing().returning();
  if (!row) return Either.left(new SiretAlreadyExists({ siret: clientToCreate.siret }));
  return Either.right(client);
};

export const createClient: CreateClient = (clientToCreate) =>
  'siret' in clientToCreate ? createB2BClient(clientToCreate) : createB2CClient(clientToCreate);
