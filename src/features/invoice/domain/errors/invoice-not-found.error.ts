import type { InvoiceId } from '../invoice-id';

export class InvoiceNotFoundError extends Error {
  constructor(public readonly id: InvoiceId) {
    super(`Invoice id ${id} not found`);
  }
}
