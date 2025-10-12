import { pipe } from 'effect';
import { all, type Effect, flatMap, forEach, map } from 'effect/Effect';
import { Amount, type InvalidAmountError } from './amount';
import type { InvalidInvoiceIdError, InvoiceId } from './invoice-id';
import type { InvalidLineError, Line, Lines } from './line';
import type { InvalidRecipientError, Recipient } from './recipient';

export type InvalidInvoiceError =
  | InvalidInvoiceIdError
  | InvalidRecipientError
  | InvalidLineError;

export type Invoice = Readonly<{
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

const toLines = ([firstLine, ...restLines]: Lines): Lines => [
  firstLine,
  ...restLines,
];

const totalFrom = (lines: [Line, ...Line[]]) =>
  lines.reduce(toInvoiceTotal, Amount(0n));

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
        map(([id, recipient, total]) => ({ id, lines, recipient, total })),
      ),
    ),
  );
