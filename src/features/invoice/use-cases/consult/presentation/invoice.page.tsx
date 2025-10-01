import { Suspense } from 'react';
import type { Invoice, InvoiceId } from '@/features/invoice/domain';
import { InvoiceDetails } from './invoice-details';
import { InvoiceError } from './invoice-error';
import { InvoiceLoader } from './invoice-loader';
import { InvoiceResolver } from './invoice-resolver';

type InvoicePageProps = {
  invoiceId: InvoiceId;
};

export const InvoicePage = async ({ invoiceId }: InvoicePageProps) => (
  <Suspense fallback={<InvoiceLoader />}>
    <InvoiceResolver
      id={invoiceId}
      onError={(error: unknown) => <InvoiceError error={error} />}
    >
      {(invoice: Invoice) => <InvoiceDetails invoice={invoice} />}
    </InvoiceResolver>
  </Suspense>
);
