import { defineModel, type Model } from '@arckit/effect';
import { brand, maxLength, nonEmptyString, Trim } from 'effect/Schema';

export const COMPANY_NAME_MAX_LENGTH = 400;

export const CompanyName = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    maxLength(COMPANY_NAME_MAX_LENGTH, { message: () => 'maxLength' }),
    brand('CompanyName')
  )
);

export type CompanyName = Model.TypeOf<typeof CompanyName>;
