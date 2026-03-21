import { Schema } from 'effect';

export const Firstname = Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(100), Schema.brand('Firstname'));
export type Firstname = typeof Firstname.Type;
