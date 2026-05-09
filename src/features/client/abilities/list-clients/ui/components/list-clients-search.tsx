import { ICON_LG } from '@arckit/daisyui/icons';
import { Button, Input } from '@arckit/daisyui/primitives';
import type { TranslationProps } from '@arckit/i18n';
import type { Search } from '@arckit/resultset';
import { RiSearchLine } from 'react-icons/ri';
import { withTranslation } from '@/configuration/i18n';

type ListClientsSearchProps = TranslationProps & {
  readonly search: Search;
};

export const ListClientsSearch = withTranslation(({ search, t }: ListClientsSearchProps) => (
  <form action='/clients' method='get' className='flex gap-2'>
    <Input name='search' defaultValue={search} placeholder={t('search.placeholder')} left={<RiSearchLine size={ICON_LG} />} />
    <Button type='submit' color='btn-primary'>
      {t('search.button')}
    </Button>
  </form>
));
