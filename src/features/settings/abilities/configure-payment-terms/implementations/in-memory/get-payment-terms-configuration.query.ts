import { Either } from 'effect';
import { PaymentTermsNotConfigured } from '@/features/settings/domain/payment-terms';
import { paymentTermsStore } from '@/features/settings/infrastructure/in-memory';
import type { GetPaymentTermsConfiguration } from '../../domain';

export const getPaymentTermsConfiguration: GetPaymentTermsConfiguration = async () => {
  const paymentTerms = paymentTermsStore().get();
  return paymentTerms ? Either.right(paymentTerms) : Either.left(PaymentTermsNotConfigured);
};
