import type { Effect } from 'effect/Effect';
import type { DomainError } from '@/libraries/ddd';
import type { Invoice } from './invoice';
import type { InvoiceId } from './invoice-id';

export type InvoiceByIdNotFoundError = DomainError<
  'InvoiceByIdNotFoundError',
  never
>;

export const InvoiceByIdNotFoundError = (): InvoiceByIdNotFoundError => ({
  _tag: 'InvoiceByIdNotFoundError' as const,
  value: undefined as never,
});

export type InvoiceByIdError = InvoiceByIdNotFoundError;

export type InvoiceById = (id: InvoiceId) => Effect<Invoice, InvoiceByIdError>;
