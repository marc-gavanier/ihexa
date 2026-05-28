'use server';

import { fromEither, withInput } from '@arckit/nextjs';
import { actionBuilder } from '@/configuration/nextjs';
import { withEventTracker } from '@/configuration/observability/event-tracker/server';
import { withLogger } from '@/configuration/observability/logger/server';
import { withTracer } from '@/configuration/observability/tracer/server';
import { CONFIGURE_SELLER_ERRORS, configureSellerValidation } from '@/features/settings/abilities/configure-seller';
import { saveSellerConfiguration } from '@/features/settings/abilities/configure-seller/implementations';
import { CompanyIdentity } from '@/features/settings/domain/seller';

export const configureSellerAction = actionBuilder()
  .use(withTracer('action.configureSeller', { kind: 'server' }))
  .use(withInput(configureSellerValidation))
  .use(withLogger('configureSellerAction'))
  .use(withEventTracker('Seller Configured'))
  .execute(
    fromEither(
      async ({ input: { company, ...sellerConfig } }) =>
        saveSellerConfiguration({ ...CompanyIdentity(company), ...sellerConfig }),
      { onError: CONFIGURE_SELLER_ERRORS }
    )
  );
