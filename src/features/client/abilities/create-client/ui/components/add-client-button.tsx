'use client';

import { ICON_LG } from '@arckit/daisyui/icons';
import { Button } from '@arckit/daisyui/primitives';
import { useTranslation } from 'react-i18next';
import { RiAddLine } from 'react-icons/ri';
import { inject } from '@/configuration/injection';
import { CREATE_CLIENT_MODAL_KEY, CreateClientModal } from './create-client-modal';

export const AddClientButton = () => {
  const { t } = useTranslation('clients.list');

  return (
    <>
      <Button color='btn-primary' onClick={() => inject(CREATE_CLIENT_MODAL_KEY).open()}>
        <RiAddLine size={ICON_LG} />
        {t('addClient')}
      </Button>
      <CreateClientModal />
    </>
  );
};
