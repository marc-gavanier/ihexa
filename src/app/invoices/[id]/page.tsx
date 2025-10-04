import type { InvoiceId } from '@/features/invoice/domain';
import { invoiceById } from '@/features/invoice/implementations/in-memory';
import {
  INVOICE_BY_ID,
  InvoicePage,
} from '@/features/invoice/use-cases/consult';
import { provide } from '@/libraries/injection';

interface PageProps {
  params: Promise<{
    id: InvoiceId;
  }>;
}

const Page = async ({ params }: PageProps) => {
  provide(INVOICE_BY_ID, invoiceById);
  const { id } = await params;
  return <InvoicePage invoiceId={id} />;
};

export default Page;
