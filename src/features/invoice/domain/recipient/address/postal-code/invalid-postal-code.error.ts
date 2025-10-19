import type { DomainError } from '@/libraries/ddd';

export type InvalidPostalCodeError = DomainError<
  'InvalidPostalCodeError',
  string
>;

export const InvalidPostalCodeError = (
  value: string,
): InvalidPostalCodeError => ({
  _tag: 'InvalidPostalCodeError' as const,
  value,
});
