import { i18n, withI18n } from '@/configuration/i18n';
import { pageBuilder } from '@/configuration/nextjs';
import { ConsultInvoiceLoading } from '@/features/invoice/abilities/consult-invoice';

export default pageBuilder()
  .use(withI18n(i18n)('invoices'))
  .render(async () => <ConsultInvoiceLoading />);
