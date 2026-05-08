import { withOptionalEither } from '@arckit/nextjs';
import { configurePaymentTermsAction } from '@/app/_actions/settings/configure-payment-terms.action';
import { i18n, type MetadataTranslation, metadataTranslation, withI18n } from '@/configuration/i18n';
import { pageBuilder, withClientBinder } from '@/configuration/nextjs';
import {
  CONFIGURE_PAYMENT_TERMS_KEY,
  ConfigurePaymentTermsPage,
  presentPaymentTerms
} from '@/features/settings/abilities/configure-payment-terms';
import { getPaymentTermsConfiguration } from '@/features/settings/abilities/configure-payment-terms/implementations';

export const generateMetadata: MetadataTranslation = metadataTranslation(i18n)('settings.configure-payment-terms');

export default pageBuilder()
  .use(
    withClientBinder(CONFIGURE_PAYMENT_TERMS_KEY, configurePaymentTermsAction),
    withI18n(i18n)('settings.configure-payment-terms', 'global.server-action')
  )
  .use(withOptionalEither('paymentTerms', () => getPaymentTermsConfiguration()))
  .render(async ({ paymentTerms }) => <ConfigurePaymentTermsPage paymentTerms={presentPaymentTerms(paymentTerms)} />);
