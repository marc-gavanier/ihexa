export type CompanySearchResult = {
  readonly companyName: string;
  readonly legalForm: string;
  readonly siren: string;
  readonly siret: string;
  readonly street: string;
  readonly zipcode: string;
  readonly city: string;
  readonly inseeCode: string;
};

export type SearchCompany = (query: string) => Promise<readonly CompanySearchResult[]>;
