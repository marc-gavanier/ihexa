import { COMPANY_FIXTURES } from './company-fixtures';

export type CompanySummary = {
  readonly companyName: string;
  readonly legalForm: string;
  readonly siren: string;
  readonly siret: string;
  readonly street: string;
  readonly zipcode: string;
  readonly city: string;
  readonly inseeCode: string;
};

type SearchCompany = (query: string) => Promise<readonly CompanySummary[]>;

export const searchCompany: SearchCompany = async (query: string) => {
  const normalizedQuery = query.toLowerCase();
  return COMPANY_FIXTURES.filter((c) => c.companyName.toLowerCase().includes(normalizedQuery) || c.siret.includes(query));
};
