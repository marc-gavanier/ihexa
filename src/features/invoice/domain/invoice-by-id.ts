import type { Invoice, InvoiceId } from './invoice';

export type InvoiceById = (id: InvoiceId) => Promise<Invoice>;
