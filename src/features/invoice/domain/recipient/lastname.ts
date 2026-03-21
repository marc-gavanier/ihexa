import { Schema } from 'effect';

export const Lastname = Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(100), Schema.brand('Lastname'));
export type Lastname = typeof Lastname.Type;
