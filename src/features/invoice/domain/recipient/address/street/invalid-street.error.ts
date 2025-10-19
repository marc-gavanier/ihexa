import type { DomainError } from '@/libraries/ddd';

export type InvalidStreetError = DomainError<'InvalidStreetError', string>;

export const InvalidStreetError = (value: string): InvalidStreetError => ({
  _tag: 'InvalidStreetError' as const,
  value,
});
