import { Schema } from 'effect';
import { Amount, amountFromMinorUnit } from './amount';
import { Label } from './label';
import { Quantity } from './quantity';

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
