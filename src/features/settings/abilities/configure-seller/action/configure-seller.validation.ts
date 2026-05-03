import { Schema } from 'effect';
import { InseeCode, SellerCity, SellerStreet, SellerZipcode } from '@/features/settings/domain/seller/address';
import { CompanyName } from '@/features/settings/domain/seller/company-name';
import { Email } from '@/features/settings/domain/seller/email';
import { LegalForm } from '@/features/settings/domain/seller/legal-form';
import { Phone } from '@/features/settings/domain/seller/phone';
import { RcsRegistration } from '@/features/settings/domain/seller/rcs-registration';
import { ShareCapital } from '@/features/settings/domain/seller/share-capital';
import { Siren } from '@/features/settings/domain/seller/siren';
import { Siret } from '@/features/settings/domain/seller/siret';
import { VatNumber } from '@/features/settings/domain/seller/vat-number';
import { VatRegime } from '@/features/settings/domain/seller/vat-regime';
import { Website } from '@/features/settings/domain/seller/website';

export const configureSellerValidation = Schema.Struct({
  companyName: CompanyName.schema,
  legalForm: LegalForm,
  siren: Siren.schema,
  siret: Siret.schema,
  street: SellerStreet.schema,
  zipcode: SellerZipcode.schema,
  city: SellerCity.schema,
  inseeCode: InseeCode.schema,
  vatRegime: VatRegime,
  vatNumber: Schema.optionalWith(VatNumber.schema, { exact: true }),
  taxDebitOption: Schema.optionalWith(Schema.Boolean, { exact: true }),
  rcsRegistration: Schema.optionalWith(RcsRegistration.schema, { exact: true }),
  shareCapital: Schema.optionalWith(ShareCapital.schema, { exact: true }),
  email: Email.schema,
  phone: Schema.optionalWith(Phone.schema, { exact: true }),
  website: Schema.optionalWith(Website.schema, { exact: true })
});

export type ConfigureSellerFormData = typeof configureSellerValidation.Type;
export type ConfigureSellerInput = typeof configureSellerValidation.Encoded;
