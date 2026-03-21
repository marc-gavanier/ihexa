import { Schema } from 'effect';

export const Zipcode = Schema.String.pipe(Schema.pattern(/^\d{5}$/), Schema.brand('Zipcode'));
export type Zipcode = typeof Zipcode.Type;
