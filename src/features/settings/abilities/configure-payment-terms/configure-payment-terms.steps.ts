import assert from 'node:assert';
import type { DataTable } from '@cucumber/cucumber';
import { Given, Then, When } from '@cucumber/cucumber';
import { Either } from 'effect';
import type { EarlyPaymentDiscount } from '@/features/settings/domain/payment-terms/early-payment-discount';
import {
  DiscountDelayThreshold,
  DiscountRate,
  noDiscount,
  withDiscount
} from '@/features/settings/domain/payment-terms/early-payment-discount';
import { Iban } from '@/features/settings/domain/payment-terms/iban';
import type { DeadlineStartingPoint } from '@/features/settings/domain/payment-terms/payment-deadline';
import type { PaymentMethod, PaymentMethods } from '@/features/settings/domain/payment-terms/payment-method';
import type {
  PaymentTerms,
  PaymentTermsConfigurationError,
  ValidatedPaymentTermsInput
} from '@/features/settings/domain/payment-terms/payment-terms';
import { PenaltyRate } from '@/features/settings/domain/payment-terms/penalty-rate';
import { clearSettings } from '@/features/settings/infrastructure';
import { getPaymentTermsConfiguration, savePaymentTermsConfiguration } from './implementations';

type RawPaymentTermsInput = {
  readonly startingPoint: string;
  readonly days?: number | undefined;
  readonly endOfMonth?: boolean | undefined;
  readonly penaltyRate: number;
  readonly earlyPaymentDiscount?: EarlyPaymentDiscount | undefined;
  readonly paymentMethods: PaymentMethods;
  readonly iban?: string | undefined;
};

const STARTING_POINT_MAP: Record<string, DeadlineStartingPoint> = {
  'upon receipt': 'upon_receipt',
  'from invoice date': 'from_invoice_date'
};

const PAYMENT_METHOD_MAP: Record<string, PaymentMethod> = {
  'bank transfer': 'bank_transfer',
  check: 'check',
  'direct debit': 'direct_debit',
  'credit card': 'credit_card'
};

const parsePaymentMethods = (raw: string): PaymentMethods => {
  const methods = raw.split(',').map((m) => {
    const trimmed = m.trim();
    const method = PAYMENT_METHOD_MAP[trimmed];
    if (!method) throw new Error(`Unknown payment method: ${trimmed}`);
    return method;
  });
  const [first, ...rest] = methods;
  if (!first) throw new Error('At least one payment method is required');
  return [first, ...rest];
};

const buildValidatedInput = (raw: RawPaymentTermsInput): ValidatedPaymentTermsInput => {
  const startingPoint = STARTING_POINT_MAP[raw.startingPoint];
  if (!startingPoint) throw new Error(`Unknown starting point: ${raw.startingPoint}`);
  return {
    startingPoint,
    days: raw.days ?? 0,
    ...(raw.endOfMonth != null ? { endOfMonth: raw.endOfMonth } : {}),
    penaltyRate: PenaltyRate(raw.penaltyRate),
    ...(raw.earlyPaymentDiscount != null ? { earlyPaymentDiscount: raw.earlyPaymentDiscount } : {}),
    paymentMethods: raw.paymentMethods,
    ...(raw.iban != null ? { iban: Iban(raw.iban) } : {})
  };
};

const buildAndSave = async (
  raw: RawPaymentTermsInput
): Promise<Either.Either<PaymentTerms, PaymentTermsConfigurationError | Error>> => {
  try {
    const validated = buildValidatedInput(raw);
    return await savePaymentTermsConfiguration(validated);
  } catch (error) {
    return Either.left(error instanceof Error ? error : new Error('Validation failed'));
  }
};

let savedPaymentTerms: PaymentTerms | undefined;
let saveError: unknown;
let paymentTermsUnavailable = false;
let currentRawInput: Partial<RawPaymentTermsInput> = {};

const resetState = (): void => {
  savedPaymentTerms = undefined;
  saveError = undefined;
  paymentTermsUnavailable = false;
  currentRawInput = {};
};

const parseEarlyPaymentDiscount = (tableData: Record<string, string | undefined>): EarlyPaymentDiscount | undefined => {
  const discountValue = tableData['early payment discount'];
  if (discountValue === 'no discount') return noDiscount;
  if (discountValue === 'with discount') {
    const rate = tableData['discount rate'];
    const threshold = tableData['discount delay threshold'];
    if (rate == null || threshold == null) throw new Error('Discount rate and threshold are required for with discount');
    return withDiscount(DiscountRate(Number(rate)), DiscountDelayThreshold(Number(threshold)));
  }
  return undefined;
};

// --- Given ---

Given(/^there are no payment terms configured$/, async () => {
  resetState();
  await clearSettings();
});

