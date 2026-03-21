import { Schema } from 'effect';

const AmountMinorUnit = Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(0), Schema.brand('Amount'));

export const Amount = Schema.transform(Schema.Number, AmountMinorUnit, {
  strict: true,
  decode: (majorUnit) => Math.round(majorUnit * 100),
  encode: (minorUnit) => minorUnit / 100
});
export type Amount = typeof Amount.Type;

export const amountFromMinorUnit = (minorUnit: number): Amount => Schema.decodeSync(AmountMinorUnit)(minorUnit);
