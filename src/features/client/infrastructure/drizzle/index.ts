import { db } from '@/configuration/drizzle';
import { clientsTable } from '@/features/client/db';

export const clearClients = async (): Promise<void> => {
  await db.delete(clientsTable);
};
