import type { DomainError } from '@/libraries/ddd';

export type InvalidLastNameError = DomainError<'InvalidLastNameError', string>;

export const InvalidLastNameError = (value: string): InvalidLastNameError => ({
  _tag: 'InvalidLastNameError' as const,
  value,
});
