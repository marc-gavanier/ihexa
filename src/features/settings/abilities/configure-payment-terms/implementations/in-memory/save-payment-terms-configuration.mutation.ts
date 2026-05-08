import { Either } from 'effect';
import { buildPaymentTerms } from '@/features/settings/domain/payment-terms';
import { paymentTermsStore } from '@/features/settings/infrastructure/in-memory';
import type { SavePaymentTermsConfiguration } from '../../domain';

export const savePaymentTermsConfiguration: SavePaymentTermsConfiguration = async (input) => {
  const result = buildPaymentTerms(input);

  if (Either.isLeft(result)) return result;

  paymentTermsStore().set(result.right);
  return result;
};
