'use client';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { RiCheckboxCircleLine, RiCloseCircleLine } from 'react-icons/ri';
import { applyEffectSchema } from '@/libraries/form/apply-effect-schema';
import { fieldErrorTranslation } from '@/libraries/form/field-error-translation';
import { handleAction } from '@/libraries/form/handle-action';
import { handleSubmit } from '@/libraries/form/handle-submit';
import { useAppForm } from '@/libraries/form/use-app-form';
import { inject } from '@/libraries/injection';
import { useServerAction } from '@/libraries/nextjs/action';
import { ICON_LG } from '@/libraries/ui/icons/sizes';
import { CREATE_CLIENT_ACTION_KEY } from '../../action/create-client.action.key';
import { createClientValidation } from '../../action/create-client.validation';

export const CreateClientForm = () => {
  const { t } = useTranslation('clients.create');
  const [action, isPending] = useServerAction(inject(CREATE_CLIENT_ACTION_KEY), {
    onSuccess: ({ data: { name } }) => {
      toast.success(t('success.created', name), { icon: <RiCheckboxCircleLine size={ICON_LG} /> });
      form.reset();
    },
    onError: ({ error }) => {
      toast.error(t(error), { icon: <RiCloseCircleLine size={ICON_LG} /> });
    }
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
        <form.Submit isPending={isPending}>{t('form.submit')}</form.Submit>
      </form>
    </form.AppForm>
  );
};
