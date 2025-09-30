import type { Invoice, InvoiceId } from './invoice';

export type InvoicesRepository = {
  get: (id: InvoiceId) => Promise<Invoice>;
};
