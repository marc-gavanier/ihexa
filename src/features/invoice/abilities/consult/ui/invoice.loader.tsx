import { INVOICES_FEATURE, translationsFor } from '@/libraries/i18n';

export const InvoiceLoader = () => {
  const t = translationsFor(INVOICES_FEATURE);

  return <div data-testid="invoice-loader">{t('loading')}...</div>;
};
