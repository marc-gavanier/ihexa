'use server';

import { fromEither, withInput } from '@arckit/nextjs';
import { withLogger } from '@/configuration/logger';
import { actionBuilder } from '@/configuration/nextjs';
import { CONFIGURE_SELLER_ERRORS, configureSellerValidation } from '@/features/settings/abilities/configure-seller';
import { saveSellerConfiguration } from '@/features/settings/abilities/configure-seller/implementations';

export const configureSellerAction = actionBuilder()
  .use(withInput(configureSellerValidation))
  .use(withLogger('configureSellerAction'))
  .execute(
    fromEither(async ({ input }) => saveSellerConfiguration(input), {
      onError: CONFIGURE_SELLER_ERRORS
    })
  );
