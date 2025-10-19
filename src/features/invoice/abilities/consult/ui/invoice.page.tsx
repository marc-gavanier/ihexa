import type { Invoice } from '@/features/invoice/domain';
import { InvoiceDetails } from './invoice-details';

type InvoicePageProps = {
  invoice: Invoice;
};

export const InvoicePage = async ({ invoice }: InvoicePageProps) => (
  <InvoiceDetails invoice={invoice} />
);
