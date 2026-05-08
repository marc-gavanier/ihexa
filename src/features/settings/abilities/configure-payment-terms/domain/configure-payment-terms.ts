import type { Either } from 'effect';
import type {
  PaymentTerms,
  PaymentTermsConfigurationError,
  ValidatedPaymentTermsInput
} from '@/features/settings/domain/payment-terms';
import type { PaymentTermsNotConfigured } from '@/features/settings/domain/payment-terms/payment-terms';

export type SavePaymentTermsConfiguration = (
  input: ValidatedPaymentTermsInput
) => Promise<Either.Either<PaymentTerms, PaymentTermsConfigurationError>>;

export type GetPaymentTermsConfiguration = () => Promise<Either.Either<PaymentTerms, typeof PaymentTermsNotConfigured>>;
