import type { ReactNode } from 'react';
import type { Invoice, InvoiceId } from '@/features/invoice/domain';
import { INVOICES_REPOSITORY } from '@/features/invoice/use-cases/consult';
import { inject } from '@/libraries/injection';

export const InvoiceResolver = async ({
  id,
  children,
  onError,
}: {
  id: InvoiceId;
  children: (invoice: Invoice) => ReactNode;
  onError: (error: unknown) => ReactNode;
}) =>
  inject(INVOICES_REPOSITORY)
    .get(id)
    .then((invoice) => children(invoice))
    .catch(onError);
