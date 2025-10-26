import type { Invoice } from '@/features/invoice/domain';
import { InvoiceLines } from '../components/invoice-lines';
import { InvoiceRecipient } from '../components/invoice-recipient';

type InvoicePageProps = {
  invoice: Invoice;
};

export const InvoicePage = ({ invoice }: InvoicePageProps) => (
  <div data-testid='invoice-details'>
    <InvoiceRecipient {...invoice} />
    <div className='pt-8'>
      <InvoiceLines {...invoice} />
    </div>
  </div>
);
