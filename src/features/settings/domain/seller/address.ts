import { defineModel, type Model } from '@arckit/effect';
import { brand, maxLength, nonEmptyString, pattern, Trim } from 'effect/Schema';

export const STREET_MAX_LENGTH = 255;

export const SellerStreet = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    maxLength(STREET_MAX_LENGTH, { message: () => 'maxLength' }),
    brand('SellerStreet')
  )
);

export type SellerStreet = Model.TypeOf<typeof SellerStreet>;

export const ZIPCODE_PATTERN = /^\d{5}$/;

export const SellerZipcode = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    pattern(ZIPCODE_PATTERN, { message: () => 'invalid' }),
    brand('SellerZipcode')
  )
);

export type SellerZipcode = Model.TypeOf<typeof SellerZipcode>;

export const CITY_MAX_LENGTH = 255;

export const SellerCity = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    maxLength(CITY_MAX_LENGTH, { message: () => 'maxLength' }),
    brand('SellerCity')
  )
);

export type SellerCity = Model.TypeOf<typeof SellerCity>;

const INSEE_CODE_PATTERN = /^(\d{5}|2[AB]\d{3})$/;

export const InseeCode = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    pattern(INSEE_CODE_PATTERN, { message: () => 'invalid' }),
    brand('InseeCode')
  )
);

export type InseeCode = Model.TypeOf<typeof InseeCode>;
