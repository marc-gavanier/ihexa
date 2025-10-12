import { type Effect, fail, succeed } from 'effect/Effect';
import type { ValueObject } from '@/libraries/ddd';
import { InvalidInvoiceIdError } from './invalid-invoice-id.error';

export type InvoiceId = ValueObject<string>;

export const isInvoiceId = (value: string): value is InvoiceId =>
  value.length > 0;

export const InvoiceId = (
  id: string,
): Effect<InvoiceId, InvalidInvoiceIdError> =>
  isInvoiceId(id) ? succeed(id) : fail(InvalidInvoiceIdError(id));
