import { pipe } from 'effect';
import { all, type Effect, flatMap, map } from 'effect/Effect';
import { toValueObject, type ValueObject } from '@/libraries/ddd';
import { Amount, type InvalidAmountError } from '../amount';
import type { InvalidQuantityError, Quantity } from '../quantity';
import type { InvalidLineLabelError, LineLabel } from './line-label';

export type InvalidLineError = InvalidQuantityError | InvalidAmountError | InvalidLineLabelError;

export type Line = ValueObject<{
  label: LineLabel;
  quantity: Quantity;
  unitPrice: Amount;
  total: Amount;
}>;

export type Lines = ValueObject<[Line, ...Line[]]>;

const computeTotal = (quantity: Quantity, unitPrice: Amount): Effect<Amount, InvalidAmountError> =>
  Amount(quantity * unitPrice);

export const Line = (
  lineLabelEffect: Effect<LineLabel, InvalidLineLabelError>,
  quantityEffect: Effect<Quantity, InvalidQuantityError>,
  unitPriceEffect: Effect<Amount, InvalidAmountError>
): Effect<Line, InvalidLineError> =>
  pipe(
    all([lineLabelEffect, quantityEffect, unitPriceEffect]),
    flatMap(([label, quantity, unitPrice]: [LineLabel, Quantity, Amount]) =>
      pipe(
        computeTotal(quantity, unitPrice),
        map((total: Amount): Line => toValueObject({ label, quantity, unitPrice, total }))
      )
    )
  );
