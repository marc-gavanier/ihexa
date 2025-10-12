import type { ReactNode } from 'react';
import type { Invoice, InvoiceId } from '@/features/invoice/domain';
import { INVOICE_BY_ID } from '@/features/invoice/use-cases/consult';
import { inject } from '@/libraries/injection';

export const InvoiceResolver = async ({
  id,
  children,
  onError,
}: {
  id: InvoiceId;
  children: (invoice: Invoice) => ReactNode;
  onError: (error: unknown) => ReactNode;
}) => inject(INVOICE_BY_ID)(id).then(children).catch(onError);
