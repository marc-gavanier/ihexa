import type { InvoiceId } from '../invoice';

export class InvoiceNotFoundError extends Error {
  constructor(public readonly id: InvoiceId) {
    super(`Invoice id ${id} not found`);
    this.name = 'InvoiceNotFoundError';
  }
}
