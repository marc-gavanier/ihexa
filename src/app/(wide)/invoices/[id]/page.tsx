import { i18n } from '@/configuration/i18n';
import { ConsultInvoicePage, invoiceById } from '@/features/invoice/abilities/consult-invoice';
import { InvoiceId } from '@/features/invoice/domain';
import { type MetadataTranslation, metadataTranslation, withI18n } from '@/libraries/i18n';
import { pageBuilder, withDecode, withEither, withParams } from '@/libraries/nextjs/page';

export const generateMetadata: MetadataTranslation = metadataTranslation(i18n)('invoices');

export default pageBuilder()
  .use(withParams('id'))
  .use(withDecode('id', InvoiceId.schema))
  .use(withEither('invoice', ({ id }) => invoiceById(id)))
  .use(withI18n(i18n)('invoices'))
  .render(async ({ invoice }) => <ConsultInvoicePage invoice={invoice} />);
