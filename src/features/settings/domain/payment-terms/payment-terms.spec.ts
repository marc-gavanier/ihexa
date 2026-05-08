import { Either } from 'effect';
import { describe, expect, it } from 'vitest';
import { DiscountDelayThreshold, DiscountRate, noDiscount, withDiscount } from './early-payment-discount';
import { Iban } from './iban';
import type { ValidatedPaymentTermsInput } from './payment-terms';
import {
  BankTransferRequiresIban,
  buildPaymentTerms,
  EarlyPaymentDiscountNotSpecified,
  PaymentDeadlineExceedsMaxDays,
  UponReceiptWithEndOfMonth
} from './payment-terms';
import { PenaltyRate } from './penalty-rate';

const validInput: ValidatedPaymentTermsInput = {
  startingPoint: 'from_invoice_date',
  days: 30,
  endOfMonth: false,
  penaltyRate: PenaltyRate(15),
  earlyPaymentDiscount: noDiscount,
  paymentMethods: ['bank_transfer'],
  iban: Iban('FR7630006000011234567890189')
};

describe('PaymentDeadline', () => {
  it('should accept "upon receipt" starting point', () => {
    const result = buildPaymentTerms({ ...validInput, startingPoint: 'upon_receipt' });

    expect(Either.isRight(result)).toBe(true);
  });

  it('should accept "from invoice date" starting point', () => {
    const result = buildPaymentTerms(validInput);

    expect(Either.isRight(result)).toBe(true);
  });

  it('should accept 0 days', () => {
    const result = buildPaymentTerms({ ...validInput, days: 0 });

    expect(Either.isRight(result)).toBe(true);
  });

  it('should accept max 60 days from invoice date without end of month', () => {
    const result = buildPaymentTerms({ ...validInput, days: 60, endOfMonth: false });

    expect(Either.isRight(result)).toBe(true);
  });

  it('should reject more than 60 days from invoice date without end of month', () => {
    const result = buildPaymentTerms({ ...validInput, days: 61, endOfMonth: false });

    expect(result).toEqual(Either.left(PaymentDeadlineExceedsMaxDays));
  });

  it('should accept max 45 days with end of month', () => {
    const result = buildPaymentTerms({ ...validInput, days: 45, endOfMonth: true });

    expect(Either.isRight(result)).toBe(true);
  });

  it('should reject more than 45 days with end of month', () => {
    const result = buildPaymentTerms({ ...validInput, days: 46, endOfMonth: true });

    expect(result).toEqual(Either.left(PaymentDeadlineExceedsMaxDays));
  });

  it('should accept 0 days + end of month (end of current month)', () => {
    const result = buildPaymentTerms({ ...validInput, days: 0, endOfMonth: true });

    expect(Either.isRight(result)).toBe(true);
  });

  it('should normalize days to 0 for upon receipt', () => {
    const result = buildPaymentTerms({ ...validInput, startingPoint: 'upon_receipt', days: 15 });

    expect(Either.map(result, (r) => r.deadline.days)).toEqual(Either.right(0));
  });

  it('should reject upon receipt with end of month', () => {
    const result = buildPaymentTerms({ ...validInput, startingPoint: 'upon_receipt', endOfMonth: true });

    expect(result).toEqual(Either.left(UponReceiptWithEndOfMonth));
  });
});

describe('PenaltyRate', () => {
  it('should accept a strictly positive rate', () => {
    expect(() => PenaltyRate(15)).not.toThrow();
  });

  it('should accept a rate of 1 (below legal floor)', () => {
    expect(() => PenaltyRate(1)).not.toThrow();
  });

  it('should reject zero', () => {
    expect(() => PenaltyRate(0)).toThrow();
  });

  it('should reject negative rate', () => {
    expect(() => PenaltyRate(-1)).toThrow();
  });

  it('should accept very high rate (no upper bound)', () => {
    expect(() => PenaltyRate(999)).not.toThrow();
  });
});

describe('EarlyPaymentDiscount', () => {
  it('should accept no discount', () => {
    const result = buildPaymentTerms({ ...validInput, earlyPaymentDiscount: noDiscount });

    expect(Either.isRight(result)).toBe(true);
  });

  it('should accept with discount when rate and threshold are positive', () => {
    const result = buildPaymentTerms({
      ...validInput,
      earlyPaymentDiscount: withDiscount(DiscountRate(2), DiscountDelayThreshold(10))
    });

    expect(Either.isRight(result)).toBe(true);
  });

  it('should reject discount rate of zero', () => {
    expect(() => DiscountRate(0)).toThrow();
  });

  it('should reject negative discount rate', () => {
    expect(() => DiscountRate(-1)).toThrow();
  });

  it('should reject discount delay threshold of zero', () => {
    expect(() => DiscountDelayThreshold(0)).toThrow();
  });

  it('should reject negative discount delay threshold', () => {
    expect(() => DiscountDelayThreshold(-1)).toThrow();
  });

  it('should reject non-integer discount delay threshold', () => {
    expect(() => DiscountDelayThreshold(1.5)).toThrow();
  });

  it('should reject when early payment discount is not specified', () => {
    const { earlyPaymentDiscount: _, ...inputWithoutDiscount } = validInput;
    const result = buildPaymentTerms(inputWithoutDiscount);

    expect(result).toEqual(Either.left(EarlyPaymentDiscountNotSpecified));
  });
});

describe('PaymentMethods', () => {
  it('should accept a single payment method', () => {
    const result = buildPaymentTerms({ ...validInput, paymentMethods: ['bank_transfer'] });

    expect(Either.isRight(result)).toBe(true);
  });

  it('should accept multiple payment methods', () => {
    const result = buildPaymentTerms({
      ...validInput,
      paymentMethods: ['bank_transfer', 'check', 'direct_debit', 'credit_card']
    });

    expect(Either.isRight(result)).toBe(true);
  });

  it('should accept check without iban', () => {
    const { iban: _, ...inputWithoutIban } = validInput;
    const result = buildPaymentTerms({ ...inputWithoutIban, paymentMethods: ['check'] });

    expect(Either.isRight(result)).toBe(true);
  });
});

describe('Iban', () => {
  it('should accept valid French IBAN', () => {
    expect(() => Iban('FR7630006000011234567890189')).not.toThrow();
  });

  it('should accept IBAN with spaces', () => {
    expect(() => Iban('FR76 3000 6000 0112 3456 7890 189')).not.toThrow();
  });

  it('should accept lowercase and normalize to uppercase', () => {
    expect(Iban('fr7630006000011234567890189')).toBe('FR7630006000011234567890189');
  });

  it('should reject empty string', () => {
    expect(() => Iban('')).toThrow();
  });

  it('should reject invalid format (missing country code)', () => {
    expect(() => Iban('1234567890')).toThrow();
  });

  it('should reject invalid checksum', () => {
    expect(() => Iban('FR7630006000011234567890188')).toThrow();
  });

  it('should reject when bank transfer is used without iban', () => {
    const { iban: _, ...inputWithoutIban } = validInput;
    const result = buildPaymentTerms({ ...inputWithoutIban, paymentMethods: ['bank_transfer'] });

    expect(result).toEqual(Either.left(BankTransferRequiresIban));
  });
});
