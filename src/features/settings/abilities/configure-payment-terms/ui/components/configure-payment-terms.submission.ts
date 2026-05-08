import type { ConfigurePaymentTermsInput } from '../../action/configure-payment-terms.validation';
import type { ConfigurePaymentTermsViewModel } from './configure-payment-terms.presenter';

const buildPaymentMethods = (paymentMethods: Record<string, boolean>): ConfigurePaymentTermsInput['paymentMethods'] => {
  const selected = Object.entries(paymentMethods)
    .filter(([, checked]) => checked)
    .map(([method]) => method);
  const [first = '', ...rest] = selected;
  return [first, ...rest];
};

export const toConfigurePaymentTermsInput = (values: ConfigurePaymentTermsViewModel): ConfigurePaymentTermsInput => ({
  startingPoint: values.startingPoint,
  days: Number(values.days) || 0,
  ...(values.endOfMonth ? { endOfMonth: values.endOfMonth } : {}),
  penaltyRate: Number(values.penaltyRate) || 0,
  earlyPaymentDiscountTag: values.earlyPaymentDiscountTag,
  ...(values.discountRate !== '' ? { discountRate: Number(values.discountRate) } : {}),
  ...(values.discountDelayThreshold !== '' ? { discountDelayThreshold: Number(values.discountDelayThreshold) } : {}),
  paymentMethods: buildPaymentMethods(values.paymentMethods),
  ...(values.iban !== '' ? { iban: values.iban } : {})
});
