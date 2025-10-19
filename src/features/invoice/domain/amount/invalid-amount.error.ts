import type { DomainError } from '@/libraries/ddd';

export type InvalidAmountError = DomainError<'InvalidAmountError', bigint>;

export const InvalidAmountError = (value: bigint): InvalidAmountError => ({
  _tag: 'InvalidAmountError' as const,
  value,
});
