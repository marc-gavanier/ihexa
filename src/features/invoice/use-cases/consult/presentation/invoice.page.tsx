import { Suspense } from 'react';
import type { InvoiceId } from '@/features/invoice/domain';
import { inject } from '@/libraries/injection';
import { INVOICES_REPOSITORY } from './invoices.key';

const Invoice = async ({ id }: { id: string }) => {
  const invoices = inject(INVOICES_REPOSITORY);
  const invoice = await invoices.get(id as InvoiceId);

  return <div data-testid="invoice-content">Invoice: {invoice.id}</div>;
};

type InvoicePageProps = {
  invoiceId: string;
};

export const InvoicePage = async ({ invoiceId }: InvoicePageProps) => {
  return (
    <Suspense fallback={<div data-testid="invoice-loader">Loading...</div>}>
      <Invoice id={invoiceId} />
    </Suspense>
  );
};
