import { Schema } from 'effect';
import { Email } from '@/features/settings/domain/seller/email';
import { Phone } from '@/features/settings/domain/seller/phone';
import { RcsRegistration } from '@/features/settings/domain/seller/rcs-registration';
import { ShareCapital } from '@/features/settings/domain/seller/share-capital';
import { VatNumber } from '@/features/settings/domain/seller/vat-number';
import { VAT_REGIMES, type VatRegime } from '@/features/settings/domain/seller/vat-regime';
import { Website } from '@/features/settings/domain/seller/website';

const VatRegimeFromString = Schema.String.pipe(
  Schema.nonEmptyString({ message: () => 'required' }),
  Schema.filter((s): s is VatRegime => (VAT_REGIMES as readonly string[]).includes(s), { message: () => 'invalid' })
);

const companyValidation = Schema.Struct({
  companyName: Schema.String,
  legalForm: Schema.String,
  siren: Schema.String,
  siret: Schema.String,
  street: Schema.String,
  zipcode: Schema.String,
  city: Schema.String,
  inseeCode: Schema.String
});

export const configureSellerValidation = Schema.Struct({
  company: companyValidation,
  vatRegime: VatRegimeFromString,
  vatNumber: Schema.optionalWith(VatNumber.schema, { exact: true }),
  taxDebitOption: Schema.optionalWith(Schema.Boolean, { exact: true }),
  rcsRegistration: Schema.optionalWith(RcsRegistration.schema, { exact: true }),
  shareCapital: Schema.optionalWith(ShareCapital.schema, { exact: true }),
  email: Email.schema,
  phone: Schema.optionalWith(Phone.schema, { exact: true }),
  website: Schema.optionalWith(Website.schema, { exact: true })
}).pipe(
  Schema.filter((data) =>
    data.vatRegime === 'normal' && data.vatNumber == null ? { path: ['vatNumber'], message: 'required' } : undefined
  )
);

export type ConfigureSellerFormData = typeof configureSellerValidation.Type;
export type ConfigureSellerInput = typeof configureSellerValidation.Encoded;
