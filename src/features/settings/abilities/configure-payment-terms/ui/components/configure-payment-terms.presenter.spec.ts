import { describe, expect, it } from 'vitest';
import type { PaymentTerms } from '@/features/settings/domain/payment-terms';
import { DiscountDelayThreshold, DiscountRate, noDiscount, withDiscount } from '@/features/settings/domain/payment-terms';
import { Iban } from '@/features/settings/domain/payment-terms/iban';
import { PenaltyRate } from '@/features/settings/domain/payment-terms/penalty-rate';
import {
  presentPaymentTerms,
  showDeadlineDays,
  showDiscountFields,
  showEndOfMonth,
  showIban
} from './configure-payment-terms.presenter';

const PAYMENT_TERMS_WITH_DISCOUNT: PaymentTerms = {
  deadline: { startingPoint: 'from_invoice_date', days: 30, endOfMonth: false },
  penaltyRate: PenaltyRate(15),
  earlyPaymentDiscount: withDiscount(DiscountRate(2), DiscountDelayThreshold(10)),
  paymentMethods: ['bank_transfer'],
  iban: Iban('FR7630006000011234567890189')
};

const PAYMENT_TERMS_NO_DISCOUNT: PaymentTerms = {
  deadline: { startingPoint: 'upon_receipt', days: 0, endOfMonth: false },
  penaltyRate: PenaltyRate(12),
  earlyPaymentDiscount: noDiscount,
  paymentMethods: ['check', 'credit_card']
};

describe('presentPaymentTerms', () => {
  it('should return empty view model when payment terms is null', () => {
    const result = presentPaymentTerms(null);

    expect(result.startingPoint).toBe('');
    expect(result.days).toBe('');
    expect(result.endOfMonth).toBe(false);
    expect(result.penaltyRate).toBe('');
    expect(result.earlyPaymentDiscountTag).toBe('');
    expect(result.discountRate).toBe('');
    expect(result.discountDelayThreshold).toBe('');
    expect(result.paymentMethods).toEqual({
      bank_transfer: false,
      check: false,
      direct_debit: false,
      credit_card: false
    });
    expect(result.iban).toBe('');
  });

  it('should present payment terms with discount', () => {
    const result = presentPaymentTerms(PAYMENT_TERMS_WITH_DISCOUNT);

    expect(result.startingPoint).toBe('from_invoice_date');
    expect(result.days).toBe('30');
    expect(result.endOfMonth).toBe(false);
    expect(result.penaltyRate).toBe('15');
    expect(result.earlyPaymentDiscountTag).toBe('WithDiscount');
    expect(result.discountRate).toBe('2');
    expect(result.discountDelayThreshold).toBe('10');
    expect(result.paymentMethods).toEqual({
      bank_transfer: true,
      check: false,
      direct_debit: false,
      credit_card: false
    });
    expect(result.iban).toBe('FR7630006000011234567890189');
  });

  it('should present payment terms without discount', () => {
    const result = presentPaymentTerms(PAYMENT_TERMS_NO_DISCOUNT);

    expect(result.startingPoint).toBe('upon_receipt');
    expect(result.days).toBe('0');
    expect(result.earlyPaymentDiscountTag).toBe('NoDiscount');
    expect(result.discountRate).toBe('');
    expect(result.discountDelayThreshold).toBe('');
  });

  it('should present multiple payment methods', () => {
    const result = presentPaymentTerms(PAYMENT_TERMS_NO_DISCOUNT);

    expect(result.paymentMethods).toEqual({
      bank_transfer: false,
      check: true,
      direct_debit: false,
      credit_card: true
    });
  });

  it('should default iban to empty string when not present', () => {
    const result = presentPaymentTerms(PAYMENT_TERMS_NO_DISCOUNT);

    expect(result.iban).toBe('');
  });

  it('should present end of month flag', () => {
    const terms: PaymentTerms = {
      ...PAYMENT_TERMS_WITH_DISCOUNT,
      deadline: { startingPoint: 'from_invoice_date', days: 45, endOfMonth: true }
    };
    const result = presentPaymentTerms(terms);

    expect(result.endOfMonth).toBe(true);
    expect(result.days).toBe('45');
  });
});

describe('showDeadlineDays', () => {
  it('should return true for from_invoice_date', () => {
    expect(showDeadlineDays('from_invoice_date')).toBe(true);
  });

  it('should return false for upon_receipt', () => {
    expect(showDeadlineDays('upon_receipt')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(showDeadlineDays('')).toBe(false);
  });
});

describe('showEndOfMonth', () => {
  it('should return true for from_invoice_date', () => {
    expect(showEndOfMonth('from_invoice_date')).toBe(true);
  });

  it('should return false for upon_receipt', () => {
    expect(showEndOfMonth('upon_receipt')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(showEndOfMonth('')).toBe(false);
  });
});

describe('showDiscountFields', () => {
  it('should return true for WithDiscount', () => {
    expect(showDiscountFields('WithDiscount')).toBe(true);
  });

  it('should return false for NoDiscount', () => {
    expect(showDiscountFields('NoDiscount')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(showDiscountFields('')).toBe(false);
  });
});

describe('showIban', () => {
  it('should return true when bank_transfer is selected', () => {
    expect(showIban({ bank_transfer: true, check: false, direct_debit: false, credit_card: false })).toBe(true);
  });

  it('should return false when bank_transfer is not selected', () => {
    expect(showIban({ bank_transfer: false, check: true, direct_debit: false, credit_card: false })).toBe(false);
  });
});
