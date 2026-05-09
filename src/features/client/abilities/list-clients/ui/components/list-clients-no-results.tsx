import { EmptyState } from '@arckit/daisyui/blocks';
import { ICON_2XL, ICON_LG } from '@arckit/daisyui/icons';
import { Button } from '@arckit/daisyui/primitives';
import type { TranslationProps } from '@arckit/i18n';
import { RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { withTranslation } from '@/configuration/i18n';

type ListClientsNoResultsProps = TranslationProps & {
  readonly search: string;
};

export const ListClientsNoResults = withTranslation(({ search, t }: ListClientsNoResultsProps) => (
  <EmptyState icon={<RiSearchLine className='text-primary' size={ICON_2XL} />} canAdd={false}>
    <p className='mb-6 max-w-sm text-neutral'>{t('noResults.message', { search })}</p>
    <a href='/clients'>
      <Button scale='btn-lg' color='btn-primary'>
        <RiCloseLine size={ICON_LG} />
        {t('noResults.action')}
      </Button>
    </a>
  </EmptyState>
));
