import { withDecode, withEither, withParams } from '@arckit/nextjs';
import { i18n, type MetadataTranslation, metadataTranslation, withI18n } from '@/configuration/i18n';
import { pageBuilder } from '@/configuration/nextjs';
import { withPageView } from '@/configuration/telemetry/event-tracker/server';
import { ConsultInvoicePage, invoiceById } from '@/features/invoice/abilities/consult-invoice';
import { InvoiceId } from '@/features/invoice/domain';

export const generateMetadata: MetadataTranslation = metadataTranslation(i18n)('invoices');

export default pageBuilder()
  .use(withParams('id'))
  .use(withDecode('id', InvoiceId.schema))
  .use(withEither('invoice', ({ id }) => invoiceById(id)))
  .use(withI18n(i18n)('invoices'))
  .use(withPageView('Invoice Detail'))
  .render(async ({ invoice }) => <ConsultInvoicePage invoice={invoice} />);
