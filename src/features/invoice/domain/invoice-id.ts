import { type Effect, fail, succeed } from 'effect/Effect';
import type { DomainError, ValueObject } from '@/libraries/ddd';

export type InvalidInvoiceIdError = DomainError<
  'InvalidInvoiceIdError',
  string
>;

export const InvalidInvoiceIdError = (
  value: string,
): InvalidInvoiceIdError => ({
  _tag: 'InvalidInvoiceIdError',
  value,
});

export type InvoiceId = ValueObject<string>;

export const isInvoiceId = (value: string): value is InvoiceId =>
  value.length > 0;

export const InvoiceId = (
  id: string,
): Effect<InvoiceId, InvalidInvoiceIdError> =>
  isInvoiceId(id) ? succeed(id) : fail(InvalidInvoiceIdError(id));
