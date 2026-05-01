import { Either } from 'effect';
import { db } from '@/configuration/drizzle';
import { clientFromDomain, clientsTable, clientToDomain } from '@/features/client/db';
import { Client, ClientId } from '@/features/client/domain';
import { ClientAlreadyExists, type CreateClient } from '../../domain';

export const createClient: CreateClient = async (clientToCreate) => {
  const client = Client(clientToCreate);
  const [row] = await db.insert(clientsTable).values(clientFromDomain(client)).onConflictDoNothing().returning();
  if (!row) return Either.left(new ClientAlreadyExists({ clientId: ClientId(clientToCreate.id) }));
  return Either.right(clientToDomain(row));
};
