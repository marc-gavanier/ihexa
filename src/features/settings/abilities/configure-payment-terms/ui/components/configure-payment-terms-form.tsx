'use client';

import { applyEffectSchema, fieldErrorTranslation, handleAction, handleSubmit, transformValue, useAppForm } from '@arckit/form';
import { toastError, toastSuccess } from '@arckit/nextjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { inject } from '@/configuration/injection';
import { useServerAction } from '@/configuration/nextjs/client';
import { DEADLINE_STARTING_POINTS } from '@/features/settings/domain/payment-terms/payment-deadline';
import { PAYMENT_METHODS } from '@/features/settings/domain/payment-terms/payment-method';
import { CONFIGURE_PAYMENT_TERMS_KEY } from '../../action/configure-payment-terms.key';
import { configurePaymentTermsValidation } from '../../action/configure-payment-terms.validation';
import {
  type ConfigurePaymentTermsViewModel,
  showDeadlineDays,
  showDiscountFields,
  showEndOfMonth,
  showIban
} from './configure-payment-terms.presenter';
import { toConfigurePaymentTermsInput } from './configure-payment-terms.submission';

const EARLY_PAYMENT_DISCOUNT_OPTIONS = ['NoDiscount', 'WithDiscount'] as const;

export const ConfigurePaymentTermsForm = ({ paymentTerms }: { paymentTerms: ConfigurePaymentTermsViewModel }) => {
  const { t } = useTranslation('settings.configure-payment-terms');
  const [currentStartingPoint, setCurrentStartingPoint] = useState(paymentTerms.startingPoint);
  const [currentDiscountTag, setCurrentDiscountTag] = useState(paymentTerms.earlyPaymentDiscountTag);
  const [currentPaymentMethods, setCurrentPaymentMethods] = useState(paymentTerms.paymentMethods);

  const [action, isPending] = useServerAction(inject(CONFIGURE_PAYMENT_TERMS_KEY), {
    onSuccess: (state) => {
      toastSuccess(state)(() => t('success.saved'));
    },
    onError: toastError(t)
  });

  const form = useAppForm({
    defaultValues: paymentTerms,
    validators: {
      onChange: transformValue(toConfigurePaymentTermsInput)(applyEffectSchema(configurePaymentTermsValidation))
    },
    onSubmit: transformValue(toConfigurePaymentTermsInput)(handleAction(action))
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)} className='flex flex-col gap-6'>
        <form.AppField name='startingPoint'>
          {(field) => (
            <div>
              <field.Label>{t('form.startingPoint.label')}</field.Label>
              <field.Select
                isPending={isPending}
                aria-label={t('form.startingPoint.label')}
                onValueChange={(value) => {
                  setCurrentStartingPoint(value);
                  if (value === 'upon_receipt') {
                    form.setFieldValue('days', '0');
                    form.setFieldValue('endOfMonth', false);
                  }
                }}
              >
                <option disabled value=''>
                  {t('form.startingPoint.placeholder')}
                </option>
                {DEADLINE_STARTING_POINTS.map((sp) => (
                  <option key={sp} value={sp}>
                    {t(`form.startingPoint.options.${sp}`)}
                  </option>
                ))}
              </field.Select>
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>

        {showDeadlineDays(currentStartingPoint) && (
          <form.AppField name='days'>
            {(field) => (
              <div>
                <field.Label>{t('form.days.label')}</field.Label>
                <field.Input isPending={isPending} type='number' />
                <field.Error formatMessage={t} template={fieldErrorTranslation} />
              </div>
            )}
          </form.AppField>
        )}

        {showEndOfMonth(currentStartingPoint) && (
          <form.AppField name='endOfMonth'>
            {(field) => (
              <div>
                <field.Checkbox isPending={isPending}>{t('form.endOfMonth.label')}</field.Checkbox>
              </div>
            )}
          </form.AppField>
        )}

        <form.AppField name='penaltyRate'>
          {(field) => (
            <div>
              <field.Label>{t('form.penaltyRate.label')}</field.Label>
              <field.Input isPending={isPending} type='number' />
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>

        <form.AppField name='earlyPaymentDiscountTag'>
          {(field) => (
            <div>
              <field.Label>{t('form.earlyPaymentDiscountTag.label')}</field.Label>
              <field.Select
                isPending={isPending}
                aria-label={t('form.earlyPaymentDiscountTag.label')}
                onValueChange={(value) => {
                  setCurrentDiscountTag(value);
                  if (value !== 'WithDiscount') {
                    form.setFieldValue('discountRate', '');
                    form.setFieldValue('discountDelayThreshold', '');
                  }
                }}
              >
                <option disabled value=''>
                  {t('form.earlyPaymentDiscountTag.placeholder')}
                </option>
                {EARLY_PAYMENT_DISCOUNT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {t(`form.earlyPaymentDiscountTag.options.${option}`)}
                  </option>
                ))}
              </field.Select>
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </div>
          )}
        </form.AppField>

        {showDiscountFields(currentDiscountTag) && (
          <>
            <form.AppField name='discountRate'>
              {(field) => (
                <div>
                  <field.Label>{t('form.discountRate.label')}</field.Label>
                  <field.Input isPending={isPending} type='number' />
                  <field.Error formatMessage={t} template={fieldErrorTranslation} />
                </div>
              )}
            </form.AppField>

            <form.AppField name='discountDelayThreshold'>
              {(field) => (
                <div>
                  <field.Label>{t('form.discountDelayThreshold.label')}</field.Label>
                  <field.Input isPending={isPending} type='number' />
                  <field.Error formatMessage={t} template={fieldErrorTranslation} />
                </div>
              )}
            </form.AppField>
          </>
        )}

        <form.AppField name='paymentMethods'>
          {(field) => (
            <fieldset className='flex flex-col gap-2'>
              <legend className='mb-1 font-medium'>{t('form.paymentMethods.label')}</legend>
              {PAYMENT_METHODS.map((method) => (
                <form.AppField key={method} name={`paymentMethods.${method}`}>
                  {() => (
                    <field.Checkbox
                      isPending={isPending}
                      isInvalid={!field.state.meta.isValid}
                      onValueChange={(checked) => setCurrentPaymentMethods((prev) => ({ ...prev, [method]: checked }))}
                    >
                      {t(`form.paymentMethods.options.${method}`)}
                    </field.Checkbox>
                  )}
                </form.AppField>
              ))}
              <field.Error formatMessage={t} template={fieldErrorTranslation} />
            </fieldset>
          )}
        </form.AppField>

        {showIban(currentPaymentMethods) && (
          <form.AppField name='iban'>
            {(field) => (
              <div>
                <field.Label>{t('form.iban.label')}</field.Label>
                <field.Input isPending={isPending} />
                <field.Error formatMessage={t} template={fieldErrorTranslation} />
              </div>
            )}
          </form.AppField>
        )}

        <form.Submit isPending={isPending}>{t('form.submit')}</form.Submit>
      </form>
    </form.AppForm>
  );
};
