import { headers } from 'next/headers';
import { InvoiceLoader } from '@/features/invoice/abilities/consult';
import { INVOICES_FEATURE, loadI18n } from '@/libraries/i18n';

const Loading = async () => {
  await loadI18n(headers())(INVOICES_FEATURE);
  return <InvoiceLoader />;
};

export default Loading;
