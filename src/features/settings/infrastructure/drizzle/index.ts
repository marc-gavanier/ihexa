import { db } from '@/configuration/drizzle';
import { sellerTable } from '@/features/settings/db';

export const clearSettings = async (): Promise<void> => {
  await db.delete(sellerTable);
};
