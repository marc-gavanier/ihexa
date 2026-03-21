import { Schema } from 'effect';

export const City = Schema.String.pipe(Schema.nonEmptyString(), Schema.brand('City'));
export type City = typeof City.Type;
