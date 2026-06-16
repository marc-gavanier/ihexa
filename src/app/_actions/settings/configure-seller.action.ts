'use server';

import { withInput } from '@arckit/nextjs';
import { fromEither } from '@arckit/nextjs/action/either';
import { Schema } from 'effect';
import { actionBuilder } from '@/configuration/nextjs';
import { withErrorReporter } from '@/configuration/telemetry/error-reporter/server';
import { withEventTracker } from '@/configuration/telemetry/event-tracker/server';
import { withLogger } from '@/configuration/telemetry/logger/server';
import { withMetrics } from '@/configuration/telemetry/metrics/server';
import { withTracer } from '@/configuration/telemetry/tracer/server';
import { CONFIGURE_SELLER_ERRORS, configureSellerValidation } from '@/features/settings/abilities/configure-seller';
import { saveSellerConfiguration } from '@/features/settings/abilities/configure-seller/implementations';
import { CompanyIdentity } from '@/features/settings/domain/seller';

export const configureSellerAction = actionBuilder()
  .use(withTracer('action.configureSeller', { kind: 'server' }))
  .use(withMetrics('configureSeller'))
  .use(withInput(Schema.decodeUnknownSync(configureSellerValidation)))
  .use(withLogger('configureSellerAction'))
  .use(withErrorReporter('configureSellerAction'))
  .use(withEventTracker('Seller Configured'))
  .execute(
    fromEither(
      async ({ input: { company, ...sellerConfig } }) =>
        saveSellerConfiguration({ ...CompanyIdentity(company), ...sellerConfig }),
      { onError: CONFIGURE_SELLER_ERRORS }
    )
  );
