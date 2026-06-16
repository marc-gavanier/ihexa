'use client';

import { Options } from '@arckit/daisyui/primitives-client';
import { fieldErrorTranslation, handleAction, handleSubmit, transformValue, useAppForm } from '@arckit/form';
import { applyEffectSchema } from '@arckit/form/effect-schema';
import { toastError, toastSuccess } from '@arckit/nextjs/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { inject } from '@/configuration/injection';
import { useServerAction } from '@/configuration/nextjs/client';
import { TrackerAction, TrackerCategory, trackEvent } from '@/configuration/telemetry/event-tracker/client/track-event';
import type { CompanySummary } from '@/libraries/recherche-entreprises';
import { CREATE_B2B_CLIENT_ACTION_KEY } from '../../action/create-client.key';
import { createB2BClientValidation } from '../../action/create-client.validation';
import { companyCombobox, companyOptions, MIN_COMPANY_QUERY_LENGTH } from './company.combobox';
import { emptyB2BClientFormValues, toCreateB2BClientInput } from './create-b2b-client.submission';

type CreateB2BClientFormProps = {
  readonly onSuccess?: () => void;
};

const hasEnoughChars = (inputValue: string): boolean => inputValue.length >= MIN_COMPANY_QUERY_LENGTH;

export const CreateB2BClientForm = ({ onSuccess }: CreateB2BClientFormProps) => {
  const { t } = useTranslation('clients.create');
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState<CompanySummary | null>(null);

  const [action, isPending] = useServerAction(inject(CREATE_B2B_CLIENT_ACTION_KEY), {
    onSuccess: (state) => {
      toastSuccess(state)(({ denominationSociale }) => t('success.createdB2B', { denominationSociale }));
      trackEvent({ category: TrackerCategory.CLIENT, action: TrackerAction.CREATED, type: 'b2b' });
      form.reset();
      setSelectedCompany(null);
      router.refresh();
      onSuccess?.();
    },
    onError: toastError(t)
  });

  const form = useAppForm({
    defaultValues: emptyB2BClientFormValues(),
    validators: { onChange: transformValue(toCreateB2BClientInput)(applyEffectSchema(createB2BClientValidation)) },
    onSubmit: transformValue(toCreateB2BClientInput)(handleAction(action))
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)} className='flex flex-col gap-4'>
        <form.AppField name='company'>
          {(field) => (
            <div>
              <field.Combobox
                isPending={isPending}
                onSelect={(item: CompanySummary) => setSelectedCompany(item)}
                {...companyCombobox}
              >
                {({
                  getInputProps,
                  getMenuProps,
                  getItemProps,
                  isOpen,
                  isPending,
                  items,
                  highlightedItem,
                  selectedItem,
                  inputValue
                }) => (
                  <div className='relative'>
                    <label className='mb-1 block' htmlFor='company.search'>
                      {t('form.company.label')}
                    </label>
                    <input
                      {...getInputProps({})}
                      id='company.search'
                      className='input input-bordered w-full'
                      placeholder={t('form.company.placeholder')}
                    />
                    {isOpen && !hasEnoughChars(inputValue) && (
                      <span className='mt-1 block text-sm opacity-70'>{t('form.company.minChars')}</span>
                    )}
                    <Options<CompanySummary>
                      items={items}
                      isOpen={isOpen && hasEnoughChars(inputValue)}
                      showEmpty={isOpen && !isPending && hasEnoughChars(inputValue) && items.length === 0}
                      selectedItem={selectedItem}
                      highlightedItem={highlightedItem}
                      getMenuProps={getMenuProps}
                      getItemProps={getItemProps}
                      {...companyOptions}
                    >
                      <span className='p-2 text-sm opacity-70'>{t('form.company.noResults')}</span>
                    </Options>
                  </div>
                )}
              </field.Combobox>
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>

        {selectedCompany != null && (
          <>
            <dl className='grid grid-cols-1 gap-2 rounded border border-base-300 bg-base-200 p-4 text-sm sm:grid-cols-2'>
              <div className='sm:col-span-2'>
                <dt className='font-medium'>{t('form.denominationSociale.label')}</dt>
                <dd>{selectedCompany.companyName}</dd>
              </div>
              <div>
                <dt className='font-medium'>{t('form.formeJuridique.label')}</dt>
                <dd>{selectedCompany.legalForm}</dd>
              </div>
              <div>
                <dt className='font-medium'>{t('form.siret.label')}</dt>
                <dd>{selectedCompany.siret}</dd>
              </div>
              <div className='sm:col-span-2'>
                <dt className='font-medium'>{t('form.address.label')}</dt>
                <dd>
                  {selectedCompany.street}, {selectedCompany.zipcode} {selectedCompany.city}
                </dd>
              </div>
            </dl>

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
          </>
        )}
      </form>
    </form.AppForm>
  );
};
