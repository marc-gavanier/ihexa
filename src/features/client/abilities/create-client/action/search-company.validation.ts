import { Schema } from 'effect';

export const searchCompanyValidation = Schema.String.pipe(Schema.minLength(2));
