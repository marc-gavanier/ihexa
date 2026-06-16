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
  .use(withTracer('action.configurePaymentTerms', { kind: 'server' }))
  .use(withMetrics('configurePaymentTerms'))
  .use(withInput(Schema.standardSchemaV1(configurePaymentTermsValidation)))
  .use(withLogger('configurePaymentTermsAction'))
  .use(withErrorReporter('configurePaymentTermsAction'))
  .use(withEventTracker('Payment Terms Configured'))
  .execute(
    fromEither(async ({ input }) => savePaymentTermsConfiguration(toValidatedInput(input)), {
      onError: CONFIGURE_PAYMENT_TERMS_ERRORS
    })
  );
