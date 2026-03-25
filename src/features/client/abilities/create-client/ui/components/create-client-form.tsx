'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { applyEffectSchema } from '@/libraries/form/apply-effect-schema';
import { handleAction } from '@/libraries/form/handle-action';
import { handleSubmit } from '@/libraries/form/handle-submit';
import { useAppForm } from '@/libraries/form/use-app-form';
import { inject } from '@/libraries/injection';
import { useServerAction } from '@/libraries/nextjs/action';
import { createClientValidation } from '../../create-client.validation';
import { CREATE_CLIENT_ACTION_KEY } from '../../injection';

export const CreateClientForm = () => {
  const { t } = useTranslation('clients.create');
  const router = useRouter();
  const [action, isPending] = useServerAction(inject(CREATE_CLIENT_ACTION_KEY), {
    onSuccess: () => router.push('/')
  });

  const form = useAppForm({
    defaultValues: {
      id: crypto.randomUUID(),
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      zipcode: ''
    },
    validators: { onSubmit: applyEffectSchema(createClientValidation) },
    onSubmit: handleAction(action)
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)} className='flex flex-col gap-4'>
        <form.AppField name='firstname'>
          {(field) => (
            <div>
              <field.Label>{t('form.firstname.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Info formatMessage={t} />
            </div>
          )}
        </form.AppField>
        <form.AppField name='lastname'>
          {(field) => (
            <div>
              <field.Label>{t('form.lastname.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Info formatMessage={t} />
            </div>
          )}
        </form.AppField>
        <form.AppField name='street'>
          {(field) => (
            <div>
              <field.Label>{t('form.street.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Info formatMessage={t} />
            </div>
          )}
        </form.AppField>
        <form.AppField name='city'>
          {(field) => (
            <div>
              <field.Label>{t('form.city.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Info formatMessage={t} />
            </div>
          )}
        </form.AppField>
        <form.AppField name='zipcode'>
          {(field) => (
            <div>
              <field.Label>{t('form.zipcode.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Info formatMessage={t} />
            </div>
          )}
        </form.AppField>
        <form.Submit isPending={isPending}>{t('form.submit')}</form.Submit>
      </form>
    </form.AppForm>
  );
};
