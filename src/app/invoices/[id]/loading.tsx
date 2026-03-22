import { i18n } from '@/configuration/i18n';
import { ConsultInvoiceLoading } from '@/features/invoice/abilities/consult-invoice';
import { withI18n } from '@/libraries/i18n';
import { pageBuilder } from '@/libraries/nextjs/page';

export default pageBuilder()
  .use(withI18n(i18n)('invoices'))
  .render(async () => <ConsultInvoiceLoading />);
