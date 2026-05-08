import { Either, Match, pipe } from 'effect';
import { taggedError } from '@/libraries/modeling';
import type { EarlyPaymentDiscount } from './early-payment-discount';
import type { Iban } from './iban';
import type { DeadlineStartingPoint, PaymentDeadline } from './payment-deadline';
import { MAX_DAYS_WITH_EOM, MAX_DAYS_WITHOUT_EOM } from './payment-deadline';
import type { PaymentMethods } from './payment-method';
import type { PenaltyRate } from './penalty-rate';

export type PaymentTerms = {
  readonly deadline: PaymentDeadline;
  readonly penaltyRate: PenaltyRate;
  readonly earlyPaymentDiscount: EarlyPaymentDiscount;
  readonly paymentMethods: PaymentMethods;
  readonly iban?: Iban;
};

export const UponReceiptWithEndOfMonth = taggedError('UponReceiptWithEndOfMonth');
export const BankTransferRequiresIban = taggedError('BankTransferRequiresIban');
export const EarlyPaymentDiscountNotSpecified = taggedError('EarlyPaymentDiscountNotSpecified');
export const PaymentDeadlineExceedsMaxDays = taggedError('PaymentDeadlineExceedsMaxDays');

export type PaymentTermsConfigurationError =
  | typeof UponReceiptWithEndOfMonth
  | typeof BankTransferRequiresIban
  | typeof EarlyPaymentDiscountNotSpecified
  | typeof PaymentDeadlineExceedsMaxDays;

export const PaymentTermsNotConfigured = taggedError('PaymentTermsNotConfigured');

export type ValidatedPaymentTermsInput = {
  readonly startingPoint: DeadlineStartingPoint;
  readonly days: number;
  readonly endOfMonth?: boolean;
  readonly penaltyRate: PenaltyRate;
  readonly earlyPaymentDiscount?: EarlyPaymentDiscount;
  readonly paymentMethods: PaymentMethods;
  readonly iban?: Iban;
};

const assembleDeadline = (startingPoint: DeadlineStartingPoint, days: number, endOfMonth: boolean): PaymentDeadline =>
  startingPoint === 'upon_receipt' ? { startingPoint, days: 0, endOfMonth: false } : { startingPoint, days, endOfMonth };

const assemblePaymentTerms = (input: ValidatedPaymentTermsInput, earlyPaymentDiscount: EarlyPaymentDiscount): PaymentTerms => ({
  deadline: assembleDeadline(input.startingPoint, input.days, input.endOfMonth ?? false),
  penaltyRate: input.penaltyRate,
  earlyPaymentDiscount,
  paymentMethods: input.paymentMethods,
  ...(input.iban != null ? { iban: input.iban } : {})
});

const bankTransferWithoutIban = (input: ValidatedPaymentTermsInput): boolean =>
  input.paymentMethods.includes('bank_transfer') && input.iban == null;

const exceedsMaxDays = (input: ValidatedPaymentTermsInput): boolean =>
  input.startingPoint === 'from_invoice_date' &&
  (input.endOfMonth === true ? input.days > MAX_DAYS_WITH_EOM : input.days > MAX_DAYS_WITHOUT_EOM);

export const buildPaymentTerms = (
  input: ValidatedPaymentTermsInput
): Either.Either<PaymentTerms, PaymentTermsConfigurationError> =>
  pipe(
    Match.value(input),
    Match.when({ startingPoint: 'upon_receipt', endOfMonth: Match.is(true) }, () => Either.left(UponReceiptWithEndOfMonth)),
    Match.when(bankTransferWithoutIban, () => Either.left(BankTransferRequiresIban)),
    Match.when(exceedsMaxDays, () => Either.left(PaymentDeadlineExceedsMaxDays)),
    Match.when({ earlyPaymentDiscount: Match.defined }, (input) =>
      Either.right(assemblePaymentTerms(input, input.earlyPaymentDiscount))
    ),
    Match.orElse(() => Either.left(EarlyPaymentDiscountNotSpecified))
  );
