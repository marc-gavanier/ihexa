import { Schema } from 'effect';

export const Label = Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(200), Schema.brand('Label'));
export type Label = typeof Label.Type;

export const Quantity = Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(1), Schema.brand('Quantity'));
export type Quantity = typeof Quantity.Type;

const AmountMinorUnit = Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(0), Schema.brand('Amount'));

export const Amount = Schema.transform(Schema.Number, AmountMinorUnit, {
  strict: true,
  decode: (majorUnit) => Math.round(majorUnit * 100),
  encode: (minorUnit) => minorUnit / 100
});
export type Amount = typeof Amount.Type;

export const amountFromMinorUnit = (minorUnit: number): Amount => Schema.decodeSync(AmountMinorUnit)(minorUnit);

export const Line = Schema.Struct({
  label: Label,
  quantity: Quantity,
  amount: Amount
});
export type Line = typeof Line.Type;

export const amountOf = ({ amount }: Line): number => Schema.encodeSync(Amount)(amount);

const totalOfSingle = (line: Line) => line.quantity * amountOf(line);

const toTotalLines = (total: number, line: Line) => total + totalOfSingle(line);

export const totalOfAll = (lines: readonly Line[]): Amount => amountFromMinorUnit(lines.reduce(toTotalLines, 0));
