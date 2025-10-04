import { key } from 'piqure';
import type { InvoiceById } from '@/features/invoice/domain';

export const INVOICE_BY_ID = key<InvoiceById>('invoice.by-id');
