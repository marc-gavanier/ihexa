import type { DomainError } from '@/libraries/ddd';

export type InvalidFirstNameError = DomainError<
  'InvalidFirstNameError',
  string
>;

export const InvalidFirstNameError = (
  value: string,
): InvalidFirstNameError => ({
  _tag: 'InvalidFirstNameError' as const,
  value,
});
