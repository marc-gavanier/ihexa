import { Either } from 'effect';
import { db } from '@/configuration/drizzle';
import { clientFromDomain, clientsTable, clientToDomain } from '@/features/client/db';
import { ClientId } from '@/features/client/domain';
import { ClientAlreadyExists, type CreateClient, SiretAlreadyExists, toB2BClient, toB2CClient } from '../../domain';

export const createClient: CreateClient = async (clientToCreate) => {
  const client = 'siret' in clientToCreate ? toB2BClient(clientToCreate) : toB2CClient(clientToCreate);
  const [row] = await db.insert(clientsTable).values(clientFromDomain(client)).onConflictDoNothing().returning();
  if (!row) {
    if ('siret' in clientToCreate) {
      return Either.left(new SiretAlreadyExists({ siret: clientToCreate.siret }));
    }
    return Either.left(new ClientAlreadyExists({ clientId: ClientId(clientToCreate.id) }));
  }
  return Either.right(clientToDomain(row));
};
