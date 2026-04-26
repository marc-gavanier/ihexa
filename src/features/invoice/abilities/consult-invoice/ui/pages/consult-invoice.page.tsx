import { PageHeader } from '@arckit/daisyui/blocks';
import { ICON_LG } from '@arckit/daisyui/icons';
import type { TranslationProps } from '@arckit/i18n';
import { RiFileTextLine } from 'react-icons/ri';
import { withTranslation } from '@/configuration/i18n';
import type { Invoice } from '@/features/invoice/domain';
import { InvoiceLines, InvoiceRecipient } from '../components';

type ConsultInvoicePageProps = {
  invoice: Invoice;
};

export const ConsultInvoicePage = withTranslation<ConsultInvoicePageProps>(
  ({ invoice, t }: ConsultInvoicePageProps & TranslationProps) => (
    <div className='flex flex-col gap-8'>
      <PageHeader title={t('title')} icon={<RiFileTextLine size={ICON_LG} />} />
      <InvoiceRecipient {...invoice} />
      <InvoiceLines {...invoice} />
    </div>
  )
);