Given(/^payment terms are configured with a penalty rate of (\d+)$/, async (penaltyRate: string) => {
  resetState();
  await clearSettings();

  const raw: RawPaymentTermsInput = {
    startingPoint: 'from invoice date',
    days: 30,
    endOfMonth: false,
    penaltyRate: Number(penaltyRate),
    earlyPaymentDiscount: noDiscount,
    paymentMethods: ['bank_transfer'],
    iban: 'FR7630006000011234567890189'
  };

  const result = await buildAndSave(raw);
  assert.ok(Either.isRight(result), 'Failed to configure payment terms');
  savedPaymentTerms = result.right;
  currentRawInput = { ...raw };
});

// --- When ---

When(/^I save the payment terms configuration with$/, async (dataTable: DataTable) => {
  const tableData = Object.fromEntries(dataTable.rows());

  const startingPoint = tableData['deadline starting point'] ?? '';
  const days = tableData['deadline days'] != null ? Number(tableData['deadline days']) : undefined;
  const endOfMonth = tableData['end of month'] != null ? tableData['end of month'] === 'yes' : undefined;
  const penaltyRate = tableData['penalty rate'] != null ? Number(tableData['penalty rate']) : 0;
  const earlyPaymentDiscount = parseEarlyPaymentDiscount(tableData);
  const paymentMethodsRaw = tableData['payment methods'];
  const paymentMethods = paymentMethodsRaw != null ? parsePaymentMethods(paymentMethodsRaw) : undefined;
  const iban = tableData.iban;

  if (!paymentMethods) throw new Error('Payment methods are required');

  const raw: RawPaymentTermsInput = {
    startingPoint,
    days,
    ...(endOfMonth != null ? { endOfMonth } : {}),
    penaltyRate,
    ...(earlyPaymentDiscount != null ? { earlyPaymentDiscount } : {}),
    paymentMethods,
    ...(iban != null ? { iban } : {})
  };

  currentRawInput = { ...raw };

  const result = await buildAndSave(raw);
  if (Either.isRight(result)) {
    savedPaymentTerms = result.right;
    saveError = undefined;
  } else {
    saveError = result.left;
    savedPaymentTerms = undefined;
  }
});

When(/^I save the payment terms configuration without specifying early payment discount$/, async () => {
  const raw: RawPaymentTermsInput = {
    startingPoint: 'from invoice date',
    days: 30,
    penaltyRate: 15,
    paymentMethods: ['bank_transfer'],
    iban: 'FR7630006000011234567890189'
  };

  const result = await buildAndSave(raw);
  if (Either.isRight(result)) {
    savedPaymentTerms = result.right;
    saveError = undefined;
  } else {
    saveError = result.left;
    savedPaymentTerms = undefined;
  }
});

When(/^I update the penalty rate to (\d+)$/, (penaltyRate: string) => {
  currentRawInput = { ...currentRawInput, penaltyRate: Number(penaltyRate) };
});

When(/^I save the payment terms configuration$/, async () => {
  const raw: RawPaymentTermsInput = {
    startingPoint: currentRawInput.startingPoint ?? 'from invoice date',
    days: currentRawInput.days,
    ...(currentRawInput.endOfMonth != null ? { endOfMonth: currentRawInput.endOfMonth } : {}),
    penaltyRate: currentRawInput.penaltyRate ?? 0,
    ...(currentRawInput.earlyPaymentDiscount != null ? { earlyPaymentDiscount: currentRawInput.earlyPaymentDiscount } : {}),
    paymentMethods: currentRawInput.paymentMethods ?? ['bank_transfer'],
    ...(currentRawInput.iban != null ? { iban: currentRawInput.iban } : {})
  };

  const result = await buildAndSave(raw);
  if (Either.isRight(result)) {
    savedPaymentTerms = result.right;
    saveError = undefined;
  } else {
    saveError = result.left;
    savedPaymentTerms = undefined;
  }
});

When(/^I attempt to retrieve the payment terms configuration$/, async () => {
  const result = await getPaymentTermsConfiguration();
  paymentTermsUnavailable = Either.isLeft(result);
});

// --- Then ---

Then(/^the payment terms configuration should be saved successfully$/, () => {
  assert.ok(savedPaymentTerms, `Payment terms configuration should be saved. Error: ${saveError}`);
  assert.strictEqual(saveError, undefined);
});

Then(/^the payment terms configuration should not be saved$/, () => {
  assert.ok(saveError, 'Expected payment terms configuration to fail');
  assert.strictEqual(savedPaymentTerms, undefined);
});

Then(/^the deadline days should be (\d+)$/, (days: string) => {
  assert.ok(savedPaymentTerms, 'Payment terms should be configured');
  assert.strictEqual(savedPaymentTerms.deadline.days, Number(days));
});

Then(/^the penalty rate should be (\d+)$/, async (penaltyRate: string) => {
  const result = await getPaymentTermsConfiguration();
  assert.ok(Either.isRight(result), 'Payment terms should be configured');
  assert.strictEqual(result.right.penaltyRate, Number(penaltyRate));
});

Then(/^the payment terms configuration should be unavailable$/, () => {
  assert.ok(paymentTermsUnavailable, 'Payment terms configuration should be unavailable when not configured');
});
