import { Schema } from 'effect';

export const Label = Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(200), Schema.brand('Label'));
export type Label = typeof Label.Type;

export const Quantity = Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(1), Schema.brand('Quantity'));
export type Quantity = typeof Quantity.Type;

const AmountCents = Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(0), Schema.brand('Amount'));

export const Amount = Schema.transform(Schema.Number, AmountCents, {
  strict: true,
  decode: (majorUnit) => Math.round(majorUnit * 100),
  encode: (minorUnit) => minorUnit / 100
});
export type Amount = typeof Amount.Type;

export const amountFromCents = (cents: number): Amount => Schema.decodeSync(AmountCents)(cents);

export const Line = Schema.Struct({
  label: Label,
  quantity: Quantity,
  amount: Amount
});
export type Line = typeof Line.Type;

export const amountOf = (line: Line): number => line.amount / 100;
