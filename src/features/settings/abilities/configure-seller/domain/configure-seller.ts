import type { Either } from 'effect';
import type {
  Seller,
  SellerConfigurationError,
  SellerNotConfigured,
  ValidatedSellerInput
} from '@/features/settings/domain/seller';

export type SaveSellerConfiguration = (input: ValidatedSellerInput) => Promise<Either.Either<Seller, SellerConfigurationError>>;

export type GetSellerConfiguration = () => Promise<Either.Either<Seller, SellerNotConfigured>>;
