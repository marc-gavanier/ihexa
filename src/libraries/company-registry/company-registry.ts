import { Data } from 'effect';

export interface CompanySearchResult {
  readonly companyName: string;
  readonly siret: string;
  readonly siren: string;
  readonly legalForm: string;
}

export interface CompanyData {
  readonly companyName: string;
  readonly legalForm: string;
  readonly siren: string;
  readonly siret: string;
  readonly street: string;
  readonly zipcode: string;
  readonly city: string;
  readonly inseeCode: string;
  readonly vatNumber?: string;
  readonly rcsRegistration?: string;
  readonly shareCapital?: number;
}

export class InvalidSiretFormat extends Data.TaggedError('InvalidSiretFormat')<{
  readonly siret: string;
}> {}

export class CompanyNotFound extends Data.TaggedError('CompanyNotFound')<{
  readonly query: string;
}> {}
