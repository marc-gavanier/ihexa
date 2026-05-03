import { Either } from 'effect';
import { SellerNotConfigured } from '@/features/settings/domain/seller';
import { sellerStore } from '@/features/settings/infrastructure/in-memory';
import type { GetSellerConfiguration } from '../../domain';

export const getSellerConfiguration: GetSellerConfiguration = async () => {
  const seller = sellerStore().get();
  if (!seller) return Either.left(new SellerNotConfigured());
  return Either.right(seller);
};
