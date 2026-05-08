import { Schema } from 'effect';

export const DEADLINE_STARTING_POINTS = ['upon_receipt', 'from_invoice_date'] as const;

export const DeadlineStartingPoint = Schema.Literal(...DEADLINE_STARTING_POINTS);

export type DeadlineStartingPoint = typeof DeadlineStartingPoint.Type;

export const MAX_DAYS_WITHOUT_EOM = 60;
export const MAX_DAYS_WITH_EOM = 45;

export type PaymentDeadline = {
  readonly startingPoint: DeadlineStartingPoint;
  readonly days: number;
  readonly endOfMonth: boolean;
};
