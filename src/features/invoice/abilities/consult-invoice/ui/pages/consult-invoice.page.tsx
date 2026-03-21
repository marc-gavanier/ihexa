import { type Invoice, invoiceTotal } from '@/features/invoice/domain';

export const ConsultInvoicePage = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div>
      Invoice found: {invoice.id} / {invoiceTotal(invoice)}
    </div>
  );
};
