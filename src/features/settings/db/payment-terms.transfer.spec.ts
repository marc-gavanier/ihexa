import { describe, expect, it } from 'vitest';
import {
  DiscountDelayThreshold,
  DiscountRate,
  noDiscount,
  withDiscount
} from '@/features/settings/domain/payment-terms/early-payment-discount';
import { Iban } from '@/features/settings/domain/payment-terms/iban';
import type { PaymentTerms } from '@/features/settings/domain/payment-terms/payment-terms';
import { PenaltyRate } from '@/features/settings/domain/payment-terms/penalty-rate';
import { paymentTermsFromDomain, paymentTermsToDomain } from './payment-terms.transfer';

describe('payment terms transfer', () => {
  it('should preserve payment terms data through round-trip conversion with no discount', () => {
    const paymentTerms: PaymentTerms = {
      deadline: {
        startingPoint: 'from_invoice_date',
        days: 30,
        endOfMonth: false
      },
      penaltyRate: PenaltyRate(15),
      earlyPaymentDiscount: noDiscount,
      paymentMethods: ['bank_transfer'],
      iban: Iban('FR7630006000011234567890189')
    };

    const result = paymentTermsToDomain(paymentTermsFromDomain(paymentTerms));

    expect(result).toStrictEqual(paymentTerms);
  });

  it('should preserve payment terms data through round-trip conversion with discount', () => {
    const paymentTerms: PaymentTerms = {
      deadline: {
        startingPoint: 'from_invoice_date',
        days: 30,
        endOfMonth: false
      },
      penaltyRate: PenaltyRate(12),
      earlyPaymentDiscount: withDiscount(DiscountRate(2), DiscountDelayThreshold(10)),
      paymentMethods: ['bank_transfer', 'check'],
      iban: Iban('FR7630006000011234567890189')
    };

    const result = paymentTermsToDomain(paymentTermsFromDomain(paymentTerms));

    expect(result).toStrictEqual(paymentTerms);
  });

  it('should preserve payment terms data through round-trip conversion without iban', () => {
    const paymentTerms: PaymentTerms = {
      deadline: {
        startingPoint: 'upon_receipt',
        days: 0,
        endOfMonth: false
      },
      penaltyRate: PenaltyRate(15),
      earlyPaymentDiscount: noDiscount,
      paymentMethods: ['check']
    };

    const result = paymentTermsToDomain(paymentTermsFromDomain(paymentTerms));

    expect(result).toStrictEqual(paymentTerms);
  });

  it('should preserve payment terms data through round-trip conversion with end of month', () => {
    const paymentTerms: PaymentTerms = {
      deadline: {
        startingPoint: 'from_invoice_date',
        days: 45,
        endOfMonth: true
      },
      penaltyRate: PenaltyRate(15),
      earlyPaymentDiscount: noDiscount,
      paymentMethods: ['bank_transfer'],
      iban: Iban('FR7630006000011234567890189')
    };

    const result = paymentTermsToDomain(paymentTermsFromDomain(paymentTerms));

    expect(result).toStrictEqual(paymentTerms);
  });
});
