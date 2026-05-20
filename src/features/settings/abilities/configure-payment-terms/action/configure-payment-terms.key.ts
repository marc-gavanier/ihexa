import type { ServerActionResult } from '@arckit/nextjs/client';
import { keyFor } from 'piqure';
import type { PaymentTerms } from '@/features/settings/domain/payment-terms';
import type { ConfigurePaymentTermsErrorKey } from './configure-payment-terms.errors';
import type { ConfigurePaymentTermsInput } from './configure-payment-terms.validation';

export const CONFIGURE_PAYMENT_TERMS_KEY =
  keyFor<(formData: ConfigurePaymentTermsInput) => Promise<ServerActionResult<PaymentTerms, ConfigurePaymentTermsErrorKey>>>(
    'configure-payment-terms.action'
  );
