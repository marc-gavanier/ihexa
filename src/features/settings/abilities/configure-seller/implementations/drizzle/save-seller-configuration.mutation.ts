import { Either } from 'effect';
import { db } from '@/configuration/drizzle';
import { sellerFromDomain, sellerTable } from '@/features/settings/db';
import { buildSeller } from '@/features/settings/domain/seller';
import type { SaveSellerConfiguration } from '../../domain';

export const saveSellerConfiguration: SaveSellerConfiguration = async (input) => {
  const result = buildSeller(input);

  if (Either.isLeft(result)) return result;

  const seller = result.right;
  const row = sellerFromDomain(seller);
  await db.delete(sellerTable);
  await db.insert(sellerTable).values(row);

  return Either.right(seller);
};
