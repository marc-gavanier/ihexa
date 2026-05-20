import { EmptyState } from '@arckit/daisyui/blocks';
import { ICON_2XL, ICON_LG } from '@arckit/daisyui/icons';
import { Button } from '@arckit/daisyui/primitives';
import type { TranslationProps } from '@arckit/i18n';
import { RiAddLine, RiTeamLine } from 'react-icons/ri';
import { withTranslation } from '@/configuration/i18n';

export const ListClientsEmpty = withTranslation(({ t }: TranslationProps) => (
  <EmptyState icon={<RiTeamLine className='text-primary' size={ICON_2XL} />}>
    <p className='mb-6 max-w-sm text-neutral'>{t('empty.message')}</p>
    <Button scale='btn-lg' color='btn-primary'>
      <RiAddLine size={ICON_LG} />
      {t('empty.action')}
    </Button>
  </EmptyState>
));
