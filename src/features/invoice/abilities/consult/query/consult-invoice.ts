import type { Effect } from 'effect/Effect';
import type { Invoice, InvoiceByIdError, InvoiceId } from '@/features/invoice/domain';
import { INVOICE_BY_ID } from '@/features/invoice/keys';
import { inject } from '@/libraries/injection';

export type ConsultInvoiceError = InvoiceByIdError;

export const consultInvoice = (id: InvoiceId): Effect<Invoice, ConsultInvoiceError> => inject(INVOICE_BY_ID)(id);
