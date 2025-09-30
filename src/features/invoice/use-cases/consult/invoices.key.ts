import { key } from 'piqure';
import type { InvoicesRepository } from '@/features/invoice/domain';

export const INVOICES_REPOSITORY =
  key<InvoicesRepository>('invoice.repository');
