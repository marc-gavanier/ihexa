import type { DomainError } from '@/libraries/ddd';

export type InvalidQuantityError = DomainError<'InvalidQuantityError', number>;

export const InvalidQuantityError = (value: number): InvalidQuantityError => ({
  _tag: 'InvalidQuantityError' as const,
  value,
});
