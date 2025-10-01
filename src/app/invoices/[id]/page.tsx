import type { InvoiceId } from '@/features/invoice/domain';
import {
  INVOICES_REPOSITORY,
  InMemoryInvoicesRepository,
  InvoicePage,
} from '@/features/invoice/use-cases/consult';
import { provide } from '@/libraries/injection';

interface PageProps {
  params: Promise<{
    id: InvoiceId;
  }>;
}

const Page = async ({ params }: PageProps) => {
  provide(INVOICES_REPOSITORY, InMemoryInvoicesRepository);
  const { id } = await params;
  return <InvoicePage invoiceId={id} />;
};

export default Page;
