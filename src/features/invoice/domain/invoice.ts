import { pipe } from 'effect';
import { all, type Effect, flatMap, forEach, map } from 'effect/Effect';
import {
  type AggregateRoot,
  type DomainError,
  toAggregateRoot,
  toValueObject,
} from '@/libraries/ddd';
import { Amount, type InvalidAmountError } from './amount';
import type { InvalidInvoiceIdError, InvoiceId } from './invoice-id';
import type { InvalidLineError, Line, Lines } from './line';
import type { InvalidRecipientError, Recipient } from './recipient';

export type InvalidInvoiceError =
  | InvalidInvoiceIdError
  | InvalidRecipientError
  | InvalidLineError;

export type Invoice = AggregateRoot<{
  id: InvoiceId;
  recipient: Recipient;
  lines: Lines;
  total: Amount;
}>;

const toInvoiceTotal = (
  total: Effect<Amount, InvalidAmountError>,
  line: Line,
): Effect<Amount, InvalidAmountError> =>
  flatMap(total, (amount: Amount) => Amount(amount + line.total));

const toLines = (lines: [Line, ...Line[]]): Lines => toValueObject(lines);

const totalFrom = (lines: Lines) => lines.reduce(toInvoiceTotal, Amount(0n));

export const Invoice = (
  invoiceIdEffect: Effect<InvoiceId, InvalidInvoiceIdError>,
  linesEffects: [
    Effect<Line, InvalidLineError>,
    ...Effect<Line, InvalidLineError>[],
  ],
  recipientEffect: Effect<Recipient, InvalidRecipientError>,
): Effect<Invoice, InvalidInvoiceError> =>
  pipe(
    forEach(linesEffects, (line) => line),
    map(toLines),
    flatMap((lines: Lines) =>
      pipe(
        all([invoiceIdEffect, recipientEffect, totalFrom(lines)]),
        map(([id, recipient, total]) =>
          toAggregateRoot({ id, lines, recipient, total }),
        ),
      ),
    ),
  );

export type InvoiceByIdNotFoundError = DomainError<
  'InvoiceByIdNotFoundError',
  never
>;

export const InvoiceByIdNotFoundError = (): InvoiceByIdNotFoundError => ({
  _tag: 'InvoiceByIdNotFoundError',
  value: undefined as never,
});

export type InvoiceByIdError = InvoiceByIdNotFoundError;

export type InvoiceById = (id: InvoiceId) => Effect<Invoice, InvoiceByIdError>;
