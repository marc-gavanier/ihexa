import type { DomainError } from '@/libraries/ddd';

export type InvalidInvoiceIdError = DomainError<
  'InvalidInvoiceIdError',
  string
>;

export const InvalidInvoiceIdError = (
  value: string,
): InvalidInvoiceIdError => ({
  _tag: 'InvalidInvoiceIdError' as const,
  value,
});
