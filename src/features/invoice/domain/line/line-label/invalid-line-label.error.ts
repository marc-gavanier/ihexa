import type { DomainError } from '@/libraries/ddd';

export type InvalidLineLabelError = DomainError<
  'InvalidLineLabelError',
  string
>;

export const InvalidLineLabelError = (
  value: string,
): InvalidLineLabelError => ({
  _tag: 'InvalidLineLabelError' as const,
  value,
});
