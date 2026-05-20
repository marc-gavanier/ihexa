import type { ServerActionResult } from '@arckit/nextjs/client';
import { keyFor } from 'piqure';
import type { Seller } from '@/features/settings/domain/seller';
import type { ConfigureSellerErrorKey } from './configure-seller.errors';
import type { ConfigureSellerInput } from './configure-seller.validation';

export const CONFIGURE_SELLER_KEY =
  keyFor<(formData: ConfigureSellerInput) => Promise<ServerActionResult<Seller, ConfigureSellerErrorKey>>>(
    'configure-seller.action'
  );
