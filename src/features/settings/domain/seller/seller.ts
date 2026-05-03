import { Data, Either, Match, pipe } from 'effect';
import type { InseeCode, SellerCity, SellerStreet, SellerZipcode } from './address';
import type { CompanyName } from './company-name';
import type { Email } from './email';
import type { LegalForm } from './legal-form';
import { isIndividualEnterprise } from './legal-form';
import type { Phone } from './phone';
import type { RcsRegistration } from './rcs-registration';
import type { ShareCapital } from './share-capital';
import type { Siren } from './siren';
import type { Siret } from './siret';
import type { VatNumber } from './vat-number';
import type { VatRegime } from './vat-regime';
import { isVatApplicable } from './vat-regime';
import type { Website } from './website';

export interface SellerAddress {
  readonly street: SellerStreet;
  readonly zipcode: SellerZipcode;
  readonly city: SellerCity;
  readonly inseeCode: InseeCode;
}

export interface SellerBase {
  readonly companyName: CompanyName;
  readonly legalForm: LegalForm;
  readonly siren: Siren;
  readonly siret: Siret;
  readonly address: SellerAddress;
  readonly rcsRegistration?: RcsRegistration;
  readonly email: Email;
  readonly phone?: Phone;
  readonly website?: Website;
}

export interface NormalVatSeller extends SellerBase {
  readonly vatRegime: 'normal';
  readonly vatNumber: VatNumber;
  readonly taxDebitOption: boolean;
  readonly shareCapital?: ShareCapital;
}

export interface FranchiseEnBaseSeller extends SellerBase {
  readonly vatRegime: 'franchise_en_base';
  readonly shareCapital?: ShareCapital;
}

export type Seller = NormalVatSeller | FranchiseEnBaseSeller;

export class ShareCapitalNotAllowedForEI extends Data.TaggedError('ShareCapitalNotAllowedForEI') {}

export class TaxDebitOptionNotAllowedForFranchise extends Data.TaggedError('TaxDebitOptionNotAllowedForFranchise') {}

export class VatNumberRequiredForNormalRegime extends Data.TaggedError('VatNumberRequiredForNormalRegime') {}

export type SellerConfigurationError =
  | ShareCapitalNotAllowedForEI
  | TaxDebitOptionNotAllowedForFranchise
  | VatNumberRequiredForNormalRegime;

export class SellerNotConfigured extends Data.TaggedError('SellerNotConfigured') {}

export interface ValidatedSellerInput {
  readonly companyName: CompanyName;
  readonly legalForm: LegalForm;
  readonly siren: Siren;
  readonly siret: Siret;
  readonly street: SellerStreet;
  readonly zipcode: SellerZipcode;
  readonly city: SellerCity;
  readonly inseeCode: InseeCode;
  readonly vatRegime: VatRegime;
  readonly vatNumber?: VatNumber;
  readonly taxDebitOption?: boolean;
  readonly rcsRegistration?: RcsRegistration;
  readonly shareCapital?: ShareCapital;
  readonly email: Email;
  readonly phone?: Phone;
  readonly website?: Website;
}

const assembleNormalVatSeller = (
  base: SellerBase,
  vatNumber: VatNumber,
  taxDebitOption: boolean,
  shareCapital?: ShareCapital
): Seller => ({
  ...base,
  vatRegime: 'normal',
  vatNumber,
  taxDebitOption,
  ...(shareCapital != null ? { shareCapital } : {})
});

const assembleFranchiseSeller = (base: SellerBase, shareCapital?: ShareCapital): Seller => ({
  ...base,
  vatRegime: 'franchise_en_base',
  ...(shareCapital != null ? { shareCapital } : {})
});

const toBase = (input: ValidatedSellerInput): SellerBase => ({
  companyName: input.companyName,
  legalForm: input.legalForm,
  siren: input.siren,
  siret: input.siret,
  address: { street: input.street, zipcode: input.zipcode, city: input.city, inseeCode: input.inseeCode },
  email: input.email,
  ...(input.rcsRegistration != null ? { rcsRegistration: input.rcsRegistration } : {}),
  ...(input.phone != null ? { phone: input.phone } : {}),
  ...(input.website != null ? { website: input.website } : {})
});

export const buildSeller = (input: ValidatedSellerInput): Either.Either<Seller, SellerConfigurationError> =>
  pipe(
    Match.value(input),
    Match.when({ legalForm: (legalForm: LegalForm) => isIndividualEnterprise(legalForm), shareCapital: Match.defined }, () =>
      Either.left(new ShareCapitalNotAllowedForEI())
    ),
    Match.when({ vatRegime: (vatRegime: VatRegime) => !isVatApplicable(vatRegime), taxDebitOption: Match.is(true) }, () =>
      Either.left(new TaxDebitOptionNotAllowedForFranchise())
    ),
    Match.when({ vatRegime: 'normal', vatNumber: (vatNumber?: VatNumber) => vatNumber == null }, () =>
      Either.left(new VatNumberRequiredForNormalRegime())
    ),
    Match.when({ vatRegime: 'normal', vatNumber: Match.defined }, (input) =>
      Either.right(assembleNormalVatSeller(toBase(input), input.vatNumber, input.taxDebitOption ?? false, input.shareCapital))
    ),
    Match.orElse((input) => Either.right(assembleFranchiseSeller(toBase(input), input.shareCapital)))
  );
