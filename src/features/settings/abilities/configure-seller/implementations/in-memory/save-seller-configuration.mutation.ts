import { Either } from 'effect';
import { buildSeller } from '@/features/settings/domain/seller';
import { sellerStore } from '@/features/settings/infrastructure/in-memory';
import type { SaveSellerConfiguration } from '../../domain';

export const saveSellerConfiguration: SaveSellerConfiguration = async (input) => {
  const result = buildSeller(input);

  if (Either.isLeft(result)) return result;

  sellerStore().set(result.right);
  return result;
};
