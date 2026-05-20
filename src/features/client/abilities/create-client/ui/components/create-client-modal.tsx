'use client';

import { type ModalControls, useInjectableModal } from '@arckit/daisyui/headless';
import { Modal, ModalBackdrop, ModalBox, ModalCloseButton } from '@arckit/daisyui/primitives-client';
import { cn } from '@arckit/daisyui/utils';
import { Match, pipe } from 'effect';
import { keyFor } from 'piqure';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { provide } from '@/configuration/injection';
import { CreateB2BClientForm } from './create-b2b-client-form';
import { CreateB2CClientForm } from './create-b2c-client-form';

export const CREATE_CLIENT_MODAL_KEY = keyFor<ModalControls>('clients.create.modal');

type ClientType = 'b2c' | 'b2b';

const TYPES: readonly ClientType[] = ['b2c', 'b2b'];

const ClientForm = ({ type, onSuccess }: { readonly type: ClientType; readonly onSuccess: () => void }) =>
  pipe(
    Match.value(type),
    Match.when('b2c', () => <CreateB2CClientForm onSuccess={onSuccess} />),
    Match.when('b2b', () => <CreateB2BClientForm onSuccess={onSuccess} />),
    Match.exhaustive
  );

const CreateClientModalContent = ({ onClose }: { readonly onClose: () => void }) => {
  const { t } = useTranslation('clients.create');
  const [clientType, setClientType] = useState<ClientType>('b2c');

  return (
    <ModalBox size='max-w-2xl'>
      <ModalCloseButton aria-label={t('modal.close')} />
      <h3 className='text-lg font-bold'>{t('title')}</h3>

      <div role='radiogroup' aria-label={t('tab.label')} className='join my-4'>
        {TYPES.map((type) => (
          <label key={type} className={cn('join-item btn', clientType === type && 'btn-primary')}>
            <input
              type='radio'
              name='client-type'
              value={type}
              checked={clientType === type}
              onChange={() => setClientType(type)}
              className='sr-only'
            />
            {t(`tab.${type}`)}
          </label>
        ))}
      </div>

      <ClientForm type={clientType} onSuccess={onClose} />
    </ModalBox>
  );
};

export const CreateClientModal = () => {
  const { t } = useTranslation('clients.create');
  const { isOpen, close } = useInjectableModal((controls) => provide(CREATE_CLIENT_MODAL_KEY, controls));

  return (
    <Modal open={isOpen} onClose={close} responsive>
      <CreateClientModalContent onClose={close} />
      <ModalBackdrop aria-label={t('modal.close')} />
    </Modal>
  );
};
