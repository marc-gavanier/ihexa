import type { DomainError } from '@/libraries/ddd';

export type InvalidCityError = DomainError<'InvalidCityError', string>;

export const InvalidCityError = (value: string): InvalidCityError => ({
  _tag: 'InvalidCityError' as const,
  value,
});
