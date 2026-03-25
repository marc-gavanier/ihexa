import { RiUserAddLine } from 'react-icons/ri';
import { type TranslationProps, withTranslation } from '@/libraries/i18n';
import { PageHeader } from '@/libraries/ui/blocks/page-header';
import { ICON_LG } from '@/libraries/ui/icons/sizes';
import { CreateClientForm } from '../components';

export const CreateClientPage = withTranslation(({ t }: TranslationProps) => (
  <div className='flex flex-col gap-8'>
    <PageHeader title={t('title')} icon={<RiUserAddLine size={ICON_LG} />} />
    <CreateClientForm />
  </div>
));
