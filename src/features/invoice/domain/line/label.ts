import { Schema } from 'effect';

export const Label = Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(200), Schema.brand('Label'));
export type Label = typeof Label.Type;
