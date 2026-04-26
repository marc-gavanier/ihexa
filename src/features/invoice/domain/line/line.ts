import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';
import { Amount } from './amount';
import { Label } from './label';
import { Quantity } from './quantity';

export const Line = defineModel(
  Schema.Struct({
    label: Label.schema,
    quantity: Quantity.schema,
    amount: Amount
  })
);
export type Line = Model.TypeOf<typeof Line>;

export const amountOf = ({ amount }: Line): number => Schema.encodeSync(Amount)(amount);

export const lineTotal = (line: Line): number => line.quantity * amountOf(line);

const toTotalLines = (total: number, line: Line) => total + lineTotal(line);

export const totalOfAll = (lines: readonly Line[]): number => lines.reduce(toTotalLines, 0);
