'use server';

import { fromEither, withInput } from '@arckit/nextjs';
import { withLogger } from '@/configuration/logger';
import { actionBuilder } from '@/configuration/nextjs';
import {
  CONFIGURE_PAYMENT_TERMS_ERRORS,
  configurePaymentTermsValidation
} from '@/features/settings/abilities/configure-payment-terms';
import { savePaymentTermsConfiguration } from '@/features/settings/abilities/configure-payment-terms/implementations';

export const configurePaymentTermsAction = actionBuilder()
  .use(withInput(configurePaymentTermsValidation))
  .use(withLogger('configurePaymentTermsAction'))
  .execute(
    fromEither(async ({ input }) => savePaymentTermsConfiguration(input), {
      onError: CONFIGURE_PAYMENT_TERMS_ERRORS
    })
  );
