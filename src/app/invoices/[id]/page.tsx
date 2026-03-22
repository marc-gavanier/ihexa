import { i18n } from '@/configuration/i18n';
import { ConsultInvoicePage, invoiceById } from '@/features/invoice/abilities/consult-invoice';
import { InvoiceId } from '@/features/invoice/domain';
import { withI18n } from '@/libraries/i18n';
import { pageBuilder, withDecode, withEither, withParams } from '@/libraries/nextjs/page';

export default pageBuilder()
  .use(withParams('id'))
  .use(withDecode('id', InvoiceId))
  .use(withEither('invoice', ({ id }) => invoiceById(id)))
  .use(withI18n(i18n)('invoices'))
  .render(async ({ invoice }) => <ConsultInvoicePage invoice={invoice} />);
