import { describe, expect, it } from 'vitest';
import type { ConfigurePaymentTermsViewModel } from './configure-payment-terms.presenter';
import { toConfigurePaymentTermsInput } from './configure-payment-terms.submission';

const FULL_VALUES: ConfigurePaymentTermsViewModel = {
  startingPoint: 'from_invoice_date',
  days: '30',
  endOfMonth: false,
  penaltyRate: '15',
  earlyPaymentDiscountTag: 'NoDiscount',
  discountRate: '',
  discountDelayThreshold: '',
  paymentMethods: { bank_transfer: true, check: false, direct_debit: false, credit_card: false },
  iban: 'FR7630006000011234567890189'
};

describe('toConfigurePaymentTermsInput', () => {
  it('should convert starting point', () => {
    const result = toConfigurePaymentTermsInput(FULL_VALUES);

    expect(result.startingPoint).toBe('from_invoice_date');
  });

  it('should convert days string to number', () => {
    const result = toConfigurePaymentTermsInput(FULL_VALUES);

    expect(result.days).toBe(30);
  });

  it('should default days to 0 when empty', () => {
    const result = toConfigurePaymentTermsInput({ ...FULL_VALUES, days: '' });

    expect(result.days).toBe(0);
  });

  it('should omit endOfMonth when false', () => {
    const result = toConfigurePaymentTermsInput(FULL_VALUES);

    expect(result).not.toHaveProperty('endOfMonth');
  });

  it('should include endOfMonth when true', () => {
    const result = toConfigurePaymentTermsInput({ ...FULL_VALUES, endOfMonth: true });

    expect(result.endOfMonth).toBe(true);
  });

  it('should convert penaltyRate string to number', () => {
    const result = toConfigurePaymentTermsInput(FULL_VALUES);

    expect(result.penaltyRate).toBe(15);
  });

  it('should pass earlyPaymentDiscountTag as-is', () => {
    const result = toConfigurePaymentTermsInput(FULL_VALUES);

    expect(result.earlyPaymentDiscountTag).toBe('NoDiscount');
  });

  it('should include discountRate when non-empty', () => {
    const result = toConfigurePaymentTermsInput({
      ...FULL_VALUES,
      earlyPaymentDiscountTag: 'WithDiscount',
      discountRate: '2',
      discountDelayThreshold: '10'
    });

    expect(result.discountRate).toBe(2);
  });

  it('should include discountDelayThreshold when non-empty', () => {
    const result = toConfigurePaymentTermsInput({
      ...FULL_VALUES,
      earlyPaymentDiscountTag: 'WithDiscount',
      discountRate: '2',
      discountDelayThreshold: '10'
    });

    expect(result.discountDelayThreshold).toBe(10);
  });

  it('should omit discountRate when empty', () => {
    const result = toConfigurePaymentTermsInput(FULL_VALUES);

    expect(result).not.toHaveProperty('discountRate');
  });

  it('should omit discountDelayThreshold when empty', () => {
    const result = toConfigurePaymentTermsInput(FULL_VALUES);

    expect(result).not.toHaveProperty('discountDelayThreshold');
  });

  it('should build payment methods array from checked values', () => {
    const result = toConfigurePaymentTermsInput(FULL_VALUES);

    expect(result.paymentMethods).toEqual(['bank_transfer']);
  });

  it('should include multiple payment methods', () => {
    const result = toConfigurePaymentTermsInput({
      ...FULL_VALUES,
      paymentMethods: { bank_transfer: true, check: true, direct_debit: false, credit_card: true }
    });

    expect(result.paymentMethods).toEqual(['bank_transfer', 'check', 'credit_card']);
  });

  it('should include iban when non-empty', () => {
    const result = toConfigurePaymentTermsInput(FULL_VALUES);

    expect(result.iban).toBe('FR7630006000011234567890189');
  });

  it('should omit iban when empty', () => {
    const result = toConfigurePaymentTermsInput({ ...FULL_VALUES, iban: '' });

    expect(result).not.toHaveProperty('iban');
  });

  it('should produce empty first element when no methods are selected', () => {
    const result = toConfigurePaymentTermsInput({
      ...FULL_VALUES,
      paymentMethods: { bank_transfer: false, check: false, direct_debit: false, credit_card: false }
    });

    expect(result.paymentMethods).toEqual(['']);
  });
});
