import { Schema } from 'effect';

export const Street = Schema.String.pipe(Schema.nonEmptyString(), Schema.brand('Street'));
export type Street = typeof Street.Type;
