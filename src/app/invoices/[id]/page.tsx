import { ConsultInvoicePage, invoiceById } from '@/features/invoice/abilities/consult-invoice';
import { InvoiceId } from '@/features/invoice/domain';
import { pageBuilder, withDecode, withEither, withParams } from '@/libraries/nextjs/page';

export default pageBuilder()
  .use(withParams('id'))
  .use(withDecode('id', InvoiceId))
  .use(withEither('invoice', ({ id }) => invoiceById(id)))
  .render(async ({ invoice }) => <ConsultInvoicePage invoice={invoice} />);
