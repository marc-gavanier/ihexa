import { type Effect, fail, succeed } from 'effect/Effect';
import type { WrapPrimitive } from '@/libraries/ddd/wrap-primitive';
import { InvalidInvoiceIdError } from './invalid-invoice-id.error';

export type InvoiceId = WrapPrimitive<string>;

export const isInvoiceId = (value: string): value is InvoiceId =>
  value.length > 0;

export const InvoiceId = (
  id: string,
): Effect<InvoiceId, InvalidInvoiceIdError> =>
  isInvoiceId(id) ? succeed(id) : fail(InvalidInvoiceIdError(id));
