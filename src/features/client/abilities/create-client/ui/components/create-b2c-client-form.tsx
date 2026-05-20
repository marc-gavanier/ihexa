'use client';

import { applyEffectSchema, fieldErrorTranslation, handleAction, handleSubmit, transformValue, useAppForm } from '@arckit/form';
import { toastError, toastSuccess } from '@arckit/nextjs/client';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { inject } from '@/configuration/injection';
import { useServerAction } from '@/configuration/nextjs/client';
import { CREATE_B2C_CLIENT_ACTION_KEY } from '../../action/create-client.key';
import { createB2CClientValidation } from '../../action/create-client.validation';
import { emptyB2CClientFormValues, toCreateB2CClientInput } from './create-b2c-client.submission';

type CreateB2CClientFormProps = {
  readonly onSuccess?: () => void;
};

export const CreateB2CClientForm = ({ onSuccess }: CreateB2CClientFormProps) => {
  const { t } = useTranslation('clients.create');
  const router = useRouter();

  const [action, isPending] = useServerAction(inject(CREATE_B2C_CLIENT_ACTION_KEY), {
    onSuccess: (state) => {
      toastSuccess(state)(({ name }) => t('success.created', name));
      form.reset();
      router.refresh();
      onSuccess?.();
    },
    onError: toastError(t)
  });

  const form = useAppForm({
    defaultValues: emptyB2CClientFormValues(),
    validators: { onChange: transformValue(toCreateB2CClientInput)(applyEffectSchema(createB2CClientValidation)) },
    onSubmit: transformValue(toCreateB2CClientInput)(handleAction(action))
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)} className='flex flex-col gap-4'>
        <form.AppField name='firstname'>
          {(field) => (
            <div>
              <field.Label>{t('form.firstname.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>
        <form.AppField name='lastname'>
          {(field) => (
            <div>
              <field.Label>{t('form.lastname.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>
        <form.AppField name='street'>
          {(field) => (
            <div>
              <field.Label>{t('form.street.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>
        <form.AppField name='city'>
          {(field) => (
            <div>
              <field.Label>{t('form.city.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>
        <form.AppField name='zipcode'>
          {(field) => (
            <div>
              <field.Label>{t('form.zipcode.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>
        <form.AppField name='email'>
          {(field) => (
            <div>
              <field.Label>{t('form.email.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>
        <form.AppField name='phone'>
          {(field) => (
            <div>
              <field.Label>{t('form.phone.label')}</field.Label>
              <field.Input isPending={isPending} />
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>
        <form.Submit isPending={isPending}>{t('form.submit')}</form.Submit>
      </form>
    </form.AppForm>
  );
};
