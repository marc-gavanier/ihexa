import { Data, type Either } from 'effect';
import type { Invoice, InvoiceId } from './invoice';

export class InvoiceNotFound extends Data.TaggedError('InvoiceNotFound')<{
  readonly invoiceId: InvoiceId;
}> {}

export type InvoiceById = (id: InvoiceId) => Promise<Either.Either<Invoice, InvoiceNotFound>>;
