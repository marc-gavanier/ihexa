import type { Invoice } from './invoice';
import type { InvoiceId } from './invoice-id';

export type InvoiceById = (id: InvoiceId) => Promise<Invoice>;
