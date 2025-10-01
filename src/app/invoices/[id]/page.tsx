import {
  INVOICES_REPOSITORY,
  InMemoryInvoicesRepository,
  InvoicePage,
} from '@/features/invoice/use-cases/consult';
import { provide } from '@/libraries/injection';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  provide(INVOICES_REPOSITORY, InMemoryInvoicesRepository);
  return <InvoicePage invoiceId={params.id} />;
};

export default Page;
