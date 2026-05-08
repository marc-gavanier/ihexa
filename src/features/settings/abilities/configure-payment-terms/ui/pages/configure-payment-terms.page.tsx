import { PageHeader } from '@arckit/daisyui/blocks';
import { ICON_LG } from '@arckit/daisyui/icons';
import type { TranslationProps } from '@arckit/i18n';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { withTranslation } from '@/configuration/i18n';
import { ConfigurePaymentTermsForm } from '../components';
import type { ConfigurePaymentTermsViewModel } from '../components/configure-payment-terms.presenter';

export const ConfigurePaymentTermsPage = withTranslation(
  ({ t, paymentTerms }: TranslationProps & { paymentTerms: ConfigurePaymentTermsViewModel }) => (
    <div className='flex flex-col gap-8'>
      <PageHeader title={t('title')} icon={<RiMoneyDollarCircleLine size={ICON_LG} />} />
      <ConfigurePaymentTermsForm paymentTerms={paymentTerms} />
    </div>
  )
);
