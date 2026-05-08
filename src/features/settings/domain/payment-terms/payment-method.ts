import { Schema } from 'effect';

export const PAYMENT_METHODS = ['bank_transfer', 'check', 'direct_debit', 'credit_card'] as const;

export const PaymentMethod = Schema.Literal(...PAYMENT_METHODS);

export type PaymentMethod = typeof PaymentMethod.Type;

export type PaymentMethods = readonly [PaymentMethod, ...PaymentMethod[]];
