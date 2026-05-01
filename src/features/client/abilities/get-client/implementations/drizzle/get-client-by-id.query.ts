import { eq } from 'drizzle-orm';
import { Either } from 'effect';
import { db } from '@/configuration/drizzle';
import { clientsTable, clientToDomain } from '@/features/client/db';
import type { ClientId } from '@/features/client/domain';
import type { GetClientById } from '../../domain';
import { ClientNotFound } from '../../domain';

export const getClientById: GetClientById = async (id: ClientId) => {
  const [row] = await db.select().from(clientsTable).where(eq(clientsTable.id, id)).limit(1);
  return row ? Either.right(clientToDomain(row)) : Either.left(new ClientNotFound({ clientId: id }));
};
