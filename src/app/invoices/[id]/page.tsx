import {
  INVOICES_REPOSITORY,
  InMemoryInvoicesRepository,
  InvoicePage,
} from '@/features/invoice/use-cases/consult';
import { provide } from '@/libraries/injection';

const Page = () => {
  provide(INVOICES_REPOSITORY, InMemoryInvoicesRepository);
  return <InvoicePage invoiceId="" />;
};

export default Page;
