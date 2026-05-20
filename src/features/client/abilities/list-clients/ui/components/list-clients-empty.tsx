'use client';

import { EmptyState } from '@arckit/daisyui/blocks';
import { ICON_2XL, ICON_LG } from '@arckit/daisyui/icons';
import { Button } from '@arckit/daisyui/primitives';
import { useTranslation } from 'react-i18next';
import { RiAddLine, RiTeamLine } from 'react-icons/ri';
import { inject } from '@/configuration/injection';
import { CREATE_CLIENT_MODAL_KEY } from '@/features/client/abilities/create-client/ui/components';

export const ListClientsEmpty = () => {
  const { t } = useTranslation('clients.list');
  return (
    <EmptyState icon={<RiTeamLine className='text-primary' size={ICON_2XL} />}>
      <p className='mb-6 max-w-sm text-neutral'>{t('empty.message')}</p>
      <Button scale='btn-lg' color='btn-primary' onClick={() => inject(CREATE_CLIENT_MODAL_KEY).open()}>
        <RiAddLine size={ICON_LG} />
        {t('empty.action')}
      </Button>
    </EmptyState>
  );
};
