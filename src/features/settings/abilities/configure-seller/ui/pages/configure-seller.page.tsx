import { PageHeader } from '@arckit/daisyui/blocks';
import { ICON_LG } from '@arckit/daisyui/icons';
import type { TranslationProps } from '@arckit/i18n';
import { RiSettings3Line } from 'react-icons/ri';
import { withTranslation } from '@/configuration/i18n';
import { ConfigureSellerForm } from '../components';
import type { ConfigureSellerViewModel } from '../components/configure-seller.presenter';

export const ConfigureSellerPage = withTranslation(({ t, seller }: TranslationProps & { seller: ConfigureSellerViewModel }) => (
  <div className='flex flex-col gap-8'>
    <PageHeader title={t('title')} icon={<RiSettings3Line size={ICON_LG} />} />
    <ConfigureSellerForm seller={seller} />
  </div>
));
