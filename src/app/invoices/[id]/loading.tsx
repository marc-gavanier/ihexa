import { headers } from 'next/headers';
import { InvoicePageLoader } from '@/features/invoice/abilities/consult';
import { INVOICES_FEATURE, loadI18n } from '@/libraries/i18n';

const Loading = async () => {
  await loadI18n(headers())(INVOICES_FEATURE);
  return <InvoicePageLoader />;
};

export default Loading;
