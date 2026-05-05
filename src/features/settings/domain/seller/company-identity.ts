import { Schema } from 'effect';
import { InseeCode, SellerCity, SellerStreet, SellerZipcode } from './address';
import { CompanyName } from './company-name';
import { LegalForm } from './legal-form';
import { Siren } from './siren';
import { Siret } from './siret';

type RawCompanyIdentity = {
  readonly companyName: string;
  readonly legalForm: string;
  readonly siren: string;
  readonly siret: string;
  readonly street: string;
  readonly zipcode: string;
  readonly city: string;
  readonly inseeCode: string;
};

export const CompanyIdentity = (raw: RawCompanyIdentity) => ({
  companyName: CompanyName(raw.companyName),
  legalForm: Schema.decodeUnknownSync(LegalForm)(raw.legalForm),
  siren: Siren(raw.siren),
  siret: Siret(raw.siret),
  street: SellerStreet(raw.street),
  zipcode: SellerZipcode(raw.zipcode),
  city: SellerCity(raw.city),
  inseeCode: InseeCode(raw.inseeCode)
});
