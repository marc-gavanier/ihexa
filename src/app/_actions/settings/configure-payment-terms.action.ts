'use server';

import { fromEither, withInput } from '@arckit/nextjs';
import { actionBuilder } from '@/configuration/nextjs';
import { withEventTracker } from '@/configuration/observability/event-tracker/server';
import { withLogger } from '@/configuration/observability/logger/server';
import {
  CONFIGURE_PAYMENT_TERMS_ERRORS,
  type ConfigurePaymentTermsFormData,
  configurePaymentTermsValidation
} from '@/features/settings/abilities/configure-payment-terms';
import { savePaymentTermsConfiguration } from '@/features/settings/abilities/configure-payment-terms/implementations';
import type { ValidatedPaymentTermsInput } from '@/features/settings/domain/payment-terms';
import { noDiscount, withDiscount } from '@/features/settings/domain/payment-terms';

const toValidatedInput = (input: ConfigurePaymentTermsFormData): ValidatedPaymentTermsInput => ({
  ...input,
  earlyPaymentDiscount:
    input.earlyPaymentDiscountTag === 'WithDiscount' && input.discountRate != null && input.discountDelayThreshold != null
      ? withDiscount(input.discountRate, input.discountDelayThreshold)
      : noDiscount
});

export const configurePaymentTermsAction = actionBuilder()
  .use(withInput(configurePaymentTermsValidation))
  .use(withLogger('configurePaymentTermsAction'))
  .use(withEventTracker('Payment Terms Configured'))
  .execute(
    fromEither(async ({ input }) => savePaymentTermsConfiguration(toValidatedInput(input)), {
      onError: CONFIGURE_PAYMENT_TERMS_ERRORS
    })
  );
