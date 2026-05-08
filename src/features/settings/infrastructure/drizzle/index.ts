import { db } from '@/configuration/drizzle';
import { paymentTermsTable, sellerTable } from '@/features/settings/db';

export const clearSettings = async (): Promise<void> => {
  await db.delete(sellerTable);
  await db.delete(paymentTermsTable);
};
