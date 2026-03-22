import { type TranslationProps, withTranslation } from '@/libraries/i18n';

export const ConsultInvoiceLoadingContent = ({ t }: TranslationProps) => <output>{t('loading')}</output>;

export const ConsultInvoiceLoading = withTranslation(ConsultInvoiceLoadingContent);
