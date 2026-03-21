import { Schema } from 'effect';

export const Quantity = Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(1), Schema.brand('Quantity'));
export type Quantity = typeof Quantity.Type;
