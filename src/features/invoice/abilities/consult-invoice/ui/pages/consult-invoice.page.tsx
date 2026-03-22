import { RiFileTextLine } from 'react-icons/ri';
import type { Invoice } from '@/features/invoice/domain';
import { type TranslationProps, withTranslation } from '@/libraries/i18n';
import { PageHeader } from '@/libraries/ui/blocks/page-header';
import { ICON_LG } from '@/libraries/ui/icons/sizes';
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
