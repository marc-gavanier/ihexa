import { Either } from 'effect';
import { db } from '@/configuration/drizzle';
import { sellerTable, sellerToDomain } from '@/features/settings/db';
import { SellerNotConfigured } from '@/features/settings/domain/seller';
import type { GetSellerConfiguration } from '../../domain';

export const getSellerConfiguration: GetSellerConfiguration = async () => {
  const [row] = await db.select().from(sellerTable).limit(1);
  if (!row) return Either.left(new SellerNotConfigured());
  return Either.right(sellerToDomain(row));
};
