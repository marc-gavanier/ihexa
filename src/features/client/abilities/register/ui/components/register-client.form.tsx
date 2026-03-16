'use client';

import i18next from 'i18next';
import { registerClientValidation } from '@/features/client/abilities/register/validations/register-client.validation';
import { formatFirstName } from '@/features/client/domain/first-name';
import { applyEffectSchema, handleSubmit, useAppForm } from '@/libraries/form';
import { CLIENTS_FEATURE } from '@/libraries/i18n';

export const RegisterClientForm = ({ translation }: { translation: Record<string, string> }) => {
  // useEffect(() => {
  //   (async () => {
  //     await init(toI18nConfig({ lng: 'en-US', ns: CLIENTS_FEATURE })(translations));
  //   })();
  // }, [translations]);

  i18next.init({
    lng: 'en-US',
    ns: [CLIENTS_FEATURE],
    defaultNS: CLIENTS_FEATURE,
    resources: {
      en: { translation }
    }
  });

  const t = i18next.getFixedT('en-US', CLIENTS_FEATURE);

  const isPending = false;

  const form = useAppForm({
    defaultValues: {
      firstName: ''
    },
    validators: {
      onChange: applyEffectSchema(registerClientValidation)
    },
    onSubmit: () => {
      console.log('Submit');
    },
    listeners: {
      onChange: ({ fieldApi }) => {
        console.log(fieldApi.state.value.firstName);
        form.setFieldValue('firstName', formatFirstName(fieldApi.state.value.firstName));
      }
    }
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)}>
        {JSON.stringify(translation)}
        <form.AppField name='firstName'>
          {(field) => (
            <div className='mb-4'>
              <field.Label>{t('register-client.form.first-name')}</field.Label>
              <field.Input data-testid='register-client.form.first-name' isPending={isPending} />
              <field.Info />
            </div>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  );
};
