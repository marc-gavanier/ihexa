import { PageHeader } from '@arckit/daisyui/blocks';
import { ICON_LG } from '@arckit/daisyui/icons';
import type { TranslationProps } from '@arckit/i18n';
import { RiUserAddLine } from 'react-icons/ri';
import { withTranslation } from '@/configuration/i18n';
import { CreateClientForm } from '../components';

export const CreateClientPage = withTranslation(({ t }: TranslationProps) => (
  <div className='flex flex-col gap-8'>
    <PageHeader title={t('title')} icon={<RiUserAddLine size={ICON_LG} />} />
    <CreateClientForm />
  </div>
));
