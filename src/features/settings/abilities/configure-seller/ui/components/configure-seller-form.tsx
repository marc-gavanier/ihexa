'use client';

import { Options } from '@arckit/daisyui/primitives-client';
import { fieldErrorTranslation, handleAction, handleSubmit, transformValue, useAppForm } from '@arckit/form';
import { applyEffectSchema } from '@arckit/form/effect-schema';
import { toastError, toastSuccess } from '@arckit/nextjs/client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { inject } from '@/configuration/injection';
import { useServerAction } from '@/configuration/nextjs/client';
import { TrackerAction, TrackerCategory, trackEvent } from '@/configuration/telemetry/event-tracker/client/track-event';
import { VAT_REGIMES } from '@/features/settings/domain/seller/vat-regime';
import type { CompanySummary } from '@/libraries/recherche-entreprises';
import { CONFIGURE_SELLER_KEY } from '../../action/configure-seller.key';
import { configureSellerValidation } from '../../action/configure-seller.validation';
import { companyCombobox, companyOptions } from './company.combobox';
import { CompanyCard } from './company-card';
import { type ConfigureSellerViewModel, showShareCapital, showVatFields } from './configure-seller.presenter';
import { toConfigureSellerInput } from './configure-seller.submission';

export const ConfigureSellerForm = ({ seller }: { seller: ConfigureSellerViewModel }) => {
  const { t } = useTranslation('settings.configure-seller');
  const [selectedCompany, setSelectedCompany] = useState<CompanySummary | null>(seller.company);
  const [currentVatRegime, setCurrentVatRegime] = useState(seller.vatRegime);
  const [currentLegalForm, setCurrentLegalForm] = useState(seller.company?.legalForm ?? '');

  const [action, isPending] = useServerAction(inject(CONFIGURE_SELLER_KEY), {
    onSuccess: (state) => {
      toastSuccess(state)(() => t('success.saved'));
      trackEvent({ category: TrackerCategory.SELLER, action: TrackerAction.CONFIGURED });
    },
    onError: toastError(t)
  });

  const form = useAppForm({
    defaultValues: seller,
    validators: {
      onChange: transformValue(toConfigureSellerInput)(applyEffectSchema(configureSellerValidation))
    },
    onSubmit: transformValue(toConfigureSellerInput)(handleAction(action))
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)} className='flex flex-col gap-6'>
        <form.AppField name='company'>
          {(field) => (
            <div className='flex flex-col gap-4'>
              <field.Combobox
                isPending={isPending}
                onSelect={(item: CompanySummary) => {
                  setSelectedCompany(item);
                  setCurrentLegalForm(item.legalForm);
                }}
                {...companyCombobox()}
              >
                {({ getInputProps, getMenuProps, getItemProps, isOpen, isPending, items, highlightedItem, selectedItem }) => (
                  <div className='relative'>
                    <label className='mb-1 block' htmlFor='company.search'>
                      {t('company.search.label')}
                    </label>
                    <input
                      {...getInputProps({})}
                      id='company.search'
                      className='input input-bordered w-full'
                      placeholder={t('company.search.placeholder')}
                    />
                    <Options<CompanySummary>
                      items={items}
                      isOpen={isOpen}
                      showEmpty={isOpen && !isPending && items.length === 0}
                      selectedItem={selectedItem}
                      highlightedItem={highlightedItem}
                      getMenuProps={getMenuProps}
                      getItemProps={getItemProps}
                      {...companyOptions}
                    >
                      <span className='p-2 text-sm opacity-70'>{t('company.search.noResults')}</span>
                    </Options>
                  </div>
                )}
              </field.Combobox>
              {selectedCompany != null && <CompanyCard company={selectedCompany} />}
            </div>
          )}
        </form.AppField>

        {selectedCompany != null && (
          <>
            <form.AppField name='vatRegime'>
              {(field) => (
                <div>
                  <field.Label>{t('form.vatRegime.label')}</field.Label>
                  <field.Select
                    isPending={isPending}
                    aria-label={t('form.vatRegime.label')}
                    onValueChange={(value) => {
                      setCurrentVatRegime(value);
                      if (value !== 'normal') {
                        form.setFieldValue('vatNumber', '');
                        form.setFieldValue('taxDebitOption', false);
                      }
                    }}
                  >
                    <option disabled value=''>
                      {t('form.vatRegime.placeholder')}
                    </option>
                    {VAT_REGIMES.map((regime) => (
                      <option key={regime} value={regime}>
                        {t(`form.vatRegime.options.${regime}`)}
                      </option>
                    ))}
                  </field.Select>
                  <field.Error formatMessage={t} template={fieldErrorTranslation} />
                </div>
              )}
            </form.AppField>

            {showVatFields(currentVatRegime) && (
              <>
                <form.AppField name='vatNumber'>
                  {(field) => (
                    <div>
                      <field.Label>{t('form.vatNumber.label')}</field.Label>
                      <field.Input isPending={isPending} />
                      <field.Error formatMessage={t} template={fieldErrorTranslation} />
                    </div>
                  )}
                </form.AppField>
                <form.AppField name='taxDebitOption'>
                  {(field) => (
                    <div>
                      <field.Checkbox isPending={isPending}>{t('form.taxDebitOption.label')}</field.Checkbox>
                    </div>
                  )}
                </form.AppField>
              </>
            )}

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

            <form.AppField name='website'>
              {(field) => (
                <div>
                  <field.Label>{t('form.website.label')}</field.Label>
                  <field.Input isPending={isPending} />
                  <field.Error formatMessage={t} template={fieldErrorTranslation} />
                </div>
              )}
            </form.AppField>

            <form.AppField name='rcsRegistration'>
              {(field) => (
                <div>
                  <field.Label>{t('form.rcsRegistration.label')}</field.Label>
                  <field.Input isPending={isPending} />
                  <field.Error formatMessage={t} template={fieldErrorTranslation} />
                </div>
              )}
            </form.AppField>

            {showShareCapital(currentLegalForm) && (
              <form.AppField name='shareCapital'>
                {(field) => (
                  <div>
                    <field.Label>{t('form.shareCapital.label')}</field.Label>
                    <field.Input isPending={isPending} type='number' />
                    <field.Error formatMessage={t} template={fieldErrorTranslation} />
                  </div>
                )}
              </form.AppField>
            )}

            <form.Submit isPending={isPending}>{t('form.submit')}</form.Submit>
          </>
        )}
      </form>
    </form.AppForm>
  );
};
